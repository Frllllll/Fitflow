import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Sparkles } from 'lucide-react';
import logo from '../assets/logo.jpeg';

export default function AuthContext({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => typeof window !== 'undefined' && localStorage.getItem('fitflow-auth') === 'true');
  const [email, setEmail] = useState('alex@fitflow.app');
  const [password, setPassword] = useState('wellness123');

  const handleLogin = () => {
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitflow-auth', 'true');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_55%),_#f8fafc] px-4 py-10 text-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft lg:flex-row">
          <div className="flex-1 bg-slate-950 p-8 text-white lg:p-12">
            <div className="mb-8 flex items-center gap-4 rounded-3xl bg-white/10 p-4 shadow-sm">
              <img src={logo} alt="Fitflow logo" className="h-12 w-12 rounded-2xl bg-slate-950 p-2" />
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-sky-200">Fitflow</p>
                <p className="text-sm text-slate-300">Wellness OS</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
              <Sparkles size={16} className="text-sky-400" />
              Fitflow • Wellness OS
            </div>
            <h1 className="mt-8 text-4xl font-semibold leading-tight sm:text-5xl">Train smarter, recover better, and stay aligned.</h1>
            <p className="mt-4 max-w-lg text-lg text-slate-300">A calm, modern fitness dashboard for running, strength, and cardio sessions with real-time focus.</p>
            <div className="mt-10 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">• Unified live workout tracker across every discipline</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">• Personalized PR tracking and progress snapshots</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">• Intentional recovery-focused wellness planning</div>
            </div>
          </div>
          <div className="flex-1 p-8 lg:p-12">
            <div className="mx-auto max-w-md">
              <h2 className="text-3xl font-semibold text-slate-900">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-500">Sign in with a mock account to explore the experience.</p>
              <div className="mt-8 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Email
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0" />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Password
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0" />
                </label>
                <motion.button onClick={handleLogin} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-medium text-white transition hover:bg-sky-600" whileTap={{ scale: 0.98 }}>
                  <LogIn size={18} />
                  Sign in to Fitflow
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children({ isAuthenticated, setIsAuthenticated })}</>;
}
