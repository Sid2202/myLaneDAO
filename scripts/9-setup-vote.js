import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";


const voteModule = sdk.getVoteModule("0xFe4Fdde74a791526373a307d3C4f73f6642bf094");

const tokenModule = sdk.getTokenModule("0x9Ec14fE8607d2EB7D1D3490E1ce061146e4dF0Bd");

(async () => {
    try {
      // Give our treasury the power to mint additional token if needed.
      await tokenModule.grantRole("minter", voteModule.address);
  
      console.log(
        "Successfully gave vote module permissions to act on token module"
      );
    } catch (error) {
      console.error(
        "failed to grant vote module permissions on token module",
        error
      );
      process.exit(1);
    }
  
    try {
      // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
      const ownedTokenBalance = await tokenModule.balanceOf(
        // The wallet address stored in your env file or Secrets section of Repl
        process.env.WALLET_ADDRESS
      );
  
      // Grab 90% of the supply that we hold.
      const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
      const percent90 = ownedAmount.div(100).mul(90);
  
      // Transfer 90% of the supply to our voting contract.
      await tokenModule.transfer(
        voteModule.address,
        percent90
      );
  
      console.log("✅ Successfully transferred tokens to vote module");
    } catch (err) {
      console.error("failed to transfer tokens to vote module", err);
    }
  })();
  