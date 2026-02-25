    import React, { useState } from 'react';
    import {
      Plus,
      Video,
      FileText,
      Trash2,
      Edit2,
      ChevronDown,
      ChevronRight,
      Upload,
      CheckCircle,
      GripVertical,
      File } from
    'lucide-react';
    interface Lesson {
      id: number;
      title: string;
      type: 'Video' | 'Document' | 'Text';
      duration: string;
      status: 'Published' | 'Draft';
      fileSize?: string;
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
        status: 'Published',
        fileSize: '45 MB'
      },
      {
        id: 102,
        title: 'Why Security Matters',
        type: 'Document',
        duration: '10 min read',
        status: 'Published',
        fileSize: '2.3 MB'
      },
      {
        id: 103,
        title: 'CIA Triad Explained',
        type: 'Text',
        duration: '8 min read',
        status: 'Draft'
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
        status: 'Published',
        fileSize: '72 MB'
      },
      {
        id: 202,
        title: 'Two-Factor Authentication',
        type: 'Video',
        duration: '6:20',
        status: 'Draft',
        fileSize: '55 MB'
      },
      {
        id: 203,
        title: 'Password Manager Guide',
        type: 'Document',
        duration: '5 min read',
        status: 'Published',
        fileSize: '1.1 MB'
      }]

    },
    {
      id: 3,
      title: 'Module 3: Phishing & Social Engineering',
      isOpen: false,
      lessons: []
    }];

    export function LessonVideoUpload() {
      const [selectedCourse, setSelectedCourse] = useState(
        'Cybersecurity Fundamentals'
      );
      const [modules, setModules] = useState<Module[]>(initialModules);
      const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
      const [uploadType, setUploadType] = useState<'video' | 'document' | 'text'>(
        'video'
      );
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
      const handleDeleteLesson = (moduleId: number, lessonId: number) => {
        if (window.confirm('Delete this lesson?')) {
          setModules(
            modules.map((m) =>
            m.id === moduleId ?
            {
              ...m,
              lessons: m.lessons.filter((l) => l.id !== lessonId)
            } :
            m
            )
          );
        }
      };
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Lessons & Video Upload
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage learning content for your courses
              </p>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </button>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">

                <Upload className="h-4 w-4 mr-2" />
                Upload Content
              </button>
            </div>
          </div>

          {/* Course Selector */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md border">

              <option>Cybersecurity Fundamentals</option>
              <option>Leadership Training 101</option>
              <option>Data Privacy Compliance</option>
            </select>
          </div>

          {/* Modules List */}
          <div className="space-y-4">
            {modules.map((module) =>
            <div
              key={module.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">

                <div
                className="bg-slate-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => toggleModule(module.id)}>

                  <div className="flex items-center">
                    <GripVertical className="h-4 w-4 text-slate-300 mr-2" />
                    {module.isOpen ?
                  <ChevronDown className="h-5 w-5 text-slate-400 mr-2" /> :

                  <ChevronRight className="h-5 w-5 text-slate-400 mr-2" />
                  }
                    <h3 className="text-sm font-medium text-slate-900">
                      {module.title}
                    </h3>
                    <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
                      {module.lessons.length} Lessons
                    </span>
                  </div>
                  <div
                  className="flex space-x-2"
                  onClick={(e) => e.stopPropagation()}>

                    <button className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {module.isOpen &&
              <div className="border-t border-slate-200 divide-y divide-slate-100">
                    {module.lessons.length === 0 ?
                <div className="p-8 text-center text-slate-500 text-sm">
                        No lessons yet. Click "Upload Content" to add lessons to
                        this module.
                      </div> :

                module.lessons.map((lesson) =>
                <div
                  key={lesson.id}
                  className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">

                          <div className="flex items-center">
                            <GripVertical className="h-4 w-4 text-slate-300 mr-3" />
                            <div
                      className={`p-2 rounded-lg mr-3 ${lesson.type === 'Video' ? 'bg-blue-100 text-blue-600' : lesson.type === 'Document' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>

                              {lesson.type === 'Video' &&
                      <Video className="h-4 w-4" />
                      }
                              {lesson.type === 'Document' &&
                      <File className="h-4 w-4" />
                      }
                              {lesson.type === 'Text' &&
                      <FileText className="h-4 w-4" />
                      }
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">
                                {lesson.title}
                              </p>
                              <div className="flex items-center text-xs text-slate-500 mt-0.5 gap-2">
                                <span>{lesson.type}</span>
                                <span>•</span>
                                <span>{lesson.duration}</span>
                                {lesson.fileSize &&
                        <>
                                    <span>•</span>
                                    <span>{lesson.fileSize}</span>
                                  </>
                        }
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${lesson.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>

                              {lesson.status}
                            </span>
                            <div className="flex space-x-2">
                              <button className="text-slate-400 hover:text-blue-600">
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                        onClick={() =>
                        handleDeleteLesson(module.id, lesson.id)
                        }
                        className="text-slate-400 hover:text-red-600">

                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                )
                }
                  </div>
              }
              </div>
            )}
          </div>

          {/* Upload Modal */}
          {isUploadModalOpen &&
          <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true">

                  <div className="absolute inset-0 bg-slate-500 opacity-75"></div>
                </div>
                <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true">

                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-slate-900 mb-4">
                      Upload Learning Content
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Lesson Title
                        </label>
                        <input
                        type="text"
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="e.g. Introduction to Encryption" />

                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Target Module
                        </label>
                        <select className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                          {modules.map((m) =>
                        <option key={m.id} value={m.id}>
                              {m.title}
                            </option>
                        )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Content Type
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {(['video', 'document', 'text'] as const).map((type) =>
                        <button
                          key={type}
                          type="button"
                          onClick={() => setUploadType(type)}
                          className={`p-3 rounded-lg border-2 text-center transition-colors ${uploadType === type ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>

                              {type === 'video' &&
                          <Video className="h-5 w-5 mx-auto mb-1" />
                          }
                              {type === 'document' &&
                          <File className="h-5 w-5 mx-auto mb-1" />
                          }
                              {type === 'text' &&
                          <FileText className="h-5 w-5 mx-auto mb-1" />
                          }
                              <span className="text-xs font-medium capitalize">
                                {type}
                              </span>
                            </button>
                        )}
                        </div>
                      </div>

                      {uploadType !== 'text' ?
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                          <Upload className="mx-auto h-12 w-12 text-slate-400" />
                          <p className="mt-1 text-sm text-slate-600">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-slate-500">
                            {uploadType === 'video' ?
                        'MP4, WebM up to 500MB' :
                        'PDF, DOCX, PPTX up to 50MB'}
                          </p>
                        </div> :

                    <div>
                          <label className="block text-sm font-medium text-slate-700">
                            Lesson Content
                          </label>
                          <textarea
                        rows={6}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="Write your lesson content here..." />

                        </div>
                    }

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                        onClick={() => {
                          setIsUploadModalOpen(false);
                          alert('Content uploaded successfully!');
                        }}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:col-start-2 sm:text-sm">

                          Upload & Save
                        </button>
                        <button
                        onClick={() => setIsUploadModalOpen(false)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 sm:mt-0 sm:col-start-1 sm:text-sm">

                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>);

    }