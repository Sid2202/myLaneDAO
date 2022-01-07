import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useMemo, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";

const sdk = new ThirdwebSDK("rinkeby");
const bundleDropModule = sdk.getBundleDropModule(
  "0x6f6c089Ff4470afb4bd0e691a8e7EA1218330d40",
);

const App = () => {

  const { connectWallet, address, error, provider } = useWeb3();
  console.log("Address: ", address)

  const signer = provider? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  },[signer]);

  useEffect(() =>{
    if(!address){
      return;
    }

    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if(balance.gt(0)){
          setHasClaimedNFT(true);
          console.log("This user has a membership NFT!")
        }
        else{
          setHasClaimedNFT(false);
          console.log("This user doesn't have a membership NFT!")
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("Failed to nft balance", error);
      });
  },[address]);

  if(!address){
    return(
      <div className="landing">
        <div>
          <h1>Welcome to MyLaneDAO</h1>
          <button 
            onClick={() => connectWallet("injected")}
            className="btn-hero">
              Connect your Wallet
            </button>
        </div>
      </div>
    )
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  };

  const mintNft = () => {
    setIsClaiming(true);
    bundleDropModule
      .claim("0",1)
      .then(() => {
        setHasClaimedNFT(true);
        console.log(`Succesfully minted! Check it out on OpenSea https://testnets.opensea.io/assets/${bundleDropModule.address}/0`);
      })
      .catch((err) => {
        console.error("Failed to claim", err);
      })
      .finally(() => {
        setIsClaiming(false);
      })
  }

  return (
    <div className="landing">
      <div>
        <h1>Welcome to MyLaneDAO</h1>
        <h2>Wallet successfully connected!</h2>
        <button
          disabled = {isClaiming}
          onClick={() => mintNft()}
        >
          {isClaiming ? "Minting...": "Mint your NFT (FREE)!"}
        </button>
      </div>
    </div>
  );
};

export default App;
