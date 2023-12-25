import { useMemo, useEffect } from 'react';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { Button, Flex } from '@mantine/core';
import { useState } from 'react';
import axios from "axios";
import FormS from './FormS';
import FormV from './FormV';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import './index.css'

const NopTien = () => {
  var [listKhoanThu, setListKhoanThu] = useState('')
  const [listNopTien, setListNopTien] = useState('')
  const [popupS,setPopupS] = useState(false);
  const [popupV,setPopupV] = useState(false);
  const [data, setData] = useState()

  console.log('noptien render...')
  const onClickSua = async (data) => {
    const i = listNopTien.findIndex(x => x.id === data.id)
    listNopTien[i] = data;
    setListNopTien([...listNopTien])
  }

  const onClickXoa = async (table) => {
    let rows = table.getSelectedRowModel().flatRows
    
    if(window.confirm('Xác nhận xóa!')) {
      var ids = [];
      let data = listNopTien;
      for(let row of rows) {
          ids = [...ids,row.original.id];
          data = data.filter((obj) => obj.id !== row.original.id);
      }
      setListNopTien(data)
      await axios.post('http://localhost:4000/api/noptien/delete',ids);
      table.toggleAllRowsSelected(false)
      alert('Đã xóa');
    }
    else table.toggleAllRowsSelected(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/noptien/statistics', []); 
        setListNopTien(response.data)   
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/khoanthu/get', []); 
        setListKhoanThu(response.data)   
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const findValid = (mahokhau) => {
    let valid = [];

    for(let i=0; i<listKhoanThu.length; i++)
      valid.push(listKhoanThu[i].id);

    for(let i=0; i<listNopTien.length; i++)
      if(listNopTien[i].mahokhau === mahokhau)
      valid = valid.filter(value => value !== listNopTien[i].makhoanthu)
    
    return valid;
  }

  const columns = useMemo(
    () => [ 
      {   
        accessorKey:'mahokhau',
        header:'Mã hộ khẩu',
      },
      {   
        accessorKey:'tenchuho',
        header:'Tên gia chủ',
      },
      {
        accessorKey:'makhoanthu',
        header:'Tên khoản thu',
        Cell: ({ renderedCellValue }) => (listKhoanThu?.find(khoanthu => khoanthu.id===renderedCellValue)?.ten)
      },
      {
        accessorKey:'sotiendanop',
        header:'Số tiền đã nộp',
        size:200,   
      },
      {
        accessorKey:'ngaynop',
        header:'Ngày nộp',
        size:200,   
        Cell: ({ renderedCellValue, row }) => {let date = new Date(renderedCellValue); return renderedCellValue ? date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() : '';},
      },
      {
        header: 'Action',
        Cell: ({ row }) => <div className='w-100 ps-2'> <DriveFileRenameOutlineIcon className='kimbutton' onClick={()=>{setData(row.original); setPopupV(true)}}/> </div>,
        AggregatedCell: ({row}) => {return <div className='w-100 ps-2'> <ControlPointDuplicateIcon className='kimbutton' onClick={()=>{setData({mahokhau: row.original.mahokhau, valid: findValid(row.original.mahokhau), thanhvien: row.original.thanhvien}); setPopupS(true)}}/> </div>}
      },   
    ],
    [listKhoanThu],
  );

  const table = useMantineReactTable({
    columns,
    data:listNopTien, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableStickyHeader: true, // static header
    enablePinning: true,
    enableGrouping: true,
    enableRowSelection: true,
    enableColumnDragging: false,
    positionToolbarAlertBanner: 'bottom',
    paginationDisplayMode: 'pages',
    initialState: { grouping:['mahokhau'], showColumnFilters: false, showGlobalFilter: true},
    mantineTableContainerProps: {
      sx: { 
        maxHeight: '70vh',
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

    renderTopToolbar: ({ table }) => {
      return (
        <Flex p="md" justify="space-between" >
          <Flex gap='8px'>
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
    <div style={{padding: 10}}>
      <MantineReactTable table={table} />
      {popupS?<FormS data={data} listKhoanThu={listKhoanThu} close={()=>setPopupS(false)} />:<></>}
      {popupV?<FormV data={data} listKhoanThu={listKhoanThu} close={()=>setPopupV(false)} handleClickSua={onClickSua} />:<></>}
    </div>
  );
};

export default NopTien;