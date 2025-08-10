import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { FACTORY_ABI, FACTORY_ADDRESSES } from '@/config/contracts';
import { parseEther, formatEther } from 'viem';

export interface MusicMetadata {
  title: string;
  artist: string;
  genre: string;
  duration: bigint;
  audioUrl: string;
  coverArt: string;
  createdAt: bigint;
  isAIGenerated: boolean;
}

export function useFactoryContract() {
  const { address } = useAccount();
  const chainId = useChainId();
  const contractAddress = FACTORY_ADDRESSES[chainId] as `0x${string}` | undefined;
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: allCollections } = useReadContract({
    address: contractAddress,
    abi: FACTORY_ABI,
    functionName: 'getAllCollections',
    query: { enabled: Boolean(contractAddress) },
  });

  const { data: creatorCollections } = useReadContract({
    address: contractAddress,
    abi: FACTORY_ABI,
    functionName: 'getCreatorCollections',
    args: [address ?? '0x0000000000000000000000000000000000000000'],
    query: { enabled: Boolean(contractAddress && address) },
  });

  const { data: minimumMintPrice } = useReadContract({
    address: contractAddress,
    abi: FACTORY_ABI,
    functionName: 'minimumMintPrice',
    query: { enabled: Boolean(contractAddress) },
  });

  const { data: mintingFee } = useReadContract({
    address: contractAddress,
    abi: FACTORY_ABI,
    functionName: 'mintingFee',
    query: { enabled: Boolean(contractAddress) },
  });

  const createCollection = async (name: string, symbol: string) => {
    if (!contractAddress) throw new Error('Unsupported chain / contract not configured');
    return writeContract({ address: contractAddress, abi: FACTORY_ABI, functionName: 'createCollection', args: [name, symbol] });
  };

  const mintNFT = async (
    collection: `0x${string}`,
    to: `0x${string}`,
    uri: string,
    metadata: MusicMetadata,
    royaltyFee: bigint,
    mintPrice: string
  ) => {
    if (!contractAddress) throw new Error('Unsupported chain / contract not configured');
    return writeContract({
      address: contractAddress,
      abi: FACTORY_ABI,
      functionName: 'mintWithFee',
      args: [collection, to, uri, metadata, royaltyFee],
      value: parseEther(mintPrice || '0'),
    });
  };

  return {
    contractAddress,
    collections: (allCollections as `0x${string}`[] | undefined) ?? [],
    creatorCollections: (creatorCollections as `0x${string}`[] | undefined) ?? [],
    minimumMintPrice: minimumMintPrice as bigint | undefined,
    mintingFee: mintingFee as bigint | undefined,
    createCollection,
    mintNFT,
    isCreatingOrMinting: isPending || isConfirming,
    txHash: hash,
    isConfirmed,
  };
}

export function useCreatorCollections(addr?: `0x${string}`) {
  const chainId = useChainId();
  const contractAddress = FACTORY_ADDRESSES[chainId] as `0x${string}` | undefined;
  const { data } = useReadContract({
    address: contractAddress,
    abi: FACTORY_ABI,
    functionName: 'getCreatorCollections',
    args: [addr ?? '0x0000000000000000000000000000000000000000'],
    query: { enabled: Boolean(contractAddress && addr) },
  });
  return { creatorCollections: (data as `0x${string}`[] | undefined) ?? [] };
}

export const formatPrice = (price: bigint) => formatEther(price);
export const parsePrice = (price: string) => parseEther(price);
