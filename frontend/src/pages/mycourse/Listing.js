import React from "react";
import { motion } from "framer-motion";
import "./Listing.css";


const Listing = ({ data, open }) => {
  const { ImagePath, CourseName, CourseDescription } = data;

  return (
    <motion.div className="listing" onClick={open} whileHover={{ scale: 1.1 }}>
      <div className="listing__content">
        <div className="listing__image-container">
          <img
            className="listing__image"
            alt="real estate mansion"
            src={ImagePath}
          />
        </div>
        <div className="listing__row"></div>
        <div className="listing__row"></div>
        <div className="listing__details">

          <div className="listing__row">
            <span className="listing__price">{CourseName}</span>
          </div>

          
          <div className="listing__row">
            <span className="listing__address">{ 
            CourseDescription.length > 190 ? CourseDescription.substring(0, 190) + "..." : CourseDescription
            }</span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Listing;
