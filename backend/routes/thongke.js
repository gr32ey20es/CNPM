import express from "express";
import { tamtru, tamvang, thongkeGioiTinh,thongkeTuoi } from "../controllers/thongke.js";

const router = express.Router()

router.post("/tuoi",thongkeTuoi)
router.post("/gioitinh",thongkeGioiTinh)
router.post("/tamvang",tamvang);
router.post("/tamtru",tamtru);
export default router