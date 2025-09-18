'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, PlayCircle, BookOpen, MessageSquare, Code, Clock, Upload, FileText, Trash2 } from 'lucide-react';

// Import Prism.js for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme
import { Lesson } from '@/data/courseData';
import { saveProgress } from '@/data/courseData';

interface LessonViewerProps {
  lesson: Lesson;
  moduleId: string;
  onClose: () => void;
  onComplete: (lessonId: string) => void;
}

export default function LessonViewer({ lesson, moduleId, onClose, onComplete }: LessonViewerProps) {
  const [isCompleted, setIsCompleted] = useState(lesson.completed);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProjectSubmitted, setIsProjectSubmitted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState(false);

  useEffect(() => {
    // Load language components dynamically
    const loadLanguages = async () => {
      try {
        // Load JavaScript language support
        await import('prismjs/components/prism-javascript' as any);
        // Load markup/HTML language support
        await import('prismjs/components/prism-markup' as any);
        // Load CSS language support
        await import('prismjs/components/prism-css' as any);

        // Highlight code blocks after languages are loaded
        Prism.highlightAll();
      } catch (error) {
        console.warn('Failed to load Prism language components:', error);
        // Fallback: highlight without additional languages
        Prism.highlightAll();
      }
    };

    loadLanguages();

    // Load project submission state if this is a project lesson
    if (lesson.type === 'project') {
      const submissionKey = `project_${moduleId}_${lesson.id}`;
      const savedSubmission = localStorage.getItem(submissionKey);
      if (savedSubmission) {
        const submissionData = JSON.parse(savedSubmission);
        setIsProjectSubmitted(submissionData.submitted);
        if (submissionData.files) {
          // Note: We can't restore actual File objects, but we can show the names
          setUploadedFiles(submissionData.files.map((fileData: any) => ({
            name: fileData.name,
            size: fileData.size,
            type: fileData.type
          }) as File));
        }
      }
    }
  }, [lesson, moduleId]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-5 h-5" />;
      case 'text': return <BookOpen className="w-5 h-5" />;
      case 'quiz': return <MessageSquare className="w-5 h-5" />;
      case 'project': return <Code className="w-5 h-5" />;
      default: return <PlayCircle className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-blue-400';
      case 'text': return 'text-green-400';
      case 'quiz': return 'text-orange-400';
      case 'project': return 'text-purple-400';
      default: return 'text-blue-400';
    }
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
    saveProgress(moduleId, lesson.id, true);
    onComplete(lesson.id);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      simulateUpload(newFiles);
    }
  };

  const simulateUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setIsUploading(false);
    setUploadProgress(100);
    setFilesUploaded(true); // Files uploaded, but not submitted yet
  };

  const handleSubmitProject = async () => {
    setIsUploading(true);

    // Simulate submission process
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsProjectSubmitted(true);

    // Save project submission to localStorage
    const submissionKey = `project_${moduleId}_${lesson.id}`;
    const submissionData = {
      submitted: true,
      submittedAt: Date.now(),
      files: uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    };
    localStorage.setItem(submissionKey, JSON.stringify(submissionData));

    setIsUploading(false);

    // Auto-complete the lesson after submission
    setTimeout(() => {
      handleMarkComplete();
    }, 500);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Function to convert markdown-style text to HTML with syntax highlighting
  const renderContentWithSyntaxHighlighting = (content: string) => {
    if (!content) return null;

    // Split content by code blocks
    const parts = content.split(/```(\w+)?\n([\s\S]*?)```/g);
    const elements = [];

    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        // Regular text content
        if (parts[i].trim()) {
          elements.push(
            <div key={i} className="prose prose-invert max-w-none mb-4">
              <div
                className="whitespace-pre-wrap text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: parts[i]
                    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mb-4 mt-6">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-blue-400 mb-3 mt-5">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium text-cyan-400 mb-2 mt-4">$1</h3>')
                    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-1 py-0.5 rounded text-green-400 font-mono text-sm">$1</code>')
                }}
              />
            </div>
          );
        }
      } else if (i % 3 === 1) {
        // Language identifier
        continue;
      } else if (i % 3 === 2) {
        // Code block content
        let language = parts[i - 1] || 'javascript';
        // Map common language names to Prism language names
        if (language === 'html') language = 'markup';
        if (language === 'js') language = 'javascript';

        elements.push(
          <div key={i} className="mb-6">
            <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-700">
              <code className={`language-${language}`}>
                {parts[i].trim()}
              </code>
            </pre>
          </div>
        );
      }
    }

    return <div>{elements}</div>;
  };

  const renderContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
              {lesson.content.videoUrl ? (
                <>
                  <video
                    controls
                    className="w-full h-full object-cover"
                    poster="/api/placeholder/800/450"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src={lesson.content.videoUrl} type="video/mp4" />
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white">
                        <PlayCircle className="w-16 h-16 mx-auto mb-4" />
                        <p>Your browser doesn't support video playback</p>
                      </div>
                    </div>
                  </video>
                  {/* Play button overlay - hidden when video is playing */}
                  {!isVideoPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 bg-blue-600/80 rounded-full flex items-center justify-center">
                        <PlayCircle className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-blue-500 transition-colors cursor-pointer">
                        <PlayCircle className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-blue-400 rounded-full animate-ping opacity-20"></div>
                      </div>
                    </div>
                    <p className="text-gray-300 font-medium">Click to Play Video</p>
                  </div>
                </div>
              )}
            </div>
            {lesson.content.textContent && renderContentWithSyntaxHighlighting(lesson.content.textContent)}
          </div>
        );

      case 'text':
        return renderContentWithSyntaxHighlighting(lesson.content.textContent || '');

      case 'project':
        return (
          <div className="space-y-6">
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Code className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Project Instructions</h3>
              </div>
              {renderContentWithSyntaxHighlighting(lesson.content.projectInstructions || '')}
            </div>

            {/* File Upload Section */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                {isProjectSubmitted ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <Upload className="w-6 h-6 text-blue-400" />
                )}
                <h3 className="text-xl font-bold text-white">
                  {isProjectSubmitted ? 'Submitted Project' : 'Submit Your Project'}
                </h3>
              </div>

              {!isCompleted && !isProjectSubmitted && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".html,.css,.js,.zip,.txt,.md,.json"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-white font-medium mb-2">Click to upload your project files</p>
                      <p className="text-gray-400 text-sm">
                        Supports HTML, CSS, JS, ZIP, TXT, MD, JSON files
                      </p>
                    </label>
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-lg font-semibold text-white">Uploaded Files:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      {!isCompleted && (
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button - shown after files are uploaded but before submission */}
              {filesUploaded && !isProjectSubmitted && !isCompleted && (
                <div className="mt-6">
                  <button
                    onClick={handleSubmitProject}
                    disabled={isUploading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Submit Project</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {isCompleted && uploadedFiles.length > 0 && (
                <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">Project submitted successfully!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold text-white">Quiz</h3>
              </div>
              <p className="text-gray-300">Quiz functionality would be implemented here</p>
            </div>
          </div>
        );

      default:
        return <p className="text-gray-400">Content not available</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-effect bg-gray-900/90 backdrop-blur-md max-w-4xl w-full max-h-[90vh] rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg bg-gray-800/50 ${getTypeColor(lesson.type)}`}>
              {getTypeIcon(lesson.type)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-gray-400 flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.duration}</span>
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  lesson.type === 'project'
                    ? 'bg-purple-900/50 text-purple-300'
                    : lesson.type === 'quiz'
                    ? 'bg-orange-900/50 text-orange-300'
                    : lesson.type === 'text'
                    ? 'bg-green-900/50 text-green-300'
                    : 'bg-blue-900/50 text-blue-300'
                }`}>
                  {lesson.type}
                </span>
                {isCompleted && (
                  <span className="flex items-center space-x-1 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Completed</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <p className="text-gray-300 mb-6">{lesson.content.description}</p>
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-t border-gray-700/50 bg-gray-900/50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Close
          </button>
          {!isCompleted && lesson.type !== 'project' && (
            <button
              onClick={handleMarkComplete}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark as Complete</span>
            </button>
          )}
          {!isCompleted && lesson.type === 'project' && (
            <div className="text-blue-400 text-sm">
              Upload your project files to complete this lesson
            </div>
          )}
        </div>
      </div>
    </div>
  );
}