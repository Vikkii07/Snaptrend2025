'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AIVideoGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [aspectRatio, setAspectRatio] = useState('1:1')

  const handleGenerate = async () => {
    setIsLoading(true)
    setVideoUrl(null)

    // Simulate API
    setTimeout(() => {
      setVideoUrl('https://www.w3schools.com/html/mov_bbb.mp4')
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white -mx-32 py-16 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-start"
      >
        {/* Left Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">AI Video Generator</h1>
            <p className="text-zinc-400 mt-2 text-base">
              Turn your imagination into video. Just describe it and choose a format.
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-sm text-zinc-300">Prompt</Label>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A bustling neon cyberpunk street at night"
              className="bg-zinc-900 border border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm text-zinc-300">Aspect Ratio</Label>
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger className="bg-zinc-900 border border-zinc-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border border-zinc-800 text-white">
                <SelectItem value="1:1">1:1</SelectItem>
                <SelectItem value="16:9">16:9 (Wide)</SelectItem>
                <SelectItem value="9:16">9:16 (Vertical)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!prompt || isLoading}
            className="w-full bg-white text-black hover:bg-zinc-200 transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <span className="mr-2">🎬</span> Generate Video
              </>
            )}
          </Button>
        </div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[300px] flex items-center justify-center"
        >
          {isLoading ? (
            <p className="text-zinc-400">Generating your video...</p>
          ) : videoUrl ? (
            <video controls className="rounded-lg w-full max-h-[400px]">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="text-zinc-400">Your AI-generated video will appear here.</p>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
