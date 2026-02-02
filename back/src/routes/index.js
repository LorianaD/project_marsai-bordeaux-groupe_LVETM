import { Router } from "express";
import { testController } from "../controllers/test.controller.js";

import usersRouter from "./users.js";

const router = Router();

router.get("/test", testController);
router.use("/users", usersRouter);


export default router;