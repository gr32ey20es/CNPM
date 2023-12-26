import React, { useState } from "react";
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
import { elements } from "chart.js";


const FormTamVang = ({ data, close, handleClickTamVang,setList }) => {

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
  const checkNgay = (values) =>{
    let [year,month,day] = values.split('-')
    let currentdate = new Date()
    const [cyear,cmonth,cday] = `${currentdate.getFullYear()}-${currentdate.getMonth()+1}-${currentdate.getDate()}`.split('-')
    if(year<cyear)return true;
    else if(year === cyear){
      if(month<cmonth)return true;
      else if(month === cmonth){
        if(day>cday)return false; else return true
      }else return false
    }else return false
   
  }
  const schema = yup.object().shape({
    idnguoitamvang: yup.number()
        .typeError('Vui lòng nhập một số')
        .required('Vui lòng nhập giá trị')
        .positive('Vui lòng nhập số dương'),
    ngaybatdau: yup.string()
    .required('Vui lòng nhập năm, tháng, ngày')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Ngày tháng năm phải có định dạng yyyy-mm-dd '
    )
    .test('valid-date', 'Ngày không hợp lệ', function (value) {
      if (!value) return true;
      const [year, month, day] = value.split('-');
      const isValidDate = !isNaN(Date.parse(`${month}/${day}/${year}`));
     if(isValidDate){
      return checkNgay(value)
     }else return true
    }),
    ngayketthuc: yup.string()
    .required('Vui lòng nhập năm, tháng, ngày')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Ngày tháng năm phải có định dạng yyyy-mm-dd '
    )
    .test('valid-date', 'Ngày không hợp lệ', function (value) {
      if (!value) return true;
      const [year, month, day] = value.split('-');
      const isValidDate = !isNaN(Date.parse(`${month}/${day}/${year}`));
     if(isValidDate){
      return checkNgay(value)
     }else return true
    }),
    nguyennhan: yup.string().required('Đây là trường bắt buộc')
  });

  const onSubmitForm =  async (values) => {
     if(values.ngaybatdau>=values.ngayketthuc){
      alert("Ngày vắng phải nhỏ hơn ngày kết thúc")
      return
     }
     console.log(values);
     const response = await axios.post('http://localhost:4000/api/tamvang/add',values)
     console.log(response.data);
     if(response.data === "Thành công"){
      console.log("assert")
      const newData = {...data, trangthai : 'Tạm vắng'}
      setList(list =>{
        return list.map((element)=>{
          if(element===values.idnguoitamvang){
           
            return newData
          }else return element;
        })
      })
      alert(`Tạm vắng thành công cho nhân khẩu có mã ${values.idnguoitamvang}`)
      close();
      return;
      
     }
  }

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
        initialValues={!data ? data : {
          idnguoitamvang: data.id,
          ngaybatdau: '',
          ngayketthuc:'',
          nguyennhan: ''
        }}
      >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">

          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Đơn khai báo tạm vắng</Form.Label>
          </Form.Group>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Họ và tên</Form.Label>

              <Form.Control name="hotennguoitamvang"
                type="text"
                disabled
                value={data.hoten}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>id người đăng kí tạm vắng</Form.Label>

              <Form.Control name="hotennguoitamvang"
                type="text"
                disabled
                value={data.id}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Vắng mặt từ</Form.Label>

              <Form.Control name="ngaybatdau"
                required
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ngaybatdau}
                isValid={touched.ngaybatdau && !errors.ngaybatdau}
                isInvalid={touched.ngaybatdau && !!errors.ngaybatdau}
              />

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.ngaybatdau}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Đến ngày</Form.Label>

              <Form.Control name="ngayketthuc"
                required
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ngayketthuc}
                isValid={touched.ngayketthuc && !errors.ngayketthuc}
                isInvalid={touched.ngayketthuc && !!errors.ngayketthuc}
              />

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.ngayketthuc}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Lý do vắng mặt</Form.Label>

              <Form.Control name="nguyennhan"
                required
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nguyennhan}
                isValid={touched.nguyennhan && !errors.nguyennhan}
                isInvalid={touched.nguyennhan && !!errors.nguyennhan}
              />

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.nguyennhan}</Form.Control.Feedback>
            </Form.Group>
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

export default FormTamVang;