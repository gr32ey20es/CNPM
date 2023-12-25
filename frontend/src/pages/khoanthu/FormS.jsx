import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { IoCloseCircleOutline } from "react-icons/io5";
import './FormS.css'

const FormS = ({ data, close, handleClickSua }) => {
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
    ten: yup.string().required("Tên không được để trống"),
    sotien: yup.number()
      .required("Số tiền không được để trống")
      .when('loai',{
        is:'Bắt buộc',
        then:()=>yup.number().min(1, "Số tiền phải lớn hơn 0").test('tien', "Tiền phải chia hết cho 1000", value => value % 1000 === 0),
        otherwise:()=>yup.number()
      })
  });

  const onSubmitForm =  async (values) => {
    const { id } = values

    if(id) handleClickSua(values)

    let response;
    if(id) response = await axios.post('http://localhost:4000/api/khoanthu/put', values);
    else   response = await axios.post('http://localhost:4000/api/khoanthu', values);

    
    if(response.data==="Thành công"){
      if(id) alert('Sửa khoản thu thành công');
      else   alert('Thêm khoản thu thành công');
      close()
    }
    else alert('Lỗi server')
    
    if(!id) window.location.reload();
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
        initialValues={data ? data : {
          ten: '',
          loai: 'Tự nguyện',
          sotien: 0,
        }}
      >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">

          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Khoản thu</Form.Label>
          </Form.Group>

          <Form.Group className="position-relative mb-3">
            <Form.Label>Tên</Form.Label>

            <Form.Control name="ten"
              required
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.ten}
              isValid={touched.ten && !errors.ten}
              isInvalid={touched.ten && !!errors.ten}
            />

            <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
            <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.ten}</Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="position-relative mb-3">
            <Form.Label>Loại</Form.Label>

            <Form.Select name='loai'
              aria-label="select example" 
              onChange={handleChange}
              value={values.loai}
            >
              <option value="Tự nguyện">Tự nguyện</option>
              <option value="Bắt buộc">Bắt buộc</option>
            </Form.Select>
          </Form.Group>


          <Form.Group className="position-relative mb-3">
            <Form.Label>Số tiền</Form.Label>

            <Form.Control name="sotien"
              required
              step="10000"
              type="number"
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={values.loai==="Tự nguyện"}
              value={values.loai==="Tự nguyện" ? 0 : values.sotien}
              isValid={touched.sotien && !errors.sotien}
              isInvalid={touched.sotien && !!errors.sotien}
            />

            <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
            <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.sotien}</Form.Control.Feedback>
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