import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Wand2, Loader2, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MusicGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTrack, setGeneratedTrack] = useState<string | null>(null);
  const [duration, setDuration] = useState(10);
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
    
    // Simulate AI music generation for now (will be replaced with real API later)
    try {
      console.log('Starting music generation...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll use a placeholder audio URL
      setGeneratedTrack("https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav");
      
      toast({
        title: "Music Generated!",
        description: "Your AI-generated track is ready to mint as an NFT"
      });
    } catch (error: any) {
      console.error('Music generation failed:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate music. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAudio = () => {
    if (!generatedTrack) return;
    
    const link = document.createElement('a');
    link.href = generatedTrack;
    link.download = `beatchain-${Date.now()}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <div className="space-y-4">
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

            <div className="space-y-2">
              <label htmlFor="duration" className="text-sm font-medium">
                Duration (seconds)
              </label>
              <select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-2 rounded-md bg-background/50 border border-border"
              >
                <option value={5}>5 seconds</option>
                <option value={10}>10 seconds</option>
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
              </select>
            </div>
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
            <div className="space-y-4 p-6 bg-secondary/20 rounded-lg border border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Generated Track</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={downloadAudio}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-background/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-2">Prompt: "{prompt}"</p>
                <p className="text-xs text-muted-foreground">Duration: {duration}s</p>
              </div>

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