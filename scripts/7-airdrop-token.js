import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const bundleDropModule = sdk.getBundleDropModule("0x6f6c089Ff4470afb4bd0e691a8e7EA1218330d40");
const tokenModule = sdk.getTokenModule("0x9Ec14fE8607d2EB7D1D3490E1ce061146e4dF0Bd");

(async() => {
    try{
        const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

        if(walletAddresses.length === 0){
            console.log("NO NFTs hve been claimed yet :/");
            process.exit(0);
        }

        const airdropTargets = walletAddresses.map((address) => {
            const randomAmount = Math.floor(Math.random() * (10000 - 1000+1)+1000);
            console.log("Going to airdrop ", randomAmount," tokens to ",address);

            const airdropTarget = {
                address,
                amount: ethers.utils.parseUnits(randomAmount.toString(), 18)
            };
            return airdropTarget;
        });

        console.log("🌈Starting airdrop....")
        await tokenModule.transferBatch(airdropTargets);
        console.log("✅Successfully airdropped tokens to all the NFT holders!")
    }catch(error){
        console.error("Failed to airdrop tokens", error);
    }
})()