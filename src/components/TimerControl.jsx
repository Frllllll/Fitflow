import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, TimerReset } from 'lucide-react';

function formatTime(totalSeconds) {
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

export default function TimerControl({ workout, setWorkout, activeTab }) {
  useEffect(() => {
    if (!workout.isActive || workout.isPaused) return;

    const timer = setInterval(() => {
      setWorkout((prev) => ({ ...prev, seconds: prev.seconds + 1, elapsed: prev.elapsed + 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, [workout.isActive, workout.isPaused, setWorkout]);

  const startWorkout = () => {
    setWorkout((prev) => ({ ...prev, isActive: true, isPaused: false }));
  };

  const pauseWorkout = () => {
    setWorkout((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const stopWorkout = () => {
    const duration = workout.seconds;
    const calories = Math.max(120, Math.round(duration * 0.35 + (activeTab === 'Running' ? 80 : activeTab === 'Weightlifting' ? 40 : 60)));
    const entry = {
      id: Date.now(),
      title: activeTab,
      duration,
      calories,
      timestamp: new Date().toLocaleString(),
    };

    setWorkout((prev) => ({
      ...prev,
      isActive: false,
      isPaused: false,
      history: [entry, ...prev.history].slice(0, 6),
      currentCalories: calories,
      seconds: 0,
      elapsed: 0,
    }));
  };

  const isHIIT = activeTab === 'Gym & Cardio';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-medium text-sky-600">Active Session Control</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-900">{workout.isActive ? 'Active workout' : 'Ready to move'}</h3>
          <p className="mt-2 text-sm text-slate-500">{isHIIT ? 'Interval mode is live' : 'Live timer with progress saved to your history'}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Session</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900">{formatTime(workout.seconds)}</p>
        </div>
      </div>

      {isHIIT ? (
        <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1.2fr,0.8fr]">
          <div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Active</span>
              <span>{workout.intervalActive}s</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-sky-500" style={{ width: `${(workout.intervalActive / 60) * 100}%` }} />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>Rest</span>
              <span>{workout.intervalRest}s</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-orange-400" style={{ width: `${(workout.intervalRest / 60) * 100}%` }} />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-medium text-slate-700">Interval controls</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-600">
              <label className="rounded-xl border border-slate-200 p-2">
                Active
                <input type="number" value={workout.intervalActive} onChange={(e) => setWorkout((prev) => ({ ...prev, intervalActive: Number(e.target.value) }))} className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2" />
              </label>
              <label className="rounded-xl border border-slate-200 p-2">
                Rest
                <input type="number" value={workout.intervalRest} onChange={(e) => setWorkout((prev) => ({ ...prev, intervalRest: Number(e.target.value) }))} className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2" />
              </label>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <motion.button onClick={startWorkout} className="flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-600" whileTap={{ scale: 0.98 }}>
          <Play size={16} />
          Start Workout
        </motion.button>
        <motion.button onClick={pauseWorkout} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50" whileTap={{ scale: 0.98 }}>
          {workout.isPaused ? <Play size={16} /> : <Pause size={16} />}
          {workout.isPaused ? 'Resume' : 'Pause'}
        </motion.button>
        <motion.button onClick={stopWorkout} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50" whileTap={{ scale: 0.98 }}>
          <TimerReset size={16} />
          Stop & Save Workout
        </motion.button>
      </div>
    </motion.div>
  );
}
