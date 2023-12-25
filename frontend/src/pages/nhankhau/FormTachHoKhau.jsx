import React, { useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { IoCloseCircleOutline } from "react-icons/io5";
import './FormS.css'
//nhận vào các thành viên được chọn, nhập quan hệ, địa chỉ để gửi đến serve
const FormS = ({ data, close,setList }) => {
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
  //tempt:phần tử khởi tạo cho formik và validation schema của formik ứng với dât
  const tempt = useMemo(()=>{
    let testObj = {
        diachi: yup.string().required("Vui lòng nhập nơi thường trú"),
    }
    let initialValues = {diachi:''};
    for(let element of data){
        testObj = {...testObj, 
        [element["id"].toString()]:yup.string().required(`Vui lòng nhập quan hệ với chủ hộ`)
                                    .test('quanhe','Quan hệ không hợp lệ',checkQuanHe)
         };
         initialValues = {...initialValues,[element["id"].toString()]:''}
    }
      return {testObj,initialValues};
      
  },[])
  const schema = yup.object().shape(tempt.testObj);

  const onSubmitForm =  async (values) => {
    let thanhvien = []//lưu trữ thành viên với 2 trường là id và quanhe
    let diachi = values["diachi"]//dia chi thuong tru
    let numberOfChuho = 0;//so luong chu ho tim thay trong form
    let chuho = chuanHoaXau("Chủ hộ");//nếu nhập chu ho hoặc chủ ho gì cũng coi là chủ hộ
    let ids = []
    //tạo ra mảng thanhvien
    for(const key in values){

        if(key!=="diachi"){
            ids = [...ids,Number(key)]
            if(chuanHoaXau(values[key])===chuho) {
                numberOfChuho++;
                values[key] = "Chủ hộ"
            }
            let newT = {id:key,quanhe:values[key]};
            thanhvien = [...thanhvien,newT];
        }
    }
    if(numberOfChuho===0){
    alert('Hộ khẩu mới phải có chủ hộ');
    return ;
     }else if(numberOfChuho===1){
        const response = await axios.post('http://localhost:4000/api/hokhau/tach',{thanhvien,diachi})
        if(response.data.status==="Thành công"){
            const mahokhau = Number(response.data.mahokhau);
            alert("Tách hộ thành công");
            setList(listnhankhau=>{
                return listnhankhau.map((element)=>{
                    if(ids.includes(element.id)){
                        return {...element,mahokhau,diachi,quanhe:values[element.id]}
                    }else return element
                }).sort((a,b)=>{return a.mahokhau-b.mahokhau})

            })
            close();
            return;
        }
     }else {
        alert("Trong hộ chỉ có 1 chủ hộ");
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
        initialValues={tempt.initialValues}
      >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-75 d-flex flex-column justify-content-center">

          <Form.Group as='div' className="position-relative mb-5 cf-title-12">
            <Form.Label className="w-100 text-center h1" >Thông tin về hộ mới</Form.Label>
          </Form.Group>

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
            />

            <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
            <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors.diachi}</Form.Control.Feedback>
          </Form.Group>
          {data.map((element)=>{
            return <Form.Group className="position-relative mb-3">
            <Form.Label>{`Quan hệ giữa ${element.hoten} với chủ hộ`}</Form.Label>

            <Form.Control name = {element.id.toString()}
              required
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values[`${element.id}`]}
              isValid={touched[`${element.id}`] && !errors[`${element.id}`]}
              isInvalid={touched[`${element.id}`] && !!errors[`${element.id}`]}
            />

            <Form.Control.Feedback className="top-0 end-0" type="valid" tooltip>Good!</Form.Control.Feedback>
            <Form.Control.Feedback className="top-0 end-0" type="invalid" tooltip>{errors[`${element.id}`]}</Form.Control.Feedback>
          </Form.Group>
          })}



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
//kiểm tra quan hệ phải phù hợp với người "Việt"
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
  const chuanHoaXau = (input) =>{
    // Đổi tất cả kí tự thành chữ thường và loại bỏ dấu
    const xauKhongDau = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
    return xauKhongDau;
  }
export default FormS;