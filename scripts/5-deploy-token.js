import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0xD8A0de2b02afB15C0454F10433888E83c307B336");

(async () => {
    try{
        const tokenModule = await app.deployTokenModule({
            name: "MyLaneDAO governance Token",
            symbol: "LANE",
        });
        console.log("Successfully deployed token module, address:",tokenModule.address);
    }
    catch(error){
        console.log("failed to deploy token module",error);
    }
})();