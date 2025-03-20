/*
    Rutas de eventos
    host + /api/events 
 */

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const eventsController = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { fieldValidations } = require("../middlewares/field-validations");
const { validateToken } = require("../middlewares/validate-token");


router.use(validateToken);

router.get("/", [
    fieldValidations
], eventsController.getEvents);
router.post("/", [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").not().isEmpty()
        .custom(isDate).withMessage("Start date is not a valid date"),
        check("end", "End date is required").not().isEmpty()
        .custom(isDate).withMessage("End date is not a valid date")
        .custom((value, { req }) => {
            const start = new Date(req.body.start);
            return value > start;
        }).withMessage("End date must be greater than start date"),
    fieldValidations
], eventsController.createEvent);
router.put("/:id", [
    fieldValidations
], eventsController.updateEvent);
router.delete("/:id", [
    fieldValidations
], eventsController.deleteEvent);

module.exports = router;