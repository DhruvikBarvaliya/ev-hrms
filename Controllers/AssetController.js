const AssetModel = require("../Models/AssetModel");

module.exports = {
  addAsset: async (req, res) => {
    try {
      const { asset_type,
        asset_name,
        asset_model_no,
        asset_serial_no,
        date_of_purchase,
        project_id,
        brand_name,
        status,
        is_active,
        created_by,
        updated_by, } = req.body;

      const assetData = new AssetModel({
        asset_type,
        asset_name,
        asset_model_no,
        asset_serial_no,
        date_of_purchase,
        project_id,
        brand_name,
        status,
        is_active,
        created_by,
        updated_by,

      });
      assetData
        .save()
        .then((data) => {
          return res
            .status(201)
            .json({ status: true, message: "Asset Created Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getAllAsset: async (req, res) => {
    try {
      const allAsset = await AssetModel.find()
      if (allAsset.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Asset Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Asset Get Successfully", allAsset });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getAssetById: async (req, res) => {
    try {
      const { asset_id } = req.params
      const asset = await AssetModel.findById({ _id: asset_id });
      if (asset == null) {
        return res
          .status(404)
          .json({ status: false, message: `Asset Not Found With ID :- ${asset_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Asset Get Successfully", asset });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateAsset: async (req, res) => {
    try {
      const { asset_id } = req.params
      const asset = await AssetModel.findByIdAndUpdate({ _id: asset_id }, req.body, { new: true });
      if (asset == null) {
        return res
          .status(404)
          .json({ status: false, message: `Asset Not Found With ID :- ${asset_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Asset Updated Successfully", asset });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateAssetStatus: async (req, res) => {
    try {
      const { asset_id, is_active } = req.params
      const asset = await AssetModel.findByIdAndUpdate(asset_id,
        { $set: { is_active: is_active } },
        { new: true });
      if (asset == null) {
        return res
          .status(404)
          .json({ status: false, message: `Asset Not Found With ID :- ${asset_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Asset Status Updated Successfully", asset });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteAsset: async (req, res) => {
    try {
      const { asset_id } = req.params
      const asset = await AssetModel.findByIdAndDelete({ _id: asset_id });
      if (asset == null) {
        return res
          .status(404)
          .json({ status: false, message: `Asset Not Found With ID :- ${asset_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: `Asset Deleted Successfully with ID :- ${asset._id}` });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};
