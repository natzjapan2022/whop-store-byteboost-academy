'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Shield, Clock, RefreshCw, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PlanConfig {
  id: string;
  name: string;
  price: number;
  productId: string;
  features: string[];
  description: string;
}

const planConfigs: Record<string, PlanConfig> = {
  member: {
    id: 'member',
    name: 'Byteboost Member',
    price: 100,
    productId: process.env.NEXT_PUBLIC_WHOP_PRODUCT_ID || 'plan_LPEBPDPIpVoZo',
    features: [
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
    ],
    description: 'Complete programming education platform with AI tools training'
  }
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Whop?: any;
  }
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const planId = params.plan as string;
  const planConfig = planConfigs[planId];

  useEffect(() => {
    if (!planConfig) {
      router.push('/pricing');
      return;
    }

    // Load Whop checkout script
    const script = document.createElement('script');
    script.src = 'https://js.whop.com/static/checkout/loader.js';
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
      setIsLoading(false);
    };
    script.onerror = () => {
      setError('Failed to load checkout. Please refresh the page.');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [planConfig, router]);

  useEffect(() => {
    if (scriptLoaded && window.Whop) {
      // Initialize Whop checkout with success callback
      window.Whop.onSuccess = () => {
        // Redirect to login page after successful purchase
        router.push('/login?success=true');
      };
    }
  }, [scriptLoaded, router]);

  if (!planConfig) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Checkout Error</h1>
            <p className="text-gray-300 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pricing
            </button>
          </div>

          {/* Banner Image */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <Image
                src="/banner.png"
                alt="Byteboost Academy Checkout"
                width={600}
                height={225}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-lg"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Plan Summary */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-4">
                  Complete Your Purchase
                </h1>
                <p className="text-xl text-gray-300">
                  You're one step away from joining Byteboost Academy
                </p>
              </div>

              {/* Plan Details */}
              <div className="glass-effect p-8 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{planConfig.name}</h2>
                  <span className="text-3xl font-bold gradient-text">${planConfig.price}</span>
                </div>

                <p className="text-gray-300 mb-6">{planConfig.description}</p>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">What's included:</h3>
                  {planConfig.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-effect p-6 rounded-lg text-center">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Secure Payment</h3>
                  <p className="text-gray-300 text-sm">256-bit SSL encryption</p>
                </div>

                <div className="glass-effect p-6 rounded-lg text-center">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Instant Access</h3>
                  <p className="text-gray-300 text-sm">Start learning immediately</p>
                </div>

                <div className="glass-effect p-6 rounded-lg text-center">
                  <RefreshCw className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">30-Day Refund</h3>
                  <p className="text-gray-300 text-sm">Money-back guarantee</p>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <div className="glass-effect p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Secure Checkout
                </h2>

                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-gray-300">Loading secure checkout...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Whop Checkout Embed */}
                    <div
                      data-whop-checkout-plan-id={planConfig.productId}
                      data-whop-checkout-theme="dark"
                      className="whop-checkout-embed"
                    ></div>

                    <div className="text-center text-sm text-gray-400 space-y-2">
                      <p>By completing your purchase, you agree to our Terms of Service</p>
                      <p>🔒 Your payment information is secure and encrypted</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Direct Whop purchase link */}
        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-sm text-gray-400 mb-2">
            Or you can purchase directly on Whop:
          </p>
          <Link
            href="https://whop.com/byteboost-aca/byteboost-member/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline text-sm transition-colors"
          >
            Purchase on Whop →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}