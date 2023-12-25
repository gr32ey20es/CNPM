import express from "express";
import { _create, _read, _update, _delete, _statistics } from "../controllers/khoanthu.js";

const router = express.Router();

router.post("/", _create);
router.post("/get", _read)
router.post("/put", _update);
router.post("/delete", _delete);
router.post("/statistics", _statistics);

export default router;