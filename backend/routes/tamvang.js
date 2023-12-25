import express from "express";
import { getTamVang, updateTamVangById, addTamVang, deleteTamVang} from "../controllers/tamvang.js";

const router = express.Router()

router.post("/get",getTamVang) // lấy tạm vắng
router.put("/:idtamvang",updateTamVangById) // cập nhật tạm vắng
router.post("/add",addTamVang) // thêm tạm vắng
router.post("/delete",deleteTamVang) // xóa tạm vắng

export default router