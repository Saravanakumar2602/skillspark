# SkillSpark - Student Skill Showcase Platform

A stunning, modern student skill showcase platform built with React + Vite. Features real-time filtering, endorsement system, leaderboard, and a beautiful glassmorphic UI.

## Features

- 🎨 **Beautiful UI** - Glassmorphism design with smooth animations
- 🔍 **Live Search & Filter** - Filter by skills in real-time
- ⭐ **Endorsement System** - Peer-to-peer skill endorsements
- 🏆 **Leaderboard** - Top students ranked by endorsements
- 📊 **Skill DNA** - Visual radar chart for skills
- 🌙 **Dark/Light Mode** - Seamless theme transitions
- ➕ **Add Profile** - Submit your own student profile
- 📱 **Fully Responsive** - Works on all device sizes

## Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens at http://localhost:3000

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── FilterBar.jsx
│   ├── StudentCard.jsx
│   ├── Leaderboard.jsx
│   ├── TrendingSkills.jsx
│   ├── StudentGrid.jsx
│   ├── StudentModal.jsx
│   ├── AddProfileModal.jsx
│   └── Footer.jsx
├── data/
│   ├── students.js
│   ├── skills.js
│   └── constants.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

## Tech Stack

- **React 18** - UI Library
- **Vite** - Build tool & dev server
- **CSS-in-JS** - Inline styles + global CSS
- **Google Fonts** - Syne & DM Sans

## Design System

- **Colors**: Deep navy (#0A0F1E), Electric indigo (#6C63FF), Neon mint (#00F5C4)
- **Typography**: Syne (headings), DM Sans (body)
- **Effects**: Glassmorphism, glowing borders, smooth animations

## Features Breakdown

### 1. Hero Section
- Bold tagline with search bar
- Live filtering by name/skill
- Stats display (students, projects, skills)
- Animated gradient background

### 2. Filter System
- 8 skill categories
- Real-time card filtering
- Active filter highlighting

### 3. Student Cards
- Avatar with initials
- Top 3 skills with badges
- Endorsement counters
- Skill DNA radar visualization
- Quick action buttons

### 4. Leaderboard
- Top 5 students by endorsements
- Rank badges
- Skill tags
- Animated bars

### 5. Trending Skills
- Horizontally scrollable
- Usage counts
- Color-coded by category

### 6. Profile Modal
- Detailed student info
- Skills with progress bars
- Projects showcase
- Contact actions

### 7. Add Profile Form
- Modal form submission
- Multi-select skills (up to 3)
- Dynamic student addition

### 8. Dark/Light Mode
- Smooth transitions
- Persistent theme preference
- Full UI coverage

## Mock Data

All student data is hardcoded in `src/data/students.js`. 
Modify to customize demo students and their skills.

## Future Enhancements

- Backend API integration
- Real endorsement system
- User authentication
- Profile editing
- Export functionality
- Share to social media

## License

MIT

---

Built with ❤️ by SkillSpark Team
