import React from "react";
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
import { List } from "@mui/icons-material";


const FormTamTru = ({ data, close, handleClickSua,setList }) => {
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
    hoten: yup.string().required("Vui lòng nhập họ và tên"),
    ngaysinh: yup.string()
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
    gioitinh: yup.string().oneOf(['Nam','Nữ'],'Vui lòng chọn giới tính'),
    cccd: yup.string().nullable()
      .matches(
        /^\d{12}$/,
        'Căn cước công dân phải là một chuỗi 12 chữ số'
      ),
    quequan: yup.string().required('Vui lòng điền quê quán(ví dụ: Hà Nội)'),
    diachi: yup.string().required('Vui lòng điền địa chỉ'),
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
  });

  const onSubmitForm =  async (values) => {
    if(values.ngaybatdau>values.ngayketthuc){
      alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
      return
    }
    console.log(values)
    const { id } = values
    if(id) handleClickSua(values)
    let response;
    if(id) {
      response = await axios.post('http://localhost:4000/api/tamtru/put', values);
      if(response.data==="Thành công"){
        setList(list=>{
          return list.map((element)=>{
            if(element.id === id)return values;
            else return element; 
          })
        });
        alert('Cập nhật thông tin đăng kí tạm trú thành công');
        close()
        return
      }
    }
    else {
      response = await axios.post('http://localhost:4000/api/tamtru/add', values);
      if(response.data==="Thành công"&&!id){
        setList(list=>[...list,values])
        alert('Thêm thông tin đăng kí tạm trú thành công');
        close()
        return
      }
    }
   
     alert('Lỗi server')
     return
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
        initialValues={data ? data : {
          hoten: '',
          ngaysinh: '',
          gioitinh: 'Nam',
          cccd: '',
          quequan: '',
          diachi: '',
          ngaybatdau: '',
          ngayketthuc: '',
        }}
      >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">

          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Thông tin đăng kí tạm trú</Form.Label>
          </Form.Group>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Họ và tên</Form.Label>

              <Form.Control name="hoten"
                required
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hoten}
                isValid={touched.hoten && !errors.hoten}
                isInvalid={touched.hoten && !!errors.hoten}
              />

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.hoten}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Ngày, tháng, năm sinh. Vui lòng nhập theo định dạng yyyy-mm-dd. Ví dụ: 2000-02-20</Form.Label>

                <Form.Control name="ngaysinh"
                  required
                  type="text" /*may be change*/
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ngaysinh}
                  isValid={touched.ngaysinh && !errors.ngaysinh}
                  isInvalid={touched.ngaysinh && !!errors.ngaysinh}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.ngaysinh}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            </Row>

          <Row>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Giới Tính
                </Form.Label>

                <Form.Select name='gioitinh'
                  aria-label="select example" 
                  onChange={handleChange}
                  value={values.gioitinh}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Số căn cước công dân</Form.Label>

              <Form.Control name="cccd"
                required
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cccd}
                isValid={touched.cccd && !errors.cccd}
                isInvalid={touched.cccd && !!errors.cccd}
              />

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.cccd}</Form.Control.Feedback>
            </Form.Group>
          </Row>


          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Quê quán</Form.Label>

              <Form.Control name="quequan"
                required
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quequan}
                isValid={touched.quequan && !errors.quequan}
                isInvalid={touched.quequan && !!errors.quequan}
              />

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.quequan}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Nơi ở tạm trú</Form.Label>

                <Form.Control name="diachi"
                  required
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.diachi}
                  isValid={touched.diachi && !errors.diachi}
                  isInvalid={touched.diachi && !!errors.diachi}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.diachi}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Ngày bắt đầu thời gian tạm trú</Form.Label>

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
            </Col>

            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Ngày kết thúc thời gian tạm trú</Form.Label>

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

export default FormTamTru;