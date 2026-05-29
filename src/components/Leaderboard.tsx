export default function Leaderboard({ topTalent, skillColors }: { topTalent: any[]; skillColors: any }) {
  return (
    <section className="py-12 px-6 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black mb-8">🏆 Top Talent</h2>
        <div className="space-y-4">
          {topTalent.map((student, idx) => (
            <div
              key={student.id}
              className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow flex items-center gap-6"
            >
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-black font-bold text-lg">
                {student.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-black">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.college} • {student.year}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {student.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: skillColors[skill] || '#000000' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-black">{student.endorsements}</div>
                <div className="text-xs text-gray-600">Endorsements</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
