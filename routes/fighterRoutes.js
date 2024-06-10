import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

router.post(
  "/fighters",
  createFighterValid,
  async (req, res, next) => {
    try {
      const fighter = await fighterService.create(req.body);
      res.data = fighter;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.patch(
  "/fighters/:id",
  updateFighterValid,
  async (req, res, next) => {
    try {
      const fighter = await fighterService.update(req.body);
      res.data = fighter;
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
