import { http, createConfig } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Define custom networks
export const hyperionTestnet = {
  id: 133717,
  name: 'Hyperion Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tMETIS',
    symbol: 'tMETIS',
  },
  rpcUrls: {
    default: {
      http: ['https://hyperion-testnet.metisdevops.link'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Hyperion Explorer',
      url: 'https://hyperion-testnet-explorer.metisdevops.link',
    },
  },
  testnet: true,
}

export const lazAITestnet = {
  id: 133718,
  name: 'LazAI Pre-Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'LAZAI',
    symbol: 'LAZAI',
  },
  rpcUrls: {
    default: {
      http: ['https://lazai-testnet.metisdevops.link'],
    },
  },
  blockExplorers: {
    default: {
      name: 'LazAI Explorer',
      url: 'https://lazai-testnet-explorer.metisdevops.link',
    },
  },
  testnet: true,
}

export const config = getDefaultConfig({
  appName: 'BeatChain - AI Music NFT Platform',
  projectId: 'beatchain-music-nft-platform',
  chains: [hyperionTestnet, lazAITestnet],
  transports: {
    [hyperionTestnet.id]: http(),
    [lazAITestnet.id]: http(),
  },
})