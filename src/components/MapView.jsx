import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

function formatTime(totalSeconds) {
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

export default function MapView({ workout }) {
  const stats = [
    { label: 'Distance', value: '6.8 km' },
    { label: 'Live Pace', value: '5:06 /km' },
    { label: 'Duration', value: formatTime(workout.seconds || 0) },
    { label: 'Calories', value: `${workout.currentCalories || 420} kcal` },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-sky-600">Running</p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-900">Lake Loop • Live route</h3>
          </div>
          <div className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-600">Strava-like map</div>
        </div>
        <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-900 p-4">
          <div className="relative h-72 rounded-[20px] bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.2),_transparent_40%),linear-gradient(135deg,_#0f172a,_#111827)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full">
              <path d="M30 200 C90 150 130 130 150 170 S230 220 280 180 S340 110 370 80" stroke="#f97316" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M30 200 C90 150 130 130 150 170 S230 220 280 180 S340 110 370 80" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="8 6" />
              <circle cx="150" cy="170" r="7" fill="#f8fafc" />
            </svg>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-sky-600">Recent runs</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">Weekly performance</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500"><TrendingUp size={16} className="text-sky-500" /> +12% consistency</div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            { day: 'Mon', km: '4.2', pace: '5:10' },
            { day: 'Wed', km: '6.8', pace: '5:03' },
            { day: 'Sat', km: '8.1', pace: '4:58' },
          ].map((item) => (
            <div key={item.day} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">{item.day}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{item.km} km</p>
              <p className="mt-1 text-sm text-slate-500">{item.pace} / km</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
