import NFTGallery from "@/components/NFTGallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, TrendingUp, Music, Users, Clock } from "lucide-react";
import { useState } from "react";

const GalleryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Tracks", count: 1247 },
    { id: "trending", label: "Trending", count: 89 },
    { id: "new", label: "New Releases", count: 156 },
    { id: "electronic", label: "Electronic", count: 423 },
    { id: "ambient", label: "Ambient", count: 234 },
    { id: "hip-hop", label: "Hip Hop", count: 167 },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-hero">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
              Music NFT Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover, collect, and trade unique AI-generated music NFTs from creators around the world.
              Each track is a one-of-a-kind digital asset backed by blockchain technology.
            </p>
          </div>

          {/* Gallery Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 text-center border border-border/50">
              <Music className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-muted-foreground">Total Tracks</div>
            </div>
            <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 text-center border border-border/50">
              <Users className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-muted-foreground">Creators</div>
            </div>
            <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 text-center border border-border/50">
              <TrendingUp className="h-8 w-8 text-primary-glow mx-auto mb-2" />
              <div className="text-2xl font-bold">24.7</div>
              <div className="text-sm text-muted-foreground">ETH Volume</div>
            </div>
            <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 text-center border border-border/50">
              <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">892</div>
              <div className="text-sm text-muted-foreground">NFTs Minted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tracks, creators, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Badge
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "secondary"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedFilter === filter.id 
                    ? "bg-primary hover:bg-primary/90" 
                    : "hover:bg-secondary/80"
                }`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label} ({filter.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* NFT Gallery */}
      <section className="py-8">
        <NFTGallery />
      </section>

      {/* Featured Collections */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
            Featured Collections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="h-48 bg-gradient-primary"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Synthwave Dreams</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  A collection of retro-futuristic synthwave tracks that transport you to the neon-lit streets of tomorrow.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">23 items</span>
                  <Badge variant="secondary">Electronic</Badge>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 hover:border-accent/50 transition-all duration-300">
              <div className="h-48 bg-gradient-secondary"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Ambient Journeys</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Peaceful soundscapes and atmospheric compositions perfect for meditation and relaxation.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">17 items</span>
                  <Badge variant="secondary">Ambient</Badge>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border/50 hover:border-primary-glow/50 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-accent/30 to-primary/30"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">AI Beats Vol. 1</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Cutting-edge hip-hop and trap beats generated by the latest AI music models.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">31 items</span>
                  <Badge variant="secondary">Hip Hop</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;