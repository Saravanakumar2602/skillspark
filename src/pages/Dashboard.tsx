import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import Leaderboard from '@/components/Leaderboard';
import TrendingSkills from '@/components/TrendingSkills';
import StudentGrid from '@/components/StudentGrid';
import StudentModal from '@/components/StudentModal';
import AddProfileModal from '@/components/AddProfileModal';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { students as initialStudents } from '@/data/students';
import { skillCategories, skillColors, allSkills } from '@/data/skills';

export function Dashboard() {
  const [students, setStudents] = useState(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [endorsements, setEndorsements] = useState({});
  const [showAddProfile, setShowAddProfile] = useState(false);

  // Filter students
  useEffect(() => {
    let filtered = students;

    if (selectedFilter !== 'All') {
      const filterSkills = skillCategories[selectedFilter as keyof typeof skillCategories] || [];
      filtered = filtered.filter(s => s.skills.some(skill => filterSkills.includes(skill)));
    }

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredStudents(filtered);
  }, [searchTerm, selectedFilter, students]);

  const topTalent = [...students].sort((a, b) => b.endorsements - a.endorsements).slice(0, 5);

  const trendingSkills = allSkills.reduce((acc, skill) => {
    const count = students.filter(s => s.skills.includes(skill)).length;
    return [...acc, { skill, count }];
  }, [] as any[]).sort((a, b) => b.count - a.count);

  const handleEndorse = (studentId: number, skill: string) => {
    setEndorsements(prev => ({
      ...prev,
      [`${studentId}-${skill}`]: (prev[`${studentId}-${skill}` as keyof typeof prev] || 0) + 1
    }));
  };

  const handleAddProfile = (newProfile: any) => {
    const newStudent = {
      id: students.length + 1,
      name: newProfile.name,
      college: newProfile.college,
      year: newProfile.year || '1st',
      avatar: newProfile.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2),
      skills: newProfile.skills.slice(0, 3),
      projects: Math.floor(Math.random() * 15),
      github: newProfile.github || 'https://github.com',
      linkedin: 'https://linkedin.com',
      endorsements: Math.floor(Math.random() * 500),
      bio: newProfile.bio || 'Passionate learner',
      about: newProfile.bio || 'Building amazing things'
    };
    setStudents([...students, newStudent]);
    setShowAddProfile(false);
  };

  return (
    <div className="bg-white text-black font-sans">
      <Header />
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterBar selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      <Leaderboard topTalent={topTalent} skillColors={skillColors} />
      <TrendingSkills trendingSkills={trendingSkills} />
      <StudentGrid
        filteredStudents={filteredStudents}
        onViewProfile={setSelectedStudent}
        onEndorse={handleEndorse}
        endorsements={endorsements}
      />

      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

      <AddProfileModal
        isOpen={showAddProfile}
        onClose={() => setShowAddProfile(false)}
        onAddProfile={handleAddProfile}
      />

      <div
        onClick={() => setShowAddProfile(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center cursor-pointer text-2xl hover:bg-gray-800 transition-colors shadow-lg z-100"
      >
        +
      </div>

      <Footer />
    </div>
  );
}
