import express from "express";
import { _get, _put, _add, _delete} from "../controllers/tamtru.js";

const router = express.Router()

router.post("/get",_get) // lấy tạm trú
router.post("/put",_put) // cập nhật tạm trú
router.post("/add",_add) // thêm tạm trú
router.post("/delete",_delete) // xóa tạm trú

export default router