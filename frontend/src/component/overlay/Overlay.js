import React from "react";
import "./Overlay.css";
import { motion } from "framer-motion";

const Overlay = ({ data, close }) => {
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

  return (
    <motion.div className="overlay" key="overlay"
      variants={variants} initial={"closed"} 
      onClick={close} animate={"open"} exit={"closed"}  
    >
      <motion.div
      className="modal"
      variants={modalVariants}
      onClick={(e) => e.stopPropagation()}
      >

        <motion.button
          className="modal__close-wrapper"
          whileHover={{ scale: 1.2 }}
          onClick={close}
        >
          {/* <IoCloseCircleOutline className="modal__close-icon" /> */}
        </motion.button>


        <div className="form__">

          {/* <div className="form__group field">
            <motion.input type="input" className="form__field" placeholder="Course Name" name="CourseName" 
            defaultValue={courseData.CourseName} onChange={handleChange} required />
            <motion.label htmlFor="name" className="form__label">Course Name</motion.label>
          </div>

          <div className="form__group field">
            <motion.input type="input" className="form__field" placeholder="Course Description" name="CourseDescription" 
            defaultValue={courseData.CourseDescription} onChange={handleChange} required />
            <motion.label htmlFor="name" className="form__label">Course Description</motion.label>
          </div>

          <div className="form__group field">
            <motion.input type="input" className="form__field" placeholder="Image Path" name="ImagePath" 
            defaultValue={courseData.ImagePath} onChange={handleChange} required />
            <motion.label htmlFor="name" className="form__label">Image Path</motion.label>
          </div>

          <button className="button-28" onClick={handleSubmit}>Submit</button> */}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Overlay;
