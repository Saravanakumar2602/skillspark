export default function Hero({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (term: string) => void }) {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 px-6 border-b border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-black mb-6 text-center">
          Where Student Talent Gets Seen
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Showcase your skills, discover peers, and connect with opportunities
        </p>

        {/* Search Bar */}
        <div className="relative mb-12 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search students by name or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-500"
          />
          <span className="absolute right-4 top-3 text-gray-500">🔍</span>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-black">1,240</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black">320</div>
            <div className="text-sm text-gray-600">Projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black">85</div>
            <div className="text-sm text-gray-600">Skills Listed</div>
          </div>
        </div>
      </div>
    </section>
  );
}
