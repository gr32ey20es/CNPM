import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useEffect, useMemo, useState, useContext } from 'react';
import { DashboardContext } from '../../provider';
import NhanKhau from './NhanKhau';

export default function HoKhau() {
  // app-state
  const [state,] = useContext(DashboardContext);
  // self-state
  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);
  
  console.log('HoKhau...', state)
  const data = useMemo(() => {
    return state.hoKhau.map((item, index) => ({ ...item, key: `hokhau-${index}` }));
  }, [state.hoKhau]);

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
        accessorKey: 'diachi',
        header: 'Địa chỉ',
        size: 500
      },
    ],
    []
  );

  const renderDetailPanel = useMemo(() => {
    if (!isReady) {
      return null;
    }
    return (row) => {
      return <NhanKhau nhankhauIDs={row.row.original.nhankhauIDs} />;
    };
  }, [isReady]);

  const table = useMantineReactTable({
    columns,
    data,
    enableExpanding: true,
    renderDetailPanel,
    mantineTableContainerProps: {
      sx: { 
        maxHeight: '83vh',
        width: '100%'
      }, //give the table a max height
    }
  });

  return <MantineReactTable table={table} />;
}
