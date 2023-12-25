import React, { useContext, useState } from "react";
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
import { AuthContext } from "../../context/authContext";


const FormKhaiTu = ({List , data, close, handleClickKhaiTu,setList }) => {

  const [hotennguoichet,setHotennguoichet] = useState(data.hoten)
  const { currentUser } = useContext(AuthContext);
  const listHoKhau = List.map((item) => {
    if(item.mahokhau === data.mahokhau && item.id !==data.id && item.trangthai!=='Tạm vắng' && item.trangthai!=='Khai tử')
      return item
    else
      return null
  }).filter(item => item!== null)

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
    idnguoikhai: yup.number()
        .typeError('Vui lòng nhập một số')
        .required('Vui lòng nhập giá trị')
        .positive('Vui lòng nhập số dương'),
    ngaychet: yup.string()
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
    console.log(values)
    const newData = {...data, trangthai : 'Khai tử'}
    console.log(newData)
    const response = await axios.post('http://localhost:4000/api/khaitu/add',values)
    if(response.data === "Thành công"){
      alert('Thành công')
      close()
    }
    // if(id) response = await axios.post('http://localhost:4000/api/nhankhau/update', values);
    
    // if(response.data==="Cập nhật nhân khẩu thành công"){
    //   alert('Cập nhật thông tin nhân khẩu thành công');
    //   close()
    // }
    // else alert('Lỗi server')
    // if(!id) window.location.reload();
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
        initialValues={{
          idnguoikhai: listHoKhau.length === 0 ?currentUser.UserId:listHoKhau[0].id,
          idnguoichet: data.id,
          ngaychet: '',
          nguyennhan: ''
        }}
      >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">
            
          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Đăng kí khai tử</Form.Label>
          </Form.Group>
          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>id người khai tử</Form.Label>

                <Form.Select name='idnguoikhai'
                  aria-label="select example" 
                  onChange={handleChange}
                  value={values.idnguoikhai}
                  disabled  = {listHoKhau.length === 0}
                >
                  {listHoKhau.length === 0? <option value = {currentUser.UserId}>{currentUser.UserId}</option>:List.map((item)=>{
                    if(item.mahokhau === data.mahokhau && item.id !==data.id && item.trangthai!=='Tạm vắng' && item.trangthai!=='Khai tử'){
                        return <option value={item.id}>{item.id}</option>
                      }
                    else
                      return null
                  })}
                </Form.Select>

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.idnguoikhai}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Họ và tên người khai tử</Form.Label>

                <Form.Select name='idnguoikhai'
                  aria-label="select example" 
                  onChange={handleChange}
                  value={values.idnguoikhai}
                  disabled  = {listHoKhau.length === 0}
                >
                  {listHoKhau.length === 0? <option value = {currentUser.UserId}>{currentUser.Role}</option>: List.map((item)=>{
                    if(item.mahokhau === data.mahokhau && item.id !==data.id && item.trangthai!=='Tạm vắng' && item.trangthai!=='Khai tử'){
                        return <option value={item.id}>{item.hoten}</option>
                      }
                    else
                      return null
                  })}
                </Form.Select>

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.idnguoikhai}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          
          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Họ và tên người đã chết</Form.Label>

              <Form.Control name="hotennguoichet"
                type="text"
                disabled
                value={hotennguoichet}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>id người chết </Form.Label>

              <Form.Control name="idnguoichet"
                required
                type="number"
                disabled
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idnguoichet}
                isValid={touched.idnguoichet && !errors.idnguoichet}
                isInvalid={touched.idnguoichet && !!errors.idnguoichet}
              />

              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.idnguoichet}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Đã chết vào năm, tháng, ngày</Form.Label>

              <Form.Control name="ngaychet"
                required
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ngaychet}
                isValid={touched.ngaychet && !errors.ngaychet}
                isInvalid={touched.ngaychet && !!errors.ngaychet}
              />

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.ngaychet}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Nguyên nhân chết</Form.Label>

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

export default FormKhaiTu;