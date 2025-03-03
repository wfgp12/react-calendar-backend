/*
    Rutas de autenticación
    host + /api/auth 
 */

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authController = require("../controllers/auth");
const { fieldValidations } = require("../middlewares/field-validations");

router.post("/", [
    check("email", "Email is required").isEmail(),
    check("password", "Password is more than 6 characters").isLength({ min: 6 }),
    fieldValidations
], authController.login);
router.post("/register", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is more than 6 characters").isLength({ min: 6 }),
    fieldValidations
], authController.createUser);
router.get("/renew", authController.renewToken);

module.exports = router;