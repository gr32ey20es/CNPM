import { MRT_Table, useMantineReactTable } from 'mantine-react-table';
import { useMemo, useContext } from 'react';
import { DashboardContext } from '../../provider'
import { colorsTheme } from '../../theme';
import { Box, IconButton } from '@mui/material';
import FormDialog from './FormDialog'

import {
  Delete as DeleteIcon,
} from '@mui/icons-material';

export default function NhanKhau({ nhankhauIDs }) {
  // app-state
  const [state,] = useContext(DashboardContext);
  console.log(state)
  // self-state
  const data = useMemo(() => {
    return nhankhauIDs.map((id, index) => ({ ...state.nhanKhau[id], key: `nhankhau-${index}` }));
  }, [nhankhauIDs, state.nhanKhau]);

  const columns = useMemo(() => [
    {
      accessorKey: 'hoten',
      header: 'Họ và tên',
      size: 180
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
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <div className='row-actions-cmt8-1945'>
        <FormDialog/>
        <IconButton onClick={() => console.info('Delete')}>
          <DeleteIcon />
        </IconButton>
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


  