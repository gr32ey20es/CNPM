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


const themnhankhau = "Thêm nhân khẩu";
const themhokhau = "Thêm hộ khẩu";
const suanhankhau = "Sửa nhân khẩu"
//trả về việc mình đang thêm hộ thêm nhân khẩu hay xóa nhân khẩu
const getMode = (data) => {
  if(data.mahokhau ==='Không điền')return themhokhau;
  if(data.manhankhau === '') return themnhankhau;
  else return suanhankhau
}
const FormS = ({ data, close, setList,table }) => {
  
  var mode = useMemo(()=>getMode(data),[]);
  console.log(mode);
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
  //các hàm check
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
  const checkQuanHe = (quanHeWithDau) => {
    const quanHeKhongDau = quanHeWithDau
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  
    const quanHeDauArray = [
      'con',
      'cháu',
      'chắt',
      'vợ',
      'chồng',
      'ông',
      'bà',
      'cụ',
      'kị',
      'em',
      'anh',
      'chủ hộ','cha','me','cau','mo',
      'chị','cô','gi','chu','bac','thim',
  
    ];
  
    for (let i = 0; i < quanHeDauArray.length; i++) {
      const quanHeDau = quanHeDauArray[i];
  
      if (
        quanHeKhongDau.includes(
          quanHeDau
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        )
      ) {
        return true;
      }
    }
  
    return false;
  }
  //schema
  const schema = yup.object().shape({
    hoten: yup.string().required("Vui lòng nhập họ và tên"),
    bietdanh: yup.string().nullable(),
    ngaysinh: yup.string() .required('Vui lòng nhập năm, tháng, ngày sinh')
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
    noisinh: yup.string().required('Vui lòng điền nơi sinh'),
    nguyenquan: yup.string().required('Vui lòng điền nguyên quán'),
    diachi: yup.string().required('Vui lòng điền nơi thường trú'),
    dantoc: yup.string().required('Vui lòng điền dân tộc'),
    tongiao: yup.string().nullable(),
    quoctich: yup.string().required('Vui lòng điền quốc tịch'),
    hochieu: yup.string().nullable(),
    nghenghiep: yup.string().nullable(),
    noilamviec: yup.string().nullable(),
    cccd: yup.string().nullable()
    .matches(
        /^\d{12}$/,
        'Căn cước công dân phải là một chuỗi 12 chữ số'
      ),
    ngaycap: yup.string().nullable()
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
    noicap: yup.string().nullable(),
    ngaychuyenden: yup.string().nullable()
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Ngày phải có định dạng yyyy-mm-dd (ví dụ: 2000-02-20)'
      )
      .test('valid-date', 'Ngày không hợp lệ', function (value) {
        if (!value) return true;
        const [year, month, day] = value.split('-');
        const isValidDate = !isNaN(Date.parse(`${month}/${day}/${year}`));
       if(isValidDate){
        return checkNgay(value)
       }else return true
      }),
    noithuongtrutruoc: yup.string().nullable(),
    quanhe: yup.string().required('Vui lòng nhập nhập quan hệ với chủ hộ')
    .test('quanhe','Quan hệ không hợp lệ',checkQuanHe),
    mahokhau : yup.string().required('Vui lòng nhập mã hộ khẩu')
  });

  const onSubmitForm =  async (values) => {
    console.log("submit")
    console.log("in onsubmit"+mode);
    let response;
    if(mode === themnhankhau){
      response = await axios.post('http://localhost:4000/api/nhankhau/add', values);
     if(response.data.status==="Thành công"){
        setList(listNhanKhau=>{
         return [...listNhanKhau,response.data.nhankhau].sort((a,b)=>{return a.mahokhau-b.mahokhau});
        })
        alert('Thêm thông tin nhân khẩu thành công');
        close()
        table.toggleAllRowsSelected(false)
        
        return
      }
  }
  if(mode === suanhankhau){
      response = await axios.post('http://localhost:4000/api/nhankhau/put', values);
     if(response.data==="Cập nhật nhân khẩu thành công"){
        setList(listNhanKhau=>{
          const i = listNhanKhau.findIndex(x => x.id === values.id);
          listNhanKhau[i] = values;
          return [...listNhanKhau].sort((a,b)=>{return a.mahokhau-b.mahokhau})
        })
        alert('Cập nhật thông tin nhân khẩu thành công');
        close()
        table.toggleAllRowsSelected(false)
        
        return
      }
  };
  if(mode === themhokhau){
    console.log(values)
    response = await axios.post('http://localhost:4000/api/hokhau/add', values);

    console.log(response)
   if(response.data.status==="Thành công"){
    console.log("Thahf cong")
      setList(listNhanKhau=>{
        
        return [...listNhanKhau,response.data.nhankhau].sort((a,b)=>{return a.mahokhau-b.mahokhau})
      })
      alert('Thêm thông tin hộ khẩu thành công');
      close()
      table.toggleAllRowsSelected(false)
      
      return
    }
};

 
    alert('Lỗi server')
    // if(!id) window.location.reload();
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
        initialValues={data}
      >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">

          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >{mode===suanhankhau?"Sửa":mode===themnhankhau?"Thêm":"Kê khai"} {mode === themhokhau?"hộ khẩu":"nhân khẩu"}</Form.Label>
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
            <Form.Group className="position-relative mb-3">
              <Form.Label>Họ và tên gọi khác (nếu có)</Form.Label>

              <Form.Control name="bietdanh"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bietdanh}
                isValid={touched.bietdanh && !errors.bietdanh}
                isInvalid={touched.bietdanh && !!errors.bietdanh}
              />

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.bietdanh}</Form.Control.Feedback>
            </Form.Group>
          </Row>


          <Row>
            <Col>
            <Form.Group className="position-relative mb-3">
                <Form.Label>Ngày sinh (yyyy-mm-dd)</Form.Label>

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
              <Form.Label>Nơi sinh</Form.Label>

              <Form.Control name="noisinh"
                required
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.noisinh}
                isValid={touched.noisinh && !errors.noisinh}
                isInvalid={touched.noisinh && !!errors.noisinh}
              />

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.noisinh}</Form.Control.Feedback>
            </Form.Group>
          </Row>


          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Nguyên quán</Form.Label>

              <Form.Control name="nguyenquan"
                required
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nguyenquan}
                isValid={touched.nguyenquan && !errors.nguyenquan}
                isInvalid={touched.nguyenquan && !!errors.nguyenquan}
              />

              <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
              <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.nguyenquan}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Nơi thường trú</Form.Label>

                <Form.Control name="diachi"
                  required
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.diachi}
                  isValid={touched.diachi && !errors.diachi}
                  isInvalid={touched.diachi && !!errors.diachi}
                  disabled = {mode === themnhankhau}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.diachi}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Dân tộc</Form.Label>

                <Form.Control name="dantoc"
                  required
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dantoc}
                  isValid={touched.dantoc && !errors.dantoc}
                  isInvalid={touched.dantoc && !!errors.dantoc}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.dantoc}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Tôn giáo</Form.Label>

                <Form.Control name="tongiao"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tongiao}
                  isValid={touched.tongiao && !errors.tongiao}
                  isInvalid={touched.tongiao && !!errors.tongiao}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Quốc tịch</Form.Label>

                <Form.Control name="quoctich"
                  required
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.quoctich}
                  isValid={touched.quoctich && !errors.quoctich}
                  isInvalid={touched.quoctich && !!errors.quoctich}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.quoctich}</Form.Control.Feedback>
              </Form.Group>
          </Row>

          <Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Hộ chiếu</Form.Label>

                <Form.Control name="hochieu"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.hochieu}
                  isValid={touched.hochieu && !errors.hochieu}
                  isInvalid={touched.hochieu && !!errors.hochieu}
                />

              </Form.Group>
          </Row>
          
          <Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Nghề nghiệp</Form.Label>

                <Form.Control name="nghenghiep"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nghenghiep}
                  isValid={touched.nghenghiep && !errors.nghenghiep}
                  isInvalid={touched.nghenghiep && !!errors.nghenghiep}
                />

              </Form.Group>
          </Row>

          <Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Nơi làm việc</Form.Label>

                <Form.Control name="noilamviec"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.noilamviec}
                  isValid={touched.noilamviec && !errors.noilamviec}
                  isInvalid={touched.noilamviec && !!errors.noilamviec}
                />

              </Form.Group>
          </Row>

          <Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Căn cước công dân</Form.Label>

                <Form.Control name="cccd"
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
                <Form.Label>Ngày cấp (yyyy-mm-dd)</Form.Label>

                <Form.Control name="ngaycap"
                  type="text" /*may be change*/
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ngaycap}
                  isValid={touched.ngaycap && !errors.ngaycap}
                  isInvalid={touched.ngaycap && !!errors.ngaycap}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.ngaycap}</Form.Control.Feedback>
              </Form.Group>
          </Row>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Nơi cấp căn cước công dân</Form.Label>

              <Form.Control name="noicap"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.noicap}
                isValid={touched.noicap && !errors.noicap}
                isInvalid={touched.noicap && !!errors.noicap}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Địa chỉ trước đây</Form.Label>

              <Form.Control name="noithuongtrutruoc"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.noithuongtrutruoc}
                isValid={touched.noithuongtrutruoc && !errors.noithuongtrutruoc}
                isInvalid={touched.noithuongtrutruoc && !!errors.noithuongtrutruoc}
              />

            </Form.Group>
          </Row>

          <Row>
            
          <Form.Group className="position-relative mb-3">
                <Form.Label>Ngày chuyển đến (yyyy-mm-dd)</Form.Label>

                <Form.Control name="ngaychuyenden"
                  type="text" /*may be change*/
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ngaychuyenden}
                  isValid={touched.ngaychuyenden && !errors.ngaychuyenden}
                  isInvalid={touched.ngaychuyenden && !!errors.ngaychuyenden}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.ngaychuyenden}</Form.Control.Feedback>
              </Form.Group>
          </Row>

          <Row>
            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Mã hộ khẩu</Form.Label>

                <Form.Control name="mahokhau"
                  required
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mahokhau}
                  isValid={touched.mahokhau && !errors.mahokhau}
                  isInvalid={touched.mahokhau && !!errors.mahokhau}
                  disabled= {true}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.mahokhau}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Quan hệ với chủ hộ</Form.Label>

                <Form.Control name="quanhe"
                  required
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.quanhe}
                  isValid={touched.quanhe && !errors.quanhe}
                  isInvalid={touched.quanhe && !!errors.quanhe}
                  disabled = {mode === themhokhau||(mode===suanhankhau&&values.quanhe==="Chủ hộ")}
                />

                <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
                <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.quanhe}</Form.Control.Feedback>
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