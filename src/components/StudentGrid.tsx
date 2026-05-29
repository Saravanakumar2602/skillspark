import StudentCard from './StudentCard';

export default function StudentGrid({ filteredStudents, onViewProfile, onEndorse, endorsements }: any) {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-black mb-8">🌟 Student Showcase</h2>
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student: any) => (
              <StudentCard
                key={student.id}
                student={student}
                onViewProfile={onViewProfile}
                onEndorse={onEndorse}
                endorsements={endorsements}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No students found matching your filters. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
