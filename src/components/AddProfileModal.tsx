import { useState } from 'react';
import { X } from 'lucide-react';
import { allSkills } from '@/data/skills';

export default function AddProfileModal({ isOpen, onClose, onAddProfile }: any) {
  const [newProfile, setNewProfile] = useState({
    name: '',
    college: '',
    year: '',
    skills: [],
    bio: '',
    github: ''
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleAddProfile = () => {
    if (newProfile.name && newProfile.college && selectedSkills.length > 0) {
      onAddProfile({
        ...newProfile,
        skills: selectedSkills.slice(0, 3)
      });
      setNewProfile({ name: '', college: '', year: '', skills: [], bio: '', github: '' });
      setSelectedSkills([]);
    }
  };

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-gray-300 rounded-lg p-8 max-w-2xl w-full max-h-80vh overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Add Your Profile ✨</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Your Name"
            value={newProfile.name}
            onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-500"
          />

          <input
            type="text"
            placeholder="College / University"
            value={newProfile.college}
            onChange={(e) => setNewProfile({ ...newProfile, college: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-500"
          />

          <input
            type="text"
            placeholder="Year (e.g., 2nd, 3rd)"
            value={newProfile.year}
            onChange={(e) => setNewProfile({ ...newProfile, year: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-500"
          />

          <textarea
            placeholder="Your Bio / About"
            value={newProfile.bio}
            onChange={(e) => setNewProfile({ ...newProfile, bio: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-500 min-h-24"
          />

          <input
            type="text"
            placeholder="GitHub URL"
            value={newProfile.github}
            onChange={(e) => setNewProfile({ ...newProfile, github: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-gray-500"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-black mb-3">Select Skills (up to 3)</p>
          <div className="flex flex-wrap gap-2">
            {allSkills.map(skill => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  selectedSkills.includes(skill)
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddProfile}
            className="flex-1 px-4 py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
          >
            Add Profile
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-black rounded font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
