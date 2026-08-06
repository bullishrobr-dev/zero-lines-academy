// ─────────────────────────────────────────────────────────────────────────────
// ManagerDashboard.tsx — the shop manager's view of their team. Used on a phone.
//
// THE HONEST PART. Progress is stored on each seller's own device: XP, streaks,
// lessons and quiz scores never leave the phone that earned them, because there
// is no server to send them to. So on the manager's phone `getTeamProgress()`
// answers `hasData: false` for almost everyone.
//
// This screen therefore says "No data on this device" instead of rendering a 0%
// bar that looks measured, and every derived figure — average, furthest along,
// behind — counts only the people this device actually has records for, which
// is exactly what `getTeamStats()` already does.
//
// ADDING A SELLER depends on whether the database is connected:
//
//   Configured      → "Create" creates. `db.createUser()` makes the login and
//                     the profile with this manager attached, and the seller
//                     signs in on their own phone straight away. "Remove"
//                     removes, through `db.deleteUser()`.
//   Not configured  → it is a commit against src/data/accounts.ts; the sheet
//                     writes the block and the manager pastes it.
//
// Either way the manager's own username is filled in as the manager, so the
// new seller lands on this screen.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  FileText,
  KeyRound,
  MapPin,
  Smartphone,
  UserMinus,
  UserPlus,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuthContext } from '../contexts/AuthContext';
import LoadingScreen from '../components/LoadingScreen';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import * as backend from '../backend/mockBackend';
import * as db from '../backend/db';
import type { User, UserLocation } from '../backend/types';
import { generatePassword, newSalt } from '../utils/credentials';

type EmployeeProgress = backend.EmployeeProgress;

const ROSTER_FILE = 'src/data/accounts.ts';
const ROSTER_EDIT_URL =
  'https://github.com/bullishrobr-dev/zero-lines-academy/edit/main/src/data/accounts.ts';

interface CoachingNote {
  id: string;
  employeeId: string;
  employeeName: string;
  text: string;
  createdAt: string;
}

/* Strings with no key in src/data/translations.ts — that file has none for the
   management screens and is owned elsewhere. */
const COPY = {
  overline: { en: 'Manager', es: 'Responsable' },
  title: { en: 'Your team', es: 'Tu equipo' },
  close: { en: 'Close', es: 'Cerrar' },
  back: { en: 'Back', es: 'Volver' },
  cancel: { en: 'Cancel', es: 'Cancelar' },
  done: { en: 'Done', es: 'Hecho' },
  copied: { en: 'Copied', es: 'Copiado' },

  /* ── Numbers ── */
  statTeam: { en: 'In your team', es: 'En tu equipo' },
  statSeen: { en: 'Seen on this phone', es: 'Con datos aquí' },
  measuredHeading: { en: 'Measured on this device', es: 'Medido en este dispositivo' },
  statAvg: { en: 'Average done', es: 'Media completada' },
  statTop: { en: 'Furthest along', es: 'Más avanzado' },
  statRisk: { en: 'Behind', es: 'Rezagados' },

  /* ── The one explanation ── */
  whyTitle: { en: 'Where the numbers are', es: 'Dónde están los números' },
  whyBody: {
    en: 'Training progress is saved on each seller’s own phone, so this screen only sees what was earned on this one. A shared view of everybody needs a server.',
    es: 'El progreso se guarda en el móvil de cada vendedor, así que esta pantalla solo ve lo que se ha hecho en este. Una vista compartida de todos necesita un servidor.',
  },
  whyTip: {
    en: 'Ask your team to tap “Share my stats” on their profile and send you the summary.',
    es: 'Pide a tu equipo que toque «Compartir mis datos» en su perfil y te mande el resumen.',
  },

  /* ── Team list ── */
  addEmployee: { en: 'Add a seller', es: 'Añadir vendedor' },
  allShops: { en: 'All shops', es: 'Todas' },
  noEmployees: { en: 'Nobody on your team yet', es: 'Aún no tienes a nadie' },
  noEmployeesSub: {
    en: 'Add a seller and they appear here as soon as the roster commit lands.',
    es: 'Añade a un vendedor y aparecerá aquí en cuanto se suba el commit del equipo.',
  },
  noData: { en: 'No data on this device', es: 'Sin datos en este dispositivo' },
  progress: { en: 'Progress', es: 'Progreso' },
  lessons: { en: 'Lessons', es: 'Lecciones' },
  quizAvg: { en: 'Quiz avg', es: 'Media test' },
  lastActive: { en: 'Last active', es: 'Última actividad' },
  statusOnTrack: { en: 'On track', es: 'En buen camino' },
  statusNeedsPush: { en: 'Needs a push', es: 'Necesita empuje' },
  statusAtRisk: { en: 'Falling behind', es: 'Se está quedando atrás' },
  statusNotStarted: { en: 'Not started', es: 'Sin empezar' },
  note: { en: 'Note', es: 'Nota' },
  remove: { en: 'Remove', es: 'Sacar' },
  removeTitle: { en: 'Remove from the team', es: 'Sacar del equipo' },

  /* ── Coaching notes ── */
  coachingNotes: { en: 'Coaching notes', es: 'Notas de coaching' },
  notesHint: {
    en: 'Kept on this phone, for you.',
    es: 'Se quedan en este móvil, para ti.',
  },
  writeNote: { en: 'Write a coaching note…', es: 'Escribe una nota de coaching…' },
  saveNote: { en: 'Save note', es: 'Guardar nota' },
  previousNotes: { en: 'Earlier notes', es: 'Notas anteriores' },
  noNotes: { en: 'No notes yet for this person.', es: 'Aún no hay notas de esta persona.' },

  /* ── Add a seller ── */
  addLead: {
    en: 'The team lives in the code, so adding a seller is a one-line commit — this writes the line for you.',
    es: 'El equipo vive en el código, así que dar de alta a un vendedor es un commit de una línea — aquí la tienes escrita.',
  },
  addLeadDb: {
    en: 'Fill this in and press Create. The account exists straight away — no commit, nothing to deploy.',
    es: 'Rellena esto y pulsa Crear. La cuenta existe al momento — sin commit ni despliegue.',
  },
  name: { en: 'Name', es: 'Nombre' },
  namePlaceholder: { en: 'e.g. Maria Garcia', es: 'p. ej. María García' },
  username: { en: 'Username', es: 'Usuario' },
  usernamePlaceholder: { en: 'e.g. maria', es: 'p. ej. maria' },
  usernameHint: {
    en: 'What they type to sign in. Lowercase letters and numbers, nothing else.',
    es: 'Lo que escribe para entrar. Minúsculas y números, nada más.',
  },
  shop: { en: 'Shop', es: 'Tienda' },
  shopHint: {
    en: 'The shop sets the currency they are trained in — € in Andorra, £ in Gibraltar.',
    es: 'La tienda define la moneda con la que se forma — € en Andorra, £ en Gibraltar.',
  },
  reportsToYou: { en: 'Reports to you', es: 'Estará en tu equipo' },
  generate: { en: 'Generate the account', es: 'Generar la cuenta' },
  create: { en: 'Create', es: 'Crear' },
  creating: { en: 'Creating…', es: 'Creando…' },
  errName: { en: 'Type their name.', es: 'Escribe su nombre.' },
  errUsernameEmpty: { en: 'Pick a username.', es: 'Elige un usuario.' },
  errUsernameShape: {
    en: 'Lowercase letters and numbers only — no spaces, no dots, no dashes.',
    es: 'Solo minúsculas y números — sin espacios, puntos ni guiones.',
  },
  errUsernameTaken: {
    en: 'That username is already on the roster.',
    es: 'Ese usuario ya está en el equipo.',
  },

  errCreate: { en: 'The account was not created', es: 'No se ha creado la cuenta' },
  errUnknown: {
    en: 'Could not reach the database. Check the connection and try again.',
    es: 'No se ha podido conectar con la base de datos. Comprueba la conexión e inténtalo otra vez.',
  },

  /* ── Result ── */
  created: { en: 'Account created', es: 'Cuenta creada' },
  signInNow: {
    en: 'They can sign in now, on their own phone. Nothing else to do.',
    es: 'Ya puede entrar desde su móvil. No hay que hacer nada más.',
  },
  ready: { en: 'Account ready', es: 'Cuenta lista' },
  theirLogin: { en: 'Their login', es: 'Sus datos de acceso' },
  theirPassword: { en: 'Password', es: 'Contraseña' },
  passwordWarning: {
    en: 'The password is shown once and cannot be recovered. Write it down or send it to them now.',
    es: 'La contraseña se muestra una sola vez y no se puede recuperar. Apúntala o envíasela ahora.',
  },
  copyPassword: { en: 'Copy the password', es: 'Copiar la contraseña' },
  copyLogin: { en: 'Copy both', es: 'Copiar los dos' },
  theCode: { en: 'The line to commit', es: 'La línea que subir' },
  copyCode: { en: 'Copy the code', es: 'Copiar el código' },
  openOnGitHub: { en: 'Open the file on GitHub', es: 'Abrir el archivo en GitHub' },
  stepCopy: { en: 'Copy the code above.', es: 'Copia el código de arriba.' },
  stepOpen: { en: `Open ${ROSTER_FILE} on GitHub.`, es: `Abre ${ROSTER_FILE} en GitHub.` },
  stepPaste: { en: 'Paste it just above the closing ].', es: 'Pégalo justo encima del ] final.' },
  stepCommit: {
    en: 'Commit. They can sign in about a minute later, once the site rebuilds.',
    es: 'Haz commit. Podrá entrar un minuto después, cuando el sitio se reconstruya.',
  },

  /* ── Remove ── */
  removeLead: {
    en: 'Taking someone off the team is a commit too: delete their block from the roster.',
    es: 'Sacar a alguien del equipo también es un commit: borra su bloque del archivo.',
  },
  removeFind: { en: 'Find this line', es: 'Busca esta línea' },
  copyLine: { en: 'Copy the line', es: 'Copiar la línea' },
  removeStepOpen: { en: `Open ${ROSTER_FILE} on GitHub.`, es: `Abre ${ROSTER_FILE} en GitHub.` },
  removeStepDelete: {
    en: 'Delete the whole { … } block containing that line.',
    es: 'Borra todo el bloque { … } que contiene esa línea.',
  },
  removeStepCommit: {
    en: 'Commit. They lose access about a minute later, on every device.',
    es: 'Haz commit. Pierde el acceso un minuto después, en todos los dispositivos.',
  },
  removeKeepsProgress: {
    en: 'Their training history stays on their own phone. Nothing here can reach it.',
    es: 'Su historial de formación se queda en su móvil. Desde aquí no se toca.',
  },

  /* ── Remove, with a database behind it ── */
  removeLeadDb: {
    en: 'They lose access immediately, on every device.',
    es: 'Pierde el acceso al momento, en todos los dispositivos.',
  },
  removeLosesProgress: {
    en: 'Their training record goes with their profile — XP, lessons and quiz scores. This cannot be undone.',
    es: 'Su historial se borra con el perfil — XP, lecciones y resultados. Esto no se puede deshacer.',
  },
  removeConfirm: { en: 'Remove from the team', es: 'Sacar del equipo' },
  removingNow: { en: 'Removing…', es: 'Sacando…' },
  errRemove: { en: 'They were not removed', es: 'No se ha podido sacar' },
} as const;

type CopyKey = keyof typeof COPY;

/* ── localStorage: coaching notes are the manager's own, on the manager's phone ── */
function getCoachingNotes(): CoachingNote[] {
  try {
    return JSON.parse(localStorage.getItem('zl_coaching_notes') || '[]') as CoachingNote[];
  } catch {
    return [];
  }
}

function saveCoachingNote(note: CoachingNote) {
  try {
    const notes = getCoachingNotes();
    notes.unshift(note);
    localStorage.setItem('zl_coaching_notes', JSON.stringify(notes.slice(0, 200)));
  } catch {
    // non-fatal
  }
}

/** Lowercase letters and digits, starting with a letter. Nothing to mistype. */
const USERNAME_RE = /^[a-z][a-z0-9]*$/;

/** "María García" → "maria". Only a suggestion; the field stays editable. */
function suggestUsername(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? '';
  return first
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // The Clipboard API needs a secure context; the shop tablets are not always
    // on one, and a copy button that silently fails is worse than useless.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

const inputClass =
  'min-h-touch w-full rounded-chip border border-line-strong bg-surface px-3 text-body-small text-ink outline-none placeholder:text-ink-3 focus:border-teal-strong';

type Status = 'onTrack' | 'needsPush' | 'atRisk' | 'notStarted';

/** Only ever called for people this device has records for. */
function getStatus(emp: EmployeeProgress): { key: Status; dot: string } {
  if (emp.completedLessons === 0) return { key: 'notStarted', dot: 'bg-line-strong' };
  if (emp.progress >= 70) return { key: 'onTrack', dot: 'bg-success' };
  if (emp.progress >= 40) return { key: 'needsPush', dot: 'bg-warning' };
  return { key: 'atRisk', dot: 'bg-danger' };
}

/* ── Page ── */

export default function ManagerDashboard() {
  const { language } = useLanguage();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const isEs = language === 'es';
  const c = useCallback((key: CopyKey) => (isEs ? COPY[key].es : COPY[key].en), [isEs]);
  const locale = isEs ? 'es-ES' : 'en-GB';

  const [team, setTeam] = useState<EmployeeProgress[] | null>(null);
  const [stats, setStats] = useState({ avgCompletion: 0, top: '—', atRisk: 0 });

  const [selected, setSelected] = useState<EmployeeProgress | null>(null);
  const [locationFilter, setLocationFilter] = useState<'all' | UserLocation>('all');
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState<User | null>(null);
  const [notesFor, setNotesFor] = useState<EmployeeProgress | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user) {
        // Clearing the loading state matters even here: returning early used to
        // leave an unauthenticated visitor on "Loading…" for good.
        if (!cancelled) setTeam([]);
        return;
      }
      const data = await backend.getTeamProgress(user.id);
      const s = await backend.getTeamStats(user.id);
      if (cancelled) return;
      setTeam(data);
      setStats({ avgCompletion: s.avgCompletion, top: s.topPerformer, atRisk: s.atRiskCount });
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  /** Re-read the team after adding or removing someone. */
  const refreshTeam = useCallback(() => {
    if (!user) return;
    void (async () => {
      try {
        const data = await backend.getTeamProgress(user.id);
        const s = await backend.getTeamStats(user.id);
        setTeam(data);
        setStats({ avgCompletion: s.avgCompletion, top: s.topPerformer, atRisk: s.atRiskCount });
      } catch {
        // Keep showing what we had rather than blanking the screen.
      }
    })();
  }, [user]);

  const employees = useMemo(() => {
    const list = team ?? [];
    return locationFilter === 'all' ? list : list.filter((e) => e.user.location === locationFilter);
  }, [team, locationFilter]);

  const shopsInTeam = useMemo(() => new Set((team ?? []).map((e) => e.user.location)).size, [team]);

  /* The whole point: how many of these people this device has anything for. */
  const measuredCount = useMemo(() => (team ?? []).filter((e) => e.hasData).length, [team]);

  const statusLabel = useCallback(
    (key: Status) =>
      key === 'onTrack'
        ? c('statusOnTrack')
        : key === 'needsPush'
          ? c('statusNeedsPush')
          : key === 'atRisk'
            ? c('statusAtRisk')
            : c('statusNotStarted'),
    [c]
  );

  if (team === null) return <LoadingScreen />;

  if (selected) {
    return (
      <EmployeeDetail
        emp={selected}
        c={c}
        locale={locale}
        statusLabel={statusLabel}
        onBack={() => setSelected(null)}
        onNotes={() => setNotesFor(selected)}
      />
    );
  }

  return (
    <div className="min-h-full bg-background pb-10">
      {/* Not sticky: the app frame in Layout.tsx is `overflow-hidden`, which makes
          every descendant's `position: sticky` silently do nothing. */}
      <header className="border-b border-line bg-surface px-5 pb-3 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-overline text-teal-strong">{c('overline')}</p>
            <h1 className="text-h2 text-ink">{c('title')}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setAdding(true)}
              aria-label={c('addEmployee')}
              className="btn-icon bg-teal text-on-teal"
            >
              <UserPlus size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              aria-label={c('close')}
              className="btn-icon"
            >
              <X size={18} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div className="space-y-5 px-5 pt-5">
        {/* Head count, and how much of it this phone can actually see. Both are
            noise before anyone is on the team, so they wait until there is. */}
        {team.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            <StatTile icon={Users} value={String(team.length)} label={c('statTeam')} accent="teal" />
            <StatTile
              icon={Smartphone}
              value={`${measuredCount}/${team.length}`}
              label={c('statSeen')}
              accent="violet"
            />
          </div>
        )}

        {/* Derived figures only exist where there is data to derive them from. */}
        {measuredCount > 0 && (
          <section className="surface-raised p-4">
            <p className="text-overline text-ink-3">{c('measuredHeading')}</p>
            <div className="mt-3 grid grid-cols-3 divide-x divide-line">
              {[
                { value: `${stats.avgCompletion}%`, label: c('statAvg') },
                { value: stats.top, label: c('statTop') },
                { value: String(stats.atRisk), label: c('statRisk') },
              ].map((cell) => (
                <div key={cell.label} className="px-1 text-center">
                  <p className="truncate text-h3 text-ink">{cell.value}</p>
                  <p className="mt-0.5 text-caption leading-4 text-ink-3">{cell.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Said once, calmly, and then never again on this screen. */}
        {team.length > 0 && (
          <section className="surface-flat p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-surface-sunken">
                <Smartphone size={16} className="text-ink-2" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-body-small font-semibold text-ink">{c('whyTitle')}</p>
                <p className="mt-1 text-caption leading-5 text-ink-2">{c('whyBody')}</p>
                <p className="mt-2 text-caption leading-5 text-ink-3">{c('whyTip')}</p>
              </div>
            </div>
          </section>
        )}

        {/* Shop filter — only worth showing when the team spans shops. */}
        {shopsInTeam > 1 && (
          <div className="flex gap-2">
            {(['all', 'andorra', 'gibraltar'] as const).map((loc) => {
              const active = locationFilter === loc;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocationFilter(loc)}
                  aria-pressed={active}
                  className={`min-h-touch rounded-full border px-3 text-caption font-semibold transition-colors ${
                    active ? 'border-teal bg-teal text-on-teal' : 'border-line bg-surface text-ink-2'
                  }`}
                >
                  {loc === 'all' ? c('allShops') : loc === 'andorra' ? 'Andorra' : 'Gibraltar'}
                </button>
              );
            })}
          </div>
        )}

        {/* Team */}
        <div className="space-y-3">
          {employees.map((emp, i) => (
            <motion.div
              key={emp.user.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.3) }}
            >
              <EmployeeCard
                emp={emp}
                c={c}
                statusLabel={statusLabel}
                onOpen={() => setSelected(emp)}
                onNote={() => setNotesFor(emp)}
                onRemove={() => setRemoving(emp.user)}
              />
            </motion.div>
          ))}

          {employees.length === 0 && (
            <div className="surface-flat p-8 text-center">
              <Users size={28} className="mx-auto mb-2 text-line-strong" aria-hidden />
              <p className="text-body-small font-semibold text-ink">{c('noEmployees')}</p>
              <p className="mx-auto mt-1 max-w-[30ch] text-caption leading-5 text-ink-3">
                {c('noEmployeesSub')}
              </p>
              <button type="button" onClick={() => setAdding(true)} className="btn-primary mt-4">
                <UserPlus size={16} aria-hidden />
                {c('addEmployee')}
              </button>
            </div>
          )}
        </div>

        <div className="pb-safe" />
      </div>

      {adding && user && (
        <AddSellerSheet
          c={c}
          managerUsername={user.username}
          managerId={user.id}
          // An admin has no shop of their own, so the form starts on Andorra
          // and they choose; a manager's own shop is right for them.
          defaultLocation={user.location ?? 'andorra'}
          onCreated={refreshTeam}
          onClose={() => setAdding(false)}
        />
      )}

      {removing &&
        (backend.isDatabaseConfigured ? (
          <DeleteFromDatabaseSheet
            person={removing}
            c={c}
            onRemoved={refreshTeam}
            onClose={() => setRemoving(null)}
          />
        ) : (
          <RemoveSheet person={removing} c={c} onClose={() => setRemoving(null)} />
        ))}

      {notesFor && (
        <CoachingNotesSheet emp={notesFor} c={c} locale={locale} onClose={() => setNotesFor(null)} />
      )}
    </div>
  );
}

/* ── Pieces ── */

const TILE_ACCENT = {
  teal: { tint: 'bg-teal-tint', text: 'text-teal-strong' },
  coral: { tint: 'bg-coral-tint', text: 'text-coral-strong' },
  gold: { tint: 'bg-gold-tint', text: 'text-gold-strong' },
  violet: { tint: 'bg-violet-tint', text: 'text-violet-strong' },
} as const;

function StatTile({
  icon: Icon,
  value,
  label,
  accent,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  accent: keyof typeof TILE_ACCENT;
}) {
  const a = TILE_ACCENT[accent];
  return (
    <div className="surface-raised flex items-center gap-3 p-3">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-chip ${a.tint}`}>
        <Icon size={18} className={a.text} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="truncate text-h3 text-ink">{value}</p>
        <p className="text-caption leading-4 text-ink-3">{label}</p>
      </div>
    </div>
  );
}

function Initials({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-16 w-16 text-h3' : 'h-11 w-11 text-body-small';
  return (
    <div className={`flex ${box} shrink-0 items-center justify-center rounded-full bg-teal-tint`}>
      <span className="font-semibold text-teal-strong">
        {name
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')}
      </span>
    </div>
  );
}

/** No records for this person on this phone. Stated, not implied with zeros. */
function NoDataLine({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-caption text-ink-3">
      <Smartphone size={12} aria-hidden />
      {label}
    </span>
  );
}

function EmployeeCard({
  emp,
  c,
  statusLabel,
  onOpen,
  onNote,
  onRemove,
}: {
  emp: EmployeeProgress;
  c: (k: CopyKey) => string;
  statusLabel: (key: Status) => string;
  onOpen: () => void;
  onNote: () => void;
  onRemove: () => void;
}) {
  const status = emp.hasData ? getStatus(emp) : null;
  return (
    <div className="surface-raised overflow-hidden">
      <button type="button" onClick={onOpen} className="w-full p-4 text-left">
        <div className="flex items-center gap-3">
          <Initials name={emp.user.name} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-body-small font-semibold text-ink">{emp.user.name}</p>
            <p className="truncate font-mono text-caption text-ink-3">{emp.user.username}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface-sunken px-2 py-0.5 text-caption capitalize text-ink-2">
            <MapPin size={11} aria-hidden />
            {emp.user.location}
          </span>
        </div>

        {status ? (
          <>
            <div className="mt-3 flex items-center gap-1.5">
              <span className={`h-2 w-2 shrink-0 rounded-full ${status.dot}`} aria-hidden />
              <span className="truncate text-caption text-ink-2">{statusLabel(status.key)}</span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-surface-sunken"
              role="progressbar"
              aria-valuenow={emp.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={emp.user.name}
            >
              <motion.div
                className="h-full rounded-full bg-teal"
                initial={{ width: 0 }}
                animate={{ width: `${emp.progress}%` }}
                transition={{ duration: 0.7 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-caption text-ink-3">
              <span>
                {c('progress')}: <b className="text-ink-2">{emp.progress}%</b>
              </span>
              <span>
                {c('lessons')}:{' '}
                <b className="text-ink-2">
                  {emp.completedLessons}/{emp.totalLessons}
                </b>
              </span>
              <span>
                {c('quizAvg')}: <b className="text-ink-2">{Math.round(emp.avgScore)}</b>
              </span>
            </div>
          </>
        ) : (
          /* No bar at all — a 0% bar is a measurement, and there is none. */
          <div className="mt-3">
            <NoDataLine label={c('noData')} />
          </div>
        )}
      </button>

      <div className="flex gap-2 border-t border-line px-4 py-2">
        <button type="button" onClick={onNote} className="btn-quiet min-h-touch flex-1 px-2 text-caption">
          <FileText size={14} aria-hidden />
          {c('note')}
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`${c('remove')} — ${emp.user.name}`}
          className="btn-icon shrink-0"
        >
          <UserMinus size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}

function EmployeeDetail({
  emp,
  c,
  locale,
  statusLabel,
  onBack,
  onNotes,
}: {
  emp: EmployeeProgress;
  c: (k: CopyKey) => string;
  locale: string;
  statusLabel: (key: Status) => string;
  onBack: () => void;
  onNotes: () => void;
}) {
  const status = emp.hasData ? getStatus(emp) : null;
  const lastActive = emp.lastActive ? new Date(emp.lastActive) : null;
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      className="min-h-full bg-background px-5 pb-10 pt-6"
    >
      <button type="button" onClick={onBack} className="btn-quiet mb-5 px-4 text-caption">
        <ArrowLeft size={16} aria-hidden />
        {c('back')}
      </button>

      <div className="flex items-center gap-4">
        <Initials name={emp.user.name} size="lg" />
        <div className="min-w-0">
          <h1 className="truncate text-h2 text-ink">{emp.user.name}</h1>
          <p className="truncate font-mono text-caption text-ink-3">{emp.user.username}</p>
          <div className="mt-1 flex items-center gap-1.5">
            {status ? (
              <>
                <span className={`h-2 w-2 rounded-full ${status.dot}`} aria-hidden />
                <span className="text-caption text-ink-2">{statusLabel(status.key)}</span>
              </>
            ) : (
              <NoDataLine label={c('noData')} />
            )}
            <span className="ml-1 inline-flex items-center gap-1 text-caption capitalize text-ink-3">
              <MapPin size={11} aria-hidden />
              {emp.user.location}
            </span>
          </div>
        </div>
      </div>

      {emp.hasData ? (
        <>
          {/* No streak tile: the backend has no streak to report from another
              device, and a hardcoded 0 would read as a measurement. */}
          <div className="surface-raised mt-5 p-4">
            <div className="grid grid-cols-3 divide-x divide-line">
              {[
                { value: `${emp.progress}%`, label: c('progress') },
                { value: `${emp.completedLessons}/${emp.totalLessons}`, label: c('lessons') },
                { value: String(Math.round(emp.avgScore)), label: c('quizAvg') },
              ].map((s) => (
                <div key={s.label} className="px-1 text-center">
                  <p className="text-h2 text-ink">{s.value}</p>
                  <p className="mt-0.5 text-caption leading-4 text-ink-3">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {lastActive && !Number.isNaN(lastActive.getTime()) && (
            <div className="surface-raised mt-3 flex items-center justify-between gap-3 p-4">
              <span className="text-caption text-ink-3">{c('lastActive')}</span>
              <span className="text-body-small text-ink">{lastActive.toLocaleDateString(locale)}</span>
            </div>
          )}
        </>
      ) : (
        /* The header line above already states the fact; this explains it once. */
        <div className="surface-flat mt-5 p-4">
          <p className="text-body-small font-semibold text-ink">{c('whyTitle')}</p>
          <p className="mt-1 text-caption leading-5 text-ink-2">{c('whyBody')}</p>
          <p className="mt-2 text-caption leading-5 text-ink-3">{c('whyTip')}</p>
        </div>
      )}

      <button type="button" onClick={onNotes} className="btn-secondary mt-4 w-full">
        <FileText size={16} aria-hidden />
        {c('coachingNotes')}
      </button>
      <div className="pb-safe" />
    </motion.div>
  );
}

function CopyRow({
  value,
  label,
  copiedLabel,
  variant = 'quiet',
}: {
  value: string;
  label: string;
  copiedLabel: string;
  variant?: 'quiet' | 'teal';
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyToClipboard(value)) {
          setCopied(true);
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setCopied(false), 1800);
        }
      }}
      className={`${variant === 'teal' ? 'btn-secondary' : 'btn-quiet'} w-full text-body-small`}
    >
      {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}

/** Monospace, sunken, and allowed to scroll sideways so it cannot widen a 390px
    phone. `min-w-0` because a grid/flex child otherwise refuses to shrink. */
function CodeBlock({ code }: { code: string }) {
  return (
    <div className="min-w-0">
      <pre className="max-w-full overflow-x-auto rounded-card bg-surface-sunken p-3 font-mono text-caption leading-5 text-ink">
        {code}
      </pre>
    </div>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2">
      {items.map((text, i) => (
        <li key={text} className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-caption font-semibold text-on-teal"
          >
            {i + 1}
          </span>
          <span className="min-w-0 flex-1 text-caption leading-5 text-ink-2">{text}</span>
        </li>
      ))}
    </ol>
  );
}

function GitHubLink({ label }: { label: string }) {
  return (
    <a href={ROSTER_EDIT_URL} target="_blank" rel="noreferrer" className="btn-quiet w-full text-body-small">
      <ExternalLink size={16} aria-hidden />
      {label}
    </a>
  );
}

/** Radix Dialog, so focus is trapped and Escape closes it. */
function Sheet({
  title,
  subtitle,
  description,
  onClose,
  closeLabel,
  children,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  onClose: () => void;
  closeLabel: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[88vh] overflow-y-auto rounded-feature border-line bg-surface"
      >
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <DialogTitle className="text-h3 text-ink">{title}</DialogTitle>
            {subtitle && <p className="mt-0.5 truncate text-caption text-ink-3">{subtitle}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label={closeLabel} className="btn-icon shrink-0">
            <X size={18} aria-hidden />
          </button>
        </div>
        {description ? (
          <DialogDescription className="text-body-small leading-6 text-ink-2">
            {description}
          </DialogDescription>
        ) : (
          <DialogDescription className="sr-only">{title}</DialogDescription>
        )}
        <div className="min-w-0">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

/** What to show once the account exists. */
interface Created {
  name: string;
  username: string;
  password: string;
  /**
   * Only set when there is no database: the block to paste into accounts.ts.
   * Its absence is what makes the result screen say "they can sign in now"
   * instead of printing four steps and a link to GitHub.
   */
  snippet?: string;
}

/** Whatever went wrong, in words, rather than a swallowed failure. */
function errorText(err: unknown, fallback: string): string {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === 'string' && err) return err;
  return fallback;
}

/**
 * Two states in one sheet: the form, then the login. The manager only ever adds
 * sellers, and they always report to the manager doing the adding.
 */
function AddSellerSheet({
  c,
  managerUsername,
  managerId,
  defaultLocation,
  onCreated,
  onClose,
}: {
  c: (key: CopyKey) => string;
  managerUsername: string;
  managerId: string;
  defaultLocation: UserLocation;
  onCreated: () => void;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [location, setLocation] = useState<UserLocation>(defaultLocation);
  const [nameError, setNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Created | null>(null);

  const live = backend.isDatabaseConfigured;

  const submit = async () => {
    if (busy) return;
    const cleanName = name.trim();
    const cleanUser = username.trim().toLowerCase();

    setNameError(cleanName ? null : c('errName'));
    // The committed roster can be checked here and now. The database cannot —
    // that is a request, so it happens below, once the shape is known to be ok.
    const takenOnRoster = !live && backend.usernameTaken(cleanUser);
    if (!cleanUser) setUsernameError(c('errUsernameEmpty'));
    else if (!USERNAME_RE.test(cleanUser)) setUsernameError(c('errUsernameShape'));
    else if (takenOnRoster) setUsernameError(c('errUsernameTaken'));
    else setUsernameError(null);

    if (!cleanName || !cleanUser || !USERNAME_RE.test(cleanUser) || takenOnRoster) {
      return;
    }

    setBusy(true);
    setCreateError(null);
    const password = generatePassword();

    // ── The database path: this actually creates the account. ──
    if (live) {
      try {
        if (await db.usernameExists(cleanUser)) {
          setUsernameError(c('errUsernameTaken'));
          return;
        }
        const created = await db.createUser({
          username: cleanUser,
          name: cleanName,
          password,
          role: 'employee',
          location,
          managerId,
        });
        if (!created.success) {
          // Verbatim. One of these messages tells the owner to turn off
          // "Confirm email" in Supabase, which is the only way to fix it.
          setCreateError(created.error);
          return;
        }
        setResult({ name: cleanName, username: cleanUser, password });
        onCreated();
      } catch (err) {
        setCreateError(errorText(err, c('errUnknown')));
      } finally {
        setBusy(false);
      }
      return;
    }

    // ── No database: write the commit instead. ──
    const draft: backend.NewAccountDraft = {
      username: cleanUser,
      name: cleanName,
      role: 'employee',
      location,
      managerUsername,
    };
    const snippet = await backend.buildAccountSnippet(draft, password, newSalt());
    setResult({ name: cleanName, username: cleanUser, password, snippet });
    setBusy(false);
  };

  if (result) {
    return (
      <Sheet
        title={result.snippet ? c('ready') : c('created')}
        subtitle={result.name}
        onClose={onClose}
        closeLabel={c('close')}
      >
        <div className="space-y-4">
          {/* The password, while it still exists. Shown once either way — this
              is genuinely the only moment it is readable. */}
          <section className="surface-feature feature-gold p-4">
            <p className="text-overline text-gold-strong">{c('theirLogin')}</p>
            <dl className="mt-2">
              <dt className="text-caption text-ink-3">{c('username')}</dt>
              <dd className="break-all font-mono text-body-small text-ink">{result.username}</dd>
              <dt className="mt-2 text-caption text-ink-3">{c('theirPassword')}</dt>
              <dd className="break-all font-mono text-h3 text-ink">{result.password}</dd>
            </dl>
            <p className="mt-2 flex items-start gap-2 text-caption leading-5 text-ink-2">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-gold-strong" aria-hidden />
              {c('passwordWarning')}
            </p>
            <div className="mt-3 space-y-2">
              <CopyRow
                value={result.password}
                label={c('copyPassword')}
                copiedLabel={c('copied')}
                variant="teal"
              />
              <CopyRow
                value={`${result.username} / ${result.password}`}
                label={c('copyLogin')}
                copiedLabel={c('copied')}
              />
            </div>
          </section>

          {result.snippet ? (
            /* No database: the commit that makes the account real. */
            <section className="space-y-3">
              <p className="text-overline text-ink-3">{c('theCode')}</p>
              <CodeBlock code={result.snippet} />
              <CopyRow value={result.snippet} label={c('copyCode')} copiedLabel={c('copied')} />
              <Steps items={[c('stepCopy'), c('stepOpen'), c('stepPaste'), c('stepCommit')]} />
              <GitHubLink label={c('openOnGitHub')} />
            </section>
          ) : (
            /* The account already exists. There is nothing else to do, and
               saying so is the entire improvement. */
            <p className="flex items-start gap-2 text-body-small leading-6 text-ink-2">
              <Check size={16} className="mt-1 shrink-0 text-teal-strong" aria-hidden />
              {c('signInNow')}
            </p>
          )}

          <button type="button" onClick={onClose} className="btn-primary w-full">
            {c('done')}
          </button>
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet
      title={c('addEmployee')}
      description={live ? c('addLeadDb') : c('addLead')}
      onClose={onClose}
      closeLabel={c('cancel')}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="seller-name" className="mb-1.5 block text-caption font-semibold text-ink-2">
            {c('name')}
          </label>
          <input
            id="seller-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!usernameTouched) setUsername(suggestUsername(e.target.value));
            }}
            placeholder={c('namePlaceholder')}
            className={inputClass}
            autoComplete="off"
          />
          {nameError && <p className="mt-1.5 text-caption leading-5 text-danger">{nameError}</p>}
        </div>

        <div>
          <label htmlFor="seller-username" className="mb-1.5 block text-caption font-semibold text-ink-2">
            {c('username')}
          </label>
          <input
            id="seller-username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsernameTouched(true);
              setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''));
            }}
            placeholder={c('usernamePlaceholder')}
            className={`${inputClass} font-mono`}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
          />
          {usernameError ? (
            <p className="mt-1.5 text-caption leading-5 text-danger">{usernameError}</p>
          ) : (
            <p className="mt-1.5 text-caption leading-5 text-ink-3">{c('usernameHint')}</p>
          )}
        </div>

        <div>
          <p id="seller-shop-label" className="mb-1.5 text-caption font-semibold text-ink-2">
            {c('shop')}
          </p>
          <div
            role="group"
            aria-labelledby="seller-shop-label"
            className="flex gap-2 rounded-full bg-surface-sunken p-1"
          >
            {(['andorra', 'gibraltar'] as const).map((loc) => {
              const active = location === loc;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocation(loc)}
                  aria-pressed={active}
                  className={`min-h-touch flex-1 rounded-full px-3 text-caption font-semibold transition-colors ${
                    active ? 'bg-teal text-on-teal' : 'text-ink-2'
                  }`}
                >
                  {loc === 'andorra' ? 'Andorra' : 'Gibraltar'}
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-caption leading-5 text-ink-3">{c('shopHint')}</p>
        </div>

        <p className="flex items-center gap-2 rounded-chip bg-surface-sunken px-3 py-2 text-caption text-ink-2">
          <Users size={14} className="shrink-0 text-ink-3" aria-hidden />
          {c('reportsToYou')} · <span className="font-mono">{managerUsername}</span>
        </p>

        {/* Whatever the database said, said back. Swallowing this is how a
            manager ends up staring at a button that does nothing. */}
        {createError && (
          <div className="rounded-card border border-danger/40 bg-danger-tint p-3">
            <p className="text-caption font-semibold text-danger">{c('errCreate')}</p>
            <p className="mt-1 text-caption leading-5 text-ink-2">{createError}</p>
          </div>
        )}

        <button
          type="button"
          onClick={submit}
          disabled={busy}
          className="btn-primary w-full disabled:opacity-50"
        >
          <KeyRound size={16} aria-hidden />
          {busy && live ? c('creating') : live ? c('create') : c('generate')}
        </button>
      </div>
    </Sheet>
  );
}

/**
 * Remove, when removing is a real thing that happens. The confirmation is the
 * whole screen: this deletes their profile and their training record, and the
 * old flow's "here is the line to delete" has nothing to say about it.
 */
function DeleteFromDatabaseSheet({
  person,
  c,
  onRemoved,
  onClose,
}: {
  person: User;
  c: (key: CopyKey) => string;
  onRemoved: () => void;
  onClose: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    const result = await db
      .deleteUser(person.id)
      .catch((err: unknown) => ({ success: false as const, error: errorText(err, c('errUnknown')) }));
    setBusy(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    onRemoved();
    onClose();
  };

  return (
    <Sheet
      title={c('removeTitle')}
      subtitle={person.name}
      description={c('removeLeadDb')}
      onClose={onClose}
      closeLabel={c('close')}
    >
      <div className="space-y-3">
        <p className="flex items-start gap-2 text-caption leading-5 text-ink-2">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-danger" aria-hidden />
          {c('removeLosesProgress')}
        </p>

        {error && (
          <div className="rounded-card border border-danger/40 bg-danger-tint p-3">
            <p className="text-caption font-semibold text-danger">{c('errRemove')}</p>
            <p className="mt-1 text-caption leading-5 text-ink-2">{error}</p>
          </div>
        )}

        <button
          type="button"
          onClick={remove}
          disabled={busy}
          className="btn-primary w-full disabled:opacity-50"
        >
          <UserMinus size={16} aria-hidden />
          {busy ? c('removingNow') : c('removeConfirm')}
        </button>
        <button type="button" onClick={onClose} className="btn-quiet w-full">
          {c('cancel')}
        </button>
      </div>
    </Sheet>
  );
}

/** No delete exists any more, so this shows the edit to make instead. */
function RemoveSheet({
  person,
  c,
  onClose,
}: {
  person: User;
  c: (key: CopyKey) => string;
  onClose: () => void;
}) {
  const line = `username: '${person.username}',`;
  return (
    <Sheet
      title={c('removeTitle')}
      subtitle={person.name}
      description={c('removeLead')}
      onClose={onClose}
      closeLabel={c('close')}
    >
      <div className="space-y-3">
        <p className="text-overline text-ink-3">{c('removeFind')}</p>
        <CodeBlock code={line} />
        <CopyRow value={line} label={c('copyLine')} copiedLabel={c('copied')} />
        <Steps items={[c('removeStepOpen'), c('removeStepDelete'), c('removeStepCommit')]} />
        <GitHubLink label={c('openOnGitHub')} />
        <p className="text-caption leading-5 text-ink-3">{c('removeKeepsProgress')}</p>
        <button type="button" onClick={onClose} className="btn-quiet w-full">
          {c('done')}
        </button>
      </div>
    </Sheet>
  );
}

function CoachingNotesSheet({
  emp,
  c,
  locale,
  onClose,
}: {
  emp: EmployeeProgress;
  c: (k: CopyKey) => string;
  locale: string;
  onClose: () => void;
}) {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState<CoachingNote[]>(() =>
    getCoachingNotes().filter((n) => n.employeeId === emp.user.id)
  );

  const save = () => {
    const body = text.trim();
    if (!body) return;
    const note: CoachingNote = {
      id: globalThis.crypto?.randomUUID?.() ?? `note-${Date.now()}`,
      employeeId: emp.user.id,
      employeeName: emp.user.name,
      text: body,
      createdAt: new Date().toISOString(),
    };
    saveCoachingNote(note);
    setNotes((prev) => [note, ...prev]);
    setText('');
  };

  return (
    <Sheet
      title={c('coachingNotes')}
      subtitle={emp.user.name}
      description={c('notesHint')}
      onClose={onClose}
      closeLabel={c('close')}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="coaching-note" className="sr-only">
            {c('writeNote')}
          </label>
          <textarea
            id="coaching-note"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={c('writeNote')}
            className="min-h-[90px] w-full resize-none rounded-card border border-line-strong bg-surface p-3 text-body-small text-ink outline-none placeholder:text-ink-3 focus:border-teal-strong"
          />
          <button
            type="button"
            onClick={save}
            disabled={!text.trim()}
            className="btn-primary mt-2 w-full disabled:opacity-50"
          >
            {c('saveNote')}
          </button>
        </div>

        <div>
          <p className="mb-2 text-overline text-ink-3">{c('previousNotes')}</p>
          {notes.length === 0 ? (
            <p className="text-caption text-ink-3">{c('noNotes')}</p>
          ) : (
            <ul className="max-h-[260px] space-y-2 overflow-y-auto">
              {notes.map((n) => (
                <li key={n.id} className="rounded-card bg-surface-sunken p-3">
                  <p className="text-body-small text-ink">{n.text}</p>
                  <p className="mt-1 text-caption text-ink-3">
                    {new Date(n.createdAt).toLocaleString(locale)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Sheet>
  );
}
