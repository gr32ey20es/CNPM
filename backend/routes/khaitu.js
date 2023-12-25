import express from "express";
import { getKhaiTu, deleteKhaiTu, updateKhaiTuById, addKhaiTu} from "../controllers/khaitu.js";

const router = express.Router()

router.post("/get",getKhaiTu) // lấy khai tử
router.put("/:idkhaitu",updateKhaiTuById) // cập nhật khai tử
router.post("/add",addKhaiTu) // thêm khai tử
router.post("/delete",deleteKhaiTu) // xóa khai tử

export default router