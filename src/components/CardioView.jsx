import { motion } from 'framer-motion';
import { Watch } from 'lucide-react';

export default function CardioView({ workout, setWorkout }) {
  const activities = ['Treadmill', 'Elliptical', 'Stationary Bike'];
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-sky-600">Gym & Cardio</p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-900">HIIT and endurance flow</h3>
          </div>
          <div className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600">Interval mode</div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {activities.map((activity) => (
            <button key={activity} onClick={() => setWorkout((prev) => ({ ...prev, activity }))} className={`rounded-full px-4 py-2 text-sm font-medium transition ${workout.activity === activity ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
              {activity}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-3 text-slate-700">
            <Watch size={18} className="text-sky-500" />
            <span className="text-sm font-medium">Selected machine: {workout.activity}</span>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center rounded-full border border-slate-200 bg-white p-10 shadow-inner">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-sky-100">
              <div className="absolute inset-0 rounded-full border-[14px] border-t-sky-500 border-r-orange-400" style={{ transform: 'rotate(55deg)' }} />
              <div className="text-center">
                <p className="text-4xl font-semibold text-slate-900">{workout.intervalActive}</p>
                <p className="mt-1 text-sm text-slate-500">active seconds</p>
              </div>
            </div>
            <div className="mt-5 text-sm text-slate-500">Rest interval {workout.intervalRest}s • Smooth countdown ready</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
