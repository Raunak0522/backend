const express = require("express");
const planRouter = express.Router();

const {
  getAllplansController,
  createPlanController,
  updatePlanController,
  deletePlanController,
  getPlanController,
} = require("../controller/planController");

const { protectRoute } = require("../controller/planController");
planRouter.route("/").get(getAllplansController).post(createPlanController);
planRouter
  .route("/:id")
  .patch(updatePlanController)
  .delete(deletePlanController)
  .get(getPlanController);

module.exports = planRouter;
