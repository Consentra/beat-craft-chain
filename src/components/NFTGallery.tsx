import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, ExternalLink, Heart } from "lucide-react";
import { useState } from "react";

interface NFTTrack {
  id: string;
  title: string;
  artist: string;
  price: string;
  likes: number;
  duration: string;
  coverArt: string;
  audioUrl: string;
  genre: string;
}

// Mock data for demonstration
const mockTracks: NFTTrack[] = [
  {
    id: "1",
    title: "Cosmic Synthwave",
    artist: "0x1234...5678",
    price: "0.05 ETH",
    likes: 42,
    duration: "3:24",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
    genre: "Synthwave"
  },
  {
    id: "2",
    title: "Digital Dreams",
    artist: "0x9876...4321",
    price: "0.03 ETH",
    likes: 28,
    duration: "4:12",
    coverArt: "https://images.unsplash.com/photo-1571974599782-87624638275c?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
    genre: "Electronic"
  },
  {
    id: "3",
    title: "Neon Nights",
    artist: "0x5555...9999",
    price: "0.08 ETH",
    likes: 67,
    duration: "2:48",
    coverArt: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
    genre: "Ambient"
  }
];

const NFTGallery = () => {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const togglePlay = (trackId: string) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            NFT Music Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover and collect unique AI-generated music NFTs from creators around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTracks.map((track) => (
            <Card key={track.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-0">
                {/* Cover Art */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={track.coverArt}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => togglePlay(track.id)}
                      variant="hero"
                      size="lg"
                      className="rounded-full w-16 h-16"
                    >
                      {playingTrack === track.id ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 ml-1" />
                      )}
                    </Button>
                  </div>
                  <Badge variant="secondary" className="absolute top-3 left-3">
                    {track.genre}
                  </Badge>
                </div>

                {/* Track Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 truncate">{track.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 truncate">{track.artist}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-bold">{track.price}</span>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Heart className="h-4 w-4" />
                      {track.likes}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex-1">
                      Buy Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="neon" size="lg">
            Load More Tracks
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NFTGallery;