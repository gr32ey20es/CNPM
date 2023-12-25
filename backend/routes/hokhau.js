import express from "express";
import { _add,_tach } from "../controllers/hohau.js";

const router = express.Router()


router.post("/tach",_tach)
router.post("/add",_add)
export default router