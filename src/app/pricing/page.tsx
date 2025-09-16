'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Star, Zap, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const features = [
    'Step-by-step coding guides',
    'Exclusive AI tools tutorials',
    'Private learning community',
    'Weekly project challenges',
    'Live Q&A sessions',
    'Telegram community access',
    'Downloadable resources',
    'Progress tracking',
    'Certificate of completion',
    'Lifetime updates'
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Banner Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Image
                src="/banner.png"
                alt="Byteboost Academy Pricing"
                width={600}
                height={225}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-lg"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Simple Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Get unlimited access to all our programming courses, AI tools training,
            and community support for one simple price.
          </p>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="glass-effect rounded-2xl p-8 md:p-12 max-w-2xl w-full relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-0 right-6 transform -translate-y-1/2">
                <div className="shiny-border bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Most Popular
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-blue-400 mr-3" />
                  <h3 className="text-3xl font-bold text-white">Byteboost Member</h3>
                </div>

                <div className="mb-6">
                  <span className="text-6xl font-bold gradient-text">$100</span>
                  <span className="text-gray-300 text-xl ml-2">one-time</span>
                </div>

                <p className="text-gray-300 text-lg mb-8">
                  Everything you need to master programming and AI tools
                </p>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Link
                  href="/checkout/member"
                  className="shiny-border bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg inline-flex items-center"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-gray-600 text-center">
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mb-2">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span>Instant Access</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>30-Day Refund</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-200">
              Everything you need to know about Byteboost Academy
            </p>
          </div>

          <div className="space-y-8">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-3">
                What's included in the Byteboost Member plan?
              </h3>
              <p className="text-gray-200">
                You get complete access to all our programming courses, AI tools tutorials,
                private community, weekly challenges, live Q&A sessions, and Telegram support.
                It's everything you need to become a proficient programmer.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-3">
                Is this a one-time payment or subscription?
              </h3>
              <p className="text-gray-200">
                It's a one-time payment of $100. Once you purchase, you have lifetime access
                to all current content plus any future updates and new courses we add.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-3">
                What if I'm not satisfied with the course?
              </h3>
              <p className="text-gray-200">
                We offer a 30-day money-back guarantee. If you're not completely satisfied
                with your purchase, contact us within 30 days for a full refund.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-3">
                Do I need prior programming experience?
              </h3>
              <p className="text-gray-200">
                No! Our courses are designed for all skill levels, from complete beginners
                to experienced developers looking to learn AI tools and advanced techniques.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-3">
                How do I access the private community?
              </h3>
              <p className="text-gray-200">
                After purchase, you'll receive an invitation to join our private Discord server
                and Telegram group where you can interact with other students and instructors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}