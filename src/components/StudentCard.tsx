import { skillColors } from '@/data/skills';

export default function StudentCard({ student, onViewProfile, onEndorse, endorsements }: any) {
  return (
    <div
      onClick={() => onViewProfile(student)}
      className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-black font-bold text-2xl mx-auto mb-3">
          {student.avatar}
        </div>
        <h3 className="font-bold text-lg text-black">{student.name}</h3>
        <p className="text-sm text-gray-600">{student.college}</p>
        <p className="text-xs text-gray-500 mt-1">Year {student.year.charAt(0)}</p>
      </div>

      <div className="mb-4 space-y-2">
        {student.skills.map((skill: string) => (
          <div key={skill} className="flex justify-between items-center">
            <span className="text-sm font-medium text-black">{skill}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEndorse(student.id, skill);
              }}
              className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 transition-colors text-black font-medium"
            >
              ⭐ {endorsements[`${student.id}-${skill}`] || 0}
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
        <span>📊 {student.projects} projects</span>
      </div>

      <div className="flex gap-2 mb-3">
        <button className="flex-1 px-4 py-2 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors text-sm">
          View Profile
        </button>
        <button className="flex-1 px-4 py-2 border border-gray-300 text-black rounded font-medium hover:bg-gray-50 transition-colors text-sm">
          🔗 Connect
        </button>
      </div>

      <div className="flex gap-3 justify-center text-lg">
        <a href={student.github} target="_blank" rel="noopener noreferrer">
          🐙
        </a>
        <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
          in
        </a>
      </div>
    </div>
  );
}
