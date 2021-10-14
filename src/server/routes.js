const express = require("express");
const methods = require("./methods");
const router = express.Router();

router.post("/", methods.add);

router.get("/", methods.get);

router.get("/top5", methods.getTop5);

module.exports = {
  router,
};