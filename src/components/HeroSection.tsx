'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

const services = [
  {
    title: "AI Image Generator",
    subtitle: "Visuals, Reimagined",
    desc: "Effortlessly create scroll-stopping visuals from simple text prompts. Perfect for social posts, ads, thumbnails, or any creative need — with quality you'd expect from a pro designer.",
    image: "/AI image.jpg"
  },
  {
    title: "AI Video Generator",
    subtitle: "From Script to Short",
    desc: "Turn written ideas into ready-to-post videos in seconds. Just enter a script or prompt, and SnapTrend delivers fully edited short-form content for TikTok, Reels, and YouTube.",
    video: "/Ai video.mp4"
  },
  {
    title: "AI Video Repurposing",
    subtitle: "Recycle & Reignite",
    desc: "Transform long-form videos into short, viral clips with smart jump cuts, captions, and auto-cropping. One video — endless possibilities across platforms.",
    video: "/ai-video-repurposing.mp4"
  },
  {
    title: "Auto-Caption",
    subtitle: "Subtitles, Instantly",
    desc: "Increase watch time and accessibility with auto-generated subtitles. Customize fonts, colors, and animations to match your brand and keep viewers hooked.",
    video: "/AI Auto Caption.mp4"
  },
  {
    title: "Split Screen Tool",
    subtitle: "React. Compare. Collaborate.",
    desc: "Dramatically boost engagement with dynamic split-screen content. Perfect for reactions, duets, interviews, or side-by-side storytelling — all automated.",
    image: "/split screen.jpg"
  }
]

export default function HeroSection() {
  return (
    <div className="text-white bg-black">

      {/* HERO SECTION */}
      <section className="min-h-[100vh] bg-gradient-to-br from-indigo-900 via-black to-indigo-800 py-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-wide max-w-5xl"
        >
          Transform Your Content Into <br />
          <span className="text-indigo-400">Scroll-Stopping Stories</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-300 text-base sm:text-lg md:text-xl mt-6 max-w-2xl"
        >
          SnapTrend is your creative partner for generating, repurposing, and sharing AI-powered video and image content at scale — instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10"
        >
          <Link href="/Signup">
            <Button className="bg-purple-600 border border-purple-600 text-white font-semibold px-8 py-7 text-base sm:text-lg rounded-xl hover:bg-purple-700 hover:border-purple-700 transition duration-300 shadow-xl">
              Start Creating Now
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="px-4 sm:px-6 md:px-12 py-20 space-y-24 border-t border-gray-800">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col-reverse lg:flex-row items-center gap-10 md:gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* TEXT SIDE */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
              <p className="text-indigo-400 text-lg sm:text-xl mb-3">{service.subtitle}</p>
              <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">{service.desc}</p>
              <Link href="/Signup">
                <Button className="bg-purple-600 border border-purple-600 text-white font-semibold px-6 py-3 text-sm sm:text-base rounded-xl hover:bg-purple-700 hover:border-purple-700 transition">
                  Try {service.title}
                </Button>
              </Link>
            </div>

            {/* MEDIA SIDE */}
            <div className="w-full lg:w-1/2 h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
              {service.video ? (
                <video
                  src={service.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={service.image || '/default-image.jpg'} // Default fallback if image is missing
                  alt={service.title || "Service Media"}
                  width={1600}
                  height={900}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-gradient-to-br from-indigo-900 via-black to-indigo-800 px-4 sm:px-6 md:px-12 py-24 text-center flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Ready to Go Viral with AI?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-200 max-w-2xl mb-8 text-sm sm:text-base leading-relaxed"
        >
          SnapTrend helps creators repurpose content, reach more people, and grow faster — all with AI.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white/90 text-sm sm:text-base md:text-lg space-y-3 mb-10 text-left max-w-2xl"
        >
          <li>✅ Repurpose once, publish everywhere — effortlessly</li>
          <li>⚡ Captions, cuts, and visuals — AI handles it all for you</li>
          <li>📈 Amplify your reach. 🧠 Work smarter. 🎯 Grow faster with ease</li>
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/Signup">
            <Button className="bg-purple-600 border border-purple-600 text-white font-semibold px-8 py-4 text-base sm:text-lg rounded-xl hover:bg-purple-700 hover:border-purple-700 transition shadow-xl">
              Start for Free
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
