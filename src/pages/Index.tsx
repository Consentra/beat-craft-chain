import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MusicGenerator from "@/components/MusicGenerator";
import NFTGallery from "@/components/NFTGallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="create" className="py-20 px-4 bg-secondary/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Create Your Music
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Use AI to transform your ideas into unique musical compositions
              </p>
            </div>
            <MusicGenerator />
          </div>
        </section>
        
        <section id="gallery">
          <NFTGallery />
        </section>
        
        <section id="about" className="py-20 px-4 bg-secondary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
              About BeatChain
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              BeatChain revolutionizes music creation by combining AI technology with blockchain ownership. 
              Create unique compositions from text prompts, mint them as NFTs, and trade them on a 
              decentralized marketplace.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">AI-Powered Creation</h3>
                <p className="text-muted-foreground">
                  Our advanced AI models can generate music in any style or genre based on your text descriptions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-accent">Blockchain Ownership</h3>
                <p className="text-muted-foreground">
                  Mint your creations as NFTs on Polygon for true ownership and the ability to trade your music.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 BeatChain. Empowering music creators with AI and blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
