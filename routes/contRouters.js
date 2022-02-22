const { Router } = require("express");
const ContController = require("../controllers/ContController");
const ReportController = require("../controllers/ReportController");
const router = Router();

router.post("/add", ContController.addCont);
router.post("/remove", ContController.removeCont);

router.get("/showop/:opcode", ReportController.showOpcode);
router.get("/reportExp", ReportController.showAvExpenses);
router.get("/reportRev", ReportController.showAvRevenue);
router.get("/show", ContController.showCont);
router.post("/update", ContController.updateCont);

module.exports = router;

