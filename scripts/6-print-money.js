import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule("0x9Ec14fE8607d2EB7D1D3490E1ce061146e4dF0Bd");

(async () => {
    try{
        const amount = 1_000_000;
        const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
        await tokenModule.mint(amountWith18Decimals);
        const totalSupply = await tokenModule.totalSupply();

        console.log(
            "There now is ", ethers.utils.formatUnits(totalSupply, 18)," $LANE in circulation,"
        );
    }catch(error){
        console.error("Failed to print money", error);
    }
})();