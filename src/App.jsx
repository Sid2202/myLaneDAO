import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useMemo, useState } from "react";

const App = () => {

  const { connectWallet, address, error, provider } = useWeb3();
  console.log("Address: ", address)

  if(!address){
    return(
      <div className="landing">
        <div>
          <h1>Welcome to MyLaneDAO</h1>
          <button 
            onClick={() => connectWallet("injected")}
            className="btn-hero">
              Connect to Wallet
            </button>
        </div>
      </div>
    )
  }

  return (
    <div className="landing">
      <div>
        <h1>Welcome to MyLaneDAO</h1>
        <h2>Wallet successfully connected!</h2>
      </div>
    </div>
  );
};

export default App;
