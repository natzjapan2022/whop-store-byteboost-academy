'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  PlayCircle,
  Clock,
  CheckCircle,
  BookOpen,
  Code,
  Trophy,
  Users,
  Star,
  Download,
  MessageSquare,
  Lock,
  ChevronRight
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: 'video' | 'text' | 'quiz' | 'project';
}

interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
  unlocked: boolean;
}

const courseModules: Module[] = [
  {
    id: 'fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts of JavaScript programming',
    progress: 85,
    unlocked: true,
    lessons: [
      { id: '1', title: 'Variables and Data Types', duration: '12 min', completed: true, locked: false, type: 'video' },
      { id: '2', title: 'Functions and Scope', duration: '18 min', completed: true, locked: false, type: 'video' },
      { id: '3', title: 'Objects and Arrays', duration: '22 min', completed: true, locked: false, type: 'video' },
      { id: '4', title: 'Control Structures', duration: '15 min', completed: true, locked: false, type: 'video' },
      { id: '5', title: 'Error Handling', duration: '16 min', completed: false, locked: false, type: 'video' },
      { id: '6', title: 'Practice: Building a Calculator', duration: '45 min', completed: false, locked: false, type: 'project' }
    ]
  },
  {
    id: 'dom',
    title: 'DOM Manipulation & Events',
    description: 'Learn to interact with web pages dynamically',
    progress: 60,
    unlocked: true,
    lessons: [
      { id: '7', title: 'Understanding the DOM', duration: '20 min', completed: true, locked: false, type: 'video' },
      { id: '8', title: 'Selecting Elements', duration: '14 min', completed: true, locked: false, type: 'video' },
      { id: '9', title: 'Event Listeners', duration: '25 min', completed: true, locked: false, type: 'video' },
      { id: '10', title: 'Dynamic Content Creation', duration: '18 min', completed: false, locked: false, type: 'video' },
      { id: '11', title: 'Form Validation', duration: '30 min', completed: false, locked: false, type: 'video' },
      { id: '12', title: 'Project: Interactive To-Do App', duration: '60 min', completed: false, locked: false, type: 'project' }
    ]
  },
  {
    id: 'async',
    title: 'Async Programming & APIs',
    description: 'Handle asynchronous operations and external data',
    progress: 20,
    unlocked: true,
    lessons: [
      { id: '13', title: 'Promises and Async/Await', duration: '28 min', completed: true, locked: false, type: 'video' },
      { id: '14', title: 'Fetch API Basics', duration: '22 min', completed: false, locked: false, type: 'video' },
      { id: '15', title: 'Error Handling in Async Code', duration: '16 min', completed: false, locked: false, type: 'video' },
      { id: '16', title: 'Working with JSON', duration: '18 min', completed: false, locked: false, type: 'video' },
      { id: '17', title: 'REST API Integration', duration: '35 min', completed: false, locked: false, type: 'video' },
      { id: '18', title: 'Project: Weather Dashboard', duration: '90 min', completed: false, locked: false, type: 'project' }
    ]
  },
  {
    id: 'react',
    title: 'React Framework',
    description: 'Build modern user interfaces with React',
    progress: 0,
    unlocked: false,
    lessons: [
      { id: '19', title: 'Introduction to React', duration: '25 min', completed: false, locked: true, type: 'video' },
      { id: '20', title: 'Components and JSX', duration: '30 min', completed: false, locked: true, type: 'video' },
      { id: '21', title: 'State and Props', duration: '35 min', completed: false, locked: true, type: 'video' },
      { id: '22', title: 'Hooks Deep Dive', duration: '40 min', completed: false, locked: true, type: 'video' },
      { id: '23', title: 'Context API', duration: '28 min', completed: false, locked: true, type: 'video' },
      { id: '24', title: 'Final Project: E-commerce App', duration: '120 min', completed: false, locked: true, type: 'project' }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Concepts',
    description: 'Master advanced JavaScript and modern development',
    progress: 0,
    unlocked: false,
    lessons: [
      { id: '25', title: 'ES6+ Features', duration: '32 min', completed: false, locked: true, type: 'video' },
      { id: '26', title: 'Module Systems', duration: '24 min', completed: false, locked: true, type: 'video' },
      { id: '27', title: 'Testing with Jest', duration: '45 min', completed: false, locked: true, type: 'video' },
      { id: '28', title: 'Build Tools & Webpack', duration: '38 min', completed: false, locked: true, type: 'video' },
      { id: '29', title: 'Performance Optimization', duration: '30 min', completed: false, locked: true, type: 'video' },
      { id: '30', title: 'Capstone Project', duration: '180 min', completed: false, locked: true, type: 'project' }
    ]
  }
];

export default function Dashboard() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem('userSession');
    if (session) {
      const sessionData = JSON.parse(session);
      const now = Date.now();

      if (sessionData.expiresAt > now) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem('userSession');
        router.push('/login');
        return;
      }
    } else {
      router.push('/login');
      return;
    }

    // Calculate overall progress
    const totalLessons = courseModules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = courseModules.reduce((acc, module) =>
      acc + module.lessons.filter(lesson => lesson.completed).length, 0);
    setOverallProgress(Math.round((completedLessons / totalLessons) * 100));
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-4 h-4" />;
      case 'text': return <BookOpen className="w-4 h-4" />;
      case 'quiz': return <MessageSquare className="w-4 h-4" />;
      case 'project': return <Code className="w-4 h-4" />;
      default: return <PlayCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20 pb-16">
        {/* Dashboard Header */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h1 className="text-4xl font-bold mb-4">Welcome back to Byteboost Academy!</h1>
                <p className="text-xl text-blue-100 mb-6">
                  Continue your journey to becoming a full-stack JavaScript developer
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold">Level 2 Developer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-200" />
                    <span>847 students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span>4.9 rating</span>
                  </div>
                </div>
              </div>

              <div className="glass-effect bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">Overall Progress</h3>
                <div className="relative">
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-2xl font-bold mt-3 block">{overallProgress}% Complete</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Module List */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold gradient-text mb-6">Course Modules</h2>

                {courseModules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`glass-effect p-6 rounded-xl border transition-all duration-300 ${
                      module.unlocked
                        ? 'cursor-pointer hover:border-blue-400 border-gray-200'
                        : 'opacity-60 border-gray-300'
                    }`}
                    onClick={() => module.unlocked && setSelectedModule(module)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          module.unlocked
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {module.unlocked ? (index + 1) : <Lock className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{module.title}</h3>
                          <p className="text-gray-300">{module.description}</p>
                        </div>
                      </div>
                      {module.unlocked && (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">
                          {module.lessons.length} lessons
                        </span>
                        <span className="text-sm text-gray-400">
                          {module.lessons.filter(l => l.completed).length} completed
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-300">{module.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="glass-effect p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4">Your Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Lessons Completed</span>
                      <span className="text-white font-semibold">18/30</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Projects Built</span>
                      <span className="text-white font-semibold">2/6</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Watch Time</span>
                      <span className="text-white font-semibold">8h 32m</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Streak</span>
                      <span className="text-white font-semibold">🔥 7 days</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-effect p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">Completed "Event Listeners"</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <PlayCircle className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">Started "Dynamic Content"</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">Unlocked DOM Module</span>
                    </div>
                  </div>
                </div>

                {/* Resources */}
                <div className="glass-effect p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 text-left text-gray-300 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Course Materials</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 text-left text-gray-300 hover:text-white transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">Community Forum</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 text-left text-gray-300 hover:text-white transition-colors">
                      <Code className="w-4 h-4" />
                      <span className="text-sm">Code Playground</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Module Details */}
            {selectedModule && (
              <div className="mt-12 glass-effect p-8 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedModule.title}</h3>
                    <p className="text-gray-300">{selectedModule.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedModule.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-4 rounded-lg border transition-all ${
                        lesson.locked
                          ? 'bg-gray-800 border-gray-700 opacity-50'
                          : lesson.completed
                          ? 'bg-green-900/20 border-green-500/30'
                          : 'bg-gray-800/50 border-gray-600 hover:border-blue-400 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        {lesson.locked ? (
                          <Lock className="w-4 h-4 text-gray-500" />
                        ) : lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          getTypeIcon(lesson.type)
                        )}
                        <span className={`font-medium ${
                          lesson.locked ? 'text-gray-500' : 'text-white'
                        }`}>
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          lesson.locked ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {lesson.duration}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          lesson.type === 'project'
                            ? 'bg-purple-900/50 text-purple-300'
                            : lesson.type === 'quiz'
                            ? 'bg-orange-900/50 text-orange-300'
                            : 'bg-blue-900/50 text-blue-300'
                        }`}>
                          {lesson.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}