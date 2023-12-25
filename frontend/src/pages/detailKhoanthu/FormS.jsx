import React from "react";
import axios, { Axios } from "axios";
import { motion } from "framer-motion";
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { IoCloseCircleOutline } from "react-icons/io5";
import './FormS.css'
import { FormatColorResetOutlined } from "@mui/icons-material";

const FormS = ({ data, close,loai }) => {
  const { noptienid } = data;//noptienid = null => add; else =>update
  console.log(noptienid + " nodptienid")
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
    sotien: yup.number()
    .test('','Số tiền phải lớn hơn 0',(value) =>{
      if(loai === "Tự nguyện"){
        if(value>0)return true;
        else return false;
      }else return true;
    })
    .test('','Số tiền phải chia hêt cho 1000',(value) =>{
      if(loai === "Tự nguyện"){
        return value%1000===0
      }else return true;
    }),
    ngaynop:yup.string().test('','Ngày nộp không hợp lệ (phải nhỏ hơn thời điểm hiện tại)',(value)=>{
      const date = new Date(value);
      console.log(date);
      const year = date.getFullYear();
      const month = date.getMonth()+1;
      const day = date.getDate();
      console.log([year,month,day])
      const currentDate = new Date();
      const cyear = currentDate.getFullYear();
      const cmonth = currentDate.getMonth()+1;
      const cday = currentDate.getDate();
      if(year<cyear){
        return true
      }else if(year === year){
        if(month<cmonth)return true;
        else if(month ===cmonth){
          if(day>cday)return false;
          else return true;
        }else return false
      }else return false
      
      return true
    })
    
  });

  const onSubmitForm =  async (values) => {
    console.log(1)
    console.log(values)
    let response;
    if(noptienid){
      //update
      console.log("update")
      response = await axios.post('http://localhost:4000/put',values)
      
    }
    else{
      // add
      console.log("add")
      response = await axios.post('http://localhost:4000',values)

    }
    if(response.data ==="Thành công"){
      console.log("Thành công")
    }

    
  }
console.log(data);
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
        initialValues={data}
      >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">

          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Thông tin khoản nộp</Form.Label>
          </Form.Group>

          <Form.Group className="position-relative mb-3">
            <Form.Label>Mã hộ khẩu</Form.Label>

            <Form.Control name="mahokhau"
              required
              disabled = {true}
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.mahokhau}
            />

            <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
            <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.mahokhau}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Mã khoản thu</Form.Label>

            <Form.Control name="makhoanthu"
              required
              disabled = {true}
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.makhoanthu}
            />

            <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
            <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.makhoanthu}</Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="position-relative mb-3">
            <Form.Label>Số tiền</Form.Label>

            <Form.Control name="sotien"
              required
              step="10000"
              type="number"
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={loai === "Bắt buộc"}
              value={values.sotien}
              isValid={touched.sotien && !errors.sotien}
              isInvalid={touched.sotien && !!errors.sotien}
            />

            {loai === "Tự nguyện"?<Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>:''}
            <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.sotien}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Ngày nộp (mm/dd/yyyy)</Form.Label>

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
