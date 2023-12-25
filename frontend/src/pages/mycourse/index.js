import React, { useEffect, useState, useContext } from 'react';
import { AnimatePresence } from "framer-motion";
import axios from 'axios';

import Listing from "./Listing";
import Overlay from "../../component/overlay/Overlay";
import Modal from "./Modal";
import CourseEdit from '../courses/CourseEdit.js';
import { AuthContext } from "../../context/authContext.js";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import './index.css';

const MyCourse = ({ courseData }) => {
  const courseID = courseData.CourseID;
  const { currentUser } = useContext(AuthContext);
  const [examData, setExamData] = useState([]);
  const [, setError] = useState(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:4000/api/exams/${courseID}`);
        setExamData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (e) => {
    const deleteCourse = async () => {
        try {
            await axios.delete('http://localhost:4000/api/courses/'+courseID, {
                headers: {'Content-Type': 'application/json'}
            });
        } catch (error) {
            console.error(error);
        }
    }
    deleteCourse();
}

  /* */
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openEdit = () => {
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
  };

  return (
    <div>
      <Listing data={courseData} open={openModal} />

      {currentUser?.RoleId === 3 ?
      <div className="listing__row" style={{width: '100%', justifyContent: 'center', marginTop:'-15px'}}>
        
        <button className="feature hover" onClick={openEdit}
        style={{marginLeft:'30px'}}>
          <div className="feature__circle"><BorderColorIcon className="feature__icon" style={{width: '18px'}}/></div>
          <span className="feature__label">Edit</span>
        </button>
        <AnimatePresence>
          {isEdit ? <CourseEdit courseData={courseData} close={closeEdit} /> : null}
        </AnimatePresence>

        <button className="feature hover" onClick={handleDelete}>
          <div className="feature__circle"><DeleteOutlineIcon className="feature__icon" style={{width: '20px'}}/></div>
          <span className="feature__label">Delete</span>
        </button>

      </div>
      : null}
      
      <AnimatePresence>
        {open && (<>
          <Overlay close={closeModal}>
            <Modal courseData={courseData} examData={examData} close={closeModal} />
          </Overlay>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyCourse;
