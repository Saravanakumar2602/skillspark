export default function TrendingSkills({ trendingSkills }: { trendingSkills: any[] }) {
  return (
    <section className="py-12 px-6 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black mb-8">💫 Trending Skills</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {trendingSkills.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow min-w-max"
            >
              <div className="font-bold text-black text-lg">{item.skill}</div>
              <div className="text-sm text-gray-600 mt-1">{item.count} students</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
