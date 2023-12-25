import { useMemo, useEffect,  } from 'react';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { Button, Flex } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import FormS from './FormS';
const Detail = () => {
 const id = "10";
  // const id = "48";
  const ten = "Vệ sinh";
  // const loai = "Bắt buộc"
  const loai = "Tự nguyện"
  const [listhokhau,setListhokhau] = useState([]);
  const [tong,setTong] = useState('');
  const [soDanop,setSodanop] = useState('');
  const [soChuanop,setSochuanop] = useState('');
  const [danop,setDanop] = useState(true)//true thì bảng sẽ hiển thị danh sách đã nộp
  const [popup,setPopup] = useState(false);
  const [item,setItem] = useState({ngaynop:'2003-26-2',noptienid:0})//lưu row được chọn để nộp
  const columns = useMemo(
    () => [
      {
        id: 'view', //id used to define group column
        columns: [
          {   
            accessorKey:'mahokhau',
            header:'Mã hộ khẩu',
            size:300
          },
          {
            accessorKey:'tenchuho',
            header:'Chủ hộ',
            size:200
          },
          {
            accessorKey:'thanhvien',
            header:'Số thành viên',
            size:200,   
          },
          {
            accessorKey:'diachi',
            header:'Địa chỉ',
            size:200,   
          },
          {
            accessorKey:'sotien',
            header:'Số tiền Nộp',
            size:200,   
          }
        ],
      },
    ],
    [],
  );
  const getTong = async () =>{
    try {
      const response = await axios.post('http://localhost:4000/api/khoanthu/tong', {id}); 
      console.log(response.data);
      setTong(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const getSoDanop = async () =>{
    try {
      const response = await axios.post('http://localhost:4000/api/khoanthu/countdanop', {id}); 
      console.log(response.data);
      setSodanop(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const getSoChuanop = async () =>{
    try {
      const response = await axios.post('http://localhost:4000/api/khoanthu/countchuanop', {id}); 
      console.log(response.data);
      setSochuanop(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const getListDanop = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/khoanthu/listdanop', {id}); 
      setListhokhau(response.data)         
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getListChuanop = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/khoanthu/listchuanop', {id}); 
      setListhokhau(response.data)         
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(item);
  useEffect(() => {
    if(danop){ getListDanop()
    }else getListChuanop()
  }, [danop]);
  console.log(listhokhau)
  const table = useMantineReactTable({
    columns,
    data:listhokhau, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableStickyHeader: true, // static header
    enablePinning: true,
    enableGrouping: true,
    enableRowActions: true,
    positionToolbarAlertBanner: 'bottom',
    paginationDisplayMode: 'pages',
    initialState: { showColumnFilters: false, showGlobalFilter: true },
    mantineTableContainerProps: {
      sx: { 
        maxHeight: '80vh',
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
    renderRowActions: ({row}) => (
      <div className='w-100 ps-2'>
        <DriveFileRenameOutlineIcon className='kimbutton' onClick = {(e)=>{setItem(row.original);setPopup(true);}}/>
      </div>
    ),
    renderTopToolbar: ({ table }) => {
      return (
        <Flex p="md" justify="space-between" >
          <Flex gap='8px'>
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex gap= '8px'>
            
          </Flex>
        </Flex>
        );
      },
    });

  return(
    <div >
      <MantineReactTable table={table}  />
      {popup?<FormS 
      loai  = {loai} 
      data = {
      danop ?
      {mahokhau:item.mahokhau,makhoanthu:id,sotien:item.sotien,ngaynop:item.ngaynop.substring(0,10),noptienid:item.noptienid}:
      {mahokhau:item.mahokhau,makhoanthu:id,sotien:item.sotien,ngaynop:dateToString(new Date())}} close={()=>setPopup(false)}/>:''}
    </div>
  );
};
const dateToString = (date) =>{
return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}



export default Detail;