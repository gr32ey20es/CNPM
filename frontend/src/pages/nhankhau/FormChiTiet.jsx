import React, { useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IoCloseCircleOutline } from "react-icons/io5";
import moment from 'moment'
import './FormS.css'


const FormS = ({ data, close }) => {
  console.log(data)
  const variants = {
    open: { backgroundColor: "rgba(0,0,0,0.6)" },
    closed: { backgroundColor: "rgba(0,0,0,0)" },
  };
  const modalVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    closed: { opacity: 0 },
  };

  const { Formik } = formik;
 
  const onSubmitForm =  async (values) => {
    console.log("submit")
  }
 
  console.log(data)
  return (
    <motion.div className="overlay" key="overlay"
      variants={variants} initial={"closed"} 
      onClick={close} animate={"open"} exit={"closed"}  
    >
      <motion.div className="modal" variants={modalVariants} onClick={(e) => e.stopPropagation()} >

      <motion.button className="modal__close-wrapper" whileHover={{ scale: 1.2 }} onClick={close} >
        <IoCloseCircleOutline className="modal__close-icon" />
      </motion.button>

      <Formik
        onSubmit={onSubmitForm}
        initialValues={data}
      >
      {({ handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={(e)=>close()} className="w-75 d-flex flex-column justify-content-center">
             <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Chi tiết nhân khẩu</Form.Label>
          </Form.Group>
          
          <Row>
            
            <Form.Group className="position-relative mb-3">
              <Form.Label>Id</Form.Label>

              <Form.Control name="id"
                type="text"
                disabled
                value={values.id}
              />
            </Form.Group>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Họ tên</Form.Label>

              <Form.Control name="hoten"
                type="text"
                disabled
                value={values.hoten}
              />
            </Form.Group>
            {values.bietdanh?<Form.Group className="position-relative mb-3">
              <Form.Label>Biệt danh</Form.Label>

              <Form.Control name="bietdanh"
                type="text"
                disabled
                value={values.bietdanh}
              />
            </Form.Group>:<div></div>}
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Ngày sinh</Form.Label>

              <Form.Control name="ngaysinh"
                type="text"
                disabled
                value={values.ngaysinh}
              />
            </Form.Group>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Giới tính</Form.Label>

              <Form.Control name="gioitinh"
                type="text"
                disabled
                value={values.gioitinh}
              />
            </Form.Group>

          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Nơi sinh</Form.Label>

              <Form.Control name="noisinh"
                type="text"
                disabled
                value={values.noisinh}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Nguyên quán</Form.Label>

              <Form.Control name="nguyenquan"
                type="text"
                disabled
                value={values.nguyenquan}
              />
            </Form.Group>

          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Địa chỉ thường trú</Form.Label>

              <Form.Control name="diachi"
                type="text"
                disabled
                value={values.noisinh}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Dân tộc</Form.Label>

              <Form.Control name="dantoc"
                type="text"
                disabled
                value={values.dantoc}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Tôn giáo</Form.Label>

              <Form.Control name="tongiao"
                type="text"
                disabled
                value={values.tongiao}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Quốc tịch</Form.Label>

              <Form.Control name="quoctich"
                type="text"
                disabled
                value={values.quoctich}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Hộ chiếu</Form.Label>

              <Form.Control name="hochieu"
                type="text"
                disabled
                value={values.hochieu}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Nghề nghiệp</Form.Label>

              <Form.Control name="nghenghiep"
                type="text"
                disabled
                value={values.nghenghiep}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Nơi làm việc</Form.Label>

              <Form.Control name="noilamviec"
                type="text"
                disabled
                value={values.noilamviec}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Căn cước công dân</Form.Label>

              <Form.Control name="cccd"
                type="text"
                disabled
                value={values.cccd}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Ngày cấp</Form.Label>

              <Form.Control name="ngaycap"
                type="text"
                disabled
                value={values.ngaycap}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Nơi cấp</Form.Label>

              <Form.Control name="noicap"
                type="text"
                disabled
                value={values.noicap}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Ngày chuyển đến</Form.Label>

              <Form.Control name="ngaychuyenden"
                type="text"
                disabled
                value={values.ngaychuyenden}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Nơi thường trú trước</Form.Label>

              <Form.Control name="noithuongtrutruoc"
                type="text"
                disabled
                value={values.noithuongtrutruoc}
              />
            </Form.Group>
          </Row>
          <Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Quan hệ </Form.Label>

              <Form.Control name="quanhe"
                type="text"
                disabled
                value={values.quanhe}
              />
            </Form.Group>
          </Row>
            {values.tamvang!==''?<Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Thông tin tạm vắng</Form.Label>

              <Form.Control name="tamvang"
                type="text"
                disabled
                value={values.tamvang}
              />
            </Form.Group>
          </Row>:<></>}
          {values.khaitu!==''?<Row>
          <Form.Group className="position-relative mb-3">
              <Form.Label>Thông tin khai tử</Form.Label>

              <Form.Control name="khaitu"
                type="text"
                disabled
                value={values.khaitu}
              />
            </Form.Group>
          </Row>:<></>}
          <Form.Group className="position-relative mt-5 w-100 d-flex justify-content-center">
            <button className="button-89" type="submit" onClick={close}>Thoát</button>
          </Form.Group>
           </Form>
      )} 
      </Formik>
    </motion.div>
  </motion.div>
  );
};

export default FormS;