import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xD8A0de2b02afB15C0454F10433888E83c307B336");

(async () => {
    try {
      const bundleDropModule = await app.deployBundleDropModule({
        name: "MyLaneDAO Membership",
        description: "A DAO for the homies in my lane!",
        image: readFileSync("scripts/assets/street.jpg"),
        primarySaleRecipientAddress: ethers.constants.AddressZero,
      });
      
      console.log(
        "✅ Successfully deployed bundleDrop module, address:",
        bundleDropModule.address,
      );
      console.log(
        "✅ bundleDrop metadata:",
        await bundleDropModule.getMetadata(),
      );
    } catch (error) {
      console.log("failed to deploy bundleDrop module", error);
    }
  })()