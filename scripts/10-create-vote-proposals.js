import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";


const voteModule = sdk.getVoteModule("0xFe4Fdde74a791526373a307d3C4f73f6642bf094");

const tokenModule = sdk.getTokenModule("0x9Ec14fE8607d2EB7D1D3490E1ce061146e4dF0Bd");

(async() => {
    try{
        const amount = 6_900;

        await voteModule.propose(
            "Should the DAO transfer "+amount+" tokens from the treasury to "+process.env.WALLET_ADDRESS +" for christmass lights?",
            [
                {
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData("transfer", [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]),
                    toAddress: tokenModule.address,
                }
            ]
        );

        console.log("Successfully created 1st proposal");
    }catch(err){
        console.error("Failed to create 2nd proposal", err);
    }
})();