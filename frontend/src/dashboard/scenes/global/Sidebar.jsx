import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { Box, Typography } from "@mui/material"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LogoutIcon from '@mui/icons-material/Logout';
import { ReactComponent as MonkeyIcon } from "./monkey.svg";
import { DashboardContext } from '../../provider'
import { colorsTheme } from '../../theme';

import { 
  _setDarkMode,
  _setHoKhau,
  _setNhanKhau,
} from './sbFunction.js';

export default function SidebarV1() {
  // app-state
  const [state, dispatch] = useContext(DashboardContext);
  // self-state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [focusedItem, setFocusedItem] = useState('dashboard')
  
  return (
    <CssBox>
      <Sidebar collapsed={isCollapsed} collapsedWidth='68px'>
        <div className='header' onClick={() => setIsCollapsed(!isCollapsed)}>
          <div className='logo-cont'>
            <MonkeyIcon className='header-logo' />
            <Typography className='header-text'component="h1"> 
              { isCollapsed ? '\u00A0': 'YoKey' } 
            </Typography>
          </div>
          <MenuOutlinedIcon className='app-icon' />
        </div>
        
        <Menu>
          <div className='submenu-root'>
            <MenuItem
            icon={<HomeOutlinedIcon/>}
            component={<Link to='/dashboard'/>}
            onClick={(e) => setFocusedItem('dashboard')}
            className={focusedItem === 'dashboard' ? 'focus': ''} 
            >        
              { !isCollapsed ? <Typography>Dashboard</Typography> : null }
            </MenuItem>
          </div>

          <div className='submenu-root'>
            <Typography className='ps-menu-title'>
              Quản lý
            </Typography>

            <MenuItem
            icon={<PeopleOutlinedIcon/>}
            component={<Link to='/dashboard/hokhau' />}
            onClick={() => {
              setFocusedItem('hokhau');
              _setHoKhau(state, dispatch);
              _setNhanKhau(state, dispatch)
            }}
            className={focusedItem === 'hokhau' ? 'focus': ''}
            >
              { !isCollapsed ? <Typography>Hộ Khẩu</Typography> : null }
            </MenuItem>

            <MenuItem
             component={<Link to='/dashboard/khoanthu' />}
            icon={<LocalAtmIcon/>}
            onClick={(e) => setFocusedItem('khoanthu')}
            className={focusedItem === 'khoanthu' ? 'focus': ''} 
            >
              { !isCollapsed ? <Typography>Khoản Thu</Typography> : null }
            </MenuItem>
            <MenuItem
             component={<Link to='/dashboard/noptien' />}
            icon={<LocalAtmIcon/>}
            onClick={(e) => setFocusedItem('noptien')}
            className={focusedItem === 'noptien' ? 'focus': ''} 
            >
              { !isCollapsed ? <Typography>Nộp tiền</Typography> : null }
            </MenuItem>

          </div>
        
          <div className='submenu-root'>
            <Typography className='ps-menu-title'>Cài đặt</Typography>

            <MenuItem
            icon={<LogoutIcon />}>  
            { !isCollapsed ? <Typography>Đăng xuất</Typography> : null }
            </MenuItem>

            <MenuItem
            icon={<Brightness4Icon />}
            onClick={() => _setDarkMode(state, dispatch)}
            >
              { !isCollapsed ? <Typography>Chế độ</Typography> : null }
            </MenuItem>
          </div>

        </Menu>
      </Sidebar>
    </CssBox>
  );
} 

const CssBox = ({ children }) => {
  // app-state
  const [state,] = useContext(DashboardContext);
  const colors = colorsTheme(state.darkMode === true ? 'dark' : 'light');

  return (
    <Box
      sx={{
        ".ps-sidebar-container, .ps-menu-root, .logo-cont, .header": 
        { display: 'flex' },

        ".logo-cont, .header":
        { alignItems: 'center' },

        // icon
        ".ps-menu-icon": {
          width: 21,
          minWidth: 21,
          marginRight: 2,
          color: colors.grey[100],
        },
        ".MuiSvgIcon-root": { width: 21, height: 21 },
        // text
        ".MuiTypography-root": {
          fontSize: 15, 
          paddingTop: '1px',
          color: colors.grey[200],
        },
        ".submenu-root > *": { width: 240 },

        // submenu
        ".submenu-root": {marginBottom: 2},
        ".submenu-root:last-of-type": {
          marginTop: '36vh',
        },

        // menu
        ".ps-menu-root": { margin: 0 },
        ".ps-menu-title": {
          width: 210,
          fontSize: 20,
          opacity: '80%',
          fontWeight: 600,
          textAlign: 'center',
          color: colors.grey[100],
        },
        ".ps-menu-button": {
          padding: '18px !important',
          height: '53px !important',
          borderRadius: '6px'
        },
        // menu event
        ".ps-menu-button:hover": { background: `${colors.primary[100]}90 !important` },
        ".focus, .ps-menu-button:hover": {
          borderRadius: 3,
          background: `${colors.primary[100]}`,
        },
        ".focus p": { 
          fontWeight: 550,
          fontStyle: 'italic',
          color: `${colors.grey[100]} !important`,
        },

        // app name
        ".header": {
          marginBottom: 2,
          marginLeft: 0.75,
          color: colors.grey[300],
          justifyContent: 'space-between',
        },
        ".header-logo": {
          width: 28,
          height: 28,
          padding: 1.5,
          fill: colors.primary[200],
        },
        '.header-text': {
          fontSize: 25,
          fontWeight: 700,
          color: colors.grey[100],
        },

        // sidebar
        ".ps-sidebar-container": {
          flexDirection: 'column',
          padding: "20px 18px 0 6px",
          background: colors.grey[500],
          borderRadius: '10px 10px 10px 10px',
        },
        ".ps-sidebar-root": { 
          width: 220,
          minWidth: 220,
          padding: '1px 2px 1px 1px',

          backgroundColor: `${colors.primary[100]}90 !important`,
        },
      }}
    > 
    { children }
    </Box>
  )
}
