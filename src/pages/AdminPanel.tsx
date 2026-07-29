// ─────────────────────────────────────────────────────────────────────────────
// AdminPanel.tsx — the team, and how someone joins it.
//
// TWO MODES, AND THE DIFFERENCE IS THE WHOLE POINT.
//
//   Database configured  → "Create" creates. `db.createUser()` makes the login
//                          and the profile, the list refreshes, and the person
//                          signs in on their own phone straight away. "Remove"
//                          removes, through `db.deleteUser()`. No commit, no
//                          GitHub, no waiting for a rebuild.
//
//   Not configured       → there is no server, so an account "created" in the
//                          browser would exist only on this phone. The roster
//                          is a file — src/data/accounts.ts — and adding
//                          someone is a commit. This screen makes that commit
//                          trivial: it generates the password, derives the salt
//                          and verifier, and prints the exact block to paste.
//
// Constant in both: the password is shown once, in the clear, because that is
// the only moment it exists. It is a hash (or Supabase's problem) from here on.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Briefcase,
  Check,
  Copy,
  Crown,
  ExternalLink,
  KeyRound,
  MapPin,
  Search,
  Shield,
  User as UserIcon,
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
import type { User, UserRole, UserLocation } from '../backend/types';
import { generatePassword, newSalt } from '../utils/credentials';

/** The file that decides who can sign in, and the one-tap way to edit it. */
const ROSTER_FILE = 'src/data/accounts.ts';
const ROSTER_EDIT_URL =
  'https://github.com/bullishrobr-dev/zero-lines-academy/edit/main/src/data/accounts.ts';

/* Strings with no key in src/data/translations.ts (it has none for the
   management screens, and that file is owned elsewhere). */
const COPY = {
  overline: { en: 'Admin', es: 'Administración' },
  title: { en: 'The team', es: 'El equipo' },
  close: { en: 'Close', es: 'Cerrar' },
  addUser: { en: 'Add someone', es: 'Añadir a alguien' },
  search: { en: 'Search by name or username', es: 'Busca por nombre o usuario' },
  filterRole: { en: 'Role', es: 'Puesto' },
  filterShop: { en: 'Shop', es: 'Tienda' },
  all: { en: 'All', es: 'Todos' },
  admins: { en: 'Admins', es: 'Admins' },
  managers: { en: 'Managers', es: 'Responsables' },
  sellers: { en: 'Sellers', es: 'Vendedores' },
  roleAdmin: { en: 'Admin', es: 'Admin' },
  roleManager: { en: 'Manager', es: 'Responsable' },
  roleEmployee: { en: 'Seller', es: 'Vendedor' },
  noUsers: { en: 'Nobody matches that search', es: 'Nadie coincide con esa búsqueda' },
  you: { en: 'you', es: 'tú' },
  reportsTo: { en: 'Reports to', es: 'Responsable' },
  noManager: { en: 'No manager set', es: 'Sin responsable' },
  openRoster: { en: 'Open the roster file', es: 'Abrir el archivo del equipo' },

  /* ── Add ── */
  addLead: {
    en: 'The team lives in the code, so adding someone is a one-line commit — this writes the line for you.',
    es: 'El equipo vive en el código, así que dar de alta a alguien es un commit de una línea — aquí la tienes escrita.',
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
  shopHint: {
    en: 'The shop sets the currency they are trained in — € in Andorra, £ in Gibraltar.',
    es: 'La tienda define la moneda con la que se forma — € en Andorra, £ en Gibraltar.',
  },
  managerOnlyForSellers: {
    en: 'Only sellers report to a manager.',
    es: 'Solo los vendedores tienen responsable.',
  },
  generate: { en: 'Generate the account', es: 'Generar la cuenta' },
  create: { en: 'Create', es: 'Crear' },
  creating: { en: 'Creating…', es: 'Creando…' },
  cancel: { en: 'Cancel', es: 'Cancelar' },
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

  errCreate: {
    en: 'The account was not created',
    es: 'No se ha creado la cuenta',
  },
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
  copied: { en: 'Copied', es: 'Copiado' },
  theCode: { en: 'The line to commit', es: 'La línea que subir' },
  copyCode: { en: 'Copy the code', es: 'Copiar el código' },
  openOnGitHub: { en: 'Open the file on GitHub', es: 'Abrir el archivo en GitHub' },
  stepCopy: { en: 'Copy the code above.', es: 'Copia el código de arriba.' },
  stepOpen: { en: `Open ${ROSTER_FILE} on GitHub.`, es: `Abre ${ROSTER_FILE} en GitHub.` },
  stepPaste: {
    en: 'Paste it just above the closing ].',
    es: 'Pégalo justo encima del ] final.',
  },
  stepCommit: {
    en: 'Commit. They can sign in about a minute later, once the site rebuilds.',
    es: 'Haz commit. Podrá entrar un minuto después, cuando el sitio se reconstruya.',
  },
  done: { en: 'Done', es: 'Hecho' },

  /* ── Remove ── */
  removeTitle: { en: 'Remove from the team', es: 'Sacar del equipo' },
  removeLead: {
    en: 'Removing someone is a commit too: delete their block from the roster.',
    es: 'Sacar a alguien también es un commit: borra su bloque del archivo.',
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
  removeAuthNote: {
    en: 'The login itself is deleted from the Supabase dashboard, under Authentication → Users.',
    es: 'El acceso en sí se borra desde el panel de Supabase, en Authentication → Users.',
  },
  removeConfirm: { en: 'Remove from the team', es: 'Sacar del equipo' },
  removingNow: { en: 'Removing…', es: 'Sacando…' },
  errRemove: { en: 'They were not removed', es: 'No se ha podido sacar' },
} as const;

type CopyKey = keyof typeof COPY;

const ROLE_ICON: Record<UserRole, LucideIcon> = {
  admin: Crown,
  manager: Briefcase,
  employee: UserIcon,
};

const ROLE_CHIP: Record<UserRole, string> = {
  admin: 'bg-violet-tint text-violet-strong',
  manager: 'bg-teal-tint text-teal-strong',
  employee: 'bg-surface-sunken text-ink-2',
};

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

/* ── Page ── */

export default function AdminPanel() {
  const { language } = useLanguage();
  const { user, isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const isEs = language === 'es';
  const c = useCallback((key: CopyKey) => (isEs ? COPY[key].es : COPY[key].en), [isEs]);

  /* `null` means "not loaded yet" — derived instead of a setLoading(true) that
     an effect had to fire synchronously. */
  const [users, setUsers] = useState<User[] | null>(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [locFilter, setLocFilter] = useState<UserLocation | 'all'>('all');
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;
    backend.getUsers().then((data) => {
      if (!cancelled) setUsers(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /* Re-read the roster after a create or a remove. With the database on, the
     list is the database, so it has to be asked again — nothing to deploy. */
  const refreshRoster = useCallback(() => {
    void backend
      .getUsers()
      .then((data) => setUsers(data))
      .catch(() => {
        // Keep showing what we had rather than blanking the screen.
      });
  }, []);

  const managers = useMemo(
    () => (users ?? []).filter((u) => u.role === 'manager' || u.role === 'admin'),
    [users]
  );

  const nameOf = useCallback(
    (username?: string) => (users ?? []).find((u) => u.username === username)?.name ?? username,
    [users]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (users ?? []).filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (locFilter !== 'all' && u.location !== locFilter) return false;
      if (!q) return true;
      return u.name.toLowerCase().includes(q) || u.username.includes(q);
    });
  }, [users, roleFilter, locFilter, search]);

  const stats = useMemo(() => {
    const list = users ?? [];
    return {
      admins: list.filter((u) => u.role === 'admin').length,
      managers: list.filter((u) => u.role === 'manager').length,
      employees: list.filter((u) => u.role === 'employee').length,
      andorra: list.filter((u) => u.location === 'andorra').length,
      gibraltar: list.filter((u) => u.location === 'gibraltar').length,
    };
  }, [users]);

  const roleLabel = useCallback(
    (role: UserRole) =>
      role === 'admin' ? c('roleAdmin') : role === 'manager' ? c('roleManager') : c('roleEmployee'),
    [c]
  );

  if (!isAdmin) return null;
  if (users === null) return <LoadingScreen />;

  return (
    <div className="min-h-full bg-background pb-10">
      {/* Not sticky: the app frame in Layout.tsx is `overflow-hidden`, which makes
          every descendant's `position: sticky` silently do nothing. A header that
          only looks pinned is worse than one that plainly scrolls. */}
      <header className="border-b border-line bg-surface px-5 pb-3 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-overline text-violet-strong">{c('overline')}</p>
            <h1 className="text-h2 text-ink">{c('title')}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setAdding(true)}
              aria-label={c('addUser')}
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
        {/* Head count — real roster entries, nothing seeded. */}
        <div className="surface-raised p-4">
          <div className="grid grid-cols-3 divide-x divide-line">
            {[
              { icon: Shield, label: c('admins'), value: stats.admins },
              { icon: Briefcase, label: c('managers'), value: stats.managers },
              { icon: Users, label: c('sellers'), value: stats.employees },
            ].map((s) => (
              <div key={s.label} className="px-1 text-center">
                <p className="text-h2 text-ink">{s.value}</p>
                <p className="mt-0.5 text-caption text-ink-3">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2 border-t border-line pt-3">
            {[
              { label: 'Andorra', value: stats.andorra },
              { label: 'Gibraltar', value: stats.gibraltar },
            ].map((s) => (
              <span
                key={s.label}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-chip bg-surface-sunken py-2 text-caption text-ink-2"
              >
                <MapPin size={13} aria-hidden />
                {s.label}
                <b className="text-ink">{s.value}</b>
              </span>
            ))}
          </div>
        </div>

        {/* Search */}
        <div>
          <label htmlFor="admin-search" className="sr-only">
            {c('search')}
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
              aria-hidden
            />
            <input
              id="admin-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={c('search')}
              className="min-h-touch w-full rounded-full border border-line-strong bg-surface pl-10 pr-4 text-body-small text-ink outline-none placeholder:text-ink-3 focus:border-teal-strong"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-2">
          <FilterRow
            label={c('filterRole')}
            options={[
              { key: 'all', label: c('all') },
              { key: 'admin', label: c('admins') },
              { key: 'manager', label: c('managers') },
              { key: 'employee', label: c('sellers') },
            ]}
            value={roleFilter}
            onChange={(v) => setRoleFilter(v as UserRole | 'all')}
          />
          <FilterRow
            label={c('filterShop')}
            options={[
              { key: 'all', label: c('all') },
              { key: 'andorra', label: 'Andorra' },
              { key: 'gibraltar', label: 'Gibraltar' },
            ]}
            value={locFilter}
            onChange={(v) => setLocFilter(v as UserLocation | 'all')}
          />
        </div>

        {/* Roster — read-only, straight out of the committed file. */}
        <div className="space-y-2">
          {filtered.map((u) => {
            const RoleIcon = ROLE_ICON[u.role];
            const isSelf = u.id === user?.id;
            return (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="surface-raised flex items-center gap-3 p-3"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-tint">
                  <span className="text-body-small font-semibold text-teal-strong">
                    {u.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-body-small font-semibold text-ink">{u.name}</p>
                    {isSelf && <span className="shrink-0 text-caption text-ink-3">({c('you')})</span>}
                  </div>
                  <p className="truncate font-mono text-caption text-ink-3">{u.username}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-caption ${ROLE_CHIP[u.role]}`}
                    >
                      <RoleIcon size={11} aria-hidden />
                      {roleLabel(u.role)}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-surface-sunken px-2 py-0.5 text-caption capitalize text-ink-2">
                      <MapPin size={11} aria-hidden />
                      {u.location}
                    </span>
                  </div>
                  {u.role === 'employee' && (
                    <p className="mt-1 truncate text-caption text-ink-3">
                      {c('reportsTo')}: {u.managerUsername ? nameOf(u.managerUsername) : c('noManager')}
                    </p>
                  )}
                </div>

                {!isSelf && (
                  <button
                    type="button"
                    onClick={() => setRemoving(u)}
                    aria-label={`${c('removeTitle')} — ${u.name}`}
                    className="btn-icon shrink-0"
                  >
                    <UserMinus size={16} aria-hidden />
                  </button>
                )}
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div className="surface-flat p-8 text-center">
              <Users size={28} className="mx-auto mb-2 text-line-strong" aria-hidden />
              <p className="text-body-small text-ink-2">{c('noUsers')}</p>
            </div>
          )}
        </div>

        {/* The file only decides who can sign in while there is no database.
            Once there is one, pointing the owner at it is a wrong turn. */}
        {!backend.isDatabaseConfigured && (
          <a
            href={ROSTER_EDIT_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-quiet w-full text-body-small"
          >
            <ExternalLink size={16} aria-hidden />
            {c('openRoster')}
          </a>
        )}

        <div className="pb-safe" />
      </div>

      {adding && (
        <AddPersonSheet
          c={c}
          roleLabel={roleLabel}
          managers={managers}
          defaultLocation={user?.location ?? 'andorra'}
          onCreated={refreshRoster}
          onClose={() => setAdding(false)}
        />
      )}

      {removing &&
        (backend.isDatabaseConfigured ? (
          <DeleteFromDatabaseSheet
            person={removing}
            c={c}
            onRemoved={refreshRoster}
            onClose={() => setRemoving(null)}
          />
        ) : (
          <RemoveSheet person={removing} c={c} onClose={() => setRemoving(null)} />
        ))}
    </div>
  );
}

/* ── Pieces ── */

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: string; label: string }[];
  value: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="w-14 shrink-0 pt-2 text-caption text-ink-3">{label}</span>
      {/* Wraps rather than scrolling sideways — a half-clipped "Sellers" pill at
          390px reads as a rendering bug, not as an affordance. */}
      <div className="flex flex-1 flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange(opt.key)}
              aria-pressed={active}
              className={`min-h-touch shrink-0 rounded-full border px-3 text-caption font-semibold transition-colors ${
                active ? 'border-teal bg-teal text-on-teal' : 'border-line bg-surface text-ink-2'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
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
    <a
      href={ROSTER_EDIT_URL}
      target="_blank"
      rel="noreferrer"
      className="btn-quiet w-full text-body-small"
    >
      <ExternalLink size={16} aria-hidden />
      {label}
    </a>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-caption font-semibold text-ink-2">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-caption leading-5 text-danger">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-caption leading-5 text-ink-3">{hint}</p>
      )}
    </div>
  );
}

const inputClass =
  'min-h-touch w-full rounded-chip border border-line-strong bg-surface px-3 text-body-small text-ink outline-none placeholder:text-ink-3 focus:border-teal-strong';

function SegmentedField<T extends string>({
  label,
  options,
  value,
  onChange,
  hint,
}: {
  label: string;
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  hint?: string;
}) {
  const labelId = `seg-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div>
      <p id={labelId} className="mb-1.5 text-caption font-semibold text-ink-2">
        {label}
      </p>
      <div
        role="group"
        aria-labelledby={labelId}
        className="flex gap-2 rounded-full bg-surface-sunken p-1"
      >
        {options.map((opt) => {
          const active = value === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange(opt.key)}
              aria-pressed={active}
              className={`min-h-touch flex-1 rounded-full px-2 text-caption font-semibold transition-colors ${
                active ? 'bg-teal text-on-teal' : 'text-ink-2'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-1.5 text-caption leading-5 text-ink-3">{hint}</p>}
    </div>
  );
}

/** Radix Dialog, so focus is trapped and Escape closes it. */
function Sheet({
  title,
  subtitle,
  onClose,
  closeLabel,
  description,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  closeLabel: string;
  description?: string;
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
 * Two states in one sheet: the form, then the login. Kept together because the
 * password only exists between them — it is a hash the moment this closes.
 */
function AddPersonSheet({
  c,
  roleLabel,
  managers,
  defaultLocation,
  onCreated,
  onClose,
}: {
  c: (key: CopyKey) => string;
  roleLabel: (role: UserRole) => string;
  managers: User[];
  defaultLocation: UserLocation;
  onCreated: () => void;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [role, setRole] = useState<UserRole>('employee');
  const [location, setLocation] = useState<UserLocation>(defaultLocation);
  const [managerUsername, setManagerUsername] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Created | null>(null);

  const live = backend.isDatabaseConfigured;

  const handleName = (value: string) => {
    setName(value);
    if (!usernameTouched) setUsername(suggestUsername(value));
  };

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
          role,
          // Only sellers report to anyone; managers and admins never do.
          managerId:
            role === 'employee' && managerUsername
              ? (managers.find((m) => m.username === managerUsername)?.id ?? null)
              : null,
          location,
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
      role,
      location,
      managerUsername: role === 'employee' && managerUsername ? managerUsername : undefined,
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
      title={c('addUser')}
      description={live ? c('addLeadDb') : c('addLead')}
      onClose={onClose}
      closeLabel={c('cancel')}
    >
      <div className="space-y-4">
        <Field id="new-name" label={c('name')} error={nameError}>
          <input
            id="new-name"
            type="text"
            value={name}
            onChange={(e) => handleName(e.target.value)}
            placeholder={c('namePlaceholder')}
            className={inputClass}
            autoComplete="off"
          />
        </Field>

        <Field id="new-username" label={c('username')} hint={c('usernameHint')} error={usernameError}>
          <input
            id="new-username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsernameTouched(true);
              // Lowercase and de-space as they type; anything else still trips
              // the rule below, so the rule stays visible.
              setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''));
            }}
            placeholder={c('usernamePlaceholder')}
            className={`${inputClass} font-mono`}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
          />
        </Field>

        <SegmentedField<UserRole>
          label={c('filterRole')}
          value={role}
          onChange={setRole}
          options={[
            { key: 'employee', label: roleLabel('employee') },
            { key: 'manager', label: roleLabel('manager') },
            { key: 'admin', label: roleLabel('admin') },
          ]}
        />

        <SegmentedField<UserLocation>
          label={c('filterShop')}
          value={location}
          onChange={setLocation}
          hint={c('shopHint')}
          options={[
            { key: 'andorra', label: 'Andorra' },
            { key: 'gibraltar', label: 'Gibraltar' },
          ]}
        />

        {/* Sellers report to a manager; managers and admins never do. */}
        <Field
          id="new-manager"
          label={c('reportsTo')}
          hint={role !== 'employee' ? c('managerOnlyForSellers') : undefined}
        >
          <select
            id="new-manager"
            value={managerUsername}
            onChange={(e) => setManagerUsername(e.target.value)}
            disabled={role !== 'employee'}
            className={`${inputClass} disabled:opacity-50`}
          >
            <option value="">{c('noManager')}</option>
            {managers.map((m) => (
              <option key={m.id} value={m.username}>
                {m.name} — {m.location === 'andorra' ? 'Andorra' : 'Gibraltar'}
              </option>
            ))}
          </select>
        </Field>

        {/* Whatever the database said, said back. Swallowing this is how an
            owner ends up staring at a button that does nothing. */}
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
        <p className="text-caption leading-5 text-ink-3">{c('removeAuthNote')}</p>

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
