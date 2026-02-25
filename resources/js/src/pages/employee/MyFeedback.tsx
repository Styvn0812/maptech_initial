import React, { useState } from 'react';
import { MessageSquare, Star, Plus, Edit2, Trash2, X } from 'lucide-react';
interface Feedback {
  id: number;
  courseTitle: string;
  rating: number;
  comment: string;
  date: string;
}
const initialFeedback: Feedback[] = [
{
  id: 1,
  courseTitle: 'Cybersecurity Fundamentals',
  rating: 5,
  comment: 'Excellent course! Very practical examples.',
  date: '2025-02-10'
},
{
  id: 2,
  courseTitle: 'Workplace Safety',
  rating: 4,
  comment: 'Good content but the videos were a bit long.',
  date: '2025-01-28'
}];

export function MyFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedback);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const handleDelete = (id: number) => {
    if (window.confirm('Delete this feedback?')) {
      setFeedbacks(feedbacks.filter((f) => f.id !== id));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('Feedback submitted! Thank you.');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">My Feedback</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">

          <Plus className="h-4 w-4 mr-2" />
          Give Feedback
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {feedbacks.map((feedback) =>
        <div
          key={feedback.id}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">

            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {feedback.courseTitle}
                </h3>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) =>
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />

                )}
                  <span className="ml-2 text-sm text-slate-500">
                    {feedback.date}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                onClick={() => handleDelete(feedback.id)}
                className="p-2 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50">

                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-slate-700 italic">"{feedback.comment}"</p>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
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
                    Give Course Feedback
                  </h3>
                  <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-500">

                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Select Course
                    </label>
                    <select className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                      <option>Leadership Training 101</option>
                      <option>Data Privacy Compliance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Rating
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) =>
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none">

                          <Star
                        className={`h-8 w-8 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />

                        </button>
                    )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Comments
                    </label>
                    <textarea
                    rows={4}
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Share your thoughts about the course..." />

                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm">

                      Submit Feedback
                    </button>
                    <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm">

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