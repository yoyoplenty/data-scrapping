const router = require("express").Router(),
    dataController = require("../controllers/data");

router.get("/", dataController.getData);

module.exports = router;
