import { motion } from 'framer-motion';

export default function WeightliftingTracker({ workout, setWorkout }) {
  const toggleSet = (exercise, index) => {
    setWorkout((prev) => ({
      ...prev,
      lifts: {
        ...prev.lifts,
        [exercise]: prev.lifts[exercise].map((set, setIndex) => setIndex === index ? { ...set, done: !set.done } : set),
      },
    }));
  };

  const updatePR = (exercise) => {
    setWorkout((prev) => ({
      ...prev,
      prs: { ...prev.prs, [exercise]: prev.prs[exercise] + 5 },
    }));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-sky-600">Weightlifting</p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-900">Strength session tracker</h3>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{workout.isActive ? 'Active session' : 'Ready'}</div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {Object.entries(workout.prs).map(([exercise, pr]) => (
            <div key={exercise} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{exercise}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{pr} kg</p>
              <p className="mt-1 text-sm text-slate-500">Personal record</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {Object.entries(workout.lifts).map(([exercise, sets]) => (
          <motion.div key={exercise} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{exercise}</h3>
                <p className="text-sm text-slate-500">Structured routine</p>
              </div>
              <button onClick={() => updatePR(exercise)} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-50">+5 kg PR</button>
            </div>
            <div className="mt-5 space-y-3">
              {sets.map((set, index) => (
                <div key={`${exercise}-${index}`} className={`flex items-center justify-between rounded-2xl border p-3 ${set.done ? 'border-sky-200 bg-sky-50' : 'border-slate-200 bg-white'}`}>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Set {set.set}</p>
                    <p className="text-sm text-slate-500">{set.reps} reps • {set.weight} kg</p>
                  </div>
                  <button onClick={() => toggleSet(exercise, index)} className={`rounded-full px-3 py-1 text-sm font-medium ${set.done ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    {set.done ? 'Done' : 'Mark'}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
