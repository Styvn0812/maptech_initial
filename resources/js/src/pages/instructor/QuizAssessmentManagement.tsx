import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle,
  HelpCircle } from
'lucide-react';
interface Question {
  id: number;
  text: string;
  type: 'MCQ' | 'Identification' | 'Essay';
  options?: string[];
  correctAnswer?: string;
  points: number;
}
interface Quiz {
  id: number;
  title: string;
  course: string;
  module: string;
  questions: Question[];
  passingScore: number;
  status: 'Active' | 'Draft';
  attempts: number;
  avgScore: number;
}
const initialQuizzes: Quiz[] = [
{
  id: 1,
  title: 'Module 1: Cybersecurity Basics',
  course: 'Cybersecurity Fundamentals',
  module: 'Module 1',
  passingScore: 70,
  status: 'Active',
  attempts: 142,
  avgScore: 78,
  questions: [
  {
    id: 1,
    text: 'What is the most common form of cyber attack?',
    type: 'MCQ',
    options: ['Phishing', 'DDoS', 'Malware', 'Ransomware'],
    correctAnswer: 'Phishing',
    points: 5
  },
  {
    id: 2,
    text: 'Define the CIA triad in cybersecurity.',
    type: 'Essay',
    points: 10
  },
  {
    id: 3,
    text: 'What does HTTPS stand for?',
    type: 'Identification',
    correctAnswer: 'HyperText Transfer Protocol Secure',
    points: 5
  }]

},
{
  id: 2,
  title: 'Module 2: Password Security Quiz',
  course: 'Cybersecurity Fundamentals',
  module: 'Module 2',
  passingScore: 70,
  status: 'Active',
  attempts: 98,
  avgScore: 82,
  questions: [
  {
    id: 4,
    text: 'What is the minimum recommended password length?',
    type: 'MCQ',
    options: [
    '6 characters',
    '8 characters',
    '12 characters',
    '16 characters'],

    correctAnswer: '12 characters',
    points: 5
  }]

},
{
  id: 3,
  title: 'Leadership Styles Assessment',
  course: 'Leadership Training 101',
  module: 'Module 1',
  passingScore: 70,
  status: 'Draft',
  attempts: 0,
  avgScore: 0,
  questions: []
}];

export function QuizAssessmentManagement() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [view, setView] = useState<'list' | 'builder'>('list');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [newQuestionType, setNewQuestionType] = useState<
    'MCQ' | 'Identification' | 'Essay'>(
    'MCQ');
  const openBuilder = (quiz?: Quiz) => {
    setSelectedQuiz(
      quiz || {
        id: Date.now(),
        title: '',
        course: 'Cybersecurity Fundamentals',
        module: 'Module 1',
        passingScore: 70,
        status: 'Draft',
        attempts: 0,
        avgScore: 0,
        questions: []
      }
    );
    setView('builder');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Quiz & Assessment Management
        </h1>
        {view === 'list' ?
        <button
          onClick={() => openBuilder()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">

            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </button> :

        <button
          onClick={() => setView('list')}
          className="text-sm text-slate-600 hover:text-slate-900 font-medium">

            ← Back to Quiz List
          </button>
        }
      </div>

      {view === 'list' ?
      <div className="grid grid-cols-1 gap-6">
          {quizzes.map((quiz) =>
        <div
          key={quiz.id}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">

              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {quiz.title}
                    </h3>
                    <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${quiz.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>

                      {quiz.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    {quiz.course} → {quiz.module}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-4 border-t border-slate-100 pt-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-900">
                    {quiz.questions.length}
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Questions
                  </p>
                </div>
                <div className="text-center border-l border-slate-100">
                  <p className="text-xl font-bold text-slate-900">
                    {quiz.passingScore}%
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Passing
                  </p>
                </div>
                <div className="text-center border-l border-slate-100">
                  <p className="text-xl font-bold text-slate-900">
                    {quiz.attempts}
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Attempts
                  </p>
                </div>
                <div className="text-center border-l border-slate-100">
                  <p className="text-xl font-bold text-slate-900">
                    {quiz.avgScore || '—'}%
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Avg Score
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-md">
                  <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                  Sequential rule: Next module locked until quiz passed (70%)
                </div>
                <div className="flex space-x-3">
                  <button
                onClick={() => openBuilder(quiz)}
                className="inline-flex items-center px-3 py-1.5 border border-slate-300 shadow-sm text-sm font-medium rounded text-slate-700 bg-white hover:bg-slate-50">

                    <Edit2 className="h-4 w-4 mr-1.5 text-slate-500" />
                    Edit
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 border border-red-200 shadow-sm text-sm font-medium rounded text-red-700 bg-white hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
        )}
        </div> /* Quiz Builder */ :

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Quiz Title
                </label>
                <input
                type="text"
                defaultValue={selectedQuiz?.title}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="e.g. Module 1 Assessment" />

              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Course
                </label>
                <select
                defaultValue={selectedQuiz?.course}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">

                  <option>Cybersecurity Fundamentals</option>
                  <option>Leadership Training 101</option>
                  <option>Data Privacy Compliance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Passing Score (%)
                </label>
                <input
                type="number"
                defaultValue={selectedQuiz?.passingScore || 70}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-slate-900">
                  Questions
                </h3>
                <div className="flex items-center gap-2">
                  <select
                  value={newQuestionType}
                  onChange={(e) => setNewQuestionType(e.target.value as any)}
                  className="border border-slate-300 rounded-md shadow-sm py-1.5 px-3 text-sm focus:outline-none focus:ring-green-500 focus:border-green-500">

                    <option value="MCQ">Multiple Choice</option>
                    <option value="Identification">Identification</option>
                    <option value="Essay">Essay</option>
                  </select>
                  <button className="inline-flex items-center px-3 py-1.5 text-sm text-green-600 font-medium hover:text-green-700 border border-green-300 rounded-md hover:bg-green-50">
                    <Plus className="h-4 w-4 mr-1" /> Add Question
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* MCQ Example */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-800">
                      MCQ • 5 pts
                    </span>
                    <button className="text-slate-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                  type="text"
                  defaultValue="What is the most common form of cyber attack?"
                  className="block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mb-3" />

                  <div className="space-y-2">
                    {['Phishing', 'DDoS', 'Malware', 'Ransomware'].map(
                    (opt, i) =>
                    <div key={i} className="flex items-center">
                          <input
                        type="radio"
                        name="q1"
                        defaultChecked={i === 0}
                        className="focus:ring-green-500 h-4 w-4 text-green-600 border-slate-300" />

                          <input
                        type="text"
                        defaultValue={opt}
                        className="ml-2 block w-full border border-slate-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                        </div>

                  )}
                  </div>
                </div>

                {/* Essay Example */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-purple-100 text-purple-800">
                      Essay • 10 pts
                    </span>
                    <button className="text-slate-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                  type="text"
                  defaultValue="Define the CIA triad in cybersecurity."
                  className="block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  <p className="text-xs text-slate-500 mt-2 flex items-center">
                    <HelpCircle className="h-3 w-3 mr-1" /> Essay answers
                    require manual grading by the instructor.
                  </p>
                </div>

                {/* Identification Example */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-teal-100 text-teal-800">
                      Identification • 5 pts
                    </span>
                    <button className="text-slate-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                  type="text"
                  defaultValue="What does HTTPS stand for?"
                  className="block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm mb-2" />

                  <div>
                    <label className="text-xs font-medium text-slate-500">
                      Correct Answer:
                    </label>
                    <input
                    type="text"
                    defaultValue="HyperText Transfer Protocol Secure"
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
              onClick={() => setView('list')}
              className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">

                Cancel
              </button>
              <button
              onClick={() => {
                setView('list');
                alert('Quiz saved!');
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">

                Save Quiz
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}