import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, MapPin, Clock, Send, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 grid lg:grid-cols-5 gap-12 items-start">
        
        {/* Left Side: Contact Cards & Info (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Get in Touch</h1>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Have questions about SkillSpark? Whether you're a student looking to customize your showcase, or a recruiter interested in our top talents, we're here to help.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Card */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="p-3 bg-violet-50 text-[#6C63FF] border border-violet-100 rounded-xl">
                <Mail className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Email Us</h3>
                <p className="text-xs text-slate-500">For support, partnerships, or suggestions</p>
                <a href="mailto:support@skillspark.edu" className="text-sm text-[#6C63FF] hover:underline font-bold block pt-1">
                  support@skillspark.edu
                </a>
              </div>
            </div>

            {/* Helpdesk Hours Card */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="p-3 bg-orange-50 text-orange-500 border border-orange-100 rounded-xl">
                <Clock className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">College Support Desk</h3>
                <p className="text-xs text-slate-500">Live community support and technical issues</p>
                <p className="text-sm text-slate-700 font-semibold pt-1">
                  Mon – Fri, 9:00 AM – 5:00 PM EST
                </p>
              </div>
            </div>

            {/* Office Card */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="p-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl">
                <MapPin className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Campus HQ Location</h3>
                <p className="text-xs text-slate-500">Student Innovation & Tech Center</p>
                <p className="text-sm text-slate-700 font-semibold pt-1">
                  Room 404, Building C, IIT Madras Campus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card (3 cols) */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Send us a Message</h2>
                  <p className="text-xs text-slate-400 mt-1">We typically reply within 24 hours.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-semibold text-slate-650">Your Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-11 border-slate-200 focus-visible:ring-[#6C63FF]/30 focus-visible:ring-2 focus-visible:border-[#6C63FF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold text-slate-650">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-11 border-slate-200 focus-visible:ring-[#6C63FF]/30 focus-visible:ring-2 focus-visible:border-[#6C63FF]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs font-semibold text-slate-650">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Profile Setup / General Question / Partnership"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="h-11 border-slate-200 focus-visible:ring-[#6C63FF]/30 focus-visible:ring-2 focus-visible:border-[#6C63FF]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-semibold text-slate-650">Message</Label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Describe how we can help you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-black placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/30 focus-visible:border-[#6C63FF] disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                    <AlertCircle className="size-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full h-11 text-sm font-semibold bg-[#6C63FF] hover:bg-[#6C63FF]/90 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send className="size-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-6 animate-fade-in">
                <div className="inline-flex p-4 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-3xl animate-bounce">
                  <CheckCircle2 className="size-12" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-slate-900">Message Sent!</h2>
                  <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. We have received your message and our team will get back to you shortly.
                  </p>
                </div>
                <div className="pt-4 flex justify-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-semibold h-10 px-5"
                  >
                    Send Another Message
                  </Button>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="text-xs font-semibold h-10 px-5 bg-[#6C63FF] hover:bg-[#6C63FF]/90"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            )}

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
