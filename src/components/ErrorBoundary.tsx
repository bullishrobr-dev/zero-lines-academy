// ─────────────────────────────────────────────────────────────
// ErrorBoundary.tsx — last line of defence
//
// Deliberately reads the language straight from localStorage rather than from
// LanguageContext: this component renders precisely when something in the tree
// below it has already failed, so it must not depend on that tree's providers.
// ─────────────────────────────────────────────────────────────

import { Component, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
// A plain constant, no provider dependency — safe to import even here.
import { BUILD_STAMP } from '../backend/supabaseClient';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const COPY = {
  en: {
    title: 'Something went wrong',
    body: "Don't worry — your progress is saved. Try reloading the app or going back home.",
    reload: 'Reload app',
    home: 'Go to Home',
    footer: 'If this keeps happening, try clearing your browser data for this site.',
  },
  es: {
    title: 'Algo ha salido mal',
    body: 'Tranquilo — tu progreso está guardado. Prueba a recargar la app o volver al inicio.',
    reload: 'Recargar app',
    home: 'Ir al inicio',
    footer: 'Si te sigue pasando, borra los datos del navegador para este sitio.',
  },
};

function copy() {
  try {
    return localStorage.getItem('zl_language') === 'es' ? COPY.es : COPY.en;
  } catch {
    return COPY.en;
  }
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.hash = '#/home';
    setTimeout(() => window.location.reload(), 100);
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const c = copy();

    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6 pt-safe text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-feature bg-danger-tint">
          <AlertTriangle className="h-8 w-8 text-danger" aria-hidden="true" />
        </div>
        <h1 className="text-h2 text-ink">{c.title}</h1>
        <p className="mt-2 max-w-[300px] text-body-small text-ink-2">{c.body}</p>

        {/* The raw JavaScript message ("Cannot read properties of undefined…")
            means nothing to a seller and only looks alarming. It stays in the
            console for anyone debugging; here we show only the build, which is
            what support would ask for. */}

        <div className="mt-6 flex w-full max-w-[300px] flex-col gap-3">
          <button onClick={this.handleReload} className="btn-primary w-full">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {c.reload}
          </button>
          <button onClick={this.handleGoHome} className="btn-quiet w-full">
            {c.home}
          </button>
        </div>

        <p className="mt-6 max-w-[300px] text-caption text-ink-3">{c.footer}</p>
        <p className="mt-2 font-mono text-caption text-ink-3/70">{BUILD_STAMP}</p>
      </div>
    );
  }
}
