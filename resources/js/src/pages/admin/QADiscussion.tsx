import { useState, useEffect, useRef } from 'react';
import { Send, Edit2, Trash2, Clock } from 'lucide-react';

interface Question {
  id: number;
  student: string;
  department: string;
  course: string;
  question: string;
  askedAt: string;
  answer: string | null;
  answeredAt: string | null;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    student: 'Elena Reyes',
    department: 'Finance',
    course: 'Cybersecurity Fundamentals',
    question:
      "Can you explain the difference between symmetric and asymmetric encryption? I'm confused about when to use each one.",
    askedAt: '30 min ago',
    answer: null,
    answeredAt: null
  },
  {
    id: 2,
    student: 'Andres Bonifacio',
    department: 'Operations',
    course: 'Data Privacy Compliance',
    question:
      'What are the key elements that must be included in a Data Processing Agreement under the Philippine Data Privacy Act?',
    askedAt: '2 hours ago',
    answer: null,
    answeredAt: null
  },
  {
    id: 3,
    student: 'Juan Dela Cruz',
    department: 'IT',
    course: 'Cybersecurity Fundamentals',
    question: 'Is it true that VPNs make you completely anonymous online?',
    askedAt: '1 day ago',
    answer:
      "Not exactly. A VPN encrypts your traffic and hides your IP from websites, but the VPN provider can still see your activity. For true anonymity, you'd need additional tools like Tor. VPNs are great for privacy and security on public networks, but they're not a silver bullet for anonymity.",
    answeredAt: '20 hours ago'
  },
  {
    id: 4,
    student: 'Maria Santos',
    department: 'HR',
    course: 'Leadership Training 101',
    question:
      'How do you handle a situation where a team member disagrees with a decision made using democratic leadership?',
    askedAt: '2 days ago',
    answer:
      'Great question! In democratic leadership, the key is that everyone has a voice, but the final decision may not satisfy everyone. When someone disagrees: 1) Acknowledge their perspective, 2) Explain the reasoning behind the majority decision, 3) Offer to revisit the decision if new information arises. The goal is to maintain trust and open communication.',
    answeredAt: '1 day ago'
  }
];

export function QADiscussion() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const bcRef = useRef<BroadcastChannel | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'answered'>('all');
  const filtered = questions.filter((q) => {
    if (filter === 'unanswered') return !q.answer;
    if (filter === 'answered') return !!q.answer;
    return true;
  });
  const handleReply = (id: number) => {
    if (!replyText.trim()) return;
    const newQs = questions.map((q) =>
      q.id === id
        ? {
            ...q,
            answer: replyText,
            answeredAt: 'Just now'
          }
        : q
    );
    setQuestions(newQs);
    try {
      localStorage.setItem('qa-questions', JSON.stringify(newQs));
      bcRef.current?.postMessage('qa-updated');
      localStorage.setItem('qa-updated', Date.now().toString());
    } catch (e) {}
    setReplyText('');
    setReplyingTo(null);
  };
  const handleDeleteAnswer = (id: number) => {
    if (window.confirm('Delete your answer?')) {
      const newQs = questions.map((q) =>
        q.id === id
          ? {
              ...q,
              answer: null,
              answeredAt: null
            }
          : q
      );
      setQuestions(newQs);
      try {
        localStorage.setItem('qa-questions', JSON.stringify(newQs));
        bcRef.current?.postMessage('qa-updated');
        localStorage.setItem('qa-updated', Date.now().toString());
      } catch (e) {}
    }
  };

  const refreshData = () => {
    try {
      const raw = localStorage.getItem('qa-questions');
      if (raw) {
        const parsed = JSON.parse(raw) as Question[];
        setQuestions(parsed);
        return;
      }
    } catch (e) {}
    // fallback: keep current questions (or reset to initial)
    setQuestions((s) => s);
  };

  useEffect(() => {
    // initialize from storage if another tab/app wrote data
    try {
      const raw = localStorage.getItem('qa-questions');
      if (raw) setQuestions(JSON.parse(raw));
    } catch (e) {}

    // BroadcastChannel for same-origin tabs
    try {
      const bc = new BroadcastChannel('qa-channel');
      bc.onmessage = () => refreshData();
      bcRef.current = bc;
    } catch (e) {
      bcRef.current = null;
    }

    const onStorage = (ev: StorageEvent) => {
      if (ev.key === 'qa-updated') refreshData();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      try {
        bcRef.current?.close();
      } catch (e) {}
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Q&A Discussion</h1>
          <p className="text-sm text-slate-500 mt-1">Answer employee questions across your courses</p>
        </div>
        <div className="flex items-center gap-2">
          {(['all', 'unanswered', 'answered'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${filter === f ? 'bg-green-600 text-white' : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'}`}
            >
              {f}
              {f === 'unanswered' && (
                <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-amber-100 text-amber-800">
                  {questions.filter((q) => !q.answer).length}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={refreshData}
            className="px-3 py-1.5 text-sm font-medium rounded-md bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((q) => (
          <div key={q.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                    {q.student.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900">{q.student}</p>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{q.department}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      <span className="font-medium text-green-600">{q.course}</span> • {q.askedAt}
                    </p>
                  </div>
                </div>
                {!q.answer && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Awaiting Reply
                  </span>
                )}
              </div>

              <div className="mt-3 ml-13 pl-13">
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">{q.question}</p>
              </div>

              {/* Answer */}
              {q.answer && (
                <div className="mt-4 ml-6 pl-6 border-l-2 border-green-300">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm flex-shrink-0">A</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900">
                          Admin <span className="text-xs text-slate-400 font-normal">• {q.answeredAt}</span>
                        </p>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setReplyingTo(q.id);
                              setReplyText(q.answer || '');
                            }}
                            className="p-1 text-slate-400 hover:text-blue-600"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDeleteAnswer(q.id)} className="p-1 text-slate-400 hover:text-red-600">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{q.answer}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reply Box */}
              {(!q.answer || replyingTo === q.id) && (
                <div className="mt-4 ml-6">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm flex-shrink-0">A</div>
                    <div className="flex-1">
                      <textarea
                        rows={3}
                        value={replyingTo === q.id ? replyText : ''}
                        onChange={(e) => {
                          setReplyingTo(q.id);
                          setReplyText(e.target.value);
                        }}
                        onFocus={() => setReplyingTo(q.id)}
                        className="block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="Type your answer..."
                      />

                      <div className="mt-2 flex justify-end gap-2">
                        {replyingTo === q.id && (
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText('');
                            }}
                            className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800"
                          >
                            Cancel
                          </button>
                        )}
                        <button onClick={() => handleReply(q.id)} className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                          <Send className="h-3.5 w-3.5 mr-1.5" />
                          {q.answer ? 'Update Reply' : 'Post Reply'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
