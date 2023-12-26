import { useMemo, useEffect,  } from 'react';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  getIsFirstColumn,
  getIsLastColumn,
  useMantineReactTable,
} from 'mantine-react-table';
import { Button, Flex } from '@mantine/core';
import { useState } from 'react';
import axios from "axios";
import FormNhanKhau from './FormNhanKhau';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import './index.css'
import { Box, Menu, Text, Title } from '@mantine/core';
import { IconUserCircle, IconSend } from '@tabler/icons-react';
import AddIcon  from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FormTachHo from './FormTachHoKhau';
import FormKhaiTu from './FormKhaiTu';
import FormTamVang from './FormTamVang';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import FormChiTiet from './FormChiTiet';
import InfoIcon from '@mui/icons-material/Info';
const nhankhauInit = {
  manhankhau:'',
  hoten: '',
  bietdanh: '',
  ngaysinh: '',
  gioitinh: 'Nam',
  noisinh: '',
  nguyenquan: '',
  diachi: '',
  dantoc: '',
  tongiao: '',
  quoctich: '',
  hochieu: '',
  nghenghiep: '',
  noilamviec: '',
  cccd: '',
  ngaycap: '',
  noicap: '',
  ngaychuyenden: '',
  noithuongtrutruoc: '',
  quanhe: '',
  mahokhau: ''
}
const NhanKhau = () => {
  const [listNhanKhau, setListNhanKhau] = useState('')
  const [popup,setPopup] = useState(false);
  const [data, setData] = useState()
  const [item,setItem] = useState({})
  const [tachho,settachho] = useState(false);//form tach ho
  const [tachhodata,settachhodata] = useState([]);//store all  selected rows when tach ho
  const [popupKhaiTu,setPopupKhaiTu] = useState(false)
  const [popupTamVang,setPopupTamVang] = useState(false)
  const [detail,setdetail] = useState(false);//detail
  const [listDetail,setListDetail] = useState({})
  const onClickDetail = async (data)=>{
    const {id} = data;
    const response = await axios.post('http://localhost:4000/api/nhankhau/detail',{id});
    console.log(response.data)
    console.log(id);
    setListDetail({...response.data.data,khaitu:response.data.khaitu,tamvang:response.data.tamvang})
    setdetail(true)
  }
  const onClickSua = async (data) => {
    const i = listNhanKhau.findIndex(x => x.id === data.id)
    let date = new Date(data.ngaysinh)
    let tempDate = date.getFullYear() + '-' + ("0"+(date.getMonth()+1)).slice(-2) + '-' + ("0"+date.getDate()).slice(-2)
    const newData = {...data,ngaysinh : tempDate}
    listNhanKhau[i] = newData;
    setListNhanKhau([...listNhanKhau])
  }
  const onClickAddNhanKhau  = async ({mahokhau,diachi},table) =>{//click thêm nhân khẩu vào hộ đã có. table để settoggle false
   table.toggleAllRowsSelected(false);
    setData(data=>{
      data = nhankhauInit;
      return {...nhankhauInit,mahokhau,diachi,ngaysinh:dateToString(new Date())}
    });
    setPopup(true);
  }
  const onClickTachHo = async ({mahokhau},table)=>{
    let selectedRowModel = [...table.getSelectedRowModel().flatRows];
    let listRows = [];
    for(let element of selectedRowModel){
      if(element.original.quanhe==='Chủ hộ'){
        alert('Hộ mới không được chứa chủ hộ');
        return
      }
      listRows = [...listRows,element.original]
    }
    
    table.toggleAllRowsSelected(false)
    let listRowsAfterFilter = listRows.filter((element)=>element.mahokhau === mahokhau);
    console.log(listRowsAfterFilter);
    if(listRowsAfterFilter.length!==listRows.length){
      alert('Chỉ chọn thành viên trong cùng 1 hộ');
      table.toggleAllRowsSelected(false);
      return;
    }
    if(listRowsAfterFilter.length===0){
      alert('Chọn các thành viên trước!');
      return
    }
    settachhodata(listRowsAfterFilter);
    settachho(true);


  }
  const onClickXoa = async (table) => {
    let rows = table.getSelectedRowModel().flatRows
    table.toggleAllRowsSelected(false)
    for(let element of rows){
      if(element.original.quanhe === 'Chủ hộ'){
        var mahokhau = element.original.mahokhau
        let selectedNhankhau = rows.filter((element)=>element.original.mahokhau===mahokhau)
        let ownHokhau = listNhanKhau.filter((element)=>element.mahokhau===mahokhau)
        if(selectedNhankhau.length!==ownHokhau.length){
          alert('Không được xóa chủ hộ');
          return
        }
        
      }
    }
    if(window.confirm('Xác nhận xóa!')) {
      var ids = [];
      let data = listNhanKhau;
      for(let row of rows) {
          ids = [...ids,row.original.id];
          data = data.filter((obj) => obj.id !== row.original.id);
      }
      setListNhanKhau(data.sort((a,b)=>{return a.mahokhau-b.mahokhau}))
      await axios.post('http://localhost:4000/api/nhankhau/delete',ids);
      table.toggleAllRowsSelected(false)
      alert('Đã xóa');
    }
    else table.toggleAllRowsSelected(false)
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:4000/api/nhankhau/get', []); 
          setListNhanKhau(response.data.sort((a,b)=>{return a.mahokhau-b.mahokhau}))         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey:'mahokhau',
        header:'Mã hộ khẩu',
        size: 80, minSize: 80, maxSize: 80,
        // Cell: ({ row }) => <div className='w-100 ps-2'> <DriveFileRenameOutlineIcon className='kimbutton' onClick={()=>{setData(row.original); setPopup(true)}}/> </div>,
        AggregatedCell: ({row}) => {return <div className='w-100 ps-2'> <ControlPointDuplicateIcon className='kimbutton' onClick={()=>{setData({mahokhau: row.original.mahokhau}); setPopup(true)}}/> </div>},
      },
      {   
        accessorKey:'hoten',
        header:'Họ và tên',
      },
      {
        accessorKey:'ngaysinh',
        header:'Ngày sinh',
        Cell: ({ renderedCellValue, row }) => {let date = new Date(renderedCellValue); return date.getFullYear() + ' - ' + ("0"+(date.getMonth()+1)).slice(-2) + ' - ' + ("0"+date.getDate()).slice(-2);},
      },
      {
        accessorKey:'gioitinh',
        header:'Giới tính',
        size: 80, minSize: 80, maxSize: 80,
      },
      {
        accessorKey:'cccd',
        header:'Căn cước công dân',
      },
      {
        accessorKey:'quanhe',
        header:'Quan hệ',
      },
      {
        header:'Action',
        Cell: ({ row }) => (
          <div style = {{display:'flex'}}>
            <div className='w-100 ps-2'><DriveFileRenameOutlineIcon className='kimbutton'  onClick={()=>{setData(data=>{  data = row.original; return {...data,ngaysinh:dateToString(new Date(row.original.ngaysinh)),ngaycap:dateToString(new Date(row.original.ngaycap)), ngaychuyenden:dateToString(new Date(row.original.ngaychuyenden))};  });setPopup(true)}}/></div>
            <div className = 'w-100 ps-2' ><GolfCourseIcon className='kimbutton' onClick={()=>{setData(row.original); setPopupKhaiTu(true);}}/></div>
            <div className='w-100 ps-2'><WrongLocationIcon className='kimbutton' onClick={()=>{  setData(row.original);  setPopupTamVang(true);}}/></div>
            <div className='w-100 ps-2'><InfoIcon className='kimbutton' onClick = {()=>onClickDetail(row.original)}/></div>
          </div>
        ),
        AggregatedCell: ({ cell, table }) => (
          <div style = {{display:"flex"}}>
            <div className='w-100 ps-1 d-flex justify-content-center'> <AddIcon   className='kimbutton' onClick={()=>{onClickAddNhanKhau(cell.row.original,table)}}/> </div>
            <div className='w-100 ps-1 d-flex justify-content-center'> <RemoveIcon   className='kimbutton' onClick={()=>{onClickTachHo(cell.row.original,table);}}/> </div>
          </div>
        ),
      }
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data:listNhanKhau, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableStickyHeader: true, // static header
    enableRowSelection: true,
    enablePinning: true,
    enableGrouping: true,
    enableRowActions:false,
    positionToolbarAlertBanner: 'bottom',
    paginationDisplayMode: 'pages',
    initialState: { grouping:['mahokhau'], showColumnFilters: false, showGlobalFilter: true},
    mantineTableContainerProps: {
      sx: { 
        maxHeight: '72vh',
        width: '100%'
      },
    },
    mantineSearchTextInputProps: {
      placeholder: 'Search',
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Action',
        size: 50,
      },
    },
    renderRowActionMenuItems: () => (
      <>
        <Menu.Item icon={<IconUserCircle />}>View Profile</Menu.Item>
        <Menu.Item icon={<IconSend />}>Send Email</Menu.Item>
      </>
    ),
    renderTopToolbar: ({ table }) => {
      return (
        <Flex p="md" justify="space-between" >
          <Flex gap='8px'>
            <Button color="green" onClick={()=>{setData(data=>{return {...nhankhauInit,mahokhau:"Không điền",quanhe:"Chủ hộ",ngaysinh:dateToString(new Date())}}); setPopup(true)}}
              disabled={(table.getIsSomeRowsSelected()||table.getIsAllRowsSelected())}
            >Thêm hộ </Button>

            <Button color="red" variant="filled" onClick={()=>onClickXoa(table)}
              disabled={!(table.getIsSomeRowsSelected()||table.getIsAllRowsSelected())}
            >Xóa nhân khẩu</Button>
          </Flex>
          
          <Flex gap= '8px'>
            <MRT_ToggleFiltersButton table={table} />
            <MRT_GlobalFilterTextInput table={table} />
          </Flex>
        </Flex>
        );
      },
    });

  return(
    <div style={{padding: 10}}>
      <MantineReactTable table={table} />
      {popup?<FormNhanKhau setList  ={setListNhanKhau} data={data} close={()=>setPopup(false)}  />:<></>}
      {tachho?<FormTachHo table = {table} data = {tachhodata} close = {()=>settachho(false)} setList = {setListNhanKhau}/>:<></>}
      {popupKhaiTu?<FormKhaiTu List={listNhanKhau} setList = {setListNhanKhau} data={data} close={()=>setPopupKhaiTu(false)} handleClickKhaiTu={onClickSua} />:<></>}
      {popupTamVang?<FormTamVang setList = {setListNhanKhau}data={data} close={()=>setPopupTamVang(false)} handleClickTamVang={onClickXoa} />:<></>}
      {detail?<FormChiTiet data = {listDetail} close = {()=>setdetail(false)}/>:<></>}
    </div>
  );
};
const dateToString = (date) =>{
  const year = date.getFullYear();
  const month  = date.getMonth()+1;
  const day = date.getDate()
  return `${(year+10000).toString().substring(1,5)}-${(month+100).toString().substring(1,3)}-${(day+100).toString().substring(1,3)}`
}
export default NhanKhau;

//--------------------------------------------
