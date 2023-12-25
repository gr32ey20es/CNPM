import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IoCloseCircleOutline } from "react-icons/io5";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './FormS.css'

const FormS = ({ data, listKhoanThu, close }) => {
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
  const [id, setID] = useState(data.valid.length ? data.valid[0] : null);
  const [khoanthu, setKhoanThu] = useState();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(()=>{setKhoanThu(listKhoanThu?.find(khoanthu => khoanthu.id===parseInt(id)))}, [id, listKhoanThu])

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
    let temp = {...data, ...values, makhoanthu: parseInt(id)}

    console.log(temp);
    let response = await axios.post('http://localhost:4000/api/noptien', temp);

    if(response.data==="Thành công"){
      alert('Thêm khoản thu thành công');
      close()
    }
    else alert('Lỗi server')
    
    window.location.reload();
  }

  const convert = () => {
    let date = new Date(data.ngaynop); 

    return date.getFullYear() + '-' + 
      (date.getMonth() < 10 ? '0' : '') + date.getMonth() + '-' + 
      (date.getDate() < 10 ? '0' : '') + date.getDate()
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

      {!isSelected ? <>
        <Form noValidate className="w-75 d-flex flex-column justify-content-center">

          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Khoản nộp</Form.Label>
          </Form.Group> 

          <Form.Group className="position-relative mb-3">
            <Form.Label>Mã hộ khẩu</Form.Label>

            <Form.Control name="mahokhau"
              disabled
              type="text"
              value={data.mahokhau}
            />
          </Form.Group>

          <Form.Group className="position-relative mb-3">
            <Form.Label>Tên khoản thu</Form.Label>

            <Form.Select name='ten'
              aria-label="select example" 
              onChange={(e)=>{setID(e.target.value); }}
            >
              { data.valid.map( value => <option value={value} key={value}>{listKhoanThu?.find(khoanthu => khoanthu.id===value).ten}</option> ) }
            </Form.Select>
          </Form.Group>

          <Form.Group className="position-relative mt-5 w-100 d-flex justify-content-center">
            <button class="button-12 learn-more" onClick={(e) => {e.preventDefault(); setIsSelected(true)}}>
              <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
              </span>
              <span class="button-text" style={{marginTop: -3}}>Continue...</span>
            </button>
          </Form.Group>

        </Form>
      </> : <> 
      <motion.button style={{left: 15}} className="modal__close-wrapper" whileHover={{ scale: 1 }} onClick={() => setIsSelected(false)} >
        <KeyboardBackspaceIcon className="modal__close-icon" />
      </motion.button>

      <Formik
        validationSchema={schema}
        onSubmit={onSubmitForm}
        initialValues={{
          id: id,
          ten: khoanthu?.ten,
          loai: khoanthu?.loai,
          sotiendanop: parseInt(khoanthu?.sotien) * parseInt(data.thanhvien) ,
          mahokhau: data.mahokhau,
          ngaynop: data.id ? convert() : '1975-03-03',
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

            <Form.Select name='ten'
              aria-label="select example" 
              onChange={handleChange}
              value={values.ten}
              disabled
            >
              <option>{values.ten}</option>
            </Form.Select>
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
      </>}
    </motion.div>
  </motion.div>
  );
};

export default FormS;