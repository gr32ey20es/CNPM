import { MRT_Table, useMantineReactTable, MRT_EditActionButtons, MantineReactTable } from 'mantine-react-table';
import { useMemo, useContext } from 'react';
import { DashboardContext,setNhanKhau } from '../../provider'
import { colorsTheme } from '../../theme';
import { Box, IconButton } from '@mui/material';
import FormDialog from './FormDialog'


import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

export default function NhanKhau({ nhankhauIDs }) {
  // app-state
  const [state,dispatch] = useContext(DashboardContext);
  console.log(state)
  // self-state
  // old
  // const data = useMemo(() => {
  //   return nhankhauIDs.map((id, index) => ({ ...state.nhanKhau[id], key: `nhankhau-${index}` }));
  // }, [nhankhauIDs, state.nhanKhau]);

  const data = useMemo(() => {
    return nhankhauIDs.map((id, index) => {
      if(state.nhanKhau[id].cancuoccongdan !== "null") {
        return { ...state.nhanKhau[id], key: `nhankhau-${index}` }
      } else {
        return null;
      }
    }).filter(item => item !== null);
  }, [nhankhauIDs, state.nhanKhau]);

  const columns = useMemo(() => [
    {
      accessorKey: 'hoten',
      header: 'Họ và tên',
      size: 180
    },
    {
      accessorKey: 'cancuoccongdan',
      header: 'Căn cước công dân',
      size: 50
    },
    {
      accessorKey: 'ngaysinh',
      header: 'Ngày sinh',
      size: 100
    },
    {
      accessorKey: 'gioitinh',
      header: 'Giới tính',
      size: 100
    },
    {
      accessorKey: 'quoctich',
      header: 'Quốc tịch',
      size: 100
    }
  ], []);

    //API delete nhankhau
  const handleDeleteNhanKhau = async ( values ) => {
    if(!window.confirm('Toàn bộ thông tin về công dân sẽ bị xóa\nBạn có chắc chắn muốn xóa' ))
      return;
    console.log('Delete Nhân Khẩu',values)
    const newData = state.nhanKhau.map((item,index) => {
      if(item.cancuoccongdan === values.cancuoccongdan)
        return {
          "hoten": "null",
          "cancuoccongdan": "null",
          "ngaysinh": "null",
          "gioitinh": "null",
          "quoctich": "null",
          "sokokhau": "null",
        }
      else
        return item
    })
    dispatch(setNhanKhau(newData))
    alert('Xóa thông tin công dân thành công')
    //api here
  };

  //API edit nhankhau
  const handleEditNhanKhau = async ( {row ,values, table}  ) => {
    console.log("Edit Nhân Khẩu",values)
    console.log("Row ori",row.original)
    console.log("data ",data )
    const index = state.nhanKhau.findIndex(item => item.cancuoccongdan === values.cancuoccongdan)
    const index_oldValue = state.nhanKhau.findIndex(item => item.cancuoccongdan === row.original.cancuoccongdan)

    //change Object values
    const Values = {
      ...values,
      sokokhau : row.original.sokokhau, //chinh sua sau
    }

    if(index!==-1) {
      if(index !== index_oldValue)
        alert('Số căn cước công dân đã tồn tại')
      else {
        const _newData = state.nhanKhau.map((item,Index) => {
          if(Index === index)
            return Values
          else
            return item
        })
        dispatch(setNhanKhau(_newData))
        alert('Thay đổi thông tin công dân thành công')
        table.setEditingRow(null)
        //api here
      }
    }
    else {
      const _newData = state.nhanKhau.map((item,Index) => {
        if(Index === index_oldValue)
          return Values
        else
          return item
      })
      dispatch(setNhanKhau(_newData))
      alert('Thay đổi thông tin công dân thành công')
      table.setEditingRow(null)
      //api here
    }
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineTableProps: {
      withColumnBorders: true,
      withBorder: true,
    },
    enableEditing: true,
    enableRowActions: true,
    editDisplayMode : 'row',
    positionActionsColumn: 'last',

    onEditingRowSave: handleEditNhanKhau,

    renderRowActions: ({ row , table }) => (
      <div className='row-actions-cmt8-1945'>
        {/* <FormDialog/> */}
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
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
            onClick={() => handleDeleteNhanKhau(row.original)}>
              <DeleteIcon />
          </IconButton>
        </Box>
      </div>
    ),
  });

  // eslint-disable-next-line react/jsx-pascal-case
  return <CssBox><MRT_Table table={table} className='nhankhau' /></CssBox>;
}

const CssBox = ({ children }) => {
  // app-state
  const [state,] = useContext(DashboardContext);
  const colors = colorsTheme(state.darkMode === true ? 'dark' : 'light');

  return (
    <Box
      sx={{
        ".mantine-2kfh7k:hover > *": {
          backgroundColor: `${colors.grey[600]}50 !important`,
        },
        "thead > tr > th": {
          backgroundColor: `${colors.grey[500]} !important`,
          color:  `${colors.grey[100]} !important`,
          opacity: '90%',
        },
        "tbody > tr > td": {
          backgroundColor: `${colors.grey[500]}99`,
          color: colors.grey[100]
        },
        ".tabler-icon-dots": {
          color: colors.grey[100],
        },
        ".row-actions-cmt8-1945 > button > svg": {
          width: 20, height: 20,
          fill: colors.grey[100],
          opacity: '90%',
        },
      }}
    >
    { children }
    </Box>
  )
}


  