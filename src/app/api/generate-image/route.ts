import { NextResponse } from 'next/server'

interface RequestBody {
  prompt: string
}

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON body
    const { prompt }: RequestBody = await req.json()
    console.log('🟢 Prompt received:', prompt)

    // Define the API URL for the image generation service (e.g., Replicate)
    const API_URL = 'https://api.replicate.com/v1/predictions'

    // Fetch the API key from environment variables
    const apiKey = process.env.REPLICATE_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is missing' }, { status: 500 })
    }

    // Make the request to the image generation API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt, // User's prompt to generate an image
        negative_prompt: "blurry, low quality, distorted, cropped", // Optional negative prompts
        steps: 30, // Number of steps for the generation (affects quality and performance)
        sampler_name: "DPM++ 2M", // Sampling method for image generation
        width: 512, // Image width
        height: 512, // Image height
        cfg_scale: 7, // Configuration scale for better adherence to the prompt
        seed: 5, // Random seed for image generation (for reproducibility)
      }),
    })

    console.log('🟡 API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('🔴 API error:', errorText)
      return NextResponse.json({ error: 'API failed', detail: errorText }, { status: 500 })
    }

    // Parse the response JSON
    const data = await response.json()

    // Check if the API returned the generated image
    if (data && data.urls && data.urls[0]) {
      const imageUrl = data.urls[0]

      console.log('✅ Image generated successfully.')
      return NextResponse.json({ url: imageUrl })
    } else {
      console.error('🔴 Image not found in response data.')
      return NextResponse.json({ error: 'Image generation failed' }, { status: 500 })
    }

  } catch (err: any) {
    console.error('🔥 Unexpected error:', err.message || err)
    return NextResponse.json({ error: 'Something went wrong in backend' }, { status: 500 })
  }
}
