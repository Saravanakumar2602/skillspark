import { X } from 'lucide-react';

export default function StudentModal({ student, onClose }: any) {
  if (!student) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-gray-300 rounded-lg p-8 max-w-2xl w-full max-h-max-h-80vh overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-black">{student.name}</h2>
            <p className="text-gray-600 mt-1">{student.college} • {student.year}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* About Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="font-bold text-lg text-black mb-2">📖 About</h3>
          <p className="text-gray-700">{student.about}</p>
        </div>

        {/* Skills Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="font-bold text-lg text-black mb-4">💡 Skills</h3>
          {student.skills.map((skill: string) => (
            <div key={skill} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-black text-sm">{skill}</span>
                <span className="text-xs text-gray-600">90%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-9/10 bg-black"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <h3 className="font-bold text-lg text-black mb-4">🎯 Projects</h3>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded">
                <p className="font-bold text-black text-sm">Project {i + 1}</p>
                <p className="text-xs text-gray-600 mt-1">Built with React, Node.js, MongoDB</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 px-4 py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors">
            💌 Send Message
          </button>
          <button className="flex-1 px-4 py-3 border border-gray-300 text-black rounded font-medium hover:bg-gray-50 transition-colors">
            ⭐ Endorse
          </button>
        </div>
      </div>
    </div>
  );
}
