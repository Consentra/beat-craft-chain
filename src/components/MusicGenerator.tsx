import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Wand2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MusicGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTrack, setGeneratedTrack] = useState<string | null>(null);
  const { toast } = useToast();

  const generateMusic = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for your music",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI music generation (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll use a placeholder audio URL
      setGeneratedTrack("https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav");
      
      toast({
        title: "Music Generated!",
        description: "Your AI-generated track is ready to mint as an NFT"
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate music. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Music className="h-6 w-6 text-primary" />
            AI Music Generator
          </CardTitle>
          <CardDescription>
            Describe the music you want to create and AI will compose it for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="music-prompt" className="text-sm font-medium">
              Music Description
            </label>
            <Textarea
              id="music-prompt"
              placeholder="Example: Chill lo-fi beats with piano and rain sounds, ambient atmosphere, 120 BPM"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] bg-background/50"
            />
          </div>

          <Button
            onClick={generateMusic}
            disabled={isGenerating || !prompt.trim()}
            variant="generate"
            size="lg"
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Music...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate Music
              </>
            )}
          </Button>

          {generatedTrack && (
            <div className="space-y-4 p-4 bg-secondary/20 rounded-lg border border-border/50">
              <h3 className="font-semibold">Generated Track</h3>
              <audio
                controls
                src={generatedTrack}
                className="w-full"
                style={{
                  filter: "hue-rotate(270deg) saturate(1.5)",
                  background: "transparent"
                }}
              >
                Your browser does not support the audio element.
              </audio>
              <div className="flex gap-2">
                <Button variant="hero" size="sm" className="flex-1">
                  Mint as NFT
                </Button>
                <Button variant="neon" size="sm" className="flex-1">
                  Save to Gallery
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MusicGenerator;