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

const Account = () => {
  const [listTaiKhoan, setListTaiKhoan] = useState('')
  const [popup,setPopup] = useState(false);
  const [data, setData] = useState()

  const onClickSua = async (data) => {
    const i = listTaiKhoan.findIndex(x => x.UserId === data.UserId)
    listTaiKhoan[i] = data;
    setListTaiKhoan([...listTaiKhoan])
  }

  const onClickXoa = async (table) => {
    let rows = table.getSelectedRowModel().flatRows
    
    if(window.confirm('Xác nhận xóa!')) {
      var ids = [];
      let data = listTaiKhoan;

      for(let row of rows) {
          ids = [...ids,row.original.UserId];
          data = data.filter((obj) => obj.UserId !== row.original.UserId);
      }
      setListTaiKhoan(data)
      await axios.post('http://localhost:4000/api/users/delete',ids);
      table.toggleAllRowsSelected(false)
      alert('Đã xóa');
    }
    else table.toggleAllRowsSelected(false)
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:4000/api/users/get', []); 
          setListTaiKhoan(response.data)         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

  const columns = useMemo(
    () => [
      {   
        accessorKey:'Email',
        header:'Tài khoản',
      },
      {
        accessorKey:'Password',
        header:'Mật khẩu',
      },
      {
        accessorKey:'Role',
        header:'Vai trò',
        enableGrouping: false,
      },
    ], [],
  );

  const table = useMantineReactTable({
    columns,
    data:listTaiKhoan, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableStickyHeader: true, // static header
    enablePinning: true,
    enableGrouping: true,
    enableRowActions: true,
    enableRowSelection: (row) => row.original.UserId > 3,
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

export default Account;