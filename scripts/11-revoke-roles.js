import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule("0x9Ec14fE8607d2EB7D1D3490E1ce061146e4dF0Bd");

(async () => {
    try{
        console.log("👀 Roles that exist right now:",
        await tokenModule.getAllRoleMembers());

        await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);

        console.log("🎉 Roles after revoking ourselves",
        await tokenModule.getAllRoleMembers());

        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");

    }catch(err){
        console.error("Failed to revoke ourselves from the DAO treasury", err);
    }
})();