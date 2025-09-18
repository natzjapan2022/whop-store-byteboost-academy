"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import LessonViewer from "@/components/LessonViewer";
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
  ChevronRight,
  Info,
  Sparkles,
} from "lucide-react";
import {
  courseModules,
  getProgress,
  getModuleProgress,
  getOverallProgress,
  isModuleUnlocked,
  saveProgress,
  type Module,
  type Lesson,
} from "@/data/courseData";

export default function Dashboard() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [modules, setModules] = useState<Module[]>(courseModules);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [totalStudents] = useState(5);
  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
  const [totalLessonsCount, setTotalLessonsCount] = useState(0);

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem("userSession");
    if (session) {
      const sessionData = JSON.parse(session);
      const now = Date.now();

      if (sessionData.expiresAt > now) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem("userSession");
        router.replace("/login");
        return;
      }
    } else {
      router.replace("/login");
      return;
    }

    // Load progress and update modules
    loadProgress();
  }, [router]);

  const loadProgress = () => {
    const progress = getProgress();

    // Update modules with current progress and unlock status
    const updatedModules = courseModules.map((module, index) => {
      const moduleProgress = progress[module.id] || {};

      // Update lessons with completion status
      const updatedLessons = module.lessons.map((lesson) => ({
        ...lesson,
        completed: moduleProgress[lesson.id] === true,
        locked: index === 0 ? false : !isModuleUnlocked(index, courseModules),
      }));

      return {
        ...module,
        lessons: updatedLessons,
        progress: getModuleProgress(module.id, module.lessons),
        unlocked: isModuleUnlocked(index, courseModules),
      };
    });

    setModules(updatedModules);

    // Calculate overall progress
    const overall = getOverallProgress(courseModules);
    setOverallProgress(overall);

    // Calculate lesson counts
    const totalLessons = courseModules.reduce(
      (acc, module) => acc + module.lessons.length,
      0
    );
    let completedLessons = 0;

    courseModules.forEach((module) => {
      const moduleProgress = progress[module.id] || {};
      completedLessons += module.lessons.filter(
        (lesson) => moduleProgress[lesson.id] === true
      ).length;
    });

    setTotalLessonsCount(totalLessons);
    setCompletedLessonsCount(completedLessons);
  };

  const handleLessonComplete = (lessonId: string) => {
    loadProgress(); // Reload progress to update UI
  };

  const handleLessonClick = (lesson: Lesson, moduleId: string) => {
    console.log("Lesson clicked:", lesson.title, "Locked:", lesson.locked);
    if (lesson.locked) return;

    // Update lesson with module context and store moduleId
    const moduleProgress = getProgress()[moduleId] || {};
    const updatedLesson = {
      ...lesson,
      completed: moduleProgress[lesson.id] === true,
    };

    // Store the current module ID for the lesson viewer
    setSelectedModule(modules.find((m) => m.id === moduleId) || null);
    setSelectedLesson(updatedLesson);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getTypeIcon = (lesson: Lesson) => {
    switch (lesson.type) {
      case "video":
        // Show different icon based on video availability
        if (lesson.content.videoUrl) {
          return <PlayCircle className="w-4 h-4 text-green-400" />;
        } else {
          return <PlayCircle className="w-4 h-4 text-gray-400" />;
        }
      case "text":
        return <BookOpen className="w-4 h-4" />;
      case "quiz":
        return <MessageSquare className="w-4 h-4" />;
      case "project":
        return <Code className="w-4 h-4" />;
      default:
        return <PlayCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="pt-20 pb-16">
        {/* Dashboard Header */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h1 className="text-4xl font-bold mb-4">
                  Welcome back to Byteboost Academy!
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  Continue your journey to becoming a full-stack JavaScript
                  developer
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold">Level 1 Developer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-200" />
                    <span>{totalStudents} students</span>
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
                  <span className="text-2xl font-bold mt-3 block">
                    {overallProgress}% Complete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Update Alert */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-effect bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">🚀 More Content Coming Soon!</h3>
                  <p className="text-blue-100 text-sm">
                    We&apos;re constantly updating our course content with new lessons, projects, and advanced topics.
                    Stay tuned for exciting updates including Node.js, databases, and full-stack development!
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="animate-pulse">
                    <Info className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold gradient-text mb-6">
              Course Modules
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Module List */}
              <div className="lg:col-span-2 space-y-6">

                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`glass-effect p-6 rounded-xl border transition-all duration-300 ${
                      module.unlocked
                        ? "cursor-pointer hover:border-blue-400 border-gray-200"
                        : "opacity-60 border-gray-300"
                    }`}
                    onClick={() => {
                      console.log(
                        "Module clicked:",
                        module.title,
                        "Unlocked:",
                        module.unlocked
                      );
                      if (module.unlocked) {
                        setSelectedModule(module);
                        // Scroll to the selected module details section
                        setTimeout(() => {
                          const moduleDetailsElement = document.getElementById('selected-module-details');
                          if (moduleDetailsElement) {
                            moduleDetailsElement.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start'
                            });
                          }
                        }, 100);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            module.unlocked
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {module.unlocked ? (
                            index + 1
                          ) : (
                            <Lock className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {module.title}
                          </h3>
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
                          {module.lessons.filter((l) => l.completed).length}{" "}
                          completed
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-300">
                          {module.progress}%
                        </span>
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
                      <span className="text-white font-semibold">{completedLessonsCount}/{totalLessonsCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Projects Built</span>
                      <span className="text-white font-semibold">{courseModules.filter(m => m.lessons.some(l => l.type === 'project')).reduce((acc, module) => {
                        const progress = getProgress()[module.id] || {};
                        return acc + module.lessons.filter(l => l.type === 'project' && progress[l.id] === true).length;
                      }, 0)}/{courseModules.reduce((acc, m) => acc + m.lessons.filter(l => l.type === 'project').length, 0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Streak</span>
                      <span className="text-white font-semibold">🔥 {Math.max(1, Math.min(7, Math.floor(completedLessonsCount / 3) + 1))} {Math.max(1, Math.min(7, Math.floor(completedLessonsCount / 3) + 1)) === 1 ? 'day' : 'days'}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-effect p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {(() => {
                      const progress = getProgress();
                      const recentActivities = [];

                      // Get completed lessons from progress
                      Object.keys(progress).forEach(moduleId => {
                        const moduleProgress = progress[moduleId];
                        const courseModule = courseModules.find(m => m.id === moduleId);
                        if (courseModule) {
                          Object.keys(moduleProgress).forEach(lessonId => {
                            if (moduleProgress[lessonId] === true) {
                              const lesson = courseModule.lessons.find(l => l.id === lessonId);
                              if (lesson) {
                                recentActivities.push({
                                  type: 'completed',
                                  icon: <CheckCircle className="w-4 h-4 text-green-400" />,
                                  text: `Completed "${lesson.title}"`
                                });
                              }
                            }
                          });
                        }
                      });

                      // Add some dynamic activities based on progress
                      if (overallProgress >= 20) {
                        recentActivities.unshift({
                          type: 'unlocked',
                          icon: <Trophy className="w-4 h-4 text-yellow-400" />,
                          text: "Unlocked DOM Module"
                        });
                      }

                      if (completedLessonsCount > 0) {
                        const lastCompletedModule = modules.find(m => m.lessons.some(l => l.completed));
                        if (lastCompletedModule) {
                          const inProgressLesson = lastCompletedModule.lessons.find(l => !l.completed && !l.locked);
                          if (inProgressLesson) {
                            recentActivities.unshift({
                              type: 'started',
                              icon: <PlayCircle className="w-4 h-4 text-blue-400" />,
                              text: `Started "${inProgressLesson.title}"`
                            });
                          }
                        }
                      }

                      return recentActivities.slice(0, 3).map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {activity.icon}
                          <span className="text-sm text-gray-300">{activity.text}</span>
                        </div>
                      ));
                    })()}
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
              <div id="selected-module-details" className="mt-12 glass-effect p-8 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedModule.title}
                    </h3>
                    <p className="text-gray-300">
                      {selectedModule.description}
                    </p>
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
                      onClick={() =>
                        handleLessonClick(lesson, selectedModule.id)
                      }
                      className={`p-4 rounded-lg border transition-all ${
                        lesson.locked
                          ? "bg-gray-800 border-gray-700 opacity-50"
                          : lesson.completed
                          ? "bg-green-900/20 border-green-500/30 cursor-pointer hover:border-green-400"
                          : "bg-gray-800/50 border-gray-600 hover:border-blue-400 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        {lesson.locked ? (
                          <Lock className="w-4 h-4 text-gray-500" />
                        ) : lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          getTypeIcon(lesson)
                        )}
                        <span
                          className={`font-medium ${
                            lesson.locked ? "text-gray-500" : "text-white"
                          }`}
                        >
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm ${
                            lesson.locked ? "text-gray-600" : "text-gray-400"
                          }`}
                        >
                          {lesson.duration}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            lesson.type === "project"
                              ? "bg-purple-900/50 text-purple-300"
                              : lesson.type === "quiz"
                              ? "bg-orange-900/50 text-orange-300"
                              : "bg-blue-900/50 text-blue-300"
                          }`}
                        >
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

      {/* Lesson Viewer Modal */}
      {selectedLesson && (
        <LessonViewer
          lesson={selectedLesson}
          moduleId={selectedModule?.id || ""}
          onClose={() => setSelectedLesson(null)}
          onComplete={handleLessonComplete}
        />
      )}
    </div>
  );
}
