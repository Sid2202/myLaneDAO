import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
    "0x6f6c089Ff4470afb4bd0e691a8e7EA1218330d40",
);

(async () => {
    try{
        await bundleDrop.createBatch([
            {
                name: " Your residence ",
                description: "This NFT will give you access to MyLane",
                image: readFileSync("scripts/assets/home.jpg"),
            },
        ]);
        console.log("Successfully created a new NFT");
    }
    catch(error){
        console.error("Failed to create NFT", error);
    }
})()