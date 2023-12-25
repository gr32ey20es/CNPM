import express from "express";
import { getNhanKhau, deleteNhanKhau, _update, addNhanKhau, getdetail} from "../controllers/nhankhau.js";

const router = express.Router()

router.post("/get",getNhanKhau) // lấy nhân khẩu
router.post("/put",_update) // cập nhật nhân khẩu
router.post("/add",addNhanKhau) // thêm nhân khẩu
router.post("/delete",deleteNhanKhau) // xóa nhân khẩu
router.post("/detail",getdetail)//lấy thông tin chi tiết
export default router