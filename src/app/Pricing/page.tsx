"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("USD");

  useEffect(() => {
    const userLocale = navigator.language || navigator.languages[0];
    if (userLocale.includes("IN")) {
      setCurrency("INR");
    }
  }, []);

  const prices = {
    INR: {
      bestOffer: "₹99/7 days",
      pro: "₹499/mo",
      creator: "₹999/mo",
    },
    USD: {
      bestOffer: "$1/7 days",
      pro: "$19/mo",
      creator: "$39/mo",
    },
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 lg:py-60 py-40">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold sm:text-5xl">Find your perfect plan</h1>
          <p className="text-muted-foreground text-lg mt-4">
            Localized pricing based on your region.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Free Plan */}
          <PricingCard
            title="Free"
            subtitle="Just exploring"
            price="$0"
            description="Get started with AI clips"
            features={[
              "10 min video upload",
              "Watermark export",
              "Basic AI clip detection",
              "7-day access only",
            ]}
            buttonLabel="Start Free"
            bgColor="bg-white"
            textColor="text-black"
            buttonVariant="default"
          />

          {/* Best Offer */}
          <PricingCard
            title="Best Offer"
            subtitle="Testing before upgrading"
            price={currency === "INR" ? prices.INR.bestOffer : prices.USD.bestOffer}
            description="10 exports without watermark"
            features={[
              "Up to 10 exports",
              "No watermark",
              "7-day access",
              "Great for quick trials",
            ]}
            buttonLabel="Try Best Offer"
            bgColor="bg-yellow-400"
            textColor="text-black"
            buttonVariant="light"
            badge="🔥 Best Deal"
          />

          {/* Pro Plan */}
          <PricingCard
            title="Pro"
            subtitle="Casual creators"
            price={currency === "INR" ? prices.INR.pro : prices.USD.pro}
            description="For regular creators"
            features={[
              "20 min per video",
              "2 exports per day",
              "Remove watermark",
              "Access to premium templates",
            ]}
            buttonLabel="Upgrade to Pro"
            bgColor="bg-blue-600"
            textColor="text-white"
            buttonVariant="light"
          />

          {/* Creator Plan */}
          <PricingCard
            title="Creator"
            subtitle="Serious content creators"
            price={currency === "INR" ? prices.INR.creator : prices.USD.creator}
            description="Everything unlimited"
            features={[
              "60+ min uploads",
              "Unlimited exports",
              "Auto captions & smart cutting",
              "Priority AI processing",
              "Early access to new features",
            ]}
            buttonLabel="Become a Creator"
            bgColor="bg-purple-700"
            textColor="text-white"
            buttonVariant="light"
          />
        </div>
      </main>
    </div>
  );
}

type PricingCardProps = {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  buttonLabel: string;
  bgColor: string;
  textColor: string;
  buttonVariant: "default" | "light";
  badge?: string;
};

function PricingCard({
  title,
  subtitle,
  price,
  description,
  features,
  buttonLabel,
  bgColor,
  textColor,
  buttonVariant,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={`${bgColor} ${textColor} rounded-2xl shadow-lg p-8 flex flex-col justify-between relative transition-transform hover:scale-[1.02] duration-200`}
    >
      {badge && (
        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          {badge}
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-sm opacity-80 mb-1">{subtitle}</p>
        <p className="opacity-80 mb-4">{description}</p>
        <h3 className="text-3xl font-semibold mb-6">{price}</h3>
        <ul className="space-y-3 text-sm">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <Check className="w-4 h-4 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button
        className={`mt-8 w-full rounded-xl ${
          buttonVariant === "light" ? "bg-white text-black hover:bg-white/90" : ""
        }`}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
