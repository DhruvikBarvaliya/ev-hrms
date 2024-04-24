const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const AssetController = require("../Controllers/AssetController");

router.post("/asset", authorize([Role.ADMIN, Role.SUPER_ADMIN]), AssetController.addAsset);
router.get("/asset", authorize([Role.ADMIN, Role.SUPER_ADMIN]), AssetController.getAllAsset);
router.get("/asset/:asset_id", authorize([Role.ADMIN, Role.SUPER_ADMIN]), AssetController.getAssetById);
router.put("/asset/:asset_id", authorize([Role.ADMIN, Role.SUPER_ADMIN]), AssetController.updateAsset);
router.put("/asset/:asset_id/:is_active", authorize([Role.ADMIN, Role.SUPER_ADMIN]), AssetController.updateAssetStatus);
router.delete("/asset/:asset_id", authorize([Role.ADMIN, Role.SUPER_ADMIN]), AssetController.deleteAsset);

module.exports = router;
