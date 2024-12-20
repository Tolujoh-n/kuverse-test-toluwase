import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "./Contractinfo";
import { useWeb3 } from "../Web3Provider";
import "react-toastify/dist/ReactToastify.css";

const modalStyle = {
  display: "block",
  position: "fixed",
  zIndex: "9999",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly darker background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  backgroundColor: "rgb(0, 143, 179)",
  border: "1px solid #ccc",
  color: "#fff",
  padding: "20px",
  borderRadius: "8px", // Rounded corners
  width: "100%",
  maxWidth: "500px",
  boxSizing: "border-box", // Ensures padding is included in the width calculation
  display: "flex",
  flexDirection: "column",
  gap: "15px", // Space between form fields
};

const inputStyle = {
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const closeButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#f44336", // Red color for Close
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const mintButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "rgb(1, 81, 101)", // Green color for Mint NFT
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const Nav = (props) => {
  const {
    connected,
    account,
    connectWallet,
    disconnectWallet,
    shortenAddress,
  } = useWeb3();
  const [showModal, setShowModal] = useState(false);
  const [mintData, setMintData] = useState({ title: "", uri: "" });
  const [userNFTs, setUserNFTs] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchNFTs = async () => {
    if (!connected || !account) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const nftCount = await contract.balanceOf(account);

      const nfts = [];
      for (let i = 0; i < nftCount; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        const uri = await contract.tokenURI(tokenId);
        nfts.push({ tokenId: tokenId.toString(), uri });
      }
      setUserNFTs(nfts);
    } catch (error) {
      toast.error("Error fetching NFTs: " + error.message);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [connected, account]);

  const handleMint = async () => {
    if (!mintData.title || !mintData.uri) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.mint(account, mintData.title, mintData.uri);
      await tx.wait();

      toast.success("NFT minted successfully!");
      setShowModal(false);
      setMintData({ title: "", uri: "" });
      fetchNFTs();
    } catch (error) {
      toast.error("Error minting NFT: " + error.message);
    }
  };

  const isActive = (path) => location.pathname === path;
  return (
    <aside id="sidebar" className={`sidebar ${"ml-[300px]"}`}>
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link gap-1 collapsed" to="/">
            <i className="bi bi-house-door"></i>
            <span>Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link gap-1 collapsed ${
              isActive("/about") ? "active" : ""
            }`}
            to="/about"
          >
            <i className="bi bi-info-circle"></i>
            <span>About</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link gap-1 collapsed ${
              isActive("/kore") ? "active" : ""
            }`}
            to="/kore"
          >
            <i className="bi bi-palette"></i>
            <span>Kore</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link gap-1 collapsed ${
              isActive("/hatch") ? "active" : ""
            }`}
            to="/hatch"
          >
            <i className="bi bi-cash"></i>
            <span>Hatch</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link gap-1 collapsed ${
              isActive("/stats") ? "active" : ""
            }`}
            to="/stats"
          >
            <i className="bi bi-graph-up"></i>
            <span>Stats</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link gap-1 collapsed ${
              isActive("/profile") ? "active" : ""
            }`}
            to="/profile"
          >
            <i className="bi bi-person-circle"></i>
            <span>Login</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link gap-1 collapsed ${
              isActive("/play") ? "active" : ""
            }`}
            to="/play"
          >
            <i className="bi bi-play-circle"></i>
            <span>Play</span>
          </Link>
        </li>
      </ul>

      <br />

      <ul
        style={{ background: "transparent" }}
        className="sidebar-nav"
        id="sidebar-nav"
      >
        <>
          {connected ? (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link gap-1 collapsed ${
                    isActive("/") ? "active" : ""
                  }`}
                  to="/"
                >
                  <i className="bi bi-person-circle"></i>
                  <span>{shortenAddress(account)}</span>
                </Link>
              </li>
              <button
                onClick={() => setShowModal(true)}
                type="button"
                id="optionbut"
              >
                Mint
              </button>

              <button onClick={disconnectWallet} type="button" id="optionbut">
                Disconnect
              </button>
            </>
          ) : (
            <button onClick={connectWallet} type="button" id="optionbut">
              Connect Wallet
            </button>
          )}
        </>
        {/* {account ? (
          <>
            <button id="optionbut" onClick={props.openLogoutModal}>
              {shorter(account)}
            </button>
          </>
        ) : (
          <button id="optionbut" onClick={props.connectAccount}>
            CONNECT METAMASK
          </button>
        )} */}

        {props?.kuWallet ? (
          <>
            <button id="optionbut" onClick={props.connectKusama}>
              {props.kuWallet.address}
            </button>
          </>
        ) : (
          <button id="optionbut" onClick={props.connectKusama}>
            CONNECT KUSAMA
          </button>
        )}
      </ul>
      <br />
      <ul className="sidebar-nav">
        <li className="nav-item">
          <h4>Your NFTs</h4>
          {userNFTs.map((nft, index) => (
            <div key={index} className="nft-item">
              <span>Token ID: {nft.tokenId}</span>
              <span>URI: {nft.uri}</span>
            </div>
          ))}
        </li>
      </ul>

      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Mint NFT</h3>
            <label>
              Title:
              <input
                style={inputStyle}
                type="text"
                value={mintData.title}
                onChange={(e) =>
                  setMintData({ ...mintData, title: e.target.value })
                }
              />
            </label>
            <label>
              URI:
              <input
                style={inputStyle}
                type="text"
                value={mintData.uri}
                onChange={(e) =>
                  setMintData({ ...mintData, uri: e.target.value })
                }
              />
            </label>

            <div style={buttonContainerStyle}>
              <button
                style={closeButtonStyle}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button style={mintButtonStyle} onClick={handleMint}>
                Mint NFT
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Nav;
