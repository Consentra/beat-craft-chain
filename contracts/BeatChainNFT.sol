// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title BeatChainNFT
 * @dev ERC721 contract for AI-generated music NFTs with royalty support
 */
contract BeatChainNFT is ERC721, ERC721URIStorage, ERC721Royalty, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    // Platform fee (in basis points, 250 = 2.5%)
    uint96 public constant PLATFORM_FEE = 250;
    address public platformFeeRecipient;
    
    // Mapping from token ID to creator address
    mapping(uint256 => address) public tokenCreator;
    
    // Mapping from token ID to music metadata
    mapping(uint256 => MusicMetadata) public musicMetadata;
    
    struct MusicMetadata {
        string title;
        string artist;
        string genre;
        uint256 duration; // in seconds
        string audioUrl;
        string coverArt;
        uint256 createdAt;
        bool isAIGenerated;
    }
    
    event MusicNFTMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string title,
        string artist,
        uint256 price
    );
    
    event RoyaltySet(uint256 indexed tokenId, address recipient, uint96 feeNumerator);
    
    constructor(
        string memory name,
        string memory symbol,
        address _platformFeeRecipient
    ) ERC721(name, symbol) {
        platformFeeRecipient = _platformFeeRecipient;
    }
    
    /**
     * @dev Mint a new music NFT
     * @param to Address to mint the NFT to
     * @param uri Metadata URI for the NFT
     * @param metadata Music-specific metadata
     * @param royaltyFee Royalty fee for the creator (in basis points)
     */
    function mintMusicNFT(
        address to,
        string memory uri,
        MusicMetadata memory metadata,
        uint96 royaltyFee
    ) public nonReentrant returns (uint256) {
        require(royaltyFee <= 1000, "Royalty fee too high"); // Max 10%
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        // Set royalty for the creator
        _setTokenRoyalty(tokenId, to, royaltyFee);
        
        // Store creator and metadata
        tokenCreator[tokenId] = to;
        musicMetadata[tokenId] = metadata;
        
        emit MusicNFTMinted(tokenId, to, metadata.title, metadata.artist, 0);
        emit RoyaltySet(tokenId, to, royaltyFee);
        
        return tokenId;
    }
    
    /**
     * @dev Batch mint multiple music NFTs
     */
    function batchMintMusicNFT(
        address to,
        string[] memory uris,
        MusicMetadata[] memory metadataArray,
        uint96[] memory royaltyFees
    ) external returns (uint256[] memory) {
        require(
            uris.length == metadataArray.length && 
            uris.length == royaltyFees.length,
            "Array length mismatch"
        );
        
        uint256[] memory tokenIds = new uint256[](uris.length);
        
        for (uint256 i = 0; i < uris.length; i++) {
            tokenIds[i] = mintMusicNFT(to, uris[i], metadataArray[i], royaltyFees[i]);
        }
        
        return tokenIds;
    }
    
    /**
     * @dev Get music metadata for a token
     */
    function getMusicMetadata(uint256 tokenId) external view returns (MusicMetadata memory) {
        require(_exists(tokenId), "Token does not exist");
        return musicMetadata[tokenId];
    }
    
    /**
     * @dev Update platform fee recipient (only owner)
     */
    function setPlatformFeeRecipient(address _platformFeeRecipient) external onlyOwner {
        platformFeeRecipient = _platformFeeRecipient;
    }
    
    /**
     * @dev Get total supply of minted tokens
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    // Required overrides
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage, ERC721Royalty) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Royalty) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}