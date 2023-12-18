import * as React from 'react';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Add as AddIcon } from '@mui/icons-material';
import { DashboardContext, setHoKhau, setNhanKhau } from '../../provider';
import { useEffect, useMemo, useState, useContext } from 'react';

export default function AddNhanKhau(soHoKhau) {
  const [open, setOpen] = React.useState(false);
  const [state,dispatch] = useContext(DashboardContext);
  const [formData,setFormData] = React.useState({
    hoten: '',
    cancuoccongdan: '',
    ngaysinh: '',
    gioitinh: '',
    quoctich: '',
    sohokhau: soHoKhau.soHoKhau
  })
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    console.log('dữ liệu thêm Nhân khẩu',formData)
    const index = state.nhanKhau.findIndex(item => item.cancuoccongdan === formData.cancuoccongdan)
    if(index!==-1)
        alert('Số căn cước công dân đã tồn tại')
    else {
        const newData = [...state.nhanKhau,formData]
        dispatch(setNhanKhau(newData))

        const midData = state.hoKhau.map((item) => {
            if(item.sohokhau !== formData.sohokhau)
                return item
            else {
                const fakeIDs = [...item.nhankhauIDs,state.nhanKhau.length]
                const fakeData = {...item, 'nhankhauIDs' : fakeIDs}
                return fakeData
            }
        })
        dispatch(setHoKhau(midData))
        setOpen(false);
    }
  };

  return (
    <React.Fragment>
        <IconButton 
            title="Add"
            style={{ color: 'rgb(97,212,10)' }}
            onClick={handleClickOpen}>
            <AddIcon/>
        </IconButton>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Vui lòng điền chính xác thông tin</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="hoten"
                label="Họ và tên"
                fullWidth
                variant="standard"
                value={formData.hoten}
                onChange={(e) => {setFormData({...formData,hoten : e.target.value})}}
            />
            <TextField
                autoFocus
                margin="dense"
                id="cancuoccongdan"
                label="Căn cước công dân"
                fullWidth
                variant="standard"
                value={formData.cancuoccongdan}
                onChange={(e) => {setFormData({...formData,cancuoccongdan : e.target.value})}}
            />
            <TextField
                autoFocus
                margin="dense"
                id="ngaysinh"
                label="Ngày sinh"
                fullWidth
                variant="standard"
                value={formData.ngaysinh}
                onChange={(e) => {setFormData({...formData,ngaysinh : e.target.value})}}
            />
            <TextField
                autoFocus
                margin="dense"
                id="gioitinh"
                label="Giới tính"
                fullWidth
                variant="standard"
                value={formData.gioitinh}
                onChange={(e) => {setFormData({...formData,gioitinh : e.target.value})}}
            />
            <TextField
                autoFocus
                margin="dense"
                id="quoctich"
                label="Quốc tịch"
                fullWidth
                variant="standard"
                value={formData.quoctich}
                onChange={(e) => {setFormData({...formData,quoctich : e.target.value})}}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  );
}