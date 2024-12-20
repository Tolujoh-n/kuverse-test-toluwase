import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "./Contractinfo"; // Import contract info

const Nftlist = () => {
  const [userNFTs, setUserNFTs] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Fetch the connected wallet's NFTs
  const fetchNFTs = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();

        setIsWalletConnected(true);

        // Initialize contract with contract address and ABI
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS, // Contract address passed here
          ABI, // ABI imported from Contractinfo
          signer
        );

        const tokenCounter = await contract.tokenCounter();

        const nfts = [];
        for (let tokenId = 0; tokenId < tokenCounter; tokenId++) {
          const owner = await contract.ownerOf(tokenId);
          if (owner.toLowerCase() === userAddress.toLowerCase()) {
            const tokenURI = await contract.tokenURI(tokenId);
            const tokenTitle = await contract.getTokenTitle(tokenId);
            nfts.push({ tokenId, tokenURI, tokenTitle });
          }
        }
        setUserNFTs(nfts);
      } else {
        console.error("Ethereum wallet not detected!");
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div>
      <ul className="sidebar-nav">
        <li className="nav-item">
          <h4>Your NFTs</h4>
          {userNFTs.length > 0 ? (
            userNFTs.map((nft, index) => (
              <div key={index} className="nft-item">
                <span>Token ID: {nft.tokenId}</span>
                <span>URI: {nft.tokenURI}</span>
                <span>Title: {nft.tokenTitle}</span>
              </div>
            ))
          ) : (
            <p>No NFTs found</p>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Nftlist;
