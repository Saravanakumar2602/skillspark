import { filterOptions } from '@/data/skills';

export default function FilterBar({ selectedFilter, setSelectedFilter }: { selectedFilter: string; setSelectedFilter: (filter: string) => void }) {
  return (
    <section className="bg-white border-b border-gray-200 py-6 px-6 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-sm font-semibold text-black mb-4">Filter by Skills</h3>
        <div className="flex gap-2 flex-wrap">
          {filterOptions.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
