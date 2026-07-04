import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Dumbbell, Footprints, LogIn, LogOut, MoonStar, Play, Pause, TimerReset, Sparkles, TrendingUp, Watch, Zap } from 'lucide-react';

const tabs = ['Running', 'Weightlifting', 'Gym & Cardio'];

const defaultWorkoutState = {
  isActive: false,
  isPaused: false,
  seconds: 0,
  elapsed: 0,
  activeTab: 'Running',
  activity: 'Treadmill',
  intervalActive: 45,
  intervalRest: 15,
  history: [],
  sessionName: 'Morning Flow',
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

function formatTime(totalSeconds) {
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function AuthContext({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('alex@fitflow.app');
  const [password, setPassword] = useState('wellness123');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_55%),_#f8fafc] px-4 py-10 text-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft lg:flex-row">
          <div className="flex-1 bg-slate-950 p-8 text-white lg:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
              
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
                <button onClick={() => setIsAuthenticated(true)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-medium text-white transition hover:bg-sky-600" whileTap={{ scale: 0.98 }}>
                  <LogIn size={18} />
                  Sign in to Fitflow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children({ isAuthenticated, setIsAuthenticated })}</>;
}

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <aside className="flex flex-col justify-between border-b border-slate-200 bg-white p-5 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600">
            <Activity size={22} />
          </div>
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

function TimerControl({ workout, setWorkout, activeTab }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!workout.isActive || workout.isPaused) return;

    const timer = setInterval(() => {
      setWorkout((prev) => ({ ...prev, seconds: prev.seconds + 1, elapsed: prev.elapsed + 1 }));
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [workout.isActive, workout.isPaused, setWorkout]);

  const startWorkout = () => {
    setWorkout((prev) => ({ ...prev, isActive: true, isPaused: false, seconds: prev.seconds }));
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
      duration: duration,
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
        <button onClick={startWorkout} className="flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-600" whileTap={{ scale: 0.98 }}>
          <Play size={16} />
          Start Workout
        </button>
        <button onClick={pauseWorkout} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50" whileTap={{ scale: 0.98 }}>
          {workout.isPaused ? <Play size={16} /> : <Pause size={16} />}
          {workout.isPaused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={stopWorkout} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50" whileTap={{ scale: 0.98 }}>
          <TimerReset size={16} />
          Stop & Save Workout
        </button>
      </div>
    </motion.div>
  );
}

function RunningView({ workout, setWorkout }) {
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

function WeightliftingView({ workout, setWorkout }) {
  const toggleSet = (exercise, index) => {
    setWorkout((prev) => ({
      ...prev,
      lifts: {
        ...prev.lifts,
        [exercise]: prev.lifts[exercise].map((set, setIndex) => setIndex === index ? { ...set, done: !set.done } : set),
      },
    }));
  };

  const updatePR = (exercise, weight) => {
    setWorkout((prev) => ({
      ...prev,
      prs: { ...prev.prs, [exercise]: Math.max(prev.prs[exercise], weight) },
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
              <button onClick={() => updatePR(exercise, workout.prs[exercise] + 5)} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-50">+5 kg PR</button>
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

function CardioView({ workout, setWorkout }) {
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

function Dashboard({ workout, setWorkout, activeTab, setActiveTab, onLogout }) {
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
              {activeTab === 'Running' ? <RunningView workout={workout} setWorkout={setWorkout} /> : activeTab === 'Weightlifting' ? <WeightliftingView workout={workout} setWorkout={setWorkout} /> : <CardioView workout={workout} setWorkout={setWorkout} />}
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
          <Dashboard workout={workout} setWorkout={setWorkout} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)} />
        ) : null
      )}
    </AuthContext>
  );
}
