const { Router } = require("express");
const ContController = require("../controllers/ContController");
const ReportController = require("../controllers/ReportController");
const router = Router();

router.post("/add", ContController.addCont);
router.delete("/remove", ContController.removeCont);

router.get("/showop/:opcode", ReportController.showOpcode);
router.get("/reportExp", ReportController.showAvExpenses);
router.get("/reportRev", ReportController.showAvRevenue);
router.get("/show", ContController.showCont);
router.put("/update", ContController.updateCont);
router.get("/monthReport/:month/:year/:opcode", ReportController.monthReport);
router.get("/balance/:month/:year", ReportController.balanceReport);

module.exports = router;

