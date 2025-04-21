'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Sparkles, Loader, Download } from 'lucide-react'
import { motion } from 'framer-motion'

const aspectRatios = [
  { label: '1:1 (Square)', value: '1:1' },
  { label: '16:9 (Widescreen)', value: '16:9' },
  { label: '9:16 (Portrait)', value: '9:16' },
  { label: '4:3 (Standard)', value: '4:3' },
]

export default function AIVideoRepurposingPage() {
  const [videoUrl, setVideoUrl] = useState('')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [loading, setLoading] = useState(false)
  const [repurposedVideoUrl, setRepurposedVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRepurpose = async () => {
    if (!videoUrl.trim()) return

    setLoading(true)
    setRepurposedVideoUrl(null)
    setError(null)

    try {
      const res = await fetch('/api/repurpose-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl, aspectRatio }),
      })

      const data = await res.json()
      if (res.ok && data.url) {
        setRepurposedVideoUrl(data.url)
      } else {
        setError(data.error || 'Failed to repurpose video')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const downloadVideo = () => {
    if (!repurposedVideoUrl) return
    const link = document.createElement('a')
    link.href = repurposedVideoUrl
    link.download = 'repurposed-video.mp4'
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
          {/* Left Section - Video URL input */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">AI Video Repurposing</h1>
              <p className="text-zinc-400 mt-2 text-base">
                Upload your video or provide a YouTube link, and let AI repurpose it for different platforms.
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-zinc-300">Video URL</Label>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="e.g. YouTube URL or file URL"
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

            <Button
              onClick={handleRepurpose}
              disabled={!videoUrl || loading}
              className="w-full bg-white text-black hover:bg-zinc-200 transition"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" /> Repurpose Video
                </>
              )}
            </Button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Right Section - Video Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[300px] flex items-center justify-center"
          >
            {loading ? (
              <p className="text-zinc-400">Processing your video...</p>
            ) : repurposedVideoUrl ? (
              <div className="flex flex-col items-center space-y-4 w-full">
                <video
                  src={repurposedVideoUrl}
                  controls
                  className="rounded-lg w-full max-h-[400px] object-contain"
                />
                <Button
                  onClick={downloadVideo}
                  className="bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ) : (
              <p className="text-zinc-400">Your repurposed video will appear here.</p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
