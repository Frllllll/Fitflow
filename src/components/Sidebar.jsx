import { Activity, Dumbbell, Footprints, LogOut, Zap } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const tabs = ['Running', 'Weightlifting', 'Gym & Cardio'];

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <aside className="flex flex-col justify-between border-b border-slate-200 bg-white p-5 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div>
        <div className="flex items-center gap-3">
          <img src={logo} alt="Fitflow logo" className="h-12 w-12 rounded-2xl object-contain" />
          <div>
            <p className="text-lg font-semibold text-slate-900">Fitflow</p>
            <p className="text-sm text-slate-500">Wellness dashboard</p>
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab === 'Running' ? Footprints : tab === 'Weightlifting' ? Dumbbell : Zap;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${activeTab === tab ? 'border-sky-200 bg-sky-50 text-sky-700' : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50'}`}>
                <span className="flex items-center gap-3"><Icon size={16} />{tab}</span>
                <span className="text-xs text-slate-400">0{tabs.indexOf(tab) + 1}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">Recovery mode</p>
        <p className="mt-1 text-sm text-slate-500">Hydration and mobility check-in are ready.</p>
        <button onClick={onLogout} className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
