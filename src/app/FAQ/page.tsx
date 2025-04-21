"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "../../components/Header";

export default function FaqPage() {
  return (
    <div className="w-full min-h-screen bg-neutral-900 overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-neutral-900">
        <Header />
      </div>

      <main className="w-full max-w-6xl mx-auto py-30 px-4 md:py-45 lg:py-60 text-white">
        <h1 className="text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h1>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map(({ value, question, answer, icon }) => (
            <div key={value} className="border-b border-neutral-700 pb-4">
              <AccordionItem value={value}>
                <AccordionTrigger className="text-left hover:text-purple-400 transition-all duration-200">
                  <span className="inline-flex items-center gap-1">
                    <span>{icon}</span>
                    <span>{question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </main>
    </div>
  );
}

// Cleaner spacing for emoji + text
const faqData = [
  {
    value: "item-1",
    icon: "📹",
    question: "What is SnapTrend?",
    answer: "SnapTrend is a platform that helps you repurpose long videos into short viral clips.",
  },
  {
    value: "item-2",
    icon: "💸",
    question: "Is SnapTrend free to use?",
    answer: "Yes! You can start for free. We also offer premium features for advanced users.",
  },
  {
    value: "item-3",
    icon: "📝",
    question: "Can I add captions automatically?",
    answer: "Absolutely! Our AI will auto-generate captions for your clips with high accuracy.",
  },
  {
    value: "item-4",
    icon: "🎬",
    question: "Can I use it without editing skills?",
    answer: "Yes, SnapTrend is beginner-friendly. No editing skills required!",
  },
  {
    value: "item-5",
    icon: "📼",
    question: "What kind of videos can I upload?",
    answer:
      "You can upload podcasts, interviews, webinars, tutorials, or any long-form content to repurpose into short clips.",
  },
  {
    value: "item-6",
    icon: "📱",
    question: "Do you support multiple aspect ratios?",
    answer:
      "Yes! SnapTrend supports 9:16 (TikTok/Reels), 1:1 (Instagram), and 16:9 (YouTube) formats for your output.",
  },
  {
    value: "item-7",
    icon: "🏷️",
    question: "Can I add my brand logo or watermark?",
    answer: "100%. You can upload your logo and position it anywhere on your clips.",
  },
  {
    value: "item-8",
    icon: "🗣️",
    question: "Do you have AI voiceover support?",
    answer: "We're working on adding AI voiceovers. Stay tuned — it’s coming soon!",
  },
  {
    value: "item-9",
    icon: "🔍",
    question: "Will my original video quality be preserved?",
    answer: "Yes, we ensure high-resolution exports for all your repurposed clips.",
  },
  {
    value: "item-10",
    icon: "⏱️",
    question: "Is there a limit on video length or file size?",
    answer: "Free users have a 1GB file size and 15-minute limit. Paid plans offer more flexibility.",
  },
  {
    value: "item-11",
    icon: "🚫",
    question: "Can I download my clips without watermarks?",
    answer: "Yes, watermark-free downloads are available on paid plans.",
  },
  {
    value: "item-12",
    icon: "🤝",
    question: "Do you offer team collaboration features?",
    answer: "Team features are coming soon! You'll be able to share projects with editors and clients easily.",
  },
];
