import React from 'react';
import { Download, Award, Calendar, ExternalLink } from 'lucide-react';
const certificates = [
{
  id: 1,
  title: 'Workplace Safety Certification',
  date: 'Feb 10, 2025',
  score: '100%',
  id_code: 'WS-2025-8842'
},
{
  id: 2,
  title: 'Data Privacy Fundamentals',
  date: 'Jan 24, 2025',
  score: '92%',
  id_code: 'DP-2025-1129'
},
{
  id: 3,
  title: 'Customer Service Excellence',
  date: 'Dec 15, 2024',
  score: '88%',
  id_code: 'CS-2024-5531'
}];

export function MyCertificates() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Certificates</h1>
      <p className="text-slate-500">
        View and download your earned certificates.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) =>
        <div
          key={cert.id}
          className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">

            {/* Certificate Preview */}
            <div className="h-48 bg-slate-100 relative p-4 flex items-center justify-center border-b border-slate-100">
              <div className="bg-white w-full h-full shadow-sm border border-slate-200 p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                <Award className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Certificate of Completion
                </h3>
                <p className="text-[10px] text-slate-500 mb-2">
                  Presented to Juan Dela Cruz
                </p>
                <p className="text-[10px] font-bold text-slate-800 line-clamp-1">
                  {cert.title}
                </p>
                <div className="mt-auto pt-2 border-t border-slate-100 w-full flex justify-between text-[8px] text-slate-400">
                  <span>{cert.date}</span>
                  <span>Maptech Inc.</span>
                </div>
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white text-slate-900 px-4 py-2 rounded-md font-medium text-sm flex items-center shadow-lg hover:bg-slate-50">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview
                </button>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-slate-900 mb-1">{cert.title}</h3>
              <div className="flex items-center text-sm text-slate-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                Completed on {cert.date}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-xs font-mono text-slate-400">
                  ID: {cert.id_code}
                </span>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}