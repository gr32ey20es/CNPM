import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IoCloseCircleOutline } from "react-icons/io5";
import './FormS.css'

const FormS = ({ data, listKhoanThu, close, handleClickSua }) => {
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

  const schema = yup.object().shape({
    sotiendanop: yup.number()
      .required("Số tiền không được để trống")
      .when('loai',{
        is:'Tự nguyện',
        then:()=>yup.number().min(1, "Số tiền phải lớn hơn 0").test('tien', "Tiền phải chia hết cho 1000", value => value % 1000 === 0),
        otherwise:()=>yup.number()
      }),
    ngaynop: yup.date()
    .min(new Date("1975-01-01"), 'Năm không được thấp hơn 1975')
    .max(new Date(), 'Ngày không được vượt quá hiện tại')
    .required()
  });

  const onSubmitForm =  async (values) => {
    let temp = {...data, ...values}
    handleClickSua(temp)

    let response = await axios.post('http://localhost:4000/api/noptien/put', temp);

    if(response.data==="Thành công"){
      alert('Sửa khoản thu thành công');
      close()
    }
    else alert('Lỗi server')
  }

  const convert = () => {
    let date = new Date(data.ngaynop); 

    return date.getFullYear() + '-' + 
      (date.getMonth() < 10 ? '0' : '') + date.getMonth() + '-' + 
      (date.getDate() < 10 ? '0' : '') + date.getDate()
  }
  
  const khoanthu = listKhoanThu?.find(khoanthu => khoanthu.id===data.makhoanthu)
  console.log(data, listKhoanThu)

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
        validationSchema={schema}
        onSubmit={onSubmitForm}
        initialValues={{
          ten: khoanthu.ten,
          loai: khoanthu.loai,
          sotiendanop: khoanthu.loai === "Tự nguyện" ? data.sotiendanop : parseInt(data.thanhvien) * parseInt(khoanthu.sotien),
          mahokhau: data.mahokhau,
          ngaynop: convert(),
        }}
      >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">

          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Khoản nộp</Form.Label>
          </Form.Group>

          <Form.Group className="position-relative mb-3">
            <Form.Label>Mã hộ khẩu</Form.Label>

            <Form.Control name="mahokhau"
              disabled
              type="text"
              value={values.mahokhau}
            />
          </Form.Group>

          <Form.Group className="position-relative mb-3">
            <Form.Label>Tên khoản thu</Form.Label>
            <Form.Control name="ten"
              disabled
              type="text"
              value={values.ten}
            />

          </Form.Group>


          <Form.Group className="position-relative mb-3">
            <Form.Label>Loại</Form.Label>

            <Form.Select name='loai'
              aria-label="select example" 
              value={values.loai}
              disabled
            >
              <option value="Tự nguyện">Tự nguyện</option>
              <option value="Bắt buộc">Bắt buộc</option>
            </Form.Select>
          </Form.Group>


          <Row>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Số tiền nộp</Form.Label>

                <Form.Control name="sotiendanop"
                  required
                  step="10000"
                  type="number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={values.loai !== "Tự nguyện"}
                  value={values.sotiendanop}
                  isValid={touched.sotiendanop && !errors.sotiendanop}
                  isInvalid={touched.sotiendanop && !!errors.sotiendanop}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.sotiendanop}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Ngày nộp</Form.Label>
                <Form.Control name="ngaynop"
                  required
                  type="date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ngaynop}
                  isValid={touched.ngaynop && !errors.ngaynop}
                  isInvalid={touched.ngaynop && !!errors.ngaynop}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.ngaynop}</Form.Control.Feedback>

              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="position-relative mt-5 w-100 d-flex justify-content-center">
            <button className="button-89" type="submit" onClick={handleSubmit}>Submit</button>
          </Form.Group>

        </Form>
      )}
      </Formik>
    </motion.div>
  </motion.div>
  );
};

export default FormS;