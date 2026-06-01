import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TermsOfServicePage() {
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
            <div className="inline-flex p-3 bg-violet-50 border border-violet-100 text-[#6C63FF] rounded-2xl mb-4">
              <FileText className="size-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Terms of Service</h1>
            <p className="text-slate-500 text-sm mt-2">Last Updated: June 1, 2026</p>
          </div>

          {/* Core rules grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[#6C63FF] font-bold flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="size-4" /> Integrity
              </div>
              <p className="text-xs text-slate-550 leading-relaxed">
                Provide genuine projects, valid skill sets, and authentic student academic details.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[#6C63FF] font-bold flex items-center gap-1.5 text-sm">
                <ShieldCheck className="size-4" /> Safety
              </div>
              <p className="text-xs text-slate-550 leading-relaxed">
                Treat peers with respect, write constructual recommendations, and avoid offensive profiles.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[#6C63FF] font-bold flex items-center gap-1.5 text-sm">
                <AlertTriangle className="size-4" /> Responsibility
              </div>
              <p className="text-xs text-slate-550 leading-relaxed">
                Ensure your repository code and published files do not violate any copyright or licenses.
              </p>
            </div>
          </div>

          {/* Detailed Terms Content */}
          <div className="space-y-6 text-slate-650 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">1.</span> Acceptance of Terms
              </h2>
              <p>
                By accessing or using the SkillSpark platform, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you are not authorized to use the platform.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">2.</span> Account Registration & Credentials
              </h2>
              <p>
                To showcase your projects, you must register an account. You are responsible for keeping your login credentials secure. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">3.</span> User-Generated Showcase Content
              </h2>
              <p>
                You retain ownership of the code, descriptions, resumes, and media you upload to SkillSpark. However, by uploading content, you grant SkillSpark a worldwide, royalty-free license to host, display, and share that content on the platform. You agree that you will not post content that:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-550">
                <li>Infringes on copyright, patent, trademark, or trade secret rights of others.</li>
                <li>Is libelous, defamatory, abusive, harassing, or otherwise offensive.</li>
                <li>Contains malware, code exploits, or malicious file attachments.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">4.</span> On-Chain & Peer Endorsements
              </h2>
              <p>
                SkillSpark provides tools for peer endorsements and verified credential awards. You agree to act in good faith when endorsing peers and writing recommendations. Systematically gaming the ranking algorithm, rating pools, or leaderboard statistics is grounds for account suspension.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">5.</span> Limitation of Liability
              </h2>
              <p>
                SkillSpark is provided on an "as is" and "as available" basis. We do not guarantee that the platform will be uninterrupted or error-free. We are not responsible for interactions, interviews, or hiring outcomes resulting from connections made on the platform.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#6C63FF]">6.</span> Contact Details
              </h2>
              <p>
                If you have questions about these terms or wish to report a violation, please contact us through the{" "}
                <button 
                  onClick={() => navigate('/contact')}
                  className="text-[#6C63FF] hover:underline font-bold"
                >
                  Contact Form
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
