import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, duration = 10, model = "facebook/musicgen-medium" } = await req.json()

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Using Hugging Face Inference API for MusicGen
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

    console.log(`Generating music with prompt: "${prompt}"`)

    // Call Hugging Face Inference API
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            duration: duration,
            temperature: 0.8,
            top_p: 0.9,
          }
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Hugging Face API error:', errorText)
      
      // Check if model is loading
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
        JSON.stringify({ error: 'Failed to generate music' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: response.status 
        }
      )
    }

    // Get the audio data as blob
    const audioBlob = await response.blob()
    const audioArrayBuffer = await audioBlob.arrayBuffer()
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioArrayBuffer)))

    // Return the generated audio as base64
    return new Response(
      JSON.stringify({
        success: true,
        audioData: `data:audio/wav;base64,${audioBase64}`,
        prompt: prompt,
        duration: duration,
        model: model
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error generating music:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})