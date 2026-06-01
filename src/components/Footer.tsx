import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-6 text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>✨ SkillSpark © 2024 | Built with passion by students, for students</p>
        <div className="flex gap-6 text-xs font-semibold">
          <Link to="/privacy-policy" className="hover:text-black transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-black transition-colors">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-black transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
