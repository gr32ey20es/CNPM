import React , { useEffect, useContext, useRef } from 'react'
import { NavLink, useNavigate} from 'react-router-dom';

import $ from 'jquery';
import './dependencies/fontawesome/css/all.css';
import './Navbar.css';

import { AuthContext } from "../../context/authContext";
import Diversity2Icon from '@mui/icons-material/Diversity2';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to "/" after logout
  };
  
  // UI effect
  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
  }, []);

  const itemRef = useRef(null)  
  useEffect(() => {itemRef.current.click()}, [currentUser])
  // const id = currentUser.UserId;
  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">

      <NavLink className="navbar-brand navbar-logo" to="/" exact="true">
        <Diversity2Icon style={{marginRight: 10, marginTop: -4}}/>
        Website quản lý
      </NavLink>
    
      <button 
        className="navbar-toggler"
        onClick={ function() { setTimeout(function(){ animation(); }); }}
        type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto" style={{width: '100%'}}>
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <span style={{width: '50%', 
              marginRight: !currentUser ? '-150px' : 
                           currentUser?.RoleId === 0 ? '-200px' :
                           currentUser?.RoleId === 3 ? '-250px' : 
                           currentUser?.RoleId === 4 ? '-250px' : '-400px' 
            }}></span>

            <li className="nav-item active" ref={itemRef}>
              <NavLink className="nav-link" to="/dashboard" exact="true" style={{fontFamily: 'sans-serif'}}>
                <i className="fas fa-tachometer-alt"></i>Dashboard
              </NavLink> 
            </li>

            { currentUser?.RoleId === 0 ? 
            <TagLink className="fas fa-users" to='/account' text='Tài khoản' />
            : null }

            { [1, 2, 3].includes(currentUser?.RoleId) ?<>
            <TagLink className="fas fa-blog" to='/hokhau' text='Hộ khẩu' />
            <TagLink className="fas fa-blog" to='/tamtru' text='Tạm trú' /></>
            : null }
            { [1, 2, 4].includes(currentUser?.RoleId) ? <>
            <TagLink className="fas fa-blog" to='/khoanthu' text='Khoản thu' />
            <TagLink className="fas fa-blog" to='/noptien' text='Nộp tiền' />
            </> : null }

            <span style={{width: '50%', 
              marginRight: !currentUser ? '-240px' : 
                           currentUser?.RoleId === 0 ? '-360px' :
                           currentUser?.RoleId === 3 ? '-380px' : 
                           currentUser?.RoleId === 4 ? '-400px' : '-500px'
            }}></span>

            <TagLink className="far fa-address-book" to='/info' text={currentUser ? currentUser.Role : 'Khách'} />
      
            { currentUser ?
            <TagLink onClick={handleLogout} className="fas fa-sign-out-alt" to='/' text='Đăng xuất' /> :
            <TagLink className="fas fa-sign-in-alt" to='/login' text='Đăng nhập' /> }
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;

const TagLink = ({className, to, onClick = ()=>{}, text}) => (
  <li className="nav-item">
    <NavLink onClick={onClick} className="nav-link" to={to} exact="true" style={{fontFamily: 'sans-serif'}}>
      <i className={className}></i>{text}
    </NavLink>
  </li>
)