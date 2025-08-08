import Hero from "@/components/Hero";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Overview */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
              The Future of Music Creation
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              BeatChain combines cutting-edge AI technology with blockchain innovation to revolutionize 
              how music is created, owned, and traded.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Music Generation</h3>
              <p className="text-muted-foreground">
                Transform your ideas into unique musical compositions using advanced AI models. 
                Simply describe your vision and watch it come to life.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50 hover:border-accent/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">NFT Marketplace</h3>
              <p className="text-muted-foreground">
                Mint your AI-generated music as NFTs and trade them on our decentralized marketplace. 
                True ownership meets creative freedom.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50 hover:border-primary-glow/50 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Low-Cost Blockchain</h3>
              <p className="text-muted-foreground">
                Built on Hyperion and LazAI testnets for fast, affordable transactions. 
                Create and trade without breaking the bank.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Tracks Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">892</div>
              <div className="text-sm text-muted-foreground">NFTs Minted</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-glow">156</div>
              <div className="text-sm text-muted-foreground">Active Creators</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">24.7</div>
              <div className="text-sm text-muted-foreground">ETH Volume</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;