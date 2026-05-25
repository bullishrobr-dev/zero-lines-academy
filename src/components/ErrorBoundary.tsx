import { Component, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
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
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-5">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-sm text-[#8A8A8A] mb-6 max-w-[280px]">
            Don't worry — your progress is saved. Try reloading the app or going back home.
          </p>

          {this.state.error && (
            <div className="bg-[#1A1A1A] rounded-xl p-3 mb-6 max-w-[320px] w-full">
              <p className="text-[11px] text-[#6B6B6B] font-mono break-all">
                {this.state.error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full max-w-[280px]">
            <button
              onClick={this.handleReload}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#0ABAB5] text-black font-semibold rounded-full text-sm active:scale-[0.97] transition-transform"
            >
              <RotateCcw className="w-4 h-4" />
              Reload App
            </button>
            <button
              onClick={this.handleGoHome}
              className="w-full py-3.5 bg-[#1A1A1A] text-white font-medium rounded-full text-sm border border-[#2A2A2A] active:scale-[0.97] transition-transform"
            >
              Go to Home
            </button>
          </div>

          <p className="text-[11px] text-[#4A4A4A] mt-6">
            If this keeps happening, try clearing your browser data for this site.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
