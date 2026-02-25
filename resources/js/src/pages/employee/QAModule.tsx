import React, { useState } from 'react';
import {
  MessageCircle,
  Send,
  Edit2,
  Trash2,
  Plus,
  X,
  Clock,
  CheckCircle } from
'lucide-react';
interface Question {
  id: number;
  course: string;
  question: string;
  askedAt: string;
  instructorName: string | null;
  answer: string | null;
  answeredAt: string | null;
}
const initialQuestions: Question[] = [
{
  id: 1,
  course: 'Cybersecurity Fundamentals',
  question: 'Is it true that VPNs make you completely anonymous online?',
  askedAt: '1 day ago',
  instructorName: 'Prof. Ana Reyes',
  answer:
  "Not exactly. A VPN encrypts your traffic and hides your IP from websites, but the VPN provider can still see your activity. For true anonymity, you'd need additional tools like Tor. VPNs are great for privacy and security on public networks, but they're not a silver bullet for anonymity.",
  answeredAt: '20 hours ago'
},
{
  id: 2,
  course: 'Cybersecurity Fundamentals',
  question: "What's the difference between a virus and a worm?",
  askedAt: '3 days ago',
  instructorName: null,
  answer: null,
  answeredAt: null
}];

export function QAModule() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('Question submitted! Your instructor will respond soon.');
  };
  const handleDelete = (id: number) => {
    if (window.confirm('Delete this question?')) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };
  const handleEdit = (id: number) => {
    const q = questions.find((q) => q.id === id);
    if (q) {
      setEditingId(id);
      setEditText(q.question);
    }
  };
  const handleSaveEdit = (id: number) => {
    setQuestions(
      questions.map((q) =>
      q.id === id ?
      {
        ...q,
        question: editText
      } :
      q
      )
    );
    setEditingId(null);
    setEditText('');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Q&A</h1>
          <p className="text-sm text-slate-500 mt-1">
            Ask questions and get answers from your instructors
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">

          <Plus className="h-4 w-4 mr-2" />
          Ask a Question
        </button>
      </div>

      <div className="space-y-4">
        {questions.map((q) =>
        <div
          key={q.id}
          className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">

            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    {q.course}
                  </span>
                  <span className="text-xs text-slate-400">{q.askedAt}</span>
                </div>
                {!q.answer &&
              <div className="flex gap-1">
                    <button
                  onClick={() => handleEdit(q.id)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">

                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                  onClick={() => handleDelete(q.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">

                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
              }
              </div>

              {editingId === q.id ?
            <div className="mt-3">
                  <textarea
                rows={3}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />

                  <div className="mt-2 flex justify-end gap-2">
                    <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1.5 text-sm text-slate-600">

                      Cancel
                    </button>
                    <button
                  onClick={() => handleSaveEdit(q.id)}
                  className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">

                      Save
                    </button>
                  </div>
                </div> :

            <div className="mt-3 flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-800 font-medium">
                    {q.question}
                  </p>
                </div>
            }

              {/* Instructor Answer */}
              {q.answer ?
            <div className="mt-4 ml-8 p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">
                      A
                    </div>
                    <p className="text-xs font-medium text-slate-700">
                      {q.instructorName}
                    </p>
                    <span className="text-xs text-slate-400">
                      • {q.answeredAt}
                    </span>
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 ml-auto" />
                  </div>
                  <p className="text-sm text-slate-600">{q.answer}</p>
                </div> :

            <div className="mt-4 ml-8 p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <p className="text-xs text-slate-500">
                    Waiting for instructor response...
                  </p>
                </div>
            }
            </div>
          </div>
        )}
      </div>

      {/* Ask Question Modal */}
      {isModalOpen &&
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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-slate-900">
                    Ask a Question
                  </h3>
                  <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-500">

                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleAsk} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Course
                    </label>
                    <select className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                      <option>Cybersecurity Fundamentals</option>
                      <option>Leadership Training 101</option>
                      <option>Data Privacy Compliance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Your Question
                    </label>
                    <textarea
                    rows={4}
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Type your question here..." />

                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:col-start-2 sm:text-sm">

                      <Send className="h-4 w-4 mr-2" />
                      Submit Question
                    </button>
                    <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 sm:mt-0 sm:col-start-1 sm:text-sm">

                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

}