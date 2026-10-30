import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleClearAndReload = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b1120] text-slate-100 flex items-center justify-center p-4 font-sans">
          <div className="bg-[#121c2e] border border-amber-500/40 p-6 rounded-2xl max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center text-xl font-black">
              🧺
            </div>
            <h2 className="text-xl font-bold text-white">IstriKhata Recovered</h2>
            <p className="text-xs text-slate-300">
              Browser cache me purana data conflict kar raha tha. Click karein to fresh reload karein:
            </p>
            <button
              onClick={this.handleClearAndReload}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Clear Cache & Open Fresh Dashboard
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
