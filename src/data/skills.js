export const skillCategories = {
  'Web Dev': ['React', 'Node.js', 'Web Design', 'GraphQL', 'TypeScript'],
  'AI/ML': ['ML', 'Python', 'Data Science', 'AI/ML', 'Computer Vision', 'Deep Learning'],
  'Design': ['UI/UX', 'Figma', 'Animation', 'CSS'],
  'Mobile': ['Mobile Dev', 'Flutter', 'React Native'],
  'Cybersecurity': ['Cybersecurity', 'Ethical Hacking', 'Blockchain'],
  'DevOps': ['DevOps', 'Kubernetes', 'Docker'],
  'Statistics': ['Data Science', 'Statistics']
};

export const skillColors = {
  'React': '#61DAFB',
  'Node.js': '#68A063',
  'UI/UX': '#FF6B6B',
  'ML': '#FF9F43',
  'Python': '#306998',
  'Data Science': '#00D7FF',
  'Figma': '#F24E1E',
  'Mobile Dev': '#6C63FF',
  'Flutter': '#02569B',
  'React Native': '#61DAFB',
  'Cybersecurity': '#E74C3C',
  'Blockchain': '#F7931A',
  'Web Design': '#9B59B6',
  'Animation': '#1ABC9C',
  'CSS': '#1572B6',
  'GraphQL': '#E10098',
  'TypeScript': '#3178C6',
  'Ethical Hacking': '#DC3545',
  'DevOps': '#FCC624',
  'Kubernetes': '#326CE5',
  'Docker': '#2496ED',
  'Statistics': '#4CAF50',
  'Computer Vision': '#FF6B35',
  'Deep Learning': '#00A8E8'
};

export const allSkills = Object.values(skillCategories).flat();

export const filterOptions = ['All', 'Web Dev', 'AI/ML', 'Design', 'Mobile', 'Cybersecurity', 'Data Science', 'DevOps'];
