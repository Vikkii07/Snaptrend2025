'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Sparkles, Loader, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'

const aspectRatios = [
  { label: '1:1', value: '1:1' },
  { label: '16:9', value: '16:9' },
  { label: '9:16', value: '9:16' },
  { label: '4:3', value: '4:3' },
]

const getDimensions = (aspect: string) => {
  switch (aspect) {
    case '16:9':
      return { width: 768, height: 432 }
    case '9:16':
      return { width: 432, height: 768 }
    case '4:3':
      return { width: 640, height: 480 }
    default:
      return { width: 512, height: 512 }
  }
}

export default function AIImageGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [steps, setSteps] = useState(20)
  const [seed, setSeed] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return setError('Please provide a prompt for the image.')

    setLoading(true)
    setImageUrl(null)
    setError(null)

    const { width, height } = getDimensions(aspectRatio)

    try {
      const res = await fetch('/api/generate-image', { // Using your backend API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          negative_prompt: negativePrompt || "blurry, low quality, distorted, cropped",
          steps,
          width,
          height,
          cfg_scale: 7,
          seed: seed ? parseInt(seed) : undefined,
        }),
      })

      const data = await res.json()

      if (res.ok && data.url) {
        setImageUrl(data.url)
      } else {
        setError('Failed to generate image. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while generating the image. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!imageUrl) return
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = 'ai-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="h-screen w-full bg-[#0b0b0f] text-white flex justify-center items-center">
      <div className="w-full max-w-6xl px-4 md:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-start"
        >
          {/* Left Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">AI Image Generator</h1>
              <p className="text-zinc-400 mt-2 text-base">
                Describe your vision and let AI turn it into an image.
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-zinc-300">Prompt</Label>
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A futuristic city skyline at sunset"
                className="bg-zinc-900 border border-zinc-800 text-white"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-zinc-300">Negative Prompt (optional)</Label>
              <Input
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="e.g. low quality, blurry"
                className="bg-zinc-900 border border-zinc-800 text-white"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-zinc-300">Aspect Ratio</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="bg-zinc-900 border border-zinc-800 text-white">
                  <SelectValue placeholder="Select Aspect Ratio" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border border-zinc-800 text-white">
                  {aspectRatios.map((a) => (
                    <SelectItem key={a.value} value={a.value}>
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm text-zinc-300">Steps</Label>
                <Input
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(parseInt(e.target.value))}
                  min={1}
                  max={100}
                  className="bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm text-zinc-300">Seed (optional)</Label>
                <Input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  placeholder="Leave empty for random"
                  className="bg-zinc-900 border border-zinc-800 text-white"
                />
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!prompt || loading}
              className="w-full bg-white text-black hover:bg-zinc-200 transition"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" /> Generate Image
                </>
              )}
            </Button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[300px] flex items-center justify-center"
          >
            {loading ? (
              <p className="text-zinc-400">Generating your image...</p>
            ) : imageUrl ? (
              <div className="flex flex-col items-center space-y-4 w-full">
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="rounded-lg w-full max-h-[400px] object-contain"
                />
                <Button
                  onClick={downloadImage}
                  className="bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ) : (
              <p className="text-zinc-400">Your AI-generated image will appear here.</p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
