const { Router } = require("express");
const ContController = require("../controllers/ContController");
const router = Router();

router.post("/add", ContController.addCont);
router.post("/remove", ContController.removeCont);

module.exports = router;

