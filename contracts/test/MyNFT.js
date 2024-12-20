const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT Contract", function () {
  let MyNFT, myNFT, owner, addr1;

  beforeEach(async function () {
    // Deploy the contract
    MyNFT = await ethers.getContractFactory("MyNFT");
    [owner, addr1] = await ethers.getSigners();
    myNFT = await MyNFT.deploy();
    await myNFT.deployed();
  });

  it("should deploy successfully", async function () {
    expect(myNFT.address).to.properAddress;
  });

  it("should mint a new NFT", async function () {
    const tokenId = 1;
    const tokenURI = "https://example.com/metadata/1";

    // Mint an NFT
    await expect(myNFT.mint(addr1.address, tokenId, tokenURI))
      .to.emit(myNFT, "Transfer")
      .withArgs(ethers.constants.AddressZero, addr1.address, tokenId);

    // Verify the owner of the minted token
    expect(await myNFT.ownerOf(tokenId)).to.equal(addr1.address);

    // Verify the tokenURI
    expect(await myNFT.tokenURI(tokenId)).to.equal(tokenURI);
  });

  it("should revert if non-owner tries to mint", async function () {
    const tokenId = 1;
    const tokenURI = "https://example.com/metadata/1";

    await expect(
      myNFT.connect(addr1).mint(addr1.address, tokenId, tokenURI)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should return the correct tokenURI", async function () {
    const tokenId = 1;
    const tokenURI = "https://example.com/metadata/1";

    // Mint an NFT
    await myNFT.mint(addr1.address, tokenId, tokenURI);

    // Verify the tokenURI
    expect(await myNFT.tokenURI(tokenId)).to.equal(tokenURI);
  });

  it("should revert tokenURI query for nonexistent token", async function () {
    const tokenId = 999;

    await expect(myNFT.tokenURI(tokenId)).to.be.revertedWith(
      "ERC721Metadata: URI query for nonexistent token"
    );
  });
});
