import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, Search, User, ExternalLink, Github, Linkedin, Award, FileText, Plus, ChevronRight, 
  Star, Trophy, Menu, X, Briefcase, Code, Share2, Compass, LayoutDashboard, TrendingUp, 
  LogOut, Heart, Check, AlertCircle, FileDown, Terminal, Paperclip, CheckCircle2, Calendar, Globe
} from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Skill {
  name: string;
  level: number;
  category: string;
  endorsed: number;
}

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

interface Achievement {
  title: string;
  type: 'hackathon' | 'certification' | 'award';
  date: string;
  issuer: string;
  badge: string;
}

interface DocumentItem {
  name: string;
  type: 'resume' | 'certificate' | 'paper';
  url: string;
  isPublic: boolean;
  uploadDate?: string;
}

interface Student {
  id: number;
  name: string;
  college: string;
  year: string;
  avatar: string;
  bio: string;
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  documents: DocumentItem[];
  links: {
    github: string;
    linkedin: string;
    leetcode: string;
    portfolio: string;
  };
  leetcodeStats: {
    solved: number;
    easy: number;
    medium: number;
    hard: number;
    streak: number;
  };
  stats: {
    profileViews: number;
    endorsementsReceived: number;
    rank: number;
  };
  joinedDate: string;
}

// ==========================================
// 10 MOCK STUDENTS DATA (Light Mode Adapted)
// ==========================================
const INITIAL_STUDENTS: Student[] = [
  {
    id: 1,
    name: "Arjun Kumar",
    college: "IIT Madras",
    year: "3rd Year",
    avatar: "AK",
    bio: "Full-stack developer passionate about building scalable web applications and exploring Machine Learning.",
    skills: [
      { name: "React", level: 90, category: "Web Dev", endorsed: 24 },
      { name: "Node.js", level: 85, category: "Web Dev", endorsed: 18 },
      { name: "Machine Learning", level: 75, category: "AI/ML", endorsed: 12 },
      { name: "Figma", level: 80, category: "Design", endorsed: 15 },
      { name: "Data Structures", level: 88, category: "DSA", endorsed: 20 },
      { name: "Docker", level: 70, category: "DevOps", endorsed: 10 }
    ],
    projects: [
      {
        title: "Cloud IDE",
        description: "Collaborative cloud-based development environment with real-time editing and terminal sharing.",
        techStack: ["React", "Socket.io", "Node.js", "Docker"],
        githubUrl: "https://github.com/arjun/cloud-ide",
        liveUrl: "https://cloud-ide.arjun.dev",
        image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&auto=format&fit=crop&q=60"
      },
      {
        title: "Smart Recruiter",
        description: "AI-powered resume parser and matching engine for hiring optimization.",
        techStack: ["Python", "FastAPI", "React", "PyTorch"],
        githubUrl: "https://github.com/arjun/smart-recruiter",
        liveUrl: "https://recruiter.arjun.dev",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&auto=format&fit=crop&q=60"
      }
    ],
    achievements: [
      { title: "Winner, Smart India Hackathon", type: "hackathon", date: "2025-09", issuer: "Govt of India", badge: "🏆 SIH Winner" },
      { title: "AWS Solutions Architect", type: "certification", date: "2025-11", issuer: "AWS", badge: "☁️ AWS Arch" },
      { title: "Institute Merit Award", type: "award", date: "2025-05", issuer: "IIT Madras", badge: "⭐ Academic Excellence" }
    ],
    documents: [
      { name: "Arjun_Kumar_Resume.pdf", type: "resume", url: "#", isPublic: true },
      { name: "SIH_Winner_Certificate.pdf", type: "certificate", url: "#", isPublic: true },
      { name: "ML_Research_Paper.pdf", type: "paper", url: "#", isPublic: false }
    ],
    links: {
      github: "https://github.com/arjun-kumar",
      linkedin: "https://linkedin.com/in/arjun-kumar",
      leetcode: "https://leetcode.com/arjun_codes",
      portfolio: "https://arjun.dev"
    },
    leetcodeStats: { solved: 450, easy: 150, medium: 220, hard: 80, streak: 45 },
    stats: { profileViews: 542, endorsementsReceived: 99, rank: 3 },
    joinedDate: "2024-08-15"
  },
  {
    id: 2,
    name: "Alex Chen",
    college: "IIIT Hyderabad",
    year: "4th Year",
    avatar: "AC",
    bio: "Competitive programmer and algorithms enthusiast. Love solving hard computational problems.",
    skills: [
      { name: "C++", level: 98, category: "DSA", endorsed: 42 },
      { name: "Algorithms", level: 95, category: "DSA", endorsed: 38 },
      { name: "System Design", level: 85, category: "Web Dev", endorsed: 22 },
      { name: "Java", level: 90, category: "DSA", endorsed: 19 },
      { name: "Python", level: 80, category: "AI/ML", endorsed: 15 }
    ],
    projects: [
      {
        title: "Distributed Key-Value Store",
        description: "High-performance decentralized key-value store using Raft consensus algorithm in C++.",
        techStack: ["C++", "gRPC", "Protobuf", "Docker"],
        githubUrl: "https://github.com/alex/dist-kv",
        liveUrl: "",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60"
      },
      {
        title: "LeetCode Visualizer",
        description: "Browser extension visualizing graph algorithms step-by-step on LeetCode pages.",
        techStack: ["Javascript", "React", "D3.js"],
        githubUrl: "https://github.com/alex/lc-viz",
        liveUrl: "https://lc-viz.alex.dev",
        image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=500&auto=format&fit=crop&q=60"
      }
    ],
    achievements: [
      { title: "ACM ICPC Regionals Rank 12", type: "hackathon", date: "2025-10", issuer: "ACM ICPC", badge: "🏆 ICPC Regionals" },
      { title: "Google Kick Start Round E Top 100", type: "award", date: "2025-08", issuer: "Google", badge: "⭐ Kick Start Top 100" }
    ],
    documents: [
      { name: "Alex_Chen_Resume.pdf", type: "resume", url: "#", isPublic: true }
    ],
    links: {
      github: "https://github.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
      leetcode: "https://leetcode.com/alexchen_codes",
      portfolio: "https://alexchen.dev"
    },
    leetcodeStats: { solved: 820, easy: 200, medium: 450, hard: 170, streak: 180 },
    stats: { profileViews: 980, endorsementsReceived: 136, rank: 1 },
    joinedDate: "2024-05-10"
  },
  {
    id: 3,
    name: "Kabir Sen",
    college: "SRM University",
    year: "4th Year",
    avatar: "KS",
    bio: "Full-stack developer focusing on web architectures, microservices, and serverless computing.",
    skills: [
      { name: "React", level: 92, category: "Web Dev", endorsed: 35 },
      { name: "Node.js", level: 90, category: "Web Dev", endorsed: 31 },
      { name: "AWS", level: 85, category: "DevOps", endorsed: 25 },
      { name: "Next.js", level: 90, category: "Web Dev", endorsed: 28 },
      { name: "GraphQL", level: 82, category: "Web Dev", endorsed: 19 }
    ],
    projects: [
      {
        title: "SaaS Boilerplate",
        description: "Production-ready serverless SaaS boilerplate with Stripe billing and authentication.",
        techStack: ["Next.js", "GraphQL", "AWS Lambda", "Stripe"],
        githubUrl: "https://github.com/kabir/saas-boilerplate",
        liveUrl: "https://saas-demo.kabir.dev",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60"
      },
      {
        title: "Realtime Analytics Engine",
        description: "Serverless dashboard processing millions of user click events in real-time.",
        techStack: ["Node.js", "Kinesis", "Redis", "DynamoDB"],
        githubUrl: "https://github.com/kabir/analytics-engine",
        liveUrl: "",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60"
      }
    ],
    achievements: [
      { title: "AWS Solutions Architect Associate", type: "certification", date: "2025-06", issuer: "AWS", badge: "☁️ AWS Solutions" },
      { title: "Winner, SRM Hackathon", type: "hackathon", date: "2025-02", issuer: "SRM University", badge: "🏆 SRM Hack Winner" }
    ],
    documents: [
      { name: "Kabir_Sen_Resume.pdf", type: "resume", url: "#", isPublic: true },
      { name: "AWS_Certificate.pdf", type: "certificate", url: "#", isPublic: true }
    ],
    links: {
      github: "https://github.com/kabirsen",
      linkedin: "https://linkedin.com/in/kabirsen",
      leetcode: "https://leetcode.com/kabir_sen",
      portfolio: "https://kabirsen.dev"
    },
    leetcodeStats: { solved: 490, easy: 130, medium: 260, hard: 100, streak: 60 },
    stats: { profileViews: 712, endorsementsReceived: 138, rank: 2 },
    joinedDate: "2024-09-01"
  },
  {
    id: 4,
    name: "Priya Nair",
    college: "NIT Trichy",
    year: "3rd Year",
    avatar: "PN",
    bio: "Cybersecurity enthusiast and Linux sysadmin. Specialized in container security and penetration testing.",
    skills: [
      { name: "Docker", level: 88, category: "DevOps", endorsed: 24 },
      { name: "Kubernetes", level: 82, category: "DevOps", endorsed: 19 },
      { name: "Linux", level: 90, category: "DevOps", endorsed: 30 },
      { name: "Go", level: 80, category: "DSA", endorsed: 14 },
      { name: "Cybersecurity", level: 85, category: "Cybersecurity", endorsed: 27 }
    ],
    projects: [
      {
        title: "KubeAudit",
        description: "Automated container configuration scanner highlighting vulnerability scores inside Kubernetes pods.",
        techStack: ["Go", "Kubernetes API", "Docker", "Slack Webhooks"],
        githubUrl: "https://github.com/priya/kubeaudit",
        liveUrl: "",
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&auto=format&fit=crop&q=60"
      },
      {
        title: "Intrusion Detection System",
        description: "Lightweight socket-based system listening for suspicious local traffic anomalies.",
        techStack: ["Python", "Scapy", "InfluxDB", "Grafana"],
        githubUrl: "https://github.com/priya/ids-light",
        liveUrl: "",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60"
      }
    ],
    achievements: [
      { title: "CompTIA Security+", type: "certification", date: "2025-07", issuer: "CompTIA", badge: "🛡️ Security+" },
      { title: "Runner Up, NIT HackFest", type: "hackathon", date: "2025-03", issuer: "NIT Trichy", badge: "🥈 NIT HackFest" }
    ],
    documents: [
      { name: "Priya_Nair_Resume.pdf", type: "resume", url: "#", isPublic: true },
      { name: "CompTIA_Cert.pdf", type: "certificate", url: "#", isPublic: true }
    ],
    links: {
      github: "https://github.com/priyanair",
      linkedin: "https://linkedin.com/in/priyanair",
      leetcode: "https://leetcode.com/priya_codes",
      portfolio: "https://priyanair.security"
    },
    leetcodeStats: { solved: 350, easy: 110, medium: 190, hard: 50, streak: 30 },
    stats: { profileViews: 620, endorsementsReceived: 114, rank: 4 },
    joinedDate: "2024-11-20"
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    college: "BITS Pilani",
    year: "4th Year",
    avatar: "SJ",
    bio: "Machine Learning researcher with focus on computer vision and neural style transfer architectures.",
    skills: [
      { name: "Machine Learning", level: 92, category: "AI/ML", endorsed: 32 },
      { name: "Deep Learning", level: 90, category: "AI/ML", endorsed: 28 },
      { name: "Python", level: 95, category: "AI/ML", endorsed: 35 },
      { name: "PyTorch", level: 88, category: "AI/ML", endorsed: 24 },
      { name: "Data Science", level: 85, category: "Data Science", endorsed: 19 }
    ],
    projects: [
      {
        title: "Neural Painter",
        description: "Generates neural style transfers on high-res videos using pre-trained VGG-19 weights.",
        techStack: ["Python", "PyTorch", "OpenCV", "Flask"],
        githubUrl: "https://github.com/sarah/neural-painter",
        liveUrl: "https://painter.sarah.dev",
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=60"
      },
      {
        title: "Autonomous Drone Nav",
        description: "Edge-based obstacle avoidance model deploying tiny YoloV8 weights on Raspberry Pi.",
        techStack: ["Python", "TensorFlow Lite", "RaspberryPi"],
        githubUrl: "https://github.com/sarah/drone-nav",
        liveUrl: "",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop&q=60"
      }
    ],
    achievements: [
      { title: "Published Paper in IEEE", type: "certification", date: "2025-08", issuer: "IEEE", badge: "📝 Published IEEE" },
      { title: "Intel AI Fellowship Scholar", type: "award", date: "2025-01", issuer: "Intel", badge: "⭐ Intel Scholar" }
    ],
    documents: [
      { name: "Sarah_Resume.pdf", type: "resume", url: "#", isPublic: true },
      { name: "IEEE_Paper_Draft.pdf", type: "paper", url: "#", isPublic: true }
    ],
    links: {
      github: "https://github.com/sarahjenkins",
      linkedin: "https://linkedin.com/in/sarahjenkins",
      leetcode: "https://leetcode.com/sarah_ml",
      portfolio: "https://sarahjenkins.ai"
    },
    leetcodeStats: { solved: 320, easy: 100, medium: 180, hard: 40, streak: 12 },
    stats: { profileViews: 580, endorsementsReceived: 138, rank: 5 },
    joinedDate: "2024-07-12"
  },
  {
    id: 6,
    name: "Meera Joshi",
    college: "COEP Pune",
    year: "4th Year",
    avatar: "MJ",
    bio: "Blockchain developer exploring cryptographic proofs, zero-knowledge rollups, and Web3 solutions.",
    skills: [
      { name: "Cryptography", level: 85, category: "Cybersecurity", endorsed: 21 },
      { name: "Solidity", level: 90, category: "Web Dev", endorsed: 30 },
      { name: "Ethereum", level: 88, category: "Web Dev", endorsed: 25 },
      { name: "Cybersecurity", level: 82, category: "Cybersecurity", endorsed: 18 }
    ],
    projects: [
      {
        title: "Decentralized Escrow",
        description: "Smart contract-based escrow system utilizing multi-signature approvals for freelance deals.",
        techStack: ["Solidity", "Hardhat", "React", "Ethers.js"],
        githubUrl: "https://github.com/meera/escrow-dapp",
        liveUrl: "https://escrow.meera.web3",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&auto=format&fit=crop&q=60"
      },
      {
        title: "ZK-Identity Signer",
        description: "Zero-knowledge proof-based identity verification system preventing double-sign attacks.",
        techStack: ["Solidity", "Circom", "SnarkJS"],
        githubUrl: "https://github.com/meera/zk-ident",
        liveUrl: "",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=60"
      }
    ],
    achievements: [
      { title: "Ethereum India Hackathon Winner", type: "hackathon", date: "2025-12", issuer: "Devfolio", badge: "🏆 EthIndia Winner" },
      { title: "Certified Solidity Developer", type: "certification", date: "2025-05", issuer: "Blockchain Council", badge: "📜 Certified Solidity" }
    ],
    documents: [
      { name: "Meera_Joshi_Resume.pdf", type: "resume", url: "#", isPublic: true }
    ],
    links: {
      github: "https://github.com/meerajoshi",
      linkedin: "https://linkedin.com/in/meerajoshi",
      leetcode: "https://leetcode.com/meera_web3",
      portfolio: "https://meerajoshi.crypto"
    },
    leetcodeStats: { solved: 380, easy: 120, medium: 200, hard: 60, streak: 22 },
    stats: { profileViews: 450, endorsementsReceived: 94, rank: 6 },
    joinedDate: "2024-10-05"
  },
  {
    id: 7,
    name: "Vikram Singh",
    college: "RV College of Engineering",
    year: "3rd Year",
    avatar: "VS",
    bio: "Mobile app developer with passion for building fluid and responsive Android/iOS user interfaces.",
    skills: [
      { name: "Kotlin", level: 90, category: "Mobile", endorsed: 25 },
      { name: "Android", level: 92, category: "Mobile", endorsed: 28 },
      { name: "Swift", level: 75, category: "Mobile", endorsed: 12 },
      { name: "Flutter", level: 85, category: "Mobile", endorsed: 20 },
      { name: "Firebase", level: 80, category: "DevOps", endorsed: 16 }
    ],
    projects: [
      {
        title: "Campus Ride",
        description: "Kotlin-based localized ride-sharing app with Google Maps API and live Firebase tracking.",
        techStack: ["Kotlin", "Firebase", "Google Maps API", "Coroutines"],
        githubUrl: "https://github.com/vikram/campus-ride",
        liveUrl: "",
        image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=500&auto=format&fit=crop&q=60"
      },
      {
        title: "Tasky - Productivity Tracker",
        description: "Minimalist offline productivity planner built with Swift UI and CoreData backing.",
        techStack: ["SwiftUI", "CoreData", "Combine"],
        githubUrl: "https://github.com/vikram/tasky-swift",
        liveUrl: "",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60"
      }
    ],
    achievements: [
      { title: "Winner, RV Hackathon", type: "hackathon", date: "2025-04", issuer: "RVCE Bangalore", badge: "🏆 RV Hack Winner" },
      { title: "Google Associate Android Developer", type: "certification", date: "2025-08", issuer: "Google", badge: "🤖 Android Cert" }
    ],
    documents: [
      { name: "Vikram_Singh_Resume.pdf", type: "resume", url: "#", isPublic: true }
    ],
    links: {
      github: "https://github.com/vikramsingh",
      linkedin: "https://linkedin.com/in/vikramsingh",
      leetcode: "https://leetcode.com/vikram_mobile",
      portfolio: "https://vikramsingh.dev"
    },
    leetcodeStats: { solved: 280, easy: 110, medium: 140, hard: 30, streak: 15 },
    stats: { profileViews: 490, endorsementsReceived: 101, rank: 7 },
    joinedDate: "2024-09-18"
  },
  {
    id: 8,
    name: "Rohan Mehta",
    college: "Delhi Technological University",
    year: "2nd Year",
    avatar: "RM",
    bio: "Frontend Developer specializing in React Native and elegant mobile web layouts. Always coding.",
    skills: [
      { name: "React Native", level: 85, category: "Mobile", endorsed: 18 },
      { name: "Javascript", level: 88, category: "Web Dev", endorsed: 22 },
      { name: "Tailwind CSS", level: 90, category: "Web Dev", endorsed: 25 },
      { name: "HTML5", level: 92, category: "Web Dev", endorsed: 17 }
    ],
    projects: [
      {
        title: "SoundWave - Music Player",
        description: "Fluid React Native audio streamer connecting directly to the Soundcloud open endpoints.",
        techStack: ["React Native", "Expo", "Redux Toolkit"],
        githubUrl: "https://github.com/rohan/soundwave",
        liveUrl: "https://soundwave.rohan.dev",
        image: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=500&auto=format&fit=crop&q=60"
      },
      {
        title: "DevsHub Portfolio Builder",
        description: "Static portfolio site builder styled with pure Tailwind and powered by Github API.",
        techStack: ["React", "Tailwind CSS", "Github API"],
        githubUrl: "https://github.com/rohan/devshub",
        liveUrl: "https://devshub.rohan.dev",
        image: "https://images.unsplash.com/photo-1545670723-196ed0954986?w=500&auto=format&fit=crop&q=60"
      }
    ],
    achievements: [
      { title: "Top Contributor, Hacktoberfest", type: "award", date: "2025-10", issuer: "DigitalOcean", badge: "🎃 Hacktoberfest" },
      { title: "DTU Coding Contest Rank 3", type: "hackathon", date: "2025-11", issuer: "DTU Tech Society", badge: "🥉 DTU Coding" }
    ],
    documents: [
      { name: "Rohan_Mehta_Resume.pdf", type: "resume", url: "#", isPublic: true }
    ],
    links: {
      github: "https://github.com/rohanmehta",
      linkedin: "https://linkedin.com/in/rohanmehta",
      leetcode: "https://leetcode.com/rohan_mehta",
      portfolio: "https://rohanmehta.dev"
    },
    leetcodeStats: { solved: 210, easy: 90, medium: 100, hard: 20, streak: 5 },
    stats: { profileViews: 382, endorsementsReceived: 82, rank: 8 },
    joinedDate: "2025-01-10"
  },
  {
    id: 9,
    name: "Sneha Patel",
    college: "VIT Vellore",
    year: "3rd Year",
    avatar: "SP",
    bio: "Data Science analyst and Python statistics coder. Specialized in data extraction and dashboarding.",
    skills: [
      { name: "SQL", level: 85, category: "Data Science", endorsed: 19 },
      { name: "Python", level: 90, category: "Data Science", endorsed: 26 },
      { name: "Pandas", level: 88, category: "Data Science", endorsed: 20 },
      { name: "Tableau", level: 75, category: "Data Science", endorsed: 11 },
      { name: "Machine Learning", level: 80, category: "AI/ML", endorsed: 18 }
    ],
    projects: [
      {
        title: "City Traffic Dashboard",
        description: "Interactive dashboard visualizing traffic gridlocks across major metro cities in India.",
        techStack: ["Python", "Dash", "Plotly", "PostgreSQL"],
        githubUrl: "https://github.com/sneha/traffic-dash",
        liveUrl: "https://traffic.sneha.dev",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60"
      },
      {
        title: "ScrapeStore - Price Tracker",
        description: "Cron-job based web scraper tracking pricing changes on e-commerce sites and sending mail alerts.",
        techStack: ["Python", "BeautifulSoup", "SQLite", "SendGrid"],
        githubUrl: "https://github.com/sneha/scrapestore",
        liveUrl: "",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60"
      }
    ],
    achievements: [
      { title: "Kaggle Bronze Medalist", type: "award", date: "2025-06", issuer: "Kaggle", badge: "🥉 Kaggle Bronze" },
      { title: "VIT Research Excellence Grant", type: "award", date: "2025-09", issuer: "VIT University", badge: "⭐ VIT Research" }
    ],
    documents: [
      { name: "Sneha_Resume.pdf", type: "resume", url: "#", isPublic: true }
    ],
    links: {
      github: "https://github.com/snehapatel",
      linkedin: "https://linkedin.com/in/snehapatel",
      leetcode: "https://leetcode.com/sneha_data",
      portfolio: "https://snehapatel.dev"
    },
    leetcodeStats: { solved: 180, easy: 80, medium: 80, hard: 20, streak: 8 },
    stats: { profileViews: 310, endorsementsReceived: 94, rank: 9 },
    joinedDate: "2024-06-25"
  },
  {
    id: 10,
    name: "Aisha Rahman",
    college: "St. Xavier's College",
    year: "3rd Year",
    avatar: "AR",
    bio: "UI/UX Designer who loves translating complex ideas into simple, friendly, and stunning user journeys.",
    skills: [
      { name: "Figma", level: 95, category: "Design", endorsed: 38 },
      { name: "UI/UX Design", level: 92, category: "Design", endorsed: 34 },
      { name: "Photoshop", level: 80, category: "Design", endorsed: 14 },
      { name: "CSS3", level: 88, category: "Design", endorsed: 22 },
      { name: "React", level: 70, category: "Web Dev", endorsed: 10 }
    ],
    projects: [
      {
        title: "Edustart Mockup Suite",
        description: "Complete design system and high-fidelity prototype layouts for a student mentoring startup.",
        techStack: ["Figma", "UI/UX", "Design Systems"],
        githubUrl: "",
        liveUrl: "https://figma.com/file/edustart",
        image: "https://images.unsplash.com/photo-1541462608141-2f58c6e68e06?w=500&auto=format&fit=crop&q=60"
      },
      {
        title: "GreenGrow App Concept",
        description: "Mobile design detailing user screens for watering trackers and localized soil analysis tips.",
        techStack: ["Figma", "Illustrator", "Prototyping"],
        githubUrl: "",
        liveUrl: "https://figma.com/file/greengrow",
        image: "https://images.unsplash.com/photo-1581291518655-9523c932dedf?w=500&auto=format&fit=crop&q=60"
      }
    ],
    achievements: [
      { title: "Winner, Adobe UX Design Challenge", type: "award", date: "2025-11", issuer: "Adobe", badge: "🏆 Adobe UX Winner" },
      { title: "St. Xavier's Best Creative Award", type: "award", date: "2025-04", issuer: "St. Xavier's", badge: "⭐ Best Creative" }
    ],
    documents: [
      { name: "Aisha_UX_Portfolio.pdf", type: "resume", url: "#", isPublic: true },
      { name: "GreenGrow_CaseStudy.pdf", type: "paper", url: "#", isPublic: true }
    ],
    links: {
      github: "https://github.com/aisharahman",
      linkedin: "https://linkedin.com/in/aisharahman",
      leetcode: "https://leetcode.com/aisha_design",
      portfolio: "https://aisharahman.design"
    },
    leetcodeStats: { solved: 95, easy: 60, medium: 30, hard: 5, streak: 3 },
    stats: { profileViews: 520, endorsementsReceived: 118, rank: 10 },
    joinedDate: "2024-10-15"
  }
];

const SKILL_CATEGORIES = ["Web Dev", "AI/ML", "Design", "Mobile", "Cybersecurity", "Data Science"];

const SKILL_COLOR_MAP: Record<string, { bg: string, text: string, border: string }> = {
  "Web Dev": { bg: "rgba(108, 99, 255, 0.1)", text: "#6C63FF", border: "rgba(108, 99, 255, 0.2)" },
  "AI/ML": { bg: "rgba(59, 130, 246, 0.1)", text: "#3B82F6", border: "rgba(59, 130, 246, 0.2)" },
  "Design": { bg: "rgba(244, 63, 94, 0.1)", text: "#F43F5E", border: "rgba(244, 63, 94, 0.2)" },
  "Mobile": { bg: "rgba(245, 158, 11, 0.1)", text: "#F59E0B", border: "rgba(245, 158, 11, 0.2)" },
  "Cybersecurity": { bg: "rgba(239, 68, 68, 0.1)", text: "#EF4444", border: "rgba(239, 68, 68, 0.2)" },
  "Data Science": { bg: "rgba(16, 185, 129, 0.1)", text: "#10B981", border: "rgba(16, 185, 129, 0.2)" },
  "DSA": { bg: "rgba(139, 92, 246, 0.1)", text: "#8B5CF6", border: "rgba(139, 92, 246, 0.2)" },
  "DevOps": { bg: "rgba(20, 184, 166, 0.1)", text: "#14B8A6", border: "rgba(20, 184, 166, 0.2)" }
};

// ==========================================
// RADAR CHART COMPONENT (PURE SVG - Light Mode Adapted)
// ==========================================
interface RadarChartProps {
  labels: string[];
  values: number[];
}

const RadarChart: React.FC<RadarChartProps> = ({ labels, values }) => {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    setScale(0);
    const t = setTimeout(() => setScale(1), 80);
    return () => clearTimeout(t);
  }, [values]);

  const cx = 135;
  const cy = 130;
  const r = 90;

  // Render concentric webs
  const gridPolygons = [0.2, 0.4, 0.6, 0.8, 1.0].map((scaleFactor) => {
    const points = Array.from({ length: 6 }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
      const x = cx + r * scaleFactor * Math.cos(angle);
      const y = cy + r * scaleFactor * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  // Render axis lines
  const axes = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x2: x, y2: y };
  });

  // Calculate student data polygon
  const dataPoints = values.map((val, i) => {
    const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
    const valR = r * (val / 100) * scale;
    const x = cx + valR * Math.cos(angle);
    const y = cy + valR * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const vertices = values.map((val, i) => {
    const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
    const valR = r * (val / 100) * scale;
    const x = cx + valR * Math.cos(angle);
    const y = cy + valR * Math.sin(angle);
    return { x, y };
  });

  // Label positions
  const labelPositions = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
    const labelR = r + 18;
    const x = cx + labelR * Math.cos(angle);
    const y = cy + labelR * Math.sin(angle);
    let textAnchor = 'middle';
    if (Math.cos(angle) > 0.2) textAnchor = 'start';
    else if (Math.cos(angle) < -0.2) textAnchor = 'end';
    
    let dy = '0.35em';
    if (Math.sin(angle) > 0.8) dy = '1em';
    else if (Math.sin(angle) < -0.8) dy = '-0.3em';

    return { x, y, textAnchor, dy, label: labels[i] };
  });

  return (
    <svg width="270" height="260" className="mx-auto select-none overflow-visible">
      {/* Webs */}
      {gridPolygons.map((points, idx) => (
        <polygon key={idx} points={points} className="r-grid" fill="none" />
      ))}

      {/* Axis Lines */}
      {axes.map((axis, idx) => (
        <line key={idx} x1={cx} y1={cy} x2={axis.x2} y2={axis.y2} className="r-axis" />
      ))}

      {/* Data Area */}
      <polygon points={dataPoints} className="r-area" />

      {/* Vertices */}
      {vertices.map((v, idx) => (
        <circle key={idx} cx={v.x} cy={v.y} r="4" className="r-dot" />
      ))}

      {/* Labels */}
      {labelPositions.map((pos, idx) => (
        <text 
          key={idx} 
          x={pos.x} 
          y={pos.y} 
          textAnchor={pos.textAnchor} 
          dy={pos.dy} 
          fill="#475569" 
          fontSize="11" 
          fontWeight="bold"
        >
          {pos.label}
        </text>
      ))}
    </svg>
  );
};

// ==========================================
// LEETCODE CIRCULAR PROGRESS
// ==========================================
interface LeetcodeProgressProps {
  solved: number;
  total: number;
}

const LeetcodeProgress: React.FC<LeetcodeProgressProps> = ({ solved, total }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((solved / total) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg width="112" height="112" className="transform -rotate-90">
        <circle cx="56" cy="56" r={radius} stroke="#E2E8F0" strokeWidth="7" fill="transparent" />
        <circle 
          cx="56" 
          cy="56" 
          r={radius} 
          stroke="#10B981" 
          strokeWidth="7" 
          fill="transparent" 
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-slate-800">{solved}</span>
        <span className="text-[10px] text-slate-500 font-medium">/{total} Solved</span>
      </div>
    </div>
  );
};

// ==========================================
// TOAST NOTIFICATION COMPONENT
// ==========================================
interface ToastProps {
  message: string;
  type: 'success' | 'info' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  const icons = {
    success: <Check className="w-5 h-5 text-emerald-500" />,
    info: <Sparkles className="w-5 h-5 text-[#6C63FF]" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[999] flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-200 bg-white shadow-2xl animate-fade-in">
      {icons[type]}
      <span className="text-sm font-medium text-slate-800">{message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-800 transition-colors pl-2">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// ==========================================
// MAIN DASHBOARD PLATFORM (LIGHT THEME)
// ==========================================
export function Dashboard() {
  const navigate = useNavigate();

  // App Master States
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('skillspark_students');
    let list: Student[] = saved ? JSON.parse(saved) : [...INITIAL_STUDENTS];
    
    // Sync the logged-in student (students[0]) with the last registered user name
    try {
      const registered = JSON.parse(localStorage.getItem("skillspark_users") || "[]");
      if (registered.length > 0) {
        const lastReg = registered[registered.length - 1];
        if (lastReg.name && list[0].name !== lastReg.name) {
          list[0] = {
            ...list[0],
            name: lastReg.name,
            avatar: lastReg.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || "SK"
          };
        }
      }
    } catch (e) {
      console.error(e);
    }
    return list;
  });

  const [currentUser, setCurrentUser] = useState<Student>(() => {
    return students[0]; // Active student is students[0]
  });

  const [currentPage, setCurrentPage] = useState<string>("home");
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  // Modals & UI States
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [uploadDocOpen, setUploadDocOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("skills");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Forms States
  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    college: currentUser.college,
    year: currentUser.year,
    bio: currentUser.bio,
    github: currentUser.links.github,
    linkedin: currentUser.links.linkedin,
    leetcode: currentUser.links.leetcode,
    portfolio: currentUser.links.portfolio
  });

  // Sync profile form when currentUser changes
  useEffect(() => {
    setProfileForm({
      name: currentUser.name,
      college: currentUser.college,
      year: currentUser.year,
      bio: currentUser.bio,
      github: currentUser.links.github,
      linkedin: currentUser.links.linkedin,
      leetcode: currentUser.links.leetcode,
      portfolio: currentUser.links.portfolio
    });
  }, [currentUser]);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    imageType: 'web'
  });

  const [documentForm, setDocumentForm] = useState({
    name: '',
    type: 'resume' as 'resume' | 'certificate' | 'paper',
    isPublic: true
  });

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Top Rated");
  const [leaderboardTab, setLeaderboardTab] = useState("Overall");

  // Activity Feed Actions State
  const [activities, setActivities] = useState([
    { id: 1, text: "Priya Nair endorsed your React skill", time: "2 hours ago" },
    { id: 2, text: "Your profile was viewed 12 times today", time: "5 hours ago" },
    { id: 3, text: "Aisha Rahman viewed your Live link for Cloud IDE", time: "1 day ago" },
    { id: 4, text: "Alex Chen endorsed your Data Structures skill", time: "2 days ago" },
    { id: 5, text: "You updated your bio showcase details", time: "3 days ago" }
  ]);

  // Persist State to LocalStorage
  useEffect(() => {
    localStorage.setItem('skillspark_students', JSON.stringify(students));
  }, [students]);

  // Sync Current User with master list changes
  useEffect(() => {
    const updatedMe = students.find(s => s.id === currentUser.id);
    if (updatedMe) {
      setCurrentUser(updatedMe);
    }
  }, [students, currentUser.id]);

  // CSS Injection for Light Theme
  useEffect(() => {
    const styleId = "skillspark-styles-injected";
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
        
        .skillspark-app {
          font-family: 'DM Sans', sans-serif;
          background-color: #F8FAFC;
          color: #0F172A;
        }
        .skillspark-app h1, .skillspark-app h2, .skillspark-app h3, .skillspark-app h4, .skillspark-app h5, .skillspark-app h6 {
          font-family: 'Syne', sans-serif;
        }
        .spark-card {
          background-color: #FFFFFF;
          border: 1px solid rgba(108, 99, 255, 0.1);
          border-radius: 16px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .spark-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(108, 99, 255, 0.08);
          border-color: rgba(108, 99, 255, 0.28);
        }
        .text-glow {
          text-shadow: 0 0 10px rgba(108, 99, 255, 0.2);
        }
        
        /* Floating particles */
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(80px, -110px) scale(1.4); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1.2); }
          50% { transform: translate(-120px, 90px) scale(0.9); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(90px, 80px) scale(1.3); }
        }
        .p-dot-1 { animation: float1 22s infinite ease-in-out; }
        .p-dot-2 { animation: float2 28s infinite ease-in-out; }
        .p-dot-3 { animation: float3 20s infinite ease-in-out; }
        
        /* Marquee */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-inner:hover {
          animation-play-state: paused;
        }
        
        /* Custom scrollbar */
        .skillspark-app ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .skillspark-app ::-webkit-scrollbar-track {
          background: #F8FAFC;
        }
        .skillspark-app ::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 99px;
          border: 2px solid #F8FAFC;
        }
        .skillspark-app ::-webkit-scrollbar-thumb:hover {
          background: #6C63FF;
        }
        
        .r-grid { stroke: rgba(148, 163, 184, 0.15); stroke-width: 1; }
        .r-axis { stroke: rgba(108, 99, 255, 0.15); stroke-width: 1.2; }
        .r-area {
          fill: rgba(108, 99, 255, 0.12);
          stroke: #6C63FF;
          stroke-width: 2.2;
          transition: all 0.5s ease-out;
        }
        .r-dot {
          fill: #10B981;
          stroke: #FFFFFF;
          stroke-width: 1.5;
        }
        
        .fade-in-page {
          animation: pageFade 0.35s ease-out forwards;
        }
        @keyframes pageFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // Helper score calculations for leaderboard
  const getStudentScore = (student: Student, category: string): number => {
    if (category === "Overall") {
      return student.skills.reduce((acc, s) => acc + s.level + s.endorsed * 5, 0);
    }
    if (category === "Web Dev") {
      return student.skills
        .filter(s => s.category === "Web Dev")
        .reduce((acc, s) => acc + s.level + s.endorsed * 5, 0);
    }
    if (category === "AI/ML") {
      return student.skills
        .filter(s => s.category === "AI/ML")
        .reduce((acc, s) => acc + s.level + s.endorsed * 5, 0);
    }
    if (category === "Design") {
      return student.skills
        .filter(s => s.category === "Design")
        .reduce((acc, s) => acc + s.level + s.endorsed * 5, 0);
    }
    if (category === "Competitive Coding") {
      const dsaScore = student.skills
        .filter(s => s.category === "DSA")
        .reduce((acc, s) => acc + s.level + s.endorsed * 5, 0);
      return dsaScore + student.leetcodeStats.solved * 2.5;
    }
    return 0;
  };

  const getTopSkill = (student: Student): string => {
    if (student.skills.length === 0) return "N/A";
    const sorted = [...student.skills].sort((a, b) => b.level - a.level);
    return sorted[0].name;
  };

  // Radar values calculation based on skills
  const getRadarValues = (student: Student) => {
    const axes = ['Web', 'ML', 'Design', 'Mobile', 'DSA', 'DevOps'];
    return axes.map(axis => {
      let cat = '';
      if (axis === 'Web') cat = 'Web Dev';
      else if (axis === 'ML') cat = 'AI/ML';
      else if (axis === 'Design') cat = 'Design';
      else if (axis === 'Mobile') cat = 'Mobile';
      else if (axis === 'DSA') cat = 'DSA';
      else if (axis === 'DevOps') cat = 'DevOps';

      const matches = student.skills.filter(s => s.category === cat);
      if (matches.length > 0) {
        return Math.max(...matches.map(s => s.level));
      }
      return 25; // minimum visibility radius
    });
  };

  // Profile Completeness %
  const profileCompleteness = useMemo(() => {
    let score = 0;
    if (currentUser.bio && currentUser.bio.length > 0) score += 20;
    if (currentUser.skills && currentUser.skills.length >= 3) score += 20;
    if (currentUser.projects && currentUser.projects.length >= 2) score += 20;
    if (currentUser.achievements && currentUser.achievements.length >= 2) score += 20;
    const filledLinks = Object.values(currentUser.links).filter(v => v && v.length > 0).length;
    if (filledLinks >= 2) score += 20;
    return score;
  }, [currentUser]);

  // Handler for Profile Update
  const handleEditProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudents(prev => prev.map(s => {
      if (s.id === currentUser.id) {
        return {
          ...s,
          name: profileForm.name,
          college: profileForm.college,
          year: profileForm.year,
          bio: profileForm.bio,
          links: {
            github: profileForm.github,
            linkedin: profileForm.linkedin,
            leetcode: profileForm.leetcode,
            portfolio: profileForm.portfolio
          }
        };
      }
      return s;
    }));
    setEditProfileOpen(false);
    triggerToast("Profile details updated successfully!", "success");
  };

  // Handler for Add Project
  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description || !projectForm.techStack) {
      triggerToast("Please fill in the required fields.", "error");
      return;
    }

    const images: Record<string, string> = {
      web: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&auto=format&fit=crop&q=60",
      mobile: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60",
      data: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=500&auto=format&fit=crop&q=60"
    };

    const newProj: Project = {
      title: projectForm.title,
      description: projectForm.description,
      techStack: projectForm.techStack.split(",").map(t => t.trim()).filter(t => t.length > 0),
      githubUrl: projectForm.githubUrl || "https://github.com",
      liveUrl: projectForm.liveUrl || "",
      image: images[projectForm.imageType]
    };

    setStudents(prev => prev.map(s => {
      if (s.id === currentUser.id) {
        return {
          ...s,
          projects: [newProj, ...s.projects]
        };
      }
      return s;
    }));

    setProjectForm({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', imageType: 'web' });
    setAddProjectOpen(false);
    triggerToast("New project added successfully!", "success");
  };

  // Handler for Document Upload
  const handleAddDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentForm.name) {
      triggerToast("Please enter a document name.", "error");
      return;
    }

    const newDoc: DocumentItem = {
      name: documentForm.name.endsWith('.pdf') ? documentForm.name : `${documentForm.name}.pdf`,
      type: documentForm.type,
      url: "#",
      isPublic: documentForm.isPublic,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setStudents(prev => prev.map(s => {
      if (s.id === currentUser.id) {
        return {
          ...s,
          documents: [newDoc, ...s.documents]
        };
      }
      return s;
    }));

    setDocumentForm({ name: '', type: 'resume', isPublic: true });
    setUploadDocOpen(false);
    triggerToast("Document uploaded successfully!", "success");
  };

  // Handler for Peer Endorsements
  const handleEndorseSkill = (studentId: number, skillName: string) => {
    if (studentId === currentUser.id) {
      triggerToast("You cannot endorse your own skills!", "error");
      return;
    }

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updatedSkills = s.skills.map(sk => {
          if (sk.name === skillName) {
            return { ...sk, endorsed: sk.endorsed + 1 };
          }
          return sk;
        });

        // Sum up total endorsements
        const totalEndorsed = updatedSkills.reduce((acc, sk) => acc + sk.endorsed, 0);

        return {
          ...s,
          skills: updatedSkills,
          stats: {
            ...s.stats,
            endorsementsReceived: totalEndorsed
          }
        };
      }
      return s;
    }));

    // Update local viewingStudent state too so it renders live
    if (viewingStudent && viewingStudent.id === studentId) {
      setViewingStudent(prev => {
        if (!prev) return null;
        const updatedSkills = prev.skills.map(sk => {
          if (sk.name === skillName) {
            return { ...sk, endorsed: sk.endorsed + 1 };
          }
          return sk;
        });
        const totalEndorsed = updatedSkills.reduce((acc, sk) => acc + sk.endorsed, 0);
        return {
          ...prev,
          skills: updatedSkills,
          stats: {
            ...prev.stats,
            endorsementsReceived: totalEndorsed
          }
        };
      });
    }

    triggerToast(`Endorsed ${skillName} skill!`, "success");
  };

  // Logged-in user dynamic stats calculations
  const totalEndorsementsReceived = useMemo(() => {
    return currentUser.skills.reduce((acc, s) => acc + s.endorsed, 0);
  }, [currentUser.skills]);

  // Explore page calculations
  const filteredStudents = useMemo(() => {
    let result = students;

    // Live search (name, college, skill name)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.college.toLowerCase().includes(q) ||
        s.skills.some(sk => sk.name.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (categoryFilter !== "All") {
      result = result.filter(s => 
        s.skills.some(sk => sk.category === categoryFilter)
      );
    }

    // Sort order
    if (sortOption === "Top Rated") {
      result = [...result].sort((a, b) => getStudentScore(b, "Overall") - getStudentScore(a, "Overall"));
    } else if (sortOption === "Most Projects") {
      result = [...result].sort((a, b) => b.projects.length - a.projects.length);
    } else if (sortOption === "Most Endorsed") {
      result = [...result].sort((a, b) => {
        const sumB = b.skills.reduce((acc, s) => acc + s.endorsed, 0);
        const sumA = a.skills.reduce((acc, s) => acc + s.endorsed, 0);
        return sumB - sumA;
      });
    } else if (sortOption === "Newest") {
      result = [...result].sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
    }

    return result;
  }, [students, searchQuery, categoryFilter, sortOption]);

  // Leaderboard lists based on chosen category
  const sortedLeaderboard = useMemo(() => {
    return [...students].sort((a, b) => {
      const scoreB = getStudentScore(b, leaderboardTab);
      const scoreA = getStudentScore(a, leaderboardTab);
      return scoreB - scoreA;
    });
  }, [students, leaderboardTab]);

  // Sync rank state based on current overall scores
  useEffect(() => {
    const overallSorted = [...students].sort((a, b) => getStudentScore(b, "Overall") - getStudentScore(a, "Overall"));
    setStudents(prev => prev.map(s => {
      const idx = overallSorted.findIndex(os => os.id === s.id);
      return {
        ...s,
        stats: {
          ...s.stats,
          rank: idx + 1
        }
      };
    }));
  }, [students.map(s => s.skills.reduce((acc, sk) => acc + sk.endorsed, 0)).join(',')]);

  // Podium calculation
  const podium = useMemo(() => {
    if (sortedLeaderboard.length >= 3) {
      return {
        first: sortedLeaderboard[0],
        second: sortedLeaderboard[1],
        third: sortedLeaderboard[2],
        rest: sortedLeaderboard.slice(3)
      };
    }
    return { first: null, second: null, third: null, rest: [] };
  }, [sortedLeaderboard]);

  const handleNavigateToPublicProfile = (student: Student) => {
    setViewingStudent(student);
    setActiveTab("skills");
    setCurrentPage("publicProfile");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareProfile = (name: string) => {
    const dummyUrl = `${window.location.origin}/profile/${name.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(dummyUrl);
    triggerToast("Profile link copied to clipboard!", "info");
  };

  // Sign out flow
  const handleSignOut = () => {
    triggerToast("Signing out...", "info");
    setTimeout(() => {
      navigate('/login');
    }, 400);
  };

  // ==========================================
  // SHARED RENDERING ELEMENTS
  // ==========================================
  const renderSkillBadge = (category: string, name: string) => {
    const colors = SKILL_COLOR_MAP[category] || { bg: "rgba(108, 99, 255, 0.08)", text: "#6C63FF", border: "rgba(108, 99, 255, 0.18)" };
    return (
      <span 
        key={name}
        className="px-3 py-1 rounded-full text-xs font-semibold border"
        style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
      >
        {name}
      </span>
    );
  };

  // Connect State mapping
  const [connections, setConnections] = useState<Record<number, string>>({});
  const handleConnect = (studentId: number) => {
    if (connections[studentId] === "Connected") return;
    
    setConnections(prev => ({ ...prev, [studentId]: "Connecting..." }));
    setTimeout(() => {
      setConnections(prev => ({ ...prev, [studentId]: "Connected" }));
      triggerToast("Connected successfully!", "success");
    }, 800);
  };

  return (
    <div className="skillspark-app min-h-screen relative overflow-hidden flex flex-col">
      {/* BACKGROUND GRADIENTS (Light mode delicate circles) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] left-[5%] w-60 h-60 rounded-full bg-[#6C63FF]/3 blur-[80px] p-dot-1"></div>
        <div className="absolute bottom-[15%] right-[5%] w-80 h-80 rounded-full bg-[#10B981]/3 blur-[90px] p-dot-2"></div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => { setCurrentPage("home"); setViewingStudent(null); }} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="size-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#10B981] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-250">
              <Sparkles className="size-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800 group-hover:text-[#6C63FF] transition-colors">
              SkillSpark
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            {[
              { id: "home", label: "Home" },
              { id: "explore", label: "Explore" },
              { id: "dashboard", label: "Dashboard" },
              { id: "leaderboard", label: "Leaderboard" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setCurrentPage(tab.id); setViewingStudent(null); }}
                className={`relative py-1 text-sm transition-colors duration-200 ${
                  currentPage === tab.id 
                    ? "text-[#6C63FF] font-semibold" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
                {currentPage === tab.id && (
                  <span className="absolute bottom-[-10px] left-0 right-0 h-[2.5px] bg-[#6C63FF] rounded-full shadow-[0_0_4px_rgba(108,99,255,0.4)]" />
                )}
              </button>
            ))}
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center gap-4">
            <div 
              onClick={() => { setCurrentPage("myProfile"); setViewingStudent(null); }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="size-9 rounded-full bg-slate-100 border border-slate-200 group-hover:border-[#6C63FF] flex items-center justify-center text-sm font-bold text-slate-700 transition-colors">
                {currentUser.avatar}
              </div>
              <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                {currentUser.name}
              </span>
            </div>
            <button 
              onClick={handleSignOut}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="size-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700"
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-slate-150 pt-4 flex flex-col gap-4">
            {[
              { id: "home", label: "Home" },
              { id: "explore", label: "Explore" },
              { id: "dashboard", label: "Dashboard" },
              { id: "leaderboard", label: "Leaderboard" },
              { id: "myProfile", label: "My Profile" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setCurrentPage(tab.id); setViewingStudent(null); setIsMobileMenuOpen(false); }}
                className={`py-2 px-3 rounded-lg text-left text-sm ${
                  currentPage === tab.id 
                    ? "bg-[#6C63FF]/10 text-[#6C63FF] font-semibold" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
              className="py-2 px-3 rounded-lg text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut className="size-4" /> Sign Out
            </button>
          </div>
        )}
      </nav>

      {/* VIEWPORT AREA */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 relative z-10">
        
        {/* ==========================================
            PAGE 1: HOME (Aurora Background Integrated)
            ========================================== */}
        {currentPage === "home" && (
          <div className="fade-in-page space-y-16">
            
            {/* HERO SECTION WITH AURORA BACKGROUND */}
            <AuroraBackground className="h-[520px] w-full rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0.0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className="relative z-10 max-w-4xl mx-auto space-y-6 text-center px-6"
              >
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#6C63FF] bg-[#6C63FF]/10 border border-[#6C63FF]/20 inline-block">
                  ⚡ THE NEXT GEN PORTFOLIO HUB
                </span>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Where Student Talent <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#10B981]">
                    Gets Discovered & Seen
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
                  Showcase your real-world skill DNA, verify LeetCode stat rings, display peer endorsements, and link all your repos in one interactive premium link.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setCurrentPage("explore")}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-[#6C63FF] text-white hover:bg-[#6c63ff]/90 transition-all duration-200 shadow-md"
                  >
                    Explore Talent
                  </button>
                  <button 
                    onClick={() => setCurrentPage("myProfile")}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-white text-slate-800 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-all duration-200"
                  >
                    Add Your Skills
                  </button>
                </div>
              </motion.div>
            </AuroraBackground>

            {/* STATS BAR */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { count: "1,240", label: "Active Students" },
                { count: "320+", label: "Verified Projects" },
                { count: "85", label: "Skills Showcased" },
                { count: "42", label: "Partner Colleges" }
              ].map((stat, idx) => (
                <div key={idx} className="spark-card p-6 text-center shadow-sm">
                  <h3 className="text-3xl font-extrabold text-[#6C63FF]">
                    {stat.count}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* SKILLS MARQUEE */}
            <div className="w-full overflow-hidden bg-white py-6 border-y border-slate-200 shadow-sm">
              <div className="marquee-inner">
                {[
                  "React", "Machine Learning", "Figma", "C++", "Docker", "Python", "Kubernetes", "Next.js", 
                  "Solidity", "Node.js", "Kotlin", "Swift", "SQL", "UI/UX Design", "GraphQL", "Deep Learning", 
                  "Linux", "Algorithms", "Tableau", "Flutter"
                ].map((skill, idx) => (
                  <span 
                    key={`s1-${idx}`} 
                    className="mx-4 px-5 py-2 rounded-xl text-sm font-bold bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#6C63FF] hover:border-[#6C63FF]/30 transition-all cursor-pointer"
                  >
                    ⚡ {skill}
                  </span>
                ))}
                {[
                  "React", "Machine Learning", "Figma", "C++", "Docker", "Python", "Kubernetes", "Next.js", 
                  "Solidity", "Node.js", "Kotlin", "Swift", "SQL", "UI/UX Design", "GraphQL", "Deep Learning", 
                  "Linux", "Algorithms", "Tableau", "Flutter"
                ].map((skill, idx) => (
                  <span 
                    key={`s2-${idx}`} 
                    className="mx-4 px-5 py-2 rounded-xl text-sm font-bold bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#6C63FF] hover:border-[#6C63FF]/30 transition-all cursor-pointer"
                  >
                    ⚡ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* FEATURED STUDENTS */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900">Featured Showcases</h2>
                  <p className="text-slate-500 text-sm mt-1">Outstanding student profiles this week</p>
                </div>
                <button 
                  onClick={() => setCurrentPage("explore")}
                  className="flex items-center gap-1.5 text-sm font-bold text-[#6C63FF] hover:text-[#10B981] transition-colors"
                >
                  View All Profiles <ChevronRight className="size-4" />
                </button>
              </div>

              {/* Grid of 4 featured students */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {students.slice(0, 4).map((student) => (
                  <div key={student.id} className="spark-card p-6 flex flex-col justify-between shadow-sm bg-white">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">
                          {student.avatar}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-800 text-base truncate max-w-[140px]">
                            {student.name}
                          </h4>
                          <p className="text-xs text-slate-500 truncate max-w-[140px]">
                            {student.college}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2 h-8 leading-relaxed">
                        {student.bio}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {student.skills.slice(0, 3).map(sk => renderSkillBadge(sk.category, sk.name))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[11px] text-slate-500">
                        <span className="font-bold text-slate-800">{student.projects.length}</span> Projects · <span className="font-bold text-slate-800">{student.stats.endorsementsReceived}</span> Endorses
                      </div>
                      <button
                        onClick={() => handleNavigateToPublicProfile(student)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white text-xs font-bold transition-all"
                      >
                        View profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="py-10 border-t border-slate-200 space-y-8">
              <h2 className="text-3xl font-extrabold text-slate-900 text-center">How SkillSpark Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { step: "01", title: "Build Skill DNA", desc: "List your programming competencies and let the dynamic visual chart represent your expertise axes.", icon: <Code className="size-6 text-[#6C63FF]" /> },
                  { step: "02", title: "Showcase Projects", desc: "Upload live build links, code repositories, and certification documents securely in one unified list.", icon: <Briefcase className="size-6 text-[#10B981]" /> },
                  { step: "03", title: "Collect Endorsements", desc: "Receive ratings and verified endorsements from peers and recruiters to climb the Leaderboard.", icon: <Trophy className="size-6 text-amber-500" /> }
                ].map((item, idx) => (
                  <div key={idx} className="spark-card p-8 space-y-4 relative shadow-sm bg-white">
                    <div className="absolute top-4 right-6 text-5xl font-black text-slate-100 font-mono select-none">
                      {item.step}
                    </div>
                    <div className="size-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            PAGE 2: EXPLORE
            ========================================== */}
        {currentPage === "explore" && (
          <div className="fade-in-page space-y-8">
            
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900">Explore Student Talent</h1>
              <p className="text-slate-500 text-sm mt-1">Discover skill profiles, verified repositories, and top campus contributors.</p>
            </div>

            {/* SEARCH AND SORT BAR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative md:col-span-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  type="text"
                  placeholder="Search students by name, college, or specific skill tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-xl text-slate-900 text-sm outline-none transition-all"
                />
              </div>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-xl text-slate-800 text-sm outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="Top Rated">Sort: Top Rated</option>
                  <option value="Most Projects">Sort: Most Projects</option>
                  <option value="Most Endorsed">Sort: Most Endorsed</option>
                  <option value="Newest">Sort: Newest Joined</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 size-0 mt-0.5" />
              </div>
            </div>

            {/* CATEGORY CHIPS */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
              {["All", ...SKILL_CATEGORIES].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 whitespace-nowrap ${
                    categoryFilter === cat 
                      ? "bg-[#6C63FF] text-white border-[#6C63FF]" 
                      : "bg-white text-slate-500 border-slate-200 hover:text-slate-950 hover:border-slate-350"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* STUDENT GRID */}
            {filteredStudents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student, index) => (
                  <div 
                    key={student.id} 
                    className="spark-card p-6 flex flex-col justify-between shadow-sm bg-white"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="size-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-base font-bold text-slate-700">
                            {student.avatar}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-slate-900 text-lg tracking-tight truncate max-w-[160px]">
                              {student.name}
                            </h3>
                            <p className="text-xs text-slate-500 truncate max-w-[160px]">
                              {student.college}
                            </p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-[#6C63FF] border border-[#6C63FF]/20">
                          {student.year}
                        </span>
                      </div>

                      <p className="text-sm text-slate-500 line-clamp-2 h-10 leading-relaxed">
                        {student.bio}
                      </p>

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Top Competencies</span>
                        <div className="flex flex-wrap gap-1.5">
                          {student.skills.slice(0, 3).map(sk => renderSkillBadge(sk.category, sk.name))}
                          {student.skills.length > 3 && (
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-500">
                              +{student.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex gap-4 text-xs font-semibold text-slate-500">
                        <div>
                          <span className="text-slate-800 font-bold">{student.projects.length}</span> Projects
                        </div>
                        <div>
                          <span className="text-slate-800 font-bold">{student.stats.endorsementsReceived}</span> Endorsements
                        </div>
                      </div>
                      <button
                        onClick={() => handleNavigateToPublicProfile(student)}
                        className="px-4 py-2 rounded-xl bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 text-xs font-bold transition-all shadow-md"
                      >
                        View Profile
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 max-w-lg mx-auto space-y-4 shadow-sm">
                <div className="size-16 rounded-full bg-slate-50 mx-auto flex items-center justify-center border border-slate-200">
                  <AlertCircle className="size-8 text-[#6C63FF]" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No Profiles Found</h3>
                <p className="text-slate-500 text-sm px-6 max-w-sm mx-auto">
                  We couldn't find any students matching your search criteria. Try using different filters or search terms.
                </p>
                <button 
                  onClick={() => { setSearchQuery(""); setCategoryFilter("All"); }}
                  className="px-5 py-2 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white font-bold text-sm transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        )}

        {/* ==========================================
            PAGE 3: DASHBOARD (LOGGED-IN USER)
            ========================================== */}
        {currentPage === "dashboard" && (
          <div className="fade-in-page space-y-8">
            
            {/* WELCOME BANNER */}
            <div className="p-8 rounded-3xl border border-[#E2E8F0] bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Good morning, {currentUser.name.split(' ')[0]} 👋
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                  Welcome back to your SkillSpark portal. Check profile views, respond to peer endorsements, or add your latest repositories.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 relative z-10 w-full md:w-auto">
                <button
                  onClick={() => setEditProfileOpen(true)}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 text-sm font-bold transition-all shadow-md"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setAddProjectOpen(true)}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-350 text-slate-700 text-sm font-bold transition-all"
                >
                  Add Project
                </button>
              </div>
            </div>

            {/* METRICS ROW */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Profile Views", value: currentUser.stats.profileViews, desc: "Last 30 days", icon: <Search className="size-5 text-[#6C63FF]" /> },
                { title: "Endorsements", value: totalEndorsementsReceived, desc: "Peer approvals", icon: <Heart className="size-5 text-rose-500" /> },
                { title: "Projects Showcase", value: currentUser.projects.length, desc: "Active repositories", icon: <Briefcase className="size-5 text-[#10B981]" /> },
                { title: "Global Rank", value: `#${currentUser.stats.rank}`, desc: "IIT Madras leaderboard", icon: <Trophy className="size-5 text-amber-500" /> }
              ].map((metric, idx) => (
                <div key={idx} className="spark-card p-6 space-y-4 shadow-sm bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{metric.title}</span>
                    <div className="size-9 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                      {metric.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-800">{metric.value}</h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">{metric.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* PROFILE COMPLETENESS & QUICK ACTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="spark-card p-6 lg:col-span-2 space-y-6 shadow-sm bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Profile Completeness</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Complete your details to increase recruitment visibility</p>
                  </div>
                  <span className="text-2xl font-black text-[#6C63FF]">{profileCompleteness}%</span>
                </div>

                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-gradient-to-r from-[#6C63FF] to-[#10B981] rounded-full"
                    style={{ width: `${profileCompleteness}%`, transition: 'width 0.8s ease-out' }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Short Professional Bio", done: currentUser.bio.length > 0 },
                    { label: "Add at least 3 skill parameters", done: currentUser.skills.length >= 3 },
                    { label: "Showcase 2+ project links", done: currentUser.projects.length >= 2 },
                    { label: "List 2+ hackathons/awards", done: currentUser.achievements.length >= 2 },
                    { label: "Verify social handle URLs", done: Object.values(currentUser.links).filter(v => v.length > 0).length >= 2 }
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className={`size-5 rounded-md flex items-center justify-center border ${
                        task.done 
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-600" 
                          : "border-slate-200 bg-slate-50 text-transparent"
                      }`}>
                        <Check className="size-3.5" />
                      </div>
                      <span className={task.done ? "text-slate-800" : "text-slate-500"}>{task.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="spark-card p-6 space-y-4 shadow-sm bg-white">
                <h3 className="text-lg font-bold text-slate-800">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setEditProfileOpen(true)}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#6C63FF]/30 text-slate-500 hover:text-[#6C63FF] flex flex-col items-center gap-2 text-center text-xs font-bold transition-all"
                  >
                    <User className="size-5 text-[#6C63FF]" />
                    Edit Profile
                  </button>
                  <button 
                    onClick={() => setAddProjectOpen(true)}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#6C63FF]/30 text-slate-500 hover:text-[#6C63FF] flex flex-col items-center gap-2 text-center text-xs font-bold transition-all"
                  >
                    <Plus className="size-5 text-[#10B981]" />
                    Add Project
                  </button>
                  <button 
                    onClick={() => setUploadDocOpen(true)}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#6C63FF]/30 text-slate-500 hover:text-[#6C63FF] flex flex-col items-center gap-2 text-center text-xs font-bold transition-all"
                  >
                    <FileText className="size-5 text-purple-500" />
                    Upload CV
                  </button>
                  <button 
                    onClick={() => handleShareProfile(currentUser.name)}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#6C63FF]/30 text-slate-500 hover:text-[#6C63FF] flex flex-col items-center gap-2 text-center text-xs font-bold transition-all"
                  >
                    <Share2 className="size-5 text-amber-500" />
                    Share Profile
                  </button>
                </div>
              </div>
            </div>

            {/* VISUAL CHARTS & NOTIFICATIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Radar Chart */}
              <div className="spark-card p-6 flex flex-col justify-between items-center space-y-4 shadow-sm bg-white">
                <div className="text-center w-full">
                  <h3 className="text-lg font-bold text-slate-800">Your Skill DNA</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Calculated across core competence areas</p>
                </div>
                <div className="py-2">
                  <RadarChart 
                    labels={['Web', 'ML', 'Design', 'Mobile', 'DSA', 'DevOps']} 
                    values={getRadarValues(currentUser)} 
                  />
                </div>
                <div className="text-[10px] text-slate-400 text-center max-w-[200px]">
                  Endorsements update your competency weights in real-time.
                </div>
              </div>

              {/* Top Skills list */}
              <div className="spark-card p-6 space-y-6 shadow-sm bg-white">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Your Top Skills</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Current highest rated skills on profile</p>
                </div>
                <div className="space-y-4">
                  {currentUser.skills.slice(0, 4).map((skill, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-700 flex items-center gap-1.5">
                          <span className="size-2 rounded-full" style={{ backgroundColor: SKILL_COLOR_MAP[skill.category]?.text || '#6C63FF' }} />
                          {skill.name}
                        </span>
                        <span className="text-slate-500">{skill.level}/100</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{ 
                            width: `${skill.level}%`, 
                            backgroundColor: SKILL_COLOR_MAP[skill.category]?.text || '#6C63FF' 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="spark-card p-6 space-y-6 shadow-sm bg-white">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Updates on your portfolio page visibility</p>
                </div>
                <div className="space-y-4">
                  {activities.map(act => (
                    <div key={act.id} className="flex gap-3 text-xs leading-relaxed border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
                      <div className="size-2 rounded-full bg-[#6C63FF] mt-1.5 shrink-0" />
                      <div className="space-y-0.5">
                        <p className="text-slate-800 font-medium">{act.text}</p>
                        <p className="text-[10px] text-slate-400">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==========================================
            PAGE 4: LEADERBOARD
            ========================================== */}
        {currentPage === "leaderboard" && (
          <div className="fade-in-page space-y-8">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900">Campus Leaderboard</h1>
                <p className="text-slate-500 text-sm mt-1">Discover peer ranks based on skill stats and validated endorsements.</p>
              </div>
              
              <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 w-full md:w-auto shadow-sm">
                {["Overall", "Web Dev", "AI/ML", "Design", "Competitive Coding"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setLeaderboardTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      leaderboardTab === tab 
                        ? "bg-[#6C63FF] text-white" 
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* PODIUM VIEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-12 max-w-4xl mx-auto">
              
              {/* 2nd Place (Silver) */}
              {podium.second && (
                <div className="spark-card p-6 flex flex-col items-center text-center space-y-3 order-2 md:order-1 h-[250px] justify-between border-t-4 border-t-slate-400 shadow-sm bg-white relative">
                  <div className="absolute top-[-24px] size-10 rounded-full bg-slate-400/20 border border-slate-400/40 flex items-center justify-center text-lg font-black text-slate-600">
                    2
                  </div>
                  <div className="size-16 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-lg font-bold text-slate-700 mt-2">
                    {podium.second.avatar}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-slate-800 text-base truncate max-w-[180px]">{podium.second.name}</h4>
                    <p className="text-xs text-slate-500 truncate max-w-[180px]">{podium.second.college}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-600">
                      {getTopSkill(podium.second)}
                    </span>
                    <p className="text-sm font-bold text-slate-700">
                      {getStudentScore(podium.second, leaderboardTab)} pts
                    </p>
                  </div>
                </div>
              )}

              {/* 1st Place (Gold) */}
              {podium.first && (
                <div className="spark-card p-6 flex flex-col items-center text-center space-y-3 order-1 md:order-2 h-[290px] justify-between border-t-4 border-t-amber-400 bg-gradient-to-b from-white to-amber-50/20 shadow-md relative">
                  <div className="absolute top-[-30px] size-12 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-xl font-black text-amber-500">
                    👑
                  </div>
                  <div className="size-20 rounded-full bg-slate-100 border-2 border-amber-400 flex items-center justify-center text-xl font-bold text-slate-800 mt-2">
                    {podium.first.avatar}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-slate-800 text-lg truncate max-w-[200px]">{podium.first.name}</h4>
                    <p className="text-xs text-slate-500 truncate max-w-[200px]">{podium.first.college}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-slate-50 border border-slate-200 text-[#10B981]">
                      {getTopSkill(podium.first)}
                    </span>
                    <p className="text-base font-extrabold text-amber-600">
                      {getStudentScore(podium.first, leaderboardTab)} pts
                    </p>
                  </div>
                </div>
              )}

              {/* 3rd Place (Bronze) */}
              {podium.third && (
                <div className="spark-card p-6 flex flex-col items-center text-center space-y-3 order-3 h-[230px] justify-between border-t-4 border-t-amber-700 shadow-sm bg-white relative">
                  <div className="absolute top-[-24px] size-10 rounded-full bg-amber-700/20 border border-amber-700/40 flex items-center justify-center text-lg font-black text-amber-600">
                    3
                  </div>
                  <div className="size-14 rounded-full bg-slate-100 border-2 border-amber-600 flex items-center justify-center text-sm font-bold text-slate-700 mt-2">
                    {podium.third.avatar}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-slate-800 text-base truncate max-w-[180px]">{podium.third.name}</h4>
                    <p className="text-xs text-slate-500 truncate max-w-[180px]">{podium.third.college}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-600">
                      {getTopSkill(podium.third)}
                    </span>
                    <p className="text-sm font-bold text-amber-700">
                      {getStudentScore(podium.third, leaderboardTab)} pts
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* LEADERBOARD TABLE (Ranks 4-10) */}
            <div className="spark-card overflow-hidden bg-white border border-slate-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                      <th className="py-4 px-6 text-center w-20">Rank</th>
                      <th className="py-4 px-6">Student</th>
                      <th className="py-4 px-6">College</th>
                      <th className="py-4 px-6">Top Skill</th>
                      <th className="py-4 px-6 text-right">Score</th>
                      <th className="py-4 px-6 text-center w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {sortedLeaderboard.map((student, index) => {
                      const score = getStudentScore(student, leaderboardTab);
                      const isMe = student.id === currentUser.id;
                      
                      return (
                        <tr 
                          key={student.id}
                          className={`group transition-colors text-sm ${
                            isMe 
                              ? "bg-indigo-50/50 border-l-4 border-l-[#6C63FF]" 
                              : "hover:bg-slate-50/60"
                          }`}
                        >
                          <td className="py-4 px-6 text-center font-bold">
                            <span className={`inline-flex items-center justify-center size-7 rounded-full text-xs ${
                              index === 0 ? "bg-amber-400 text-black font-black" :
                              index === 1 ? "bg-slate-300 text-black font-black" :
                              index === 2 ? "bg-amber-700 text-white font-black" :
                              "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}>
                              {index + 1}
                            </span>
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="size-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                                {student.avatar}
                              </div>
                              <div>
                                <span className="font-bold text-slate-800 block group-hover:text-[#6C63FF] transition-colors">
                                  {student.name} {isMe && <span className="text-[10px] font-bold text-[#6C63FF] ml-1 bg-[#6C63FF]/10 px-1.5 py-0.5 rounded">You</span>}
                                </span>
                                <span className="text-[10px] text-slate-400 uppercase font-semibold">{student.year}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6 text-slate-500">{student.college}</td>

                          <td className="py-4 px-6">
                            {renderSkillBadge(student.skills[0]?.category || "Web Dev", getTopSkill(student))}
                          </td>

                          <td className="py-4 px-6 text-right font-bold text-slate-850">
                            <div className="flex items-center justify-end gap-2.5">
                              <span>{score}</span>
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block border border-slate-200">
                                <div 
                                  className="h-full bg-[#6C63FF]" 
                                  style={{ width: `${Math.min((score / 1500) * 100, 100)}%`, transition: 'width 1s ease-out' }} 
                                />
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleNavigateToPublicProfile(student)}
                              className="px-2.5 py-1 rounded bg-slate-50 hover:bg-[#6C63FF] text-slate-650 hover:text-white border border-slate-200 text-xs font-bold transition-all"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ==========================================
            PAGES 5 & 6: PROFILE VIEWS (MY & PUBLIC)
            ========================================== */}
        {(currentPage === "myProfile" || currentPage === "publicProfile") && (
          (() => {
            const profileUser = currentPage === "myProfile" ? currentUser : viewingStudent;
            if (!profileUser) return null;
            const isOwnProfile = currentPage === "myProfile";

            return (
              <div className="fade-in-page space-y-8">
                
                {!isOwnProfile && (
                  <button 
                    onClick={() => { setCurrentPage("explore"); setViewingStudent(null); }}
                    className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    ← Back to Explore
                  </button>
                )}

                {/* PROFILE HEADER CARD */}
                <div className="spark-card p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 bg-white shadow-sm border border-slate-200">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                    <div className="size-24 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#10B981] flex items-center justify-center text-3xl font-extrabold text-white shadow-md">
                      {profileUser.avatar}
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                        <h2 className="text-3xl font-extrabold text-slate-800">{profileUser.name}</h2>
                        <span className="px-3 py-1 rounded-md text-[10px] font-bold bg-slate-50 text-[#6C63FF] border border-[#6C63FF]/20">
                          {profileUser.year}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">{profileUser.college}</p>
                      <p className="text-sm text-slate-650 max-w-2xl leading-relaxed mt-2 font-normal">
                        {profileUser.bio || "No biography provided yet."}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    {isOwnProfile ? (
                      <>
                        <button
                          onClick={() => setEditProfileOpen(true)}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 text-sm font-bold transition-all shadow-md"
                        >
                          Edit Profile
                        </button>
                        <button
                          onClick={() => handleShareProfile(profileUser.name)}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-350 text-slate-700 text-sm font-bold transition-all"
                        >
                          Share Profile
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleConnect(profileUser.id)}
                          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md ${
                            connections[profileUser.id] === "Connected"
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                              : "bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90"
                          }`}
                        >
                          {connections[profileUser.id] || "Connect"}
                        </button>
                        <button
                          onClick={() => handleShareProfile(profileUser.name)}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-350 text-slate-700 text-sm font-bold transition-all"
                        >
                          Share Profile
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* TAB SWITCHER */}
                <div className="flex border-b border-slate-200 overflow-x-auto pb-0.5">
                  {[
                    { id: "skills", label: "Skills Showcase" },
                    { id: "projects", label: "Projects" },
                    { id: "achievements", label: "Achievements" },
                    { id: "documents", label: "Documents" },
                    { id: "links", label: "Links & Socials" }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-6 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                          ? "border-[#6C63FF] text-[#6C63FF] font-black" 
                          : "border-transparent text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* TAB CONTENT AREA */}
                <div className="py-2">

                  {/* TAB 1: SKILLS */}
                  {activeTab === "skills" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 fade-in-page">
                      
                      <div className="spark-card p-6 flex flex-col justify-between items-center space-y-4 shadow-sm bg-white">
                        <div className="text-center w-full">
                          <h3 className="text-lg font-bold text-slate-850">Skills DNA Spider</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Skill levels across 6 categories</p>
                        </div>
                        <div className="py-2">
                          <RadarChart 
                            labels={['Web', 'ML', 'Design', 'Mobile', 'DSA', 'DevOps']} 
                            values={getRadarValues(profileUser)} 
                          />
                        </div>
                        <div className="text-[10px] text-slate-400 text-center max-w-[200px]">
                          Endorsing standard skills expands vertices dynamically.
                        </div>
                      </div>

                      <div className="spark-card p-6 lg:col-span-2 space-y-6 shadow-sm bg-white">
                        <h3 className="text-lg font-bold text-slate-800">Competencies & Endorsements</h3>
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                          {profileUser.skills.map((skill, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-150">
                              <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-slate-800">{skill.name}</span>
                                  {renderSkillBadge(skill.category, skill.category)}
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="flex-1 h-2 bg-slate-200/60 rounded-full overflow-hidden border border-slate-200">
                                    <div 
                                      className="h-full rounded-full"
                                      style={{ 
                                        width: `${skill.level}%`, 
                                        backgroundColor: SKILL_COLOR_MAP[skill.category]?.text || '#6C63FF' 
                                      }}
                                    />
                                  </div>
                                  <span className="text-xs font-semibold text-slate-500 w-8 text-right">{skill.level}%</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 self-end sm:self-center">
                                <span className="text-xs font-bold text-slate-500">
                                  {skill.endorsed} Endorsements
                                </span>
                                <button
                                  onClick={() => handleEndorseSkill(profileUser.id, skill.name)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-[#10B981] hover:text-white text-[#10B981] text-xs font-extrabold transition-all"
                                >
                                  + Endorse
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* LeetCode stats card inside tab */}
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center gap-6 justify-between">
                          <div className="space-y-2 text-center md:text-left">
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                              <Terminal className="size-5 text-[#F59E0B]" />
                              <h4 className="text-base font-bold text-slate-800">LeetCode Stats</h4>
                            </div>
                            <p className="text-xs text-slate-500 max-w-sm">
                              Connected coding account verification displaying current streak and difficulty distribution.
                            </p>
                            <div className="flex items-center gap-4 text-xs font-bold pt-2 justify-center md:justify-start">
                              <span className="text-[#10B981]">Streak: {profileUser.leetcodeStats.streak} Days 🔥</span>
                              <span className="text-red-650 font-bold">Hard: {profileUser.leetcodeStats.hard}</span>
                              <span className="text-amber-600 font-bold">Medium: {profileUser.leetcodeStats.medium}</span>
                              <span className="text-emerald-600 font-bold">Easy: {profileUser.leetcodeStats.easy}</span>
                            </div>
                          </div>
                          <div className="shrink-0">
                            <LeetcodeProgress solved={profileUser.leetcodeStats.solved} total={1000} />
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 2: PROJECTS */}
                  {activeTab === "projects" && (
                    <div className="space-y-6 fade-in-page">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-850">Showcased Projects</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Real-world applications built by student</p>
                        </div>
                        {isOwnProfile && (
                          <button
                            onClick={() => setAddProjectOpen(true)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 text-xs font-bold transition-all shadow-md"
                          >
                            <Plus className="size-4" /> Add Project
                          </button>
                        )}
                      </div>

                      {profileUser.projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {profileUser.projects.map((proj, idx) => (
                            <div 
                              key={idx} 
                              className="spark-card overflow-hidden flex flex-col justify-between shadow-sm bg-white"
                              style={{ borderTop: `4px solid ${idx % 2 === 0 ? '#6C63FF' : '#10B981'}` }}
                            >
                              <div className="p-6 space-y-4">
                                <h4 className="text-xl font-extrabold text-slate-800">{proj.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{proj.description}</p>
                                
                                <div className="flex flex-wrap gap-1.5">
                                  {proj.techStack.map(ts => (
                                    <span key={ts} className="px-2 py-0.5 rounded bg-slate-50 text-slate-650 text-[10px] font-bold border border-slate-200">
                                      {ts}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                                <div className="flex gap-4">
                                  {proj.githubUrl && (
                                    <a 
                                      href={proj.githubUrl} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                                    >
                                      <Github className="size-4" /> Code
                                    </a>
                                  )}
                                  {proj.liveUrl && (
                                    <a 
                                      href={proj.liveUrl} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="flex items-center gap-1.5 text-xs font-bold text-[#6C63FF] hover:text-[#10B981] transition-colors"
                                    >
                                      <ExternalLink className="size-4" /> Demo
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-white border border-dashed border-slate-200 rounded-2xl">
                          <p className="text-sm text-slate-500">No showcased projects available.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: ACHIEVEMENTS */}
                  {activeTab === "achievements" && (
                    <div className="space-y-6 fade-in-page">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Achievements & Badges Wall</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Certifications and accolades validated on-chain</p>
                      </div>

                      {profileUser.achievements.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {profileUser.achievements.map((ach, idx) => (
                            <div key={idx} className="spark-card p-6 flex flex-col items-center text-center space-y-4 shadow-sm bg-white border-slate-200">
                              <span className="text-3xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
                                {ach.badge.split(" ")[0]}
                              </span>
                              <div className="space-y-1">
                                <h4 className="font-extrabold text-slate-800 text-base leading-tight">
                                  {ach.title}
                                </h4>
                                <p className="text-xs text-slate-500 font-medium">{ach.issuer}</p>
                              </div>
                              <span className="px-2.5 py-1 rounded bg-slate-50 text-[#10B981] text-[10px] font-bold border border-[#10B981]/20 uppercase">
                                {ach.type}
                              </span>
                              <p className="text-[10px] text-slate-400 font-medium">Validated: {ach.date}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-white border border-dashed border-slate-200 rounded-2xl">
                          <p className="text-sm text-slate-500">No verified achievements added yet.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: DOCUMENTS */}
                  {activeTab === "documents" && (
                    <div className="space-y-6 fade-in-page">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">Academic & Professional Files</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Validated resumes and scholarship certificates</p>
                        </div>
                        {isOwnProfile && (
                          <button
                            onClick={() => setAddProjectOpen(false) || setUploadDocOpen(true)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 text-xs font-bold transition-all shadow-md"
                          >
                            <Plus className="size-4" /> Upload Document
                          </button>
                        )}
                      </div>

                      {(() => {
                        const visibleDocs = isOwnProfile 
                          ? profileUser.documents 
                          : profileUser.documents.filter(d => d.isPublic);

                        if (visibleDocs.length > 0) {
                          return (
                            <div className="space-y-3">
                              {visibleDocs.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                                  <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                                      <FileText className="size-5 text-[#6C63FF]" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-bold text-slate-800 block">{doc.name}</span>
                                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                                        Type: {doc.type} {isOwnProfile && (doc.isPublic ? "· Public" : "· Private")}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <button 
                                      onClick={() => triggerToast(`Previewing ${doc.name}`, 'info')}
                                      className="px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-[#6C63FF] text-slate-500 hover:text-white border border-slate-200 text-xs font-bold transition-all"
                                    >
                                      View
                                    </button>
                                    <button 
                                      onClick={() => triggerToast(`Downloading ${doc.name}`, 'success')}
                                      className="p-2 rounded-lg bg-slate-50 hover:bg-[#6C63FF] text-slate-500 hover:text-white border border-slate-200 transition-all"
                                      title="Download File"
                                    >
                                      <FileDown className="size-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        } else {
                          return (
                            <div className="text-center py-12 bg-white border border-dashed border-slate-200 rounded-2xl">
                              <p className="text-sm text-slate-500">No visible documents uploaded.</p>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  )}

                  {/* TAB 5: LINKS */}
                  {activeTab === "links" && (
                    <div className="space-y-6 fade-in-page">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Socials & Connected Platforms</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Explore active coding portfolios and repositories</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { platform: "GitHub", username: profileUser.links.github, bg: "bg-slate-50 border-slate-200", icon: <Github className="size-5 text-slate-850" />, type: "repos count", stat: `${profileUser.projects.length + 5} repositories` },
                          { platform: "LinkedIn", username: profileUser.links.linkedin, bg: "bg-blue-50/20 border-blue-100", icon: <Linkedin className="size-5 text-blue-600" />, type: "connections", stat: `${profileUser.stats.profileViews + 200}+ connections` },
                          { platform: "LeetCode", username: profileUser.links.leetcode, bg: "bg-amber-50/20 border-amber-100", icon: <Terminal className="size-5 text-amber-600" />, type: "solved stats", stat: `${profileUser.leetcodeStats.solved} problems solved` },
                          { platform: "Portfolio", username: profileUser.links.portfolio, bg: "bg-purple-50/20 border-purple-100", icon: <Globe className="size-5 text-purple-600" />, type: "personal page", stat: "Custom build link" }
                        ].map((link, idx) => (
                          <div key={idx} className={`p-5 rounded-2xl border flex items-center justify-between ${link.bg}`}>
                            <div className="flex items-center gap-3.5">
                              <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-200">
                                {link.icon}
                              </div>
                              <div>
                                <h4 className="font-extrabold text-slate-850 text-base">{link.platform}</h4>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase">{link.type} · {link.stat}</span>
                              </div>
                            </div>
                            {link.username ? (
                              <a 
                                href={link.username} 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#6C63FF] border border-slate-200 text-xs font-bold text-slate-700 hover:text-white transition-all flex items-center gap-1 shadow-sm"
                              >
                                Visit <ExternalLink className="size-3" />
                              </a>
                            ) : (
                              <span className="text-xs text-slate-400 italic">Unlinked</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            );
          })()
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-center text-xs font-medium text-slate-500 relative z-10 mt-12 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#6C63FF]" />
            <span className="text-[#6C63FF] font-bold">SkillSpark</span>
            <span>· Student Skill Showcase Platform</span>
          </div>
          <p>© 2026 SkillSpark. Built for developers with raw SVG charts & state persistence.</p>
        </div>
      </footer>

      {/* ==========================================
          MODALS & FORM OVERLAYS
          ========================================== */}
      
      {/* 1. EDIT PROFILE MODAL */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A0F1E]/30 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative text-slate-800">
            <button 
              onClick={() => setEditProfileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1"
            >
              <X className="size-6" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Edit Profile Showcase</h3>
            
            <form onSubmit={handleEditProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Year Badge</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3rd Year"
                    value={profileForm.year}
                    onChange={(e) => setProfileForm(p => ({ ...p, year: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">College</label>
                <input
                  type="text"
                  required
                  value={profileForm.college}
                  onChange={(e) => setProfileForm(p => ({ ...p, college: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Short Biography</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none resize-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">GitHub URL</label>
                  <input
                    type="text"
                    value={profileForm.github}
                    onChange={(e) => setProfileForm(p => ({ ...p, github: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">LinkedIn URL</label>
                  <input
                    type="text"
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm(p => ({ ...p, linkedin: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">LeetCode URL</label>
                  <input
                    type="text"
                    value={profileForm.leetcode}
                    onChange={(e) => setProfileForm(p => ({ ...p, leetcode: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Portfolio URL</label>
                  <input
                    type="text"
                    value={profileForm.portfolio}
                    onChange={(e) => setProfileForm(p => ({ ...p, portfolio: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 font-bold text-sm transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 font-bold text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. ADD PROJECT MODAL */}
      {addProjectOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A0F1E]/30 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative text-slate-800">
            <button 
              onClick={() => setAddProjectOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1"
            >
              <X className="size-6" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Add Project to Showcase</h3>
            
            <form onSubmit={handleAddProjectSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud IDE"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize the project builds and features..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none resize-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Tech Stack * (Comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="React, Socket.io, Node.js, Docker"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm(p => ({ ...p, techStack: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">GitHub Link</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm(p => ({ ...p, githubUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Live Demo Link</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm(p => ({ ...p, liveUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Project Theme Preset</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {[
                    { type: 'web', label: 'Web IDE / Platform' },
                    { type: 'mobile', label: 'Mobile / App' },
                    { type: 'data', label: 'AI Model / Data' }
                  ].map(theme => (
                    <button
                      key={theme.type}
                      type="button"
                      onClick={() => setProjectForm(p => ({ ...p, imageType: theme.type }))}
                      className={`py-2 px-1 rounded-lg border text-center text-xs font-bold transition-all ${
                        projectForm.imageType === theme.type 
                          ? "bg-[#6C63FF]/15 border-[#6C63FF] text-[#6C63FF]" 
                          : "bg-slate-50 border-slate-200 text-slate-500"
                      }`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 font-bold text-sm transition-all"
                >
                  Publish Project
                </button>
                <button
                  type="button"
                  onClick={() => setAddProjectOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 font-bold text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. UPLOAD DOCUMENT MODAL */}
      {uploadDocOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A0F1E]/30 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative text-slate-850">
            <button 
              onClick={() => setUploadDocOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1"
            >
              <X className="size-6" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Upload Verified Document</h3>
            
            <form onSubmit={handleAddDocumentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Document File Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CV_Arjun_2026"
                  value={documentForm.name}
                  onChange={(e) => setDocumentForm(d => ({ ...d, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Document Category</label>
                  <select
                    value={documentForm.type}
                    onChange={(e: any) => setDocumentForm(d => ({ ...d, type: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#6C63FF] rounded-lg text-slate-900 text-sm outline-none cursor-pointer"
                  >
                    <option value="resume">Resume / CV</option>
                    <option value="certificate">Certification</option>
                    <option value="paper">Academic Paper</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2 pt-6 pl-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={documentForm.isPublic}
                    onChange={(e) => setDocumentForm(d => ({ ...d, isPublic: e.target.checked }))}
                    className="size-4 bg-slate-50 border-slate-200 rounded"
                  />
                  <label htmlFor="isPublic" className="text-xs font-bold text-slate-800 cursor-pointer select-none">
                    Make Public
                  </label>
                </div>
              </div>

              <div className="border border-dashed border-[#6C63FF]/30 hover:border-[#6C63FF] bg-slate-50/50 rounded-xl p-6 text-center cursor-pointer transition-colors space-y-2">
                <Paperclip className="size-6 text-slate-400 mx-auto" />
                <span className="text-xs font-bold text-slate-700 block">Click to browse or drop file here</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">PDF, DOC, DOCX up to 5MB</span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90 font-bold text-sm transition-all"
                >
                  Verify & Save
                </button>
                <button
                  type="button"
                  onClick={() => setUploadDocOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 font-bold text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST DISPLAY */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

    </div>
  );
}
