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
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import './index.css'

const KhoanThu = () => {
  const [listKhoanThu, setListKhoanThu] = useState('')
  const [popup,setPopup] = useState(false);
  const [data, setData] = useState()

  const onClickSua = async (data) => {
    const i = listKhoanThu.findIndex(x => x.id === data.id)
    listKhoanThu[i] = data;
    setListKhoanThu([...listKhoanThu])
  }

  const onClickXoa = async (table) => {
    let rows = table.getSelectedRowModel().flatRows
    
    if(window.confirm('Xác nhận xóa!')) {
      var ids = [];
      let data = listKhoanThu;
      for(let row of rows) {
          ids = [...ids,row.original.id];
          data = data.filter((obj) => obj.id !== row.original.id);
      }
      setListKhoanThu(data)
      await axios.post('http://localhost:4000/api/khoanthu/delete',ids);
      table.toggleAllRowsSelected(false)
      alert('Đã xóa');
    }
    else table.toggleAllRowsSelected(false)
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:4000/api/khoanthu/statistics', []); 
          setListKhoanThu(response.data)         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

  const columns = useMemo(
    () => [
      {   
        accessorKey:'ten',
        header:'Tên khoản thu',
      },
      {
        accessorKey:'loai',
        header:'Loại',
      },
      {
        accessorKey:'sotien',
        header:'Số tiền',
        enableGrouping: false,
      },
      {
        accessorKey:'tong',
        header:'Tổng',
        enableGrouping: false,
      },
      {
        accessorKey:'danop',
        header:'Đã nộp',
        minSize: 50, size: 50, maxSize: 50, 
        mantineTableHeadCellProps: { align: 'center', },
        mantineTableBodyCellProps: { align: 'center', },
        enableSorting: false,
        enableGrouping: false,
      },
      {
        accessorKey:'chuanop',
        header:'Chưa nộp',
        minSize: 50, size: 50, maxSize: 50, 
        mantineTableHeadCellProps: { align: 'center', },
        mantineTableBodyCellProps: { align: 'center', },
        enableSorting: false, 
        enableGrouping: false,
      }
    ], [],
  );

  const table = useMantineReactTable({
    columns,
    data:listKhoanThu, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableStickyHeader: true, // static header
    enableRowSelection: true,
    enablePinning: true,
    enableGrouping: true,
    enableRowActions: true,
    positionToolbarAlertBanner: 'bottom',
    paginationDisplayMode: 'pages',
    initialState: { showColumnFilters: false, showGlobalFilter: true },
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
    renderRowActions: ({row}) => (
      <div className='w-100 ps-2'>
        <DriveFileRenameOutlineIcon className='kimbutton' onClick={()=>{setData(row.original); setPopup(true)}}/>
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
    <div style={{padding: 10}}>
      <MantineReactTable table={table} />
      {popup?<FormS data={data} close={()=>setPopup(false)} handleClickSua={onClickSua} />:<></>}
    </div>
  );
};

export default KhoanThu;