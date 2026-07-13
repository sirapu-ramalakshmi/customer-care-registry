const express = require("express");

const {
  getComplaints,
  addComplaint,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} = require("../controllers/complaintController");

const router = express.Router();

router.get("/", getComplaints);
router.post("/", addComplaint);
router.get("/:id", getComplaintById);
router.put("/:id", updateComplaint);
router.delete("/:id", deleteComplaint);

module.exports = router;