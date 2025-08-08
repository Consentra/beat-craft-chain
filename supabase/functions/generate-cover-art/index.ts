import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Using Hugging Face Inference API for image generation
    const HF_API_KEY = Deno.env.get('HUGGING_FACE_API_KEY')
    
    if (!HF_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Hugging Face API key not configured' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    console.log(`Generating cover art with prompt: "${prompt}"`)

    // Call Hugging Face Inference API for Stable Diffusion
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            width: 512,
            height: 512,
            guidance_scale: 7.5,
            num_inference_steps: 25
          }
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Hugging Face API error:', errorText)
      
      if (response.status === 503) {
        return new Response(
          JSON.stringify({ 
            error: 'Model is loading, please try again in a few minutes',
            isLoading: true 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 503 
          }
        )
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate cover art' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: response.status 
        }
      )
    }

    // Get the image data as blob
    const imageBlob = await response.blob()
    const imageArrayBuffer = await imageBlob.arrayBuffer()
    const imageBase64 = btoa(String.fromCharCode(...new Uint8Array(imageArrayBuffer)))

    // Return the generated image as base64
    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: `data:image/png;base64,${imageBase64}`,
        prompt: prompt
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error generating cover art:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})