import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Juls in Bloom component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white border border-blush/30 rounded-3xl p-8 shadow-md space-y-6">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h1 className="font-serif italic text-3xl text-wine">Something Paused in Our Sanctuary</h1>
              <p className="text-slate text-xs leading-relaxed">
                An unexpected interruption occurred while rendering this page. You can refresh or return to the welcoming sanctuary home.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-cream/70 rounded-xl border border-blush/20 text-[0.7rem] text-slate font-mono overflow-x-auto text-left">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 py-3 px-5 rounded-full bg-wine text-white text-xs uppercase tracking-widest font-semibold hover:bg-wine/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" /> Return Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-3 px-5 rounded-full border border-wine/30 text-wine text-xs uppercase tracking-widest font-semibold hover:bg-wine/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
