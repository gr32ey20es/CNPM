import { MRT_EditActionButtons, MantineReactTable, useMantineReactTable, MRT_TableOptions, MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo, useState, useContext } from 'react';
import { DashboardContext, setHoKhau, setNhanKhau } from '../../provider';
import NhanKhau from './NhanKhau';
import { _setHoKhau } from '../global/sbFunction';
import { Box, DialogContent, IconButton, Button, DialogTitle, DialogActions, Tooltip } from '@mui/material';

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import FormDialog from './FormDialog';
import AddNhanKhau from './AddNhanKhau'

export default function HoKhau() {
  // app-state
  const [state,dispatch] = useContext(DashboardContext);
  // self-state
  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);
  
  console.log('HoKhau...', state)
  
  const columns = useMemo(
    () => [
      {
        accessorKey: 'sohokhau',
        header: 'Sổ hộ khẩu',
        size: 100
      },
      {
        accessorKey: 'chuho',
        header: 'Chủ hộ',
        size: 100
      },
      {
        accessorKey: 'cancuoccongdan',
        header: 'Căn cước công dân',
        size: 50
      },
      {
        accessorKey: 'diachi',
        header: 'Địa chỉ',
        size: 500
      },
    ],
    []
  );

  const data = useMemo(() => {
    return state.hoKhau.map((item, index) => ({ ...item, key: `hokhau-${index}` }));
  }, [state.hoKhau]);

  const renderDetailPanel = useMemo(() => {
    if (!isReady) {
      return null;
    }
    return (row) => {
      return <NhanKhau nhankhauIDs={row.row.original.nhankhauIDs} />;
    };
  }, [isReady]);

  // chưa thao tác với 'căn cước công dân'
  //API delete hokhau
  const handleDeleteHoKhau = async ( values ) => {
    if(!window.confirm('Toàn bộ thông tin về hộ gia đình sẽ bị xóa\nBạn có chắc chắn muốn xóa' ))
      return;
    console.log('Delete Hộ Khẩu',values)
    const index = data.findIndex(item => item.sohokhau === values.sohokhau)
    if(index!==-1) {
      const newData = [...data]
      newData.splice(index,1)
      dispatch(setHoKhau(newData))
    }
    alert('Xóa hộ gia đình thành công')
    //api here
  };

  //API create hokhau
  const handleCreateHoKhau = async ({values, table}) => {
    console.log('Create Hộ Khẩu',values)
    const index = data.findIndex(item => item.sohokhau === values.sohokhau)
    if(index!==-1)
      alert('Thêm hộ khẩu không thành công\nSố hộ khẩu đã tồn tại')
    else {
      const fakeData = {
        ...values,
        nhankhauIDs : [],
        key : 'hokhau-fake1' //chinh sua sau
      }
      const newData = [...data,fakeData]
      dispatch(setHoKhau(newData))
      alert('Thêm hộ khẩu thành công')
      table.setCreatingRow(null)
      //api here
    }
  }

  //API edit hokhau
  const handleEditHoKhau = async ( {row ,values, table}  ) => {
    console.log("Edit Hộ Khẩu",values)
    const index = data.findIndex(item => item.sohokhau === values.sohokhau)
    const index_oldValue = data.findIndex(item => item.sohokhau === row.original.sohokhau)

    //change Object values
    const Values = {
      ...values,
      nhankhauIDs : row.original.nhankhauIDs, //chinh sua sau
      key : 'hokhau-fake1' //chinh sua sau
    }

    if(index!==-1) {
      if(index !== index_oldValue)
        alert('Số hộ khẩu đã tồn tại')
      else {
        const _newData = data.map((item,Index) => {
          if(Index === index)
            return Values
          else
            return item
        })
        dispatch(setHoKhau(_newData))
        alert('Sửa thông tin hộ khẩu thành công')
        table.setEditingRow(null)
        //api here
      }
    }
    else { // Sửa sohokhau mới
      const _newData = data.map((item,Index) => {
        if(Index === index_oldValue)
          return Values
        else
          return item
      })
      dispatch(setHoKhau(_newData))
      alert('Sửa thông tin hộ khẩu thành công')
      table.setEditingRow(null)
      //api here
    }
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableExpanding: true,
    renderDetailPanel,
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableEditing: true,
    editDisplayMode : 'row',

    onCreatingRowSave: handleCreateHoKhau,
    onEditingRowSave: handleEditHoKhau,

    renderCreateRowDialogContent: ({ table, row, internalEditComponents}) => (
      <>
        <DialogTitle variant="h3">Thêm hộ khẩu</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row}/>
        </DialogActions>
      </>
    ),

    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),

    renderRowActions: ({ row , table }) => (
      <div className='row-actions-cmt8-1945'>
        {/* <FormDialog/> */}
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          <AddNhanKhau soHoKhau={row.original.sohokhau}/>
          <IconButton 
            title="Edit"
            style={{ color: 'rgb(234,143,14)' }}
            onClick={() => {
              table.setEditingRow(row)
            }}>
              <EditIcon />
          </IconButton>
          <IconButton 
            title="Delete"
            style={{ color: 'rgb(231,21,21)' }}
            onClick={()=>handleDeleteHoKhau(row.original)}>
              <DeleteIcon />
          </IconButton>
        </Box>
      </div>
    ),

    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant = "contained" 
        onClick={() => {
          table.setCreatingRow(true);
        }}>
          Thêm hộ khẩu
      </Button>
    ),

    mantineTableContainerProps: {
      sx: { 
        maxHeight: '83vh',
        width: '100%'
      }, //give the table a max height
    }
  });

  return <MantineReactTable table={table} />
}
