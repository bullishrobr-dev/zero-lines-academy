// ─────────────────────────────────────────────────────────────────────────────
// AdminPanel.tsx — every account in the company.
//
// Security fixes in this pass:
//  • The generated credential was rendered in a plain `<Input value={password}>`
//    with no `type="password"` — legible from across a shop floor on a shared
//    tablet. It is masked now, with an explicit reveal toggle and a copy button.
//  • Passwords were `"emp" + random(100..999)`: 900 possibilities, matching the
//    seeded emp1…emp6 convention, against a login with no rate limiting. They
//    now come from `crypto.getRandomValues` over a 32-symbol alphabet.
//  • `managerId` was never sent, so no seller was ever linked to a manager and
//    every manager's team fell back to "same shop, unassigned". The admin picks
//    the manager explicitly now.
//  • Location was not editable anywhere: a seller in the wrong shop had to be
//    deleted and recreated, and until someone noticed they were being trained to
//    quote the wrong currency. There is a proper edit sheet now.
//  • `deleteUser()` returns `{ success, error }` (it refuses self-deletion and
//    deleting the last admin) — the refusal reason is shown instead of silently
//    doing nothing.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Briefcase,
  Check,
  Copy,
  Crown,
  Eye,
  EyeOff,
  MapPin,
  Pencil,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  User as UserIcon,
  UserPlus,
  Users,
  X,
  type LucideIcon,
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
import type { UserRole, UserLocation } from '../backend/types';

interface SafeUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  location: UserLocation;
  managerId?: string;
  createdAt: string;
}

/* Strings with no key in src/data/translations.ts (it has none for the
   management screens, and that file is owned elsewhere). */
const COPY = {
  overline: { en: 'Admin', es: 'Administración' },
  title: { en: 'People', es: 'Personas' },
  close: { en: 'Close', es: 'Cerrar' },
  addUser: { en: 'Add person', es: 'Añadir persona' },
  editUser: { en: 'Edit person', es: 'Editar persona' },
  search: { en: 'Search by name or email', es: 'Busca por nombre o correo' },
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
  name: { en: 'Name', es: 'Nombre' },
  namePlaceholder: { en: 'e.g. Maria Garcia', es: 'p. ej. María García' },
  email: { en: 'Email', es: 'Correo' },
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
  reportsTo: { en: 'Reports to', es: 'Responsable asignado' },
  noManager: { en: 'No manager yet', es: 'Sin responsable' },
  managerOnlyForSellers: {
    en: 'Only sellers report to a manager.',
    es: 'Solo los vendedores tienen responsable.',
  },
  create: { en: 'Create account', es: 'Crear cuenta' },
  saveChanges: { en: 'Save changes', es: 'Guardar cambios' },
  cancel: { en: 'Cancel', es: 'Cancelar' },
  created: { en: 'Account created', es: 'Cuenta creada' },
  credentialsOnce: {
    en: 'Write this down now — the password is not shown again.',
    es: 'Apúntala ahora — la contraseña no se vuelve a mostrar.',
  },
  copyBoth: { en: 'Copy email and password', es: 'Copiar correo y contraseña' },
  gotIt: { en: 'Done', es: 'Hecho' },
  deleteTitle: { en: 'Delete this account?', es: '¿Eliminar esta cuenta?' },
  deleteBody: {
    en: 'They lose access immediately. Their training history stays on their own device.',
    es: 'Pierde el acceso al momento. Su historial de formación se queda en su dispositivo.',
  },
  delete: { en: 'Delete', es: 'Eliminar' },
  deleteAction: { en: 'Delete account', es: 'Eliminar cuenta' },
  edit: { en: 'Edit', es: 'Editar' },
  saved: { en: 'Changes saved', es: 'Cambios guardados' },
  deleted: { en: 'Account deleted', es: 'Cuenta eliminada' },
  emailTaken: { en: 'That email is already registered', es: 'Ese correo ya está registrado' },
  emailInvalid: { en: 'Enter a valid email address', es: 'Escribe un correo válido' },
  shopHint: {
    en: 'The shop sets the currency this person is trained in — € in Andorra, £ in Gibraltar.',
    es: 'La tienda define la moneda con la que se forma — € en Andorra, £ en Gibraltar.',
  },
  you: { en: 'you', es: 'tú' },
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

/**
 * A shop-floor-friendly password: 14 symbols from a 32-character alphabet with
 * no look-alikes (0/O, 1/l/I), read out loud without ambiguity. ~70 bits of
 * entropy against the 900 values the old `"emp" + random(100..999)` produced.
 * Duplicated in ManagerDashboard.tsx on purpose — src/utils is owned elsewhere.
 */
const PASSWORD_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function generatePassword(length = 14): string {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint32Array(length);
    cryptoObj.getRandomValues(bytes);
    return Array.from(bytes, (b) => PASSWORD_ALPHABET[b % PASSWORD_ALPHABET.length]).join('');
  }
  // Last resort only — a browser without WebCrypto also has no secure storage.
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

/* ── Page ── */

export default function AdminPanel() {
  const { language } = useLanguage();
  const { user, isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const isEs = language === 'es';
  const c = useCallback((key: CopyKey) => (isEs ? COPY[key].es : COPY[key].en), [isEs]);

  /* `null` means "not loaded yet" — derived instead of a setLoading(true) that
     an effect had to fire synchronously. */
  const [users, setUsers] = useState<SafeUser[] | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [locFilter, setLocFilter] = useState<UserLocation | 'all'>('all');

  const [addDraft, setAddDraft] = useState<{ password: string } | null>(null);
  const [editing, setEditing] = useState<SafeUser | null>(null);
  const [deleting, setDeleting] = useState<SafeUser | null>(null);
  const [createdUser, setCreatedUser] = useState<{ email: string; password: string } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    backend.getUsers().then((data) => {
      if (!cancelled) setUsers(data);
    });
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const refresh = useCallback(() => setReloadToken((n) => n + 1), []);

  const managers = useMemo(
    () => (users ?? []).filter((u) => u.role === 'manager' || u.role === 'admin'),
    [users]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (users ?? []).filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (locFilter !== 'all' && u.location !== locFilter) return false;
      if (!q) return true;
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
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
    (role: UserRole) => (role === 'admin' ? c('roleAdmin') : role === 'manager' ? c('roleManager') : c('roleEmployee')),
    [c]
  );

  const handleCreate = async (data: backend.SignupData) => {
    setError(null);
    const result = await backend.createUser(data);
    if (!result.success) {
      setError(result.error === 'Email already registered' ? c('emailTaken') : (result.error ?? 'Error'));
      return false;
    }
    setAddDraft(null);
    setCreatedUser({ email: data.email, password: data.password });
    refresh();
    return true;
  };

  const handleSaveEdit = async (
    id: string,
    changes: { name: string; role: UserRole; location: UserLocation; managerId?: string }
  ) => {
    setError(null);
    const ok = await backend.updateUser(id, changes);
    if (!ok) {
      setError('User not found');
      return;
    }
    setEditing(null);
    setNotice(c('saved'));
    refresh();
  };

  /* deleteUser() now answers `{ success, error }` — it refuses self-deletion and
     deleting the last admin. The old call site ignored the result entirely. */
  const handleDelete = async (target: SafeUser) => {
    setError(null);
    const result = await backend.deleteUser(target.id);
    setDeleting(null);
    if (!result.success) {
      setError(result.error ?? 'Could not delete this account');
      return;
    }
    setNotice(c('deleted'));
    refresh();
  };

  if (!isAdmin) return null;
  if (users === null) return <LoadingScreen />;

  return (
    <div className="min-h-full bg-background pb-10">
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 px-5 pb-3 pt-6 backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-overline text-violet-strong">{c('overline')}</p>
            <h1 className="text-h2 text-ink">{c('title')}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setAddDraft({ password: generatePassword() })}
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

        {/* Head count */}
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
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
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

        {/* Roster */}
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
                  <p className="truncate text-caption text-ink-3">{u.email}</p>
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
                </div>

                <div className="flex shrink-0 flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => setEditing(u)}
                    aria-label={`${c('edit')} — ${u.name}`}
                    className="btn-icon h-10 w-10"
                  >
                    <Pencil size={15} aria-hidden />
                  </button>
                  {!isSelf && (
                    <button
                      type="button"
                      onClick={() => setDeleting(u)}
                      aria-label={`${c('delete')} — ${u.name}`}
                      className="btn-icon h-10 w-10 border-danger/30 bg-danger-tint text-danger"
                    >
                      <Trash2 size={15} aria-hidden />
                    </button>
                  )}
                </div>
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

        <div className="pb-safe" />
      </div>

      {/* ── Add ── */}
      {addDraft && (
        <UserFormSheet
          mode="create"
          initialPassword={addDraft.password}
          managers={managers}
          c={c}
          roleLabel={roleLabel}
          onClose={() => setAddDraft(null)}
          onSubmitCreate={handleCreate}
        />
      )}

      {/* ── Edit ── */}
      {editing && (
        <UserFormSheet
          mode="edit"
          user={editing}
          managers={managers.filter((m) => m.id !== editing.id)}
          c={c}
          roleLabel={roleLabel}
          onClose={() => setEditing(null)}
          onSubmitEdit={(changes) => handleSaveEdit(editing.id, changes)}
        />
      )}

      {/* ── Credentials, shown once ── */}
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
              <CopyButton
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

      {/* ── Delete confirmation ── */}
      <AlertDialog open={deleting !== null} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent className="rounded-feature border-line bg-surface">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-h4 text-ink">{c('deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription className="text-body-small text-ink-2">
              {deleting?.name} · {deleting?.email}
              <br />
              {c('deleteBody')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="btn-quiet min-h-touch border-line">{c('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleting && handleDelete(deleting)}
              className="min-h-touch rounded-full bg-danger px-6 font-semibold text-destructive-foreground"
            >
              {c('deleteAction')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
    <div className="flex items-center gap-2">
      <span className="w-16 shrink-0 text-caption text-ink-3">{label}</span>
      <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
        {options.map((opt) => {
          const active = value === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange(opt.key)}
              aria-pressed={active}
              className={`min-h-[36px] shrink-0 rounded-full border px-3 text-caption font-semibold transition-colors ${
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

function CopyButton({ value, label, copiedLabel }: { value: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        const ok = await copyToClipboard(value);
        if (ok) {
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

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-caption font-semibold text-ink-2">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-caption leading-5 text-ink-3">{hint}</p>}
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
      <div role="group" aria-labelledby={labelId} className="flex gap-2 rounded-full bg-surface-sunken p-1">
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

/** Create/edit sheet. Radix Dialog, so focus is trapped and Escape closes it —
    the previous hand-rolled `fixed inset-0` did neither. */
function UserFormSheet({
  mode,
  user,
  initialPassword,
  managers,
  c,
  roleLabel,
  onClose,
  onSubmitCreate,
  onSubmitEdit,
}: {
  mode: 'create' | 'edit';
  user?: SafeUser;
  initialPassword?: string;
  managers: SafeUser[];
  c: (key: CopyKey) => string;
  roleLabel: (role: UserRole) => string;
  onClose: () => void;
  onSubmitCreate?: (data: backend.SignupData) => Promise<boolean>;
  onSubmitEdit?: (changes: {
    name: string;
    role: UserRole;
    location: UserLocation;
    managerId?: string;
  }) => Promise<void>;
}) {
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState(initialPassword ?? '');
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [role, setRole] = useState<UserRole>(user?.role ?? 'employee');
  const [location, setLocation] = useState<UserLocation>(user?.location ?? 'andorra');
  const [managerId, setManagerId] = useState<string>(user?.managerId ?? '');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const isCreate = mode === 'create';
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
    // Only sellers report to a manager; managers and admins never do.
    const link = role === 'employee' && managerId ? managerId : undefined;
    if (isCreate && onSubmitCreate) {
      await onSubmitCreate({ email: cleanEmail, name: name.trim(), password, role, location, managerId: link });
    } else if (onSubmitEdit) {
      await onSubmitEdit({ name: name.trim(), role, location, managerId: link });
    }
    setBusy(false);
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[88vh] overflow-y-auto rounded-feature border-line bg-surface"
      >
        <div className="flex items-start justify-between gap-3">
          <DialogTitle className="text-h3 text-ink">{isCreate ? c('addUser') : c('editUser')}</DialogTitle>
          <button type="button" onClick={onClose} aria-label={c('cancel')} className="btn-icon shrink-0">
            <X size={18} aria-hidden />
          </button>
        </div>
        <DialogDescription className="sr-only">{isCreate ? c('addUser') : c('editUser')}</DialogDescription>

        <div className="space-y-4">
          <Field id="user-name" label={c('name')}>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={c('namePlaceholder')}
              className={inputClass}
              autoComplete="off"
            />
          </Field>

          {isCreate ? (
            <Field id="user-email" label={c('email')} hint={emailError ?? undefined}>
              <input
                id="user-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maria@zerolines.com"
                className={inputClass}
                autoComplete="off"
                inputMode="email"
              />
            </Field>
          ) : (
            <Field id="user-email-static" label={c('email')}>
              <p id="user-email-static" className="break-all rounded-chip bg-surface-sunken px-3 py-3 text-body-small text-ink-2">
                {email}
              </p>
            </Field>
          )}

          {isCreate && (
            <Field id="user-password" label={c('tempPassword')} hint={c('passwordHint')}>
              <div className="flex gap-2">
                <input
                  id="user-password"
                  /* Was a plain text input — legible over the shoulder. */
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
                    const ok = await copyToClipboard(password);
                    if (ok) {
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
            </Field>
          )}

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

          {/* managerId was never set by either form, so no seller was ever linked. */}
          <Field
            id="user-manager"
            label={c('reportsTo')}
            hint={role !== 'employee' ? c('managerOnlyForSellers') : undefined}
          >
            <select
              id="user-manager"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              disabled={role !== 'employee'}
              className={`${inputClass} disabled:opacity-50`}
            >
              <option value="">{c('noManager')}</option>
              {managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.location === 'andorra' ? 'Andorra' : 'Gibraltar'}
                </option>
              ))}
            </select>
          </Field>

          <button type="button" onClick={submit} disabled={!canSubmit || busy} className="btn-primary w-full disabled:opacity-50">
            {isCreate ? c('create') : c('saveChanges')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
