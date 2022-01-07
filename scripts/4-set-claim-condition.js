import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
    "0x6f6c089Ff4470afb4bd0e691a8e7EA1218330d40",
);

(async () => {
    try {
      const claimConditionFactory = bundleDrop.getClaimConditionFactory();
      // Specify conditions.
      claimConditionFactory.newClaimPhase({
        startTime: new Date(),
        maxQuantity: 50_000,
        maxQuantityPerTransaction: 1,
      });
      
      
      await bundleDrop.setClaimCondition(0, claimConditionFactory);
      console.log("✅ Successfully set claim condition on bundle drop:", bundleDrop.address);
    } catch (error) {
      console.error("Failed to set claim condition", error);
    }
  })()