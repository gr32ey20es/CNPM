import React, {useState, useContext} from "react";
import { Route, Routes, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Exams from '../exams'
import ExamsManager from '../examsmanager'
import { AuthContext } from "../../context/authContext.js";

import { IoCloseCircleOutline } from "react-icons/io5";
import examStyles from './exam.module.css';
import "./Modal.css";
import axios from "axios";

const Modal = ({ courseData, examData, close }) => {
  const [currentTab, setCurrentTab] = useState('description')
  const { currentUser } = useContext(AuthContext);

  const modalVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    closed: { opacity: 0 },
  };

  const currentTabStyle = {color: '#000',  fontWeight: '600'}

  return (
    <motion.div
      className="modal"
      variants={modalVariants}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="tabs">
        <button onClick={()=>setCurrentTab('description')}
          style={currentTab === 'description' ? currentTabStyle : {}}
        >Description</button>
        <button onClick={()=>setCurrentTab('exams')}
          style={currentTab === 'exams' ? currentTabStyle : {}}
        >Exams</button>
      </div>
      
      {currentTab === 'description' ? <Description data={courseData} close={close}/> : 
       currentTab === 'exams' ? 
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          {currentUser.RoleId === 2 ? <Exams examData={examData}/> : <ExamsManager courseData={courseData} examData={examData}/>}
        </div> 
      : null}
      <motion.button
        className="modal__close-wrapper"
        whileHover={{ scale: 1.2 }}
        onClick={close}
      >
        <IoCloseCircleOutline className="modal__close-icon" />
      </motion.button>
    </motion.div>
  );
};


const Description = ({ data }) => {
  const { ImagePath, CourseName, CourseDescription } = data;

  const imageVariants = {
    open: { opacity: 1, y: "0vh" },
    closed: { opacity: 0, y: "-10vh" },
  };

  const modalInfoVariants = {
    open: { opacity: 1, transition: { staggerChildren: 0.2 } },
    closed: { opacity: 0 },
  };

  const modalRowVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "10%" },
  };
  
  return(
    <>
    <motion.img
      className="modal__image"
      alt="real estate mansion"
      src={ImagePath}
      variants={imageVariants}
    ></motion.img>
    <motion.div className="modal__info" variants={modalInfoVariants}>
      <motion.div className="modal__row" variants={modalRowVariants}>
        <span className="modal__price">{CourseName}</span>
      </motion.div>
      <motion.div
        className="modal__description-wrapper"
        variants={modalRowVariants}
      >
        <p className="modal__description">{CourseDescription}</p>
      </motion.div>
    </motion.div>
    </>
  );
}

export default Modal;