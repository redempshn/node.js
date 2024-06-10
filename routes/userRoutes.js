import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.post(
  "/api/users",
  createUserValid,
  async (req, res, next) => {
    const user = await userService.create(req.body);
    res.data = user;
    try {
    } catch (error) {
      res.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.patch(
  "/api/users/:id",
  updateUserValid,
  async (req, res, next) => {
    try {
      const user = await userService.update(req.params.id, req.body);
      res.data = user;
    } catch (error) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
