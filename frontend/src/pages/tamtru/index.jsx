import { useMemo, useEffect,  } from 'react';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { Button, Flex, Menu } from '@mantine/core';
import { useState } from 'react';
import axios from "axios";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import './index.css'
import FormTamTru from './FormTamTru';

const TamTru = () => {
  const [listTamTru, setListTamTru] = useState('')
  const [popup,setPopup] = useState(false);
  const [data, setData] = useState()

  const onClickSua = async (data) => {
    const i = listTamTru.findIndex(x => x.id === data.id)
    let date = new Date(data.ngaysinh)
    let tempDate = date.getFullYear() + '-' + ("0"+(date.getMonth()+1)).slice(-2) + '-' + ("0"+date.getDate()).slice(-2)
    const newData = {...data,ngaysinh : tempDate}
    listTamTru[i] = newData;
    setListTamTru([...listTamTru])
  }

  const onClickXoa = async (table) => {
    let rows = table.getSelectedRowModel().flatRows
    
    
    table.toggleAllRowsSelected(false)
    if(window.confirm('Xác nhận xóa!')) {
      var ids = [];
      let data = listTamTru;
      for(let row of rows) {
          ids = [...ids,row.original.id];
          data = data.filter((obj) => obj.id !== row.original.id);
      }
      setListTamTru(data)
      await axios.post('http://localhost:4000/api/tamtru/delete',ids);
      
        alert('Đã xóa');
     
    }
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:4000/api/tamtru/get', []); 
          setListTamTru(response.data)
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

  const columns = useMemo(
    () => [
      {
        id: 'view',
        columns: [
          {   
            accessorKey:'hoten',
            header:'Họ và tên',
            size:300
          },
          {
            accessorKey:'ngaysinh',
            header:'Ngày sinh',
            size:200,
            Cell: ({ renderedCellValue, row }) => {let date = new Date(renderedCellValue); return date.getFullYear() + ' - ' + ("0"+(date.getMonth()+1)).slice(-2) + ' - ' + ("0"+date.getDate()).slice(-2);},
          },
          {
            accessorKey:'gioitinh',
            header:'Giới tính',
            size:200,   
          },
          {
            accessorKey:'cccd',
            header:'Căn cước công dân',
            size:200,   
          },
          {
            accessorKey:'quequan',
            header:'Quê quán',
            size:200,   
          },
          {
            accessorKey:'diachi',
            header:'Địa chỉ tạm trú',
            size:200,   
          },
          {
            accessorKey:'ngaybatdau',
            header:'Thời gian bắt đầu tạm trú',
            size:200,   
            Cell: ({ renderedCellValue, row }) => {let date = new Date(renderedCellValue); return date.getFullYear() + ' - ' + ("0"+(date.getMonth()+1)).slice(-2) + ' - ' + ("0"+date.getDate()).slice(-2);},

          },
          {
            accessorKey:'ngayketthuc',
            header:'Thời gian hết hạn tạm trú',
            size:200,   
            Cell: ({ renderedCellValue, row }) => {let date = new Date(renderedCellValue); return date.getFullYear() + ' - ' + ("0"+(date.getMonth()+1)).slice(-2) + ' - ' + ("0"+date.getDate()).slice(-2);},

          }
        ],
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data:listTamTru, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableStickyHeader: true, // static header
    enableRowSelection: true,
    enablePinning: true,
    enableGrouping: true,
    enableRowActions: true,
    positionToolbarAlertBanner: 'bottom',
    paginationDisplayMode: 'pages',
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
        <DriveFileRenameOutlineIcon className='kimbutton' onClick={()=>{setData({...row.original,ngaysinh:dateToString(new Date(row.original.ngaysinh)),ngaybatdau:dateToString(new Date(row.original.ngaybatdau)),ngayketthuc:dateToString(new Date(row.original.ngayketthuc)),}); setPopup(true)}}/>
      </div>
    ),
    renderTopToolbar: ({ table }) => {
      return (
        <Flex p="md" justify="space-between" >
          <Flex gap='8px'>
            <Button color="green" onClick={()=>{setData(); setPopup(true)}}
              disabled={(table.getIsSomeRowsSelected()||table.getIsAllRowsSelected())}
            >Thêm</Button>

            <Button color="red" variant="filled" onClick={()=>onClickXoa(table)}
              disabled={!(table.getIsSomeRowsSelected()||table.getIsAllRowsSelected())}
            >Xóa</Button>
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
    <div>
      <MantineReactTable table={table} />
      {popup?<FormTamTru data={data} close={()=>setPopup(false)} setList = {setListTamTru}handleClickSua={onClickSua} />:<></>}
    </div>
  );
};
const dateToString = (date) =>{ const year = date.getFullYear();
  const month  = date.getMonth()+1;
  const day = date.getDate()
  return `${(year+10000).toString().substring(1,5)}-${(month+100).toString().substring(1,3)}-${(day+100).toString().substring(1,3)}`
}
export default TamTru;