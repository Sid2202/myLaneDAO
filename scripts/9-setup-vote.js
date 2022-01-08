import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";


const voteModule = sdk.getVoteModule("0xFe4Fdde74a791526373a307d3C4f73f6642bf094");

const tokenModule = sdk.getTokenModule("0x9Ec14fE8607d2EB7D1D3490E1ce061146e4dF0Bd");

(async() => {
    try{
        await tokenModule.grantRole("minter", voteModule.address);
        console.log("Successfully gave vote module permission to act on token module");
    }catch(err){
        console.error("Failed to grant vote module permissions on token module", err);
        process.exit(1);
    }

    try{
        const ownedTokenBalance = await tokenModule.balanceOf(process.env.WALLET_ADDRESS);

        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        await tokenModule.transfer(voteModule.address, percent90);

        console.log("✅ Successfully transferred tokens to vote module");
    }catch(err){
        console.error("failed to transfer tokens to vote module", err);
    }
})();