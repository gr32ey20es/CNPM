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
    Email: yup.string().required().email(),
    Password: yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  });

  const onSubmitForm =  async (values) => {
    const { UserId } = values

    values.RoleId = ( values.Role === 'Quản trị viên' ? 0 :
                      values.Role === 'Tổ trưởng' ? 1 : 
                      values.Role === 'Tổ phó' ? 2 :
                      values.Role === 'Cán bộ' ? 3 : 4)
    if(UserId) handleClickSua(values)

    let response;
    if(UserId) response = await axios.post('http://localhost:4000/api/users/put', values);
    else   response = await axios.post('http://localhost:4000/api/users', values);

    if(response.data==="Thành công"){
      if(UserId) alert('Sửa tài khoản thành công');
      else   alert('Thêm tài khoản thành công');
      close()
    }
    else alert('Lỗi server')
    
    if(!UserId) window.location.reload();
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
        validationSchema={schema}
        onSubmit={onSubmitForm}
        initialValues={data ? data : {
          Email: '',
          Password: '',
          Role: 'Cán bộ',
        }}
      >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">

          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Tài khoản</Form.Label>
          </Form.Group>

          <Form.Group className="position-relative mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control name="Email"
              required
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Email}
              isValid={touched.Email && !errors.Email}
              isInvalid={touched.Email && !!errors.Email}
            />

            <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
            <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.Email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="position-relative mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control name="Password"
              required
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Password}
              isValid={touched.Password && !errors.Password}
              isInvalid={touched.Password && !!errors.Password}
            />

            <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
            <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.Password}</Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="position-relative mb-3">
            <Form.Label>Role</Form.Label>

            <Form.Select name='Role'
              aria-label="select example" 
              onChange={handleChange}
              value={values.Role}
              disabled={data && data.RoleId < 3 ? true : false}
            >
              { data?.RoleId < 3 ? <>
                <option value="Quản trị viên">Quản trị viên</option>
                <option value="Tổ trưởng">Tổ trưởng</option>
                <option value="Tổ phó">Tổ phó</option>
              </> : null }
              <option value="Cán bộ">Cán bộ</option>
              <option value="Kế toán">Kế toán</option>
            </Form.Select>
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