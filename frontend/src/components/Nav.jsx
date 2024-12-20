import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/bird-logo.png";
// import { useWeb3 } from "../Web3Provider";
import { ethers } from "ethers";

// import logo from "../assets/img/logo.png";

const Nav = () => {
  // const {
  //   connected,
  //   account,
  //   connectWallet,
  //   disconnectWallet,
  //   shortenAddress,
  // } = useWeb3();
  const WalletConnected = true;
  //   const truncatedAddress = isWalletConnected
  //     ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
  //     : "";

  return (
    <header
      id="header"
      className="header fixed-top d-flex
     align-items-center"
    >
      <div className="d-flex align-items-center justify-content-between">
        <i
          className="bi bi-list toggle-sidebar-btn
        hover:text-black mr-3
        lg:hidden"
        ></i>
        <Link to="/" className="logo d-flex align-items-center">
          <img
            style={{ borderRadius: "5px" }}
            src={logo}
            alt=""
            className="h-[70px] w-[70px] object-cover"
          />
          <span className="d-none d-lg-block">KU VERSE</span>
        </Link>
      </div>
      {/* End Logo */}

      <nav className="header-nav ms-auto">
        <>
          <ul className="d-flex align-items-center">
            <li className="nav-item">
              <Link className="nav-link nav-icon" to="/settings">
                <i className="bi bi-wallet"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-icon" to="/settings">
                <i className="bi bi-gear"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-icon" to="/settings">
                <i className="bi bi-wallet"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-icon" to="/settings">
                <i className="bi bi-gear"></i>
              </Link>
            </li>
          </ul>
        </>
      </nav>

      {/* End Icons Navigation */}
    </header>
    /* End Header */
  );
};

export default Nav;
