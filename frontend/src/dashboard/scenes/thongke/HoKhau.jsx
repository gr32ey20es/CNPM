import { MRT_Table, useMantineReactTable } from 'mantine-react-table';
import { useMemo, useContext } from 'react';
import { DashboardContext } from '../../provider'
import { colorsTheme } from '../../theme';
import { Box, IconButton } from '@mui/material';

export default function HoKhau({ data }) {
  // app-state
  const [state,] = useContext(DashboardContext);
  console.log(state)
  // const [state,] = useContext(DashboardContext);
  // console.log(state)
  // self-state
 
  const columns = useMemo(() => [
    {
      accessorKey: 'mahokhau',
      header: 'Mã hộ khẩu',
      size: 180
    },
    {
      accessorKey: 'tenchuho',
      header: 'Tên chủ hộ',
      size: 100
    },
    {
      accessorKey: 'sotien',
      header: 'Số tiền',
      size: 100
    },
    {
      accessorKey: 'ngaythu',
      header: 'Ngày thu',
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
   
  });

  // eslint-disable-next-line react/jsx-pascal-case
  return <CssBox><MRT_Table table={table} className='hokhau' /></CssBox>;
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


  