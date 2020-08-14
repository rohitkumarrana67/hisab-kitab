const express = require("express");
const customerController = require("../v1/controllers/customer_controller");
const router = express.Router();
const Auth = require("../core/authenticator");

router.post("/users/customers", Auth, customerController.createCustomer);
router.get("/users/customers", Auth,customerController.getCustomers);
router.get("/users/customers/:id",Auth, customerController.getCustomerById);
router.patch("/users/customers/:id",Auth, customerController.updateCustomerById);
// router.delete("/users/customers/:id",Auth, customerController.deleteCustomerByid);
// router.delete("/users/customser",Auth, customerController.deleteAllCustomer);

module.exports = router;