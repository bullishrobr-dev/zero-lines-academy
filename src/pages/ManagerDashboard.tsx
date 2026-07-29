// ─────────────────────────────────────────────────────────────────────────────
// ManagerDashboard.tsx — the shop manager's view of their team. Used on a phone.
//
// Fixed in this pass:
//  • The temporary password was rendered in cleartext (`<Input value={password}>`
//    with no `type`) and was `"emp" + random(100..999)` — 900 possibilities,
//    matching the seeded emp1…emp6 pattern, against a login with no rate limit.
//    Now masked, generated from `crypto.getRandomValues`, copyable, shown once.
//  • `managerId` was never sent, so a manager's own hires were not linked to
//    them; the roster only worked because the backend falls back to "same shop,
//    no manager". New sellers are attached to the signed-in manager.
//  • Location is editable, because it decides the currency the seller is taught.
//  • `fetchTeam` returned early on `!user` *before* clearing the loading flag, so
//    an unauthenticated visitor sat on "Loading…" forever. Loading is derived
//    from the data now, and the fetch lives inside the effect instead of being
//    redefined on every render.
//  • `Date.now()` was called during render (three places). It is captured once,
//    when the team data lands.
//  • The coaching queue flagged every single seller with "No activity for ~100
//    days" because the seeded `createdAt` values are old and nothing in the app
//    ever writes `zl_backend_progress`. It now says so plainly instead.
//  • The "Yesterday's win — Maria brought in 15 people" line was hardcoded copy
//    presented as a real result, and the XP/lesson-assignment buttons awarded and
//    assigned nothing at all. Replaced with the real top performer and with
//    actions that actually persist.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  Calendar,
  Check,
  Clock,
  Copy,
  Eye,
  EyeOff,
  FileText,
  MapPin,
  Megaphone,
  Pencil,
  RefreshCw,
  Send,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuthContext } from '../contexts/AuthContext';
import LoadingScreen from '../components/LoadingScreen';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import * as backend from '../backend/mockBackend';
import type { UserLocation } from '../backend/types';

/* ── Types ── */
interface EmployeeProgress {
  user: {
    id: string;
    name: string;
    email: string;
    location: UserLocation;
    role: string;
    managerId?: string;
    createdAt: string;
  };
  progress: number;
  streak: number;
  avgScore: number;
  lastActive: string;
  completedLessons: number;
  totalLessons: number;
}

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
  addEmployee: { en: 'Add a seller', es: 'Añadir vendedor' },
  statTeam: { en: 'In your team', es: 'En tu equipo' },
  statAvg: { en: 'Average done', es: 'Media completada' },
  statTop: { en: 'Furthest along', es: 'Más avanzado' },
  statRisk: { en: 'Behind', es: 'Rezagados' },
  today: { en: 'Today', es: 'Hoy' },
  digestActive: { en: 'Active today', es: 'Activos hoy' },
  digestStarted: { en: 'Started training', es: 'Han empezado' },
  digestQueue: { en: 'Need a word', es: 'Necesitan charla' },
  ofCurriculum: { en: 'of the curriculum', es: 'del temario' },
  sendMessage: { en: 'Message the team', es: 'Mensaje al equipo' },
  viewQueue: { en: 'Coaching queue', es: 'Cola de coaching' },
  allShops: { en: 'All shops', es: 'Todas' },
  noEmployees: { en: 'Nobody on your team yet', es: 'Aún no tienes a nadie' },
  noEmployeesSub: {
    en: 'Add a seller and they will show up here with their training progress.',
    es: 'Añade a un vendedor y aparecerá aquí con su progreso de formación.',
  },
  progress: { en: 'Progress', es: 'Progreso' },
  streak: { en: 'Streak', es: 'Racha' },
  quizAvg: { en: 'Quiz avg', es: 'Media test' },
  lessons: { en: 'Lessons', es: 'Lecciones' },
  memberSince: { en: 'Member since', es: 'Desde' },
  statusOnTrack: { en: 'On track', es: 'En buen camino' },
  statusNeedsPush: { en: 'Needs a push', es: 'Necesita empuje' },
  statusAtRisk: { en: 'Falling behind', es: 'Se está quedando atrás' },
  statusNotStarted: { en: 'Not started', es: 'Sin empezar' },
  note: { en: 'Note', es: 'Nota' },
  edit: { en: 'Edit', es: 'Editar' },
  remove: { en: 'Remove', es: 'Eliminar' },
  coachingNotes: { en: 'Coaching notes', es: 'Notas de coaching' },
  writeNote: { en: 'Write a coaching note…', es: 'Escribe una nota de coaching…' },
  saveNote: { en: 'Save note', es: 'Guardar nota' },
  previousNotes: { en: 'Earlier notes', es: 'Notas anteriores' },
  noNotes: { en: 'No notes yet for this person.', es: 'Aún no hay notas de esta persona.' },
  teamMessage: { en: 'Message the team', es: 'Mensaje al equipo' },
  teamMessageHint: {
    en: 'Saved to your team log on this device — it is not pushed to their phones.',
    es: 'Se guarda en el registro del equipo en este dispositivo — no llega a sus móviles.',
  },
  quickMessages: { en: 'Quick messages', es: 'Mensajes rápidos' },
  customMessage: { en: 'Your own message', es: 'Tu propio mensaje' },
  saveMessage: { en: 'Save to the team log', es: 'Guardar en el registro' },
  messageSaved: { en: 'Saved to the team log', es: 'Guardado en el registro' },
  queueTitle: { en: 'Coaching queue', es: 'Cola de coaching' },
  queueEmpty: { en: 'Nobody needs a word right now.', es: 'Nadie necesita una charla ahora mismo.' },
  queueNoData: {
    en: 'No training activity has been recorded for this team yet, so there is nothing to flag. The queue fills up once people start completing lessons.',
    es: 'Aún no hay actividad de formación registrada de este equipo, así que no hay nada que marcar. La cola se llena cuando empiecen a completar lecciones.',
  },
  needAttention: { en: 'need attention', es: 'necesitan atención' },
  viewAll: { en: 'See everyone', es: 'Ver a todos' },
  reasonLowProgress: { en: 'Barely started', es: 'Apenas ha empezado' },
  reasonInactive: { en: 'No activity in', es: 'Sin actividad desde hace' },
  reasonLowScores: { en: 'Low quiz scores', es: 'Notas bajas en los tests' },
  reasonStreak: { en: 'Streak broken', es: 'Racha rota' },
  days: { en: 'days', es: 'días' },
  lastActive: { en: 'Last active', es: 'Última actividad' },
  neverActive: { en: 'No activity recorded yet', es: 'Sin actividad registrada' },
  scheduleTalk: { en: 'Note a 10-min talk', es: 'Anotar charla de 10 min' },
  name: { en: 'Name', es: 'Nombre' },
  namePlaceholder: { en: 'e.g. Maria Garcia', es: 'p. ej. María García' },
  email: { en: 'Email', es: 'Correo' },
  emailInvalid: { en: 'Enter a valid email address', es: 'Escribe un correo válido' },
  emailTaken: { en: 'That email is already registered', es: 'Ese correo ya está registrado' },
  errNotFound: { en: 'That account no longer exists', es: 'Esa cuenta ya no existe' },
  errSelfDelete: { en: 'You cannot delete your own account', es: 'No puedes eliminar tu propia cuenta' },
  errLastAdmin: {
    en: 'This is the last admin account — promote someone else first',
    es: 'Es la última cuenta de admin — asciende antes a otra persona',
  },
  errGeneric: { en: 'Something went wrong', es: 'Algo ha ido mal' },
  tempPassword: { en: 'Temporary password', es: 'Contraseña temporal' },
  passwordHint: {
    en: 'Generated, not guessable. Share it once — they should change it after signing in.',
    es: 'Generada, no adivinable. Compártela una vez — deberían cambiarla al entrar.',
  },
  reveal: { en: 'Show password', es: 'Mostrar contraseña' },
  hide: { en: 'Hide password', es: 'Ocultar contraseña' },
  copy: { en: 'Copy password', es: 'Copiar contraseña' },
  copied: { en: 'Copied', es: 'Copiado' },
  regenerate: { en: 'Generate a new password', es: 'Generar otra contraseña' },
  shop: { en: 'Shop', es: 'Tienda' },
  shopHint: {
    en: 'The shop sets the currency they are trained in — € in Andorra, £ in Gibraltar.',
    es: 'La tienda define la moneda con la que se forman — € en Andorra, £ en Gibraltar.',
  },
  create: { en: 'Create account', es: 'Crear cuenta' },
  saveChanges: { en: 'Save changes', es: 'Guardar cambios' },
  cancel: { en: 'Cancel', es: 'Cancelar' },
  saved: { en: 'Changes saved', es: 'Cambios guardados' },
  created: { en: 'Account created', es: 'Cuenta creada' },
  credentialsOnce: {
    en: 'Write this down now — the password is not shown again.',
    es: 'Apúntala ahora — la contraseña no se vuelve a mostrar.',
  },
  copyBoth: { en: 'Copy email and password', es: 'Copiar correo y contraseña' },
  gotIt: { en: 'Done', es: 'Hecho' },
  removeTitle: { en: 'Remove this person?', es: '¿Eliminar a esta persona?' },
  removeBody: {
    en: 'They lose access to the academy immediately.',
    es: 'Pierde el acceso a la academia al momento.',
  },
  removed: { en: 'Account removed', es: 'Cuenta eliminada' },
  editEmployee: { en: 'Edit seller', es: 'Editar vendedor' },
  noDataYet: { en: 'No training data recorded yet', es: 'Aún no hay datos de formación' },
  noDataYetSub: {
    en: 'Progress appears here once your team completes lessons on their own devices.',
    es: 'El progreso aparece aquí cuando tu equipo complete lecciones en sus dispositivos.',
  },
} as const;

type CopyKey = keyof typeof COPY;

/* ── localStorage ── */
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
function saveTeamMessage(entry: { text: string; sentAt: string; sender: string }) {
  try {
    const all = JSON.parse(localStorage.getItem('zl_team_nudges') || '[]') as unknown[];
    all.unshift(entry);
    localStorage.setItem('zl_team_nudges', JSON.stringify(all.slice(0, 50)));
  } catch {
    // non-fatal
  }
}

/** Identical helper to AdminPanel's — src/utils is owned by another agent. */
const PASSWORD_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function generatePassword(length = 14): string {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint32Array(length);
    cryptoObj.getRandomValues(bytes);
    return Array.from(bytes, (b) => PASSWORD_ALPHABET[b % PASSWORD_ALPHABET.length]).join('');
  }
  return (cryptoObj?.randomUUID?.() ?? String(Date.now())).replace(/-/g, '').slice(0, length).toUpperCase();
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputClass =
  'min-h-touch w-full rounded-chip border border-line-strong bg-surface px-3 text-body-small text-ink outline-none placeholder:text-ink-3 focus:border-teal-strong';

type Status = 'onTrack' | 'needsPush' | 'atRisk' | 'notStarted';

function getStatus(emp: EmployeeProgress): { key: Status; dot: string; text: string } {
  if (emp.completedLessons === 0) return { key: 'notStarted', dot: 'bg-line-strong', text: 'text-ink-3' };
  if (emp.progress >= 70) return { key: 'onTrack', dot: 'bg-success', text: 'text-ink-2' };
  if (emp.progress >= 40) return { key: 'needsPush', dot: 'bg-warning', text: 'text-ink-2' };
  return { key: 'atRisk', dot: 'bg-danger', text: 'text-ink-2' };
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
  const [stats, setStats] = useState({ total: 0, avgProgress: 0, top: '—', atRisk: 0 });
  /* Captured when the data lands rather than read during render — `Date.now()`
     in a useMemo made this component impure. */
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const [selected, setSelected] = useState<EmployeeProgress | null>(null);
  const [locationFilter, setLocationFilter] = useState<'all' | UserLocation>('all');
  const [addDraft, setAddDraft] = useState<{ password: string } | null>(null);
  const [editing, setEditing] = useState<EmployeeProgress | null>(null);
  const [removing, setRemoving] = useState<EmployeeProgress | null>(null);
  const [notesFor, setNotesFor] = useState<EmployeeProgress | null>(null);
  const [showTeamMessage, setShowTeamMessage] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [createdUser, setCreatedUser] = useState<{ email: string; password: string } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user) {
        // Used to `return` here *before* clearing the loading flag, which left an
        // unauthenticated visitor staring at "Loading…" for good.
        if (!cancelled) {
          setTeam([]);
          setFetchedAt(Date.now());
        }
        return;
      }
      const data = await backend.getTeamProgress(user.id);
      const s = await backend.getTeamStats(user.id);
      if (cancelled) return;
      setTeam(data);
      setStats({
        total: s.totalEmployees,
        avgProgress: s.avgCompletion,
        top: s.totalEmployees > 0 ? s.topPerformer : '—',
        atRisk: s.atRiskCount,
      });
      setFetchedAt(Date.now());
    })();
    return () => {
      cancelled = true;
    };
  }, [user, reloadToken]);

  const refresh = useCallback(() => setReloadToken((n) => n + 1), []);

  const employees = useMemo(() => {
    const list = team ?? [];
    return locationFilter === 'all' ? list : list.filter((e) => e.user.location === locationFilter);
  }, [team, locationFilter]);

  const shopsInTeam = useMemo(() => new Set((team ?? []).map((e) => e.user.location)).size, [team]);

  /* Nothing in the app writes `zl_backend_progress`, so every employee reads as
     0% with `lastActive` falling back to a seeded `createdAt` from months ago.
     Flagging all of them as "No activity for 100 days" was alarming and false. */
  const hasTrainingData = useMemo(
    () => (team ?? []).some((e) => e.completedLessons > 0 || e.avgScore > 0),
    [team]
  );

  const coachingQueue = useMemo(() => {
    if (!hasTrainingData || fetchedAt === null) return [];
    return employees
      .map((emp) => {
        const days = Math.floor((fetchedAt - new Date(emp.lastActive).getTime()) / 86400000);
        return { emp, days };
      })
      .filter(({ emp, days }) => emp.progress < 30 || days >= 3 || emp.avgScore < 50 || emp.streak === 0)
      .map(({ emp, days }) => {
        let reason: string;
        if (emp.progress < 30) reason = c('reasonLowProgress');
        else if (days >= 3) reason = `${c('reasonInactive')} ${days} ${c('days')}`;
        else if (emp.avgScore < 50) reason = c('reasonLowScores');
        else reason = c('reasonStreak');
        return { ...emp, reason, days };
      });
  }, [employees, hasTrainingData, fetchedAt, c]);

  const activeToday = useMemo(() => {
    if (!hasTrainingData || fetchedAt === null) return 0;
    const today = new Date(fetchedAt).toDateString();
    return employees.filter((e) => e.completedLessons > 0 && new Date(e.lastActive).toDateString() === today).length;
  }, [employees, hasTrainingData, fetchedAt]);

  const startedCount = useMemo(() => employees.filter((e) => e.completedLessons > 0).length, [employees]);

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

  /* The backend answers in English; this screen is read in Spanish too. */
  const translateError = useCallback(
    (message?: string) => {
      switch (message) {
        case 'Email already registered':
          return c('emailTaken');
        case 'User not found':
          return c('errNotFound');
        case 'You cannot delete your own account':
          return c('errSelfDelete');
        case 'Cannot delete the last admin account':
          return c('errLastAdmin');
        default:
          return message || c('errGeneric');
      }
    },
    [c]
  );

  const handleCreate = async (data: backend.SignupData) => {
    setError(null);
    const result = await backend.createUser(data);
    if (!result.success) {
      setError(translateError(result.error));
      return false;
    }
    setAddDraft(null);
    setCreatedUser({ email: data.email, password: data.password });
    refresh();
    return true;
  };

  const handleSaveEdit = async (id: string, changes: { name: string; location: UserLocation }) => {
    setError(null);
    const ok = await backend.updateUser(id, changes);
    if (!ok) {
      setError(c('errNotFound'));
      return;
    }
    setEditing(null);
    setNotice(c('saved'));
    refresh();
  };

  /* deleteUser() answers `{ success, error }` — it refuses self-deletion and
     deleting the last admin, and that refusal has to be visible. */
  const handleRemove = async (emp: EmployeeProgress) => {
    setError(null);
    const result = await backend.deleteUser(emp.user.id);
    setRemoving(null);
    if (!result.success) {
      setError(translateError(result.error));
      return;
    }
    setNotice(c('removed'));
    refresh();
  };

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
          every descendant's `position: sticky` silently do nothing. A header that
          only looks pinned is worse than one that plainly scrolls. */}
      <header className="border-b border-line bg-surface px-5 pb-3 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-overline text-teal-strong">{c('overline')}</p>
            <h1 className="text-h2 text-ink">{c('title')}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setAddDraft({ password: generatePassword() })}
              aria-label={c('addEmployee')}
              className="btn-icon bg-teal text-on-teal"
            >
              <UserPlus size={18} aria-hidden />
            </button>
            <button type="button" onClick={() => navigate('/profile')} aria-label={c('close')} className="btn-icon">
              <X size={18} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div className="space-y-5 px-5 pt-5">
        {(error || notice) && (
          <div
            role="status"
            className={`flex items-start gap-2 rounded-card border p-3 ${
              error ? 'border-danger/30 bg-danger-tint' : 'border-teal/30 bg-teal-tint'
            }`}
          >
            {error ? (
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-danger" aria-hidden />
            ) : (
              <Check size={16} className="mt-0.5 shrink-0 text-teal-strong" aria-hidden />
            )}
            <p className="flex-1 text-caption text-ink">{error ?? notice}</p>
            <button
              type="button"
              onClick={() => {
                setError(null);
                setNotice(null);
              }}
              aria-label={c('close')}
              className="-m-2 flex h-touch w-touch items-center justify-center text-ink-3"
            >
              <X size={16} aria-hidden />
            </button>
          </div>
        )}

        {/* Stats — two columns, not four 93px slivers. "Furthest along" and
            "Behind" are only meaningful once somebody has actually trained:
            with an empty progress store the backend names an arbitrary top
            performer and marks the whole team as at risk. */}
        <div className="grid grid-cols-2 gap-3">
          <StatTile icon={Users} value={String(stats.total)} label={c('statTeam')} accent="teal" />
          <StatTile icon={TrendingUp} value={`${stats.avgProgress}%`} label={c('statAvg')} accent="violet" />
          <StatTile icon={Award} value={hasTrainingData ? stats.top : '—'} label={c('statTop')} accent="gold" />
          <StatTile
            icon={AlertTriangle}
            value={hasTrainingData ? String(stats.atRisk) : '—'}
            label={c('statRisk')}
            accent="coral"
          />
        </div>

        {/* Today */}
        <section className="surface-raised p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-overline text-ink-3">{c('today')}</p>
              <p className="text-caption text-ink-2">
                {new Date(fetchedAt ?? Date.parse('2000-01-01')).toLocaleDateString(locale, {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </p>
            </div>
            <Calendar size={18} className="shrink-0 text-ink-3" aria-hidden />
          </div>

          {hasTrainingData ? (
            <>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: activeToday, label: c('digestActive') },
                  { value: startedCount, label: c('digestStarted') },
                  { value: coachingQueue.length, label: c('digestQueue') },
                ].map((cell) => (
                  <div key={cell.label} className="rounded-chip bg-surface-sunken p-2 text-center">
                    <p className="text-h3 text-ink">{cell.value}</p>
                    <p className="text-caption leading-4 text-ink-3">{cell.label}</p>
                  </div>
                ))}
              </div>
              {stats.top !== '—' && (
                <div className="mt-3 flex items-start gap-2 rounded-chip bg-gold-tint p-3">
                  <Award size={16} className="mt-0.5 shrink-0 text-gold-strong" aria-hidden />
                  <p className="text-caption text-ink">
                    <b>{stats.top}</b> — {stats.avgProgress}% {c('ofCurriculum')}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-chip bg-surface-sunken p-3">
              <p className="text-body-small font-semibold text-ink">{c('noDataYet')}</p>
              <p className="mt-1 text-caption leading-5 text-ink-3">{c('noDataYetSub')}</p>
            </div>
          )}

          <div className="mt-3 space-y-2">
            <button
              type="button"
              onClick={() => setShowTeamMessage(true)}
              className="btn-quiet w-full justify-start px-4 text-body-small"
            >
              <Megaphone size={16} aria-hidden />
              {c('sendMessage')}
            </button>
            <button
              type="button"
              onClick={() => setShowQueue(true)}
              className="btn-quiet w-full justify-start px-4 text-body-small"
            >
              <Clock size={16} aria-hidden />
              {c('viewQueue')}
            </button>
          </div>
        </section>

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
                  className={`min-h-[36px] rounded-full border px-3 text-caption font-semibold transition-colors ${
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
                onEdit={() => setEditing(emp)}
                onRemove={() => setRemoving(emp)}
              />
            </motion.div>
          ))}

          {employees.length === 0 && (
            <div className="surface-flat p-8 text-center">
              <Users size={28} className="mx-auto mb-2 text-line-strong" aria-hidden />
              <p className="text-body-small font-semibold text-ink">{c('noEmployees')}</p>
              <p className="mx-auto mt-1 max-w-[28ch] text-caption leading-5 text-ink-3">{c('noEmployeesSub')}</p>
              <button
                type="button"
                onClick={() => setAddDraft({ password: generatePassword() })}
                className="btn-primary mt-4"
              >
                <UserPlus size={16} aria-hidden />
                {c('addEmployee')}
              </button>
            </div>
          )}
        </div>

        {/* Coaching queue preview */}
        {coachingQueue.length > 0 && (
          <section>
            <div className="mb-2 flex items-center justify-between gap-3 px-1">
              <h2 className="text-overline text-ink-3">{c('queueTitle')}</h2>
              <span className="rounded-full bg-coral-tint px-2 py-0.5 text-caption font-semibold text-coral-strong">
                {coachingQueue.length} {c('needAttention')}
              </span>
            </div>
            <div className="space-y-2">
              {coachingQueue.slice(0, 3).map((emp) => (
                <div key={emp.user.id} className="surface-flat flex items-center gap-3 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-body-small font-semibold text-ink">{emp.user.name}</p>
                    <p className="truncate text-caption text-coral-strong">{emp.reason}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotesFor(emp)}
                    className="btn-quiet min-h-touch shrink-0 px-3 text-caption"
                  >
                    {c('scheduleTalk')}
                  </button>
                </div>
              ))}
            </div>
            {coachingQueue.length > 3 && (
              <button type="button" onClick={() => setShowQueue(true)} className="btn-quiet mt-2 w-full text-caption">
                {c('viewAll')} ({coachingQueue.length})
              </button>
            )}
          </section>
        )}

        <div className="pb-safe" />
      </div>

      {/* ── Sheets & dialogs ── */}
      {addDraft && user && (
        <EmployeeFormSheet
          mode="create"
          initialPassword={addDraft.password}
          defaultLocation={(user.location as UserLocation) ?? 'andorra'}
          c={c}
          onClose={() => setAddDraft(null)}
          onSubmitCreate={(data) => handleCreate({ ...data, managerId: user.id })}
        />
      )}

      {editing && (
        <EmployeeFormSheet
          mode="edit"
          employee={editing}
          c={c}
          onClose={() => setEditing(null)}
          onSubmitEdit={(changes) => handleSaveEdit(editing.user.id, changes)}
        />
      )}

      {notesFor && <CoachingNotesSheet emp={notesFor} c={c} locale={locale} onClose={() => setNotesFor(null)} />}

      {showTeamMessage && (
        <TeamMessageSheet
          c={c}
          isEs={isEs}
          senderName={user?.name ?? 'Manager'}
          onClose={() => setShowTeamMessage(false)}
          onSaved={() => {
            setShowTeamMessage(false);
            setNotice(c('messageSaved'));
          }}
        />
      )}

      {showQueue && (
        <CoachingQueueSheet
          rows={coachingQueue}
          hasTrainingData={hasTrainingData}
          c={c}
          locale={locale}
          onClose={() => setShowQueue(false)}
          onOpenNotes={(emp) => {
            setShowQueue(false);
            setNotesFor(emp);
          }}
        />
      )}

      {/* Credentials, shown once */}
      <Dialog open={createdUser !== null} onOpenChange={(open) => !open && setCreatedUser(null)}>
        <DialogContent showCloseButton={false} className="rounded-feature border-line bg-surface">
          <DialogTitle className="text-h3 text-ink">{c('created')}</DialogTitle>
          <DialogDescription className="text-body-small text-ink-2">{c('credentialsOnce')}</DialogDescription>
          {createdUser && (
            <>
              <dl className="rounded-card bg-surface-sunken p-3">
                <dt className="text-caption text-ink-3">{c('email')}</dt>
                <dd className="break-all font-mono text-body-small text-ink">{createdUser.email}</dd>
                <dt className="mt-2 text-caption text-ink-3">{c('tempPassword')}</dt>
                <dd className="break-all font-mono text-body-small text-ink">{createdUser.password}</dd>
              </dl>
              <CopyLine
                label={c('copyBoth')}
                copiedLabel={c('copied')}
                value={`${createdUser.email} / ${createdUser.password}`}
              />
              <button type="button" onClick={() => setCreatedUser(null)} className="btn-quiet w-full">
                {c('gotIt')}
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Remove confirmation */}
      <AlertDialog open={removing !== null} onOpenChange={(open) => !open && setRemoving(null)}>
        <AlertDialogContent className="rounded-feature border-line bg-surface">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-h4 text-ink">{c('removeTitle')}</AlertDialogTitle>
            <AlertDialogDescription className="text-body-small text-ink-2">
              {removing?.user.name} · {removing?.user.email}
              <br />
              {c('removeBody')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="btn-quiet min-h-touch border-line">{c('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => removing && handleRemove(removing)}
              className="min-h-touch rounded-full bg-danger px-6 font-semibold text-destructive-foreground"
            >
              {c('remove')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
  icon: typeof Users;
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

function EmployeeCard({
  emp,
  c,
  statusLabel,
  onOpen,
  onNote,
  onEdit,
  onRemove,
}: {
  emp: EmployeeProgress;
  c: (k: CopyKey) => string;
  statusLabel: (key: Status) => string;
  onOpen: () => void;
  onNote: () => void;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const status = getStatus(emp);
  return (
    <div className="surface-raised overflow-hidden">
      <button type="button" onClick={onOpen} className="w-full p-4 text-left">
        <div className="flex items-center gap-3">
          <Initials name={emp.user.name} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-body-small font-semibold text-ink">{emp.user.name}</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className={`h-2 w-2 shrink-0 rounded-full ${status.dot}`} aria-hidden />
              <span className={`truncate text-caption ${status.text}`}>{statusLabel(status.key)}</span>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface-sunken px-2 py-0.5 text-caption capitalize text-ink-2">
            <MapPin size={11} aria-hidden />
            {emp.user.location}
          </span>
        </div>

        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-surface-sunken"
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
      </button>

      <div className="flex gap-2 border-t border-line px-4 py-2">
        <button type="button" onClick={onNote} className="btn-quiet min-h-touch flex-1 px-2 text-caption">
          <FileText size={14} aria-hidden />
          {c('note')}
        </button>
        <button type="button" onClick={onEdit} className="btn-quiet min-h-touch flex-1 px-2 text-caption">
          <Pencil size={14} aria-hidden />
          {c('edit')}
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`${c('remove')} — ${emp.user.name}`}
          className="btn-icon shrink-0 border-danger/30 bg-danger-tint text-danger"
        >
          <Trash2 size={15} aria-hidden />
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
  const status = getStatus(emp);
  const since = new Date(emp.user.createdAt);
  const lastActive = new Date(emp.lastActive);
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
          <div className="mt-1 flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${status.dot}`} aria-hidden />
            <span className="text-caption text-ink-2">{statusLabel(status.key)}</span>
            <span className="ml-1 inline-flex items-center gap-1 text-caption capitalize text-ink-3">
              <MapPin size={11} aria-hidden />
              {emp.user.location}
            </span>
          </div>
          <p className="mt-0.5 truncate text-caption text-ink-3">{emp.user.email}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { value: `${emp.progress}%`, label: c('progress') },
          { value: `${emp.completedLessons}/${emp.totalLessons}`, label: c('lessons') },
          { value: `${emp.streak}d`, label: c('streak') },
          { value: String(Math.round(emp.avgScore)), label: c('quizAvg') },
        ].map((s) => (
          <div key={s.label} className="surface-raised p-4">
            <p className="text-h2 text-ink">{s.value}</p>
            <p className="text-caption text-ink-3">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="surface-raised mt-3 divide-y divide-line">
        <div className="flex items-center justify-between gap-3 p-4">
          <span className="text-caption text-ink-3">{c('memberSince')}</span>
          <span className="text-body-small text-ink">
            {Number.isNaN(since.getTime()) ? '—' : since.toLocaleDateString(locale)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 p-4">
          <span className="text-caption text-ink-3">{c('lastActive')}</span>
          <span className="text-body-small text-ink">
            {emp.completedLessons === 0 || Number.isNaN(lastActive.getTime())
              ? c('neverActive')
              : lastActive.toLocaleDateString(locale)}
          </span>
        </div>
      </div>

      <button type="button" onClick={onNotes} className="btn-secondary mt-4 w-full">
        <FileText size={16} aria-hidden />
        {c('coachingNotes')}
      </button>
      <div className="pb-safe" />
    </motion.div>
  );
}

function CopyLine({ value, label, copiedLabel }: { value: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyToClipboard(value)) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }
      }}
      className="btn-secondary w-full"
    >
      {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      {copied ? copiedLabel : label}
    </button>
  );
}

function SheetShell({
  title,
  subtitle,
  onClose,
  closeLabel,
  children,
}: {
  title: string;
  subtitle?: string;
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
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <DialogTitle className="text-h3 text-ink">{title}</DialogTitle>
            {subtitle ? (
              <DialogDescription className="text-caption text-ink-3">{subtitle}</DialogDescription>
            ) : (
              <DialogDescription className="sr-only">{title}</DialogDescription>
            )}
          </div>
          <button type="button" onClick={onClose} aria-label={closeLabel} className="btn-icon shrink-0">
            <X size={18} aria-hidden />
          </button>
        </div>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

function EmployeeFormSheet({
  mode,
  employee,
  initialPassword,
  defaultLocation,
  c,
  onClose,
  onSubmitCreate,
  onSubmitEdit,
}: {
  mode: 'create' | 'edit';
  employee?: EmployeeProgress;
  initialPassword?: string;
  defaultLocation?: UserLocation;
  c: (k: CopyKey) => string;
  onClose: () => void;
  onSubmitCreate?: (data: Omit<backend.SignupData, 'managerId'>) => Promise<boolean>;
  onSubmitEdit?: (changes: { name: string; location: UserLocation }) => Promise<void>;
}) {
  const isCreate = mode === 'create';
  const [name, setName] = useState(employee?.user.name ?? '');
  const [email, setEmail] = useState(employee?.user.email ?? '');
  const [password, setPassword] = useState(initialPassword ?? '');
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [location, setLocation] = useState<UserLocation>(employee?.user.location ?? defaultLocation ?? 'andorra');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const canSubmit = name.trim().length > 0 && (!isCreate || (email.trim().length > 0 && password.length > 0));

  const submit = async () => {
    if (!canSubmit || busy) return;
    const cleanEmail = email.trim().toLowerCase();
    if (isCreate && !EMAIL_RE.test(cleanEmail)) {
      setEmailError(c('emailInvalid'));
      return;
    }
    setEmailError(null);
    setBusy(true);
    if (isCreate && onSubmitCreate) {
      await onSubmitCreate({ email: cleanEmail, name: name.trim(), password, role: 'employee', location });
    } else if (onSubmitEdit) {
      await onSubmitEdit({ name: name.trim(), location });
    }
    setBusy(false);
  };

  return (
    <SheetShell
      title={isCreate ? c('addEmployee') : c('editEmployee')}
      subtitle={isCreate ? undefined : employee?.user.email}
      onClose={onClose}
      closeLabel={c('cancel')}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="emp-name" className="mb-1.5 block text-caption font-semibold text-ink-2">
            {c('name')}
          </label>
          <input
            id="emp-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={c('namePlaceholder')}
            className={inputClass}
            autoComplete="off"
          />
        </div>

        {isCreate && (
          <>
            <div>
              <label htmlFor="emp-email" className="mb-1.5 block text-caption font-semibold text-ink-2">
                {c('email')}
              </label>
              <input
                id="emp-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maria@zerolines.com"
                className={inputClass}
                autoComplete="off"
                inputMode="email"
              />
              {emailError && <p className="mt-1.5 text-caption text-danger">{emailError}</p>}
            </div>

            <div>
              <label htmlFor="emp-password" className="mb-1.5 block text-caption font-semibold text-ink-2">
                {c('tempPassword')}
              </label>
              <div className="flex gap-2">
                <input
                  id="emp-password"
                  /* Previously plain text on a shared shop tablet. */
                  type={revealed ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} font-mono tracking-wide`}
                  autoComplete="new-password"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => setRevealed((r) => !r)}
                  aria-label={revealed ? c('hide') : c('reveal')}
                  aria-pressed={revealed}
                  className="btn-icon shrink-0"
                >
                  {revealed ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (await copyToClipboard(password)) {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1800);
                    }
                  }}
                  aria-label={copied ? c('copied') : c('copy')}
                  className="btn-icon shrink-0"
                >
                  {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                </button>
                <button
                  type="button"
                  onClick={() => setPassword(generatePassword())}
                  aria-label={c('regenerate')}
                  className="btn-icon shrink-0"
                >
                  <RefreshCw size={16} aria-hidden />
                </button>
              </div>
              <p className="mt-1.5 text-caption leading-5 text-ink-3">{c('passwordHint')}</p>
            </div>
          </>
        )}

        <div>
          <p id="emp-shop-label" className="mb-1.5 text-caption font-semibold text-ink-2">
            {c('shop')}
          </p>
          <div role="group" aria-labelledby="emp-shop-label" className="flex gap-2 rounded-full bg-surface-sunken p-1">
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

        <button type="button" onClick={submit} disabled={!canSubmit || busy} className="btn-primary w-full disabled:opacity-50">
          {isCreate ? c('create') : c('saveChanges')}
        </button>
      </div>
    </SheetShell>
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
    <SheetShell title={c('coachingNotes')} subtitle={emp.user.name} onClose={onClose} closeLabel={c('close')}>
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
          <button type="button" onClick={save} disabled={!text.trim()} className="btn-primary mt-2 w-full disabled:opacity-50">
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
                  <p className="mt-1 text-caption text-ink-3">{new Date(n.createdAt).toLocaleString(locale)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SheetShell>
  );
}

function TeamMessageSheet({
  c,
  isEs,
  senderName,
  onClose,
  onSaved,
}: {
  c: (k: CopyKey) => string;
  isEs: boolean;
  senderName: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [message, setMessage] = useState('');
  const presets = [
    { en: 'Great morning everyone — let us stop plenty of people today.', es: 'Buenos días a todos — hoy paramos a mucha gente.' },
    { en: 'Do not forget your daily dose before the shift.', es: 'No olvidéis la dosis diaria antes del turno.' },
    { en: 'End of shift — take two minutes to log how it went.', es: 'Fin de turno — dos minutos para apuntar cómo ha ido.' },
  ];

  const send = (text: string) => {
    const body = text.trim();
    if (!body) return;
    saveTeamMessage({ text: body, sentAt: new Date().toISOString(), sender: senderName });
    onSaved();
  };

  return (
    <SheetShell title={c('teamMessage')} subtitle={c('teamMessageHint')} onClose={onClose} closeLabel={c('close')}>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-overline text-ink-3">{c('quickMessages')}</p>
          <div className="space-y-2">
            {presets.map((p) => {
              const label = isEs ? p.es : p.en;
              return (
                <button
                  key={p.en}
                  type="button"
                  onClick={() => send(label)}
                  className="surface-flat min-h-touch w-full p-3 text-left text-caption text-ink"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-line pt-4">
          <label htmlFor="team-message" className="mb-1.5 block text-caption font-semibold text-ink-2">
            {c('customMessage')}
          </label>
          <textarea
            id="team-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[70px] w-full resize-none rounded-card border border-line-strong bg-surface p-3 text-body-small text-ink outline-none placeholder:text-ink-3 focus:border-teal-strong"
          />
          <button
            type="button"
            onClick={() => send(message)}
            disabled={!message.trim()}
            className="btn-primary mt-2 w-full disabled:opacity-50"
          >
            <Send size={15} aria-hidden />
            {c('saveMessage')}
          </button>
        </div>
      </div>
    </SheetShell>
  );
}

function CoachingQueueSheet({
  rows,
  hasTrainingData,
  c,
  locale,
  onClose,
  onOpenNotes,
}: {
  rows: (EmployeeProgress & { reason: string; days: number })[];
  hasTrainingData: boolean;
  c: (k: CopyKey) => string;
  locale: string;
  onClose: () => void;
  onOpenNotes: (emp: EmployeeProgress) => void;
}) {
  return (
    <SheetShell
      title={c('queueTitle')}
      subtitle={hasTrainingData ? `${rows.length} ${c('needAttention')}` : undefined}
      onClose={onClose}
      closeLabel={c('close')}
    >
      {!hasTrainingData ? (
        <p className="text-body-small leading-6 text-ink-2">{c('queueNoData')}</p>
      ) : rows.length === 0 ? (
        <p className="text-body-small text-ink-2">{c('queueEmpty')}</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((emp) => (
            <li key={emp.user.id} className="surface-flat p-3">
              <div className="flex items-center gap-3">
                <Initials name={emp.user.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-body-small font-semibold text-ink">{emp.user.name}</p>
                  <p className="truncate text-caption text-coral-strong">{emp.reason}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-caption text-ink-3">
                  <Clock size={12} aria-hidden />
                  {c('lastActive')}: {new Date(emp.lastActive).toLocaleDateString(locale)}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenNotes(emp)}
                  className="btn-quiet min-h-touch shrink-0 px-3 text-caption"
                >
                  {c('scheduleTalk')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SheetShell>
  );
}
