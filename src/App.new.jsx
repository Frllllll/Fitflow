import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MoonStar } from 'lucide-react';
import AuthContext from './components/AuthContext';
import Sidebar from './components/Sidebar';
import TimerControl from './components/TimerControl';
import MapView from './components/MapView';
import WeightliftingTracker from './components/WeightliftingTracker';
import CardioView from './components/CardioView';

const defaultWorkoutState = {
  isActive: false,
  isPaused: false,
  seconds: 0,
  elapsed: 0,
  activity: 'Treadmill',
  intervalActive: 45,
  intervalRest: 15,
  history: [],
  currentCalories: 0,
  prs: {
    Squat: 95,
    'Bench Press': 70,
    Deadlift: 125,
  },
  lifts: {
    Squat: [{ set: 1, reps: 8, weight: 80, done: true }, { set: 2, reps: 8, weight: 85, done: true }, { set: 3, reps: 6, weight: 90, done: false }],
    'Bench Press': [{ set: 1, reps: 10, weight: 60, done: true }, { set: 2, reps: 8, weight: 65, done: true }, { set: 3, reps: 6, weight: 70, done: false }],
    Deadlift: [{ set: 1, reps: 5, weight: 110, done: true }, { set: 2, reps: 5, weight: 115, done: false }, { set: 3, reps: 3, weight: 120, done: false }],
  },
};

function Dashboard({ workout, setWorkout, activeTab, setActiveTab, onLogout }) {
  useEffect(() => {
    const saved = localStorage.getItem('fitflow-workout');
    if (saved) {
      const parsed = JSON.parse(saved);
      setWorkout((prev) => ({ ...prev, ...parsed }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fitflow-workout', JSON.stringify(workout));
  }, [workout]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 lg:flex-row">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-sm font-medium text-sky-600">Fitflow overview</p>
            <h2 className="text-2xl font-semibold text-slate-900">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <MoonStar size={16} className="text-sky-500" />
            Calm recovery focus
          </div>
        </div>

        <TimerControl workout={workout} setWorkout={setWorkout} activeTab={activeTab} />

        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {activeTab === 'Running' ? <MapView workout={workout} /> : activeTab === 'Weightlifting' ? <WeightliftingTracker workout={workout} setWorkout={setWorkout} /> : <CardioView workout={workout} setWorkout={setWorkout} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sky-600">Session history</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">Recent workouts</h3>
            </div>
            <div className="text-sm text-slate-500">Stored locally in this browser</div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {workout.history.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">Complete a workout to see it appear here.</div>
            ) : workout.history.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-800">{item.title}</p>
                  <p className="text-sm text-sky-600">{item.calories} kcal</p>
                </div>
                <p className="mt-2 text-sm text-slate-500">{item.duration}s • {item.timestamp}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sky-600">Feature highlights</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">Fitflow lifestyle visuals</h3>
            </div>
            <div className="text-sm text-slate-500">Story-driven fitness detail</div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
              <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80" alt="Athlete running" className="h-56 w-full object-cover" />
              <div className="p-4">
                <p className="font-semibold text-slate-900">Urban running flow</p>
                <p className="mt-2 text-sm text-slate-500">A clean route visual for your daily cardio roadmap.</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
              <img src="https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80" alt="Weightlifting session" className="h-56 w-full object-cover" />
              <div className="p-4">
                <p className="font-semibold text-slate-900">Strength session focus</p>
                <p className="mt-2 text-sm text-slate-500">Track your sets, reps, and PRs in one clean workflow.</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
              <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80" alt="Cycling workout" className="h-56 w-full object-cover" />
              <div className="p-4">
                <p className="font-semibold text-slate-900">Cardio cadence</p>
                <p className="mt-2 text-sm text-slate-500">A vibrant workout moment for interval and endurance training.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function App() {
  const [workout, setWorkout] = useState(defaultWorkoutState);
  const [activeTab, setActiveTab] = useState('Running');

  return (
    <AuthContext>
      {({ isAuthenticated, setIsAuthenticated }) => (
        isAuthenticated ? (
          <Dashboard workout={workout} setWorkout={setWorkout} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => {
            setIsAuthenticated(false);
            localStorage.removeItem('fitflow-auth');
          }} />
        ) : null
      )}
    </AuthContext>
  );
}
