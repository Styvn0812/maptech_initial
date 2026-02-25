import React, { useState } from 'react';
import {
  Play,
  FileText,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  HelpCircle } from
'lucide-react';
interface Lesson {
  id: number;
  title: string;
  type: 'Video' | 'Document' | 'Quiz';
  duration: string;
  completed: boolean;
  locked: boolean;
}
interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
  isOpen: boolean;
}
const initialModules: Module[] = [
{
  id: 1,
  title: 'Module 1: Introduction to Cybersecurity',
  isOpen: true,
  lessons: [
  {
    id: 101,
    title: 'Welcome to the Course',
    type: 'Video',
    duration: '5:30',
    completed: true,
    locked: false
  },
  {
    id: 102,
    title: 'Why Security Matters',
    type: 'Document',
    duration: '10 min read',
    completed: true,
    locked: false
  },
  {
    id: 103,
    title: 'Module 1 Quiz',
    type: 'Quiz',
    duration: '15 min',
    completed: false,
    locked: false
  }]

},
{
  id: 2,
  title: 'Module 2: Password Security',
  isOpen: false,
  lessons: [
  {
    id: 201,
    title: 'Creating Strong Passwords',
    type: 'Video',
    duration: '8:45',
    completed: false,
    locked: true
  },
  {
    id: 202,
    title: 'Two-Factor Authentication',
    type: 'Video',
    duration: '6:20',
    completed: false,
    locked: true
  }]

}];

export function CourseViewer() {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [currentLesson, setCurrentLesson] = useState(modules[0].lessons[2]); // Start at the quiz for demo
  const toggleModule = (id: number) => {
    setModules(
      modules.map((m) =>
      m.id === id ?
      {
        ...m,
        isOpen: !m.isOpen
      } :
      m
      )
    );
  };
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-6">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-lg font-bold">Cybersecurity Fundamentals</h1>
          <p className="text-sm text-slate-400">
            Module 1: Introduction to Cybersecurity
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">Course Progress</p>
            <div className="w-32 bg-slate-700 rounded-full h-1.5 mt-1">
              <div
                className="bg-green-500 h-1.5 rounded-full"
                style={{
                  width: '25%'
                }}>
              </div>
            </div>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded text-sm transition-colors">
            Exit Course
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Lesson List */}
        <div className="w-80 bg-slate-50 border-r border-slate-200 overflow-y-auto hidden md:block">
          <div className="p-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
              Course Content
            </h2>
            <div className="space-y-4">
              {modules.map((module) =>
              <div
                key={module.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">

                  <button
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 text-left"
                  onClick={() => toggleModule(module.id)}>

                    <span className="text-sm font-medium text-slate-900">
                      {module.title}
                    </span>
                    {module.isOpen ?
                  <ChevronDown className="h-4 w-4 text-slate-400" /> :

                  <ChevronRight className="h-4 w-4 text-slate-400" />
                  }
                  </button>

                  {module.isOpen &&
                <div className="border-t border-slate-200">
                      {module.lessons.map((lesson) =>
                  <button
                    key={lesson.id}
                    disabled={lesson.locked}
                    onClick={() => setCurrentLesson(lesson)}
                    className={`w-full px-4 py-3 flex items-center text-left text-sm border-l-4 transition-colors ${currentLesson.id === lesson.id ? 'bg-green-50 border-green-500 text-green-900' : 'border-transparent hover:bg-slate-50 text-slate-600'} ${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''}`}>

                          <div className="mr-3">
                            {lesson.locked ?
                      <Lock className="h-4 w-4 text-slate-400" /> :
                      lesson.completed ?
                      <CheckCircle className="h-4 w-4 text-green-500" /> :

                      <div
                        className={`h-4 w-4 rounded-full border-2 ${currentLesson.id === lesson.id ? 'border-green-500' : 'border-slate-300'}`}>
                      </div>
                      }
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5 flex items-center">
                              {lesson.type === 'Video' &&
                        <Play className="h-3 w-3 mr-1" />
                        }
                              {lesson.type === 'Document' &&
                        <FileText className="h-3 w-3 mr-1" />
                        }
                              {lesson.type === 'Quiz' &&
                        <HelpCircle className="h-3 w-3 mr-1" />
                        }
                              {lesson.duration}
                            </p>
                          </div>
                        </button>
                  )}
                    </div>
                }
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-white p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {currentLesson.title}
              </h2>
            </div>

            {/* Content Viewer */}
            <div className="aspect-video bg-slate-900 rounded-xl shadow-lg flex items-center justify-center mb-8 relative overflow-hidden group">
              {currentLesson.type === 'Video' ?
              <>
                  <Play className="h-20 w-20 text-white opacity-80 group-hover:scale-110 transition-transform cursor-pointer" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="w-full bg-slate-600 h-1 rounded-full mb-2">
                      <div className="bg-green-500 h-1 rounded-full w-1/3"></div>
                    </div>
                    <div className="flex justify-between text-white text-sm">
                      <span>1:45 / 5:30</span>
                      <span>1x</span>
                    </div>
                  </div>
                </> :
              currentLesson.type === 'Quiz' ?
              <div className="text-center p-8 bg-white w-full h-full flex flex-col items-center justify-center">
                  <HelpCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Module 1 Assessment
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md">
                    Test your knowledge of the concepts covered in this module.
                    You need to score at least 70% to unlock the next module.
                  </p>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md">
                    Start Quiz
                  </button>
                </div> :

              <div className="text-center text-white">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Document Viewer Placeholder</p>
                </div>
              }
            </div>

            {/* Lesson Details */}
            <div className="prose max-w-none text-slate-600">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                About this lesson
              </h3>
              <p>
                In this lesson, we cover the fundamental concepts of
                cybersecurity, including the CIA triad (Confidentiality,
                Integrity, Availability), common threat vectors, and the
                importance of a security-first mindset in the workplace.
              </p>
              <h4 className="text-md font-bold text-slate-900 mt-4 mb-2">
                Key Takeaways:
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Understanding the threat landscape</li>
                <li>Recognizing social engineering attempts</li>
                <li>Best practices for data protection</li>
              </ul>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-6 border-t border-slate-200">
              <button className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-900 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Lesson
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium shadow-sm">
                Next Lesson
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}