import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule("0xD8A0de2b02afB15C0454F10433888E83c307B336");

(async() => {
    try{
        const voteModule = await appModule.deployVoteModule({
            name: "MyLaneDAO's proposal",
            votingTokenAddress: "0x9Ec14fE8607d2EB7D1D3490E1ce061146e4dF0Bd",
            proposalStartWaitTimeInSeconds: 0,
            proposalVotingTimeInSeconds: 24*60*60,
            votingQuorumFraction: 0,
            minimumNumberOfTokensNeededToPropose:"0",
        });
        console.log("✅Successfully deployed vote module, address: ", voteModule.address);
    }catch(err){
        console.error("Failed to deploy vote module", err);
    }
})();