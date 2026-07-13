const express = require("express");

const {
  getCustomers,
  addCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.get("/", getCustomers);
router.post("/", addCustomer);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;