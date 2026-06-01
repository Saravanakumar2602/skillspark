import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Lock, RefreshCw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-2"
              aria-label="Go back"
            >
              <ArrowLeft className="size-5 text-slate-650" />
            </button>
            <span className="text-xl font-bold text-black flex items-center gap-1.5">
              ✨ SkillSpark
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
            className="text-xs font-bold"
          >
            Go to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 space-y-8">
          
          {/* Header Title */}
          <div className="border-b border-slate-100 pb-6 text-center md:text-left">
            <div className="inline-flex p-3 bg-indigo-50 border border-indigo-100 text-[#6C63FF] rounded-2xl mb-4">
              <Shield className="size-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 text-sm mt-2">Last Updated: June 1, 2026</p>
          </div>

          {/* Quick summary grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[#6C63FF] font-bold flex items-center gap-1.5 text-sm">
                <Eye className="size-4" /> Transparency
              </div>
              <p className="text-xs text-slate-550 leading-relaxed">
                We clearly define what profile data is shared publicly and what credentials remain private.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[#6C63FF] font-bold flex items-center gap-1.5 text-sm">
                <Lock className="size-4" /> Security
              </div>
              <p className="text-xs text-slate-550 leading-relaxed">
                Your portfolio resources, certificates, and mock project assets are protected with industry best practices.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[#6C63FF] font-bold flex items-center gap-1.5 text-sm">
                <RefreshCw className="size-4" /> User Control
              </div>
              <p className="text-xs text-slate-550 leading-relaxed">
                You can add, edit, or remove your showcase projects, linked social media, and documents at any time.
              </p>
            </div>
          </div>

          {/* Detailed Policy Text */}
          <div className="space-y-6 text-slate-650 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">1.</span> Information We Collect
              </h2>
              <p>
                As a student talent showcase platform, SkillSpark collects information that you choose to display on your profile. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-550">
                <li>Account Details (Name, Email, Password, College, Graduation Year).</li>
                <li>Showcase Profile Data (Biography, Skills, Projects, Github/LinkedIn URLs).</li>
                <li>Academic Documents (Resumes, Certificates, and related showcase resources).</li>
                <li>Interaction stats like profile views and endorsements received.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">2.</span> How We Use Your Information
              </h2>
              <p>
                We use the collected information to power the platform features, including:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-550">
                <li>Displaying student talent profiles to peers, mentors, or potential recruiters.</li>
                <li>Enabling skill verification badges and peer recommendation features.</li>
                <li>Personalizing student analytics charts and global leaderboard rankings.</li>
                <li>Improving our web application experience and performance.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">3.</span> Sharing & Public Profiles
              </h2>
              <p>
                By design, SkillSpark is a showcase platform. The skills, projects, and testimonials you publish on your profile are visible to other logged-in members. However:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-550">
                <li>Your contact email is only shared for professional opportunities when enabled.</li>
                <li>You can flag specific uploaded files as "Private" so they are only viewable by you.</li>
                <li>We do not sell, trade, or rent student details to third-party data brokers.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">4.</span> Data Security & Storage
              </h2>
              <p>
                Your security is extremely important to us. Account passwords and sensitive information are encrypted. We employ a variety of security measures to safeguard data against unauthorized access, alteration, disclosure, or destruction. We recommend picking a strong unique password.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">5.</span> Contacting Us
              </h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy, your data permissions, or security, please feel free to reach out via our{" "}
                <button 
                  onClick={() => navigate('/contact')}
                  className="text-[#6C63FF] hover:underline font-bold"
                >
                  Contact Page
                </button>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Mini footer */}
      <footer className="py-8 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        <p>© 2026 SkillSpark. All rights reserved.</p>
      </footer>
    </div>
  );
}
