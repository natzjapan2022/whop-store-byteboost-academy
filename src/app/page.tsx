'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Code,
  Users,
  BookOpen,
  Trophy,
  MessageCircle,
  Star,
  ChevronRight,
  Zap,
  Target,
  Award
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Banner Image */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Image
                  src="/banner.png"
                  alt="Byteboost Academy Programming Education"
                  width={800}
                  height={300}
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-lg"></div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Master Programming</span>
              <br />
              <span className="text-white">Skills That Matter</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join our comprehensive programming education platform and accelerate your coding journey
              with expert guidance, AI tools, and a supportive community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="shiny-border bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
              >
                Start Learning Today
                <ChevronRight className="inline ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#features"
                className="glass-effect text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">127</div>
              <div className="text-gray-300">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">89</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">156</div>
              <div className="text-gray-300">Community Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">23</div>
              <div className="text-gray-300">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools, resources, and support
              you need to become a successful programmer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-effect p-8 rounded-xl hover:bg-white/5 transition-all">
              <BookOpen className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Step-by-Step Guides
              </h3>
              <p className="text-gray-300">
                Comprehensive coding tutorials that take you from beginner to advanced
                with clear explanations and practical examples.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-effect p-8 rounded-xl hover:bg-white/5 transition-all">
              <Zap className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                AI Tools Training
              </h3>
              <p className="text-gray-300">
                Learn to leverage cutting-edge AI tools and technologies to boost
                your productivity and create innovative solutions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-effect p-8 rounded-xl hover:bg-white/5 transition-all">
              <Users className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Private Community
              </h3>
              <p className="text-gray-300">
                Connect with fellow developers, share knowledge, and get support
                in our exclusive learning community.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-effect p-8 rounded-xl hover:bg-white/5 transition-all">
              <Target className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Weekly Challenges
              </h3>
              <p className="text-gray-300">
                Test your skills with hands-on projects and coding challenges
                that reinforce learning and build your portfolio.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-effect p-8 rounded-xl hover:bg-white/5 transition-all">
              <MessageCircle className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Live Q&A Sessions
              </h3>
              <p className="text-gray-300">
                Get your questions answered by experienced developers during
                regular live sessions and interactive workshops.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-effect p-8 rounded-xl hover:bg-white/5 transition-all">
              <Award className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Telegram Support
              </h3>
              <p className="text-gray-300">
                Access our Telegram community for instant help, peer learning,
                and continuous support from instructors and fellow students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose Byteboost Academy?
              </h2>
              <p className="text-lg text-gray-200 mb-6">
                At Byteboost Academy, we believe that everyone deserves access to high-quality
                programming education. Our platform combines cutting-edge technology with proven
                teaching methods to deliver an unparalleled learning experience.
              </p>
              <p className="text-lg text-gray-200 mb-8">
                Whether you're starting your programming journey or looking to advance your
                existing skills, our comprehensive curriculum and supportive community will
                help you achieve your goals.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-400 mr-3" />
                  <span className="text-white">Industry-Expert Instructors</span>
                </div>
                <div className="flex items-center">
                  <Code className="h-6 w-6 text-blue-400 mr-3" />
                  <span className="text-white">Hands-on Project-Based Learning</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-6 w-6 text-green-400 mr-3" />
                  <span className="text-white">Career-Focused Curriculum</span>
                </div>
              </div>
            </div>

            <div className="glass-effect p-8 rounded-xl">
              <blockquote className="text-lg text-gray-200 italic mb-4">
                "Byteboost Academy transformed my understanding of programming.
                The AI tools training alone was worth the investment, and the
                community support made all the difference in my learning journey."
              </blockquote>
              <cite className="text-blue-400 font-semibold">- Sarah Chen, Full-Stack Developer</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about our program? We're here to help you start your
              programming journey with confidence.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <div className="glass-effect p-8 rounded-xl text-center">
                <div className="text-green-400 text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-300">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full shiny-border bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
