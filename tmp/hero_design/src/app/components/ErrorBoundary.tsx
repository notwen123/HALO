import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-full bg-black/80 border border-red-500/30 rounded-lg p-8">
            <div className="text-center">
              <div className="text-red-400 mb-2">⚠️ Rendering Error</div>
              <div className="text-xs text-gray-500 font-mono">
                {this.state.error?.message || 'Something went wrong'}
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
