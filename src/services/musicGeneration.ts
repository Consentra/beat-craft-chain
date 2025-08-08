import { supabase } from "@/integrations/supabase/client";

export interface GenerateMusicParams {
  prompt: string;
  duration?: number;
  model?: string;
}

export interface GeneratedMusic {
  audioData: string; // Base64 encoded audio
  prompt: string;
  duration: number;
  model: string;
}

export class MusicGenerationService {
  static async generateMusic(params: GenerateMusicParams): Promise<GeneratedMusic> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-music', {
        body: {
          prompt: params.prompt,
          duration: params.duration || 10,
          model: params.model || "facebook/musicgen-medium"
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate music');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.isLoading) {
        throw new Error('Model is loading, please try again in a few minutes');
      }

      return data;
    } catch (error) {
      console.error('Music generation error:', error);
      throw error;
    }
  }

  static async generateCoverArt(prompt: string): Promise<string> {
    // Generate cover art based on the music prompt
    try {
      const { data, error } = await supabase.functions.invoke('generate-cover-art', {
        body: {
          prompt: `Album cover art for: ${prompt}, music themed, vibrant colors, artistic design`
        }
      });

      if (error) {
        console.error('Cover art generation error:', error);
        throw new Error('Failed to generate cover art');
      }

      return data.imageUrl;
    } catch (error) {
      console.error('Cover art error:', error);
      // Return a default placeholder if cover art generation fails
      return 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop';
    }
  }
}