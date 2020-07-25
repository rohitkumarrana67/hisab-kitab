const express = require("express");
const customerController = require("../v1/controllers/customer_controller");
const router = express.Router();
const Auth = require("../core/authenticator");

router.get("/users/customers", customerController.getCustomers);
router.get("/users/customers/:id", customerController.getCustomerById);
router.post("/users/customers", Auth, customerController.createCustomer);
router.patch("/users/customers", customerController.updateCustomerById);
router.delete("/users/customers/id", customerController.deleteCustomerByid);
router.delete("/users/customser", customerController.deleteAllCustomer);

module.exports = router;