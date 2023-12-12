import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useEffect, useMemo, useState, useContext } from 'react';
import HoKhau from './HoKhau';

const fakedata = [
  {
    makhoanthu:'KT001',
    tenkhoanthu:'Vệ sinh',
    loai:'Bắt buộc',
    tongdathu:700000,
    danhsachthu:[
      {
        mahokhau:'HK001',
        tenchuho:'Nguyễn Thị Mơ',
        sotien:20000,
        ngaythu:'2003-2-2'
      },
      {
        mahokhau:'HK002',
        tenchuho:'Nguyễn Thị Mận',
        sotien:10000,
        ngaythu:'2003-2-3'
      },
     
    ]
  },
  {
    makhoanthu: 'KT002',
    tenkhoanthu: 'Tiền điện',
    loai: 'Bắt buộc',
    tongdathu: 500000,
    danhsachthu: [
      {
        mahokhau: 'HK003',
        tenchuho: 'Trần Văn A',
        sotien: 30000,
        ngaythu: '2003-2-4',
      },
      {
        mahokhau: 'HK004',
        tenchuho: 'Trần Thị B',
        sotien: 15000,
        ngaythu: '2003-2-5',
      },
    ],
  },
]
export default function ThongKe() {

  // self-state
  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);
  
 


  const columns = useMemo(
    () => [
      {
        accessorKey: 'makhoanthu',
        header: 'Mã khoản thu',
        size: 100
      },
      {
        accessorKey: 'tenkhoanthu',
        header: 'Tên khoản thu',
        size: 100
      },
      {
        accessorKey: 'loai',
        header: 'Loại',
        size: 50
      },
      {
        accessorKey: 'tongdathu',
        header: 'Tổng số tiền đã thu',
        size: 450
      },
    ],
    []
  );

  const renderDetailPanel = useMemo(() => {
    if (!isReady) {
      return null;
    }
    return (row) => {
      console.log(row.row.original.danhsachthu)
      return <HoKhau data = {row.row.original.danhsachthu}/>;
    };
  }, [isReady]);

  const table = useMantineReactTable({
    columns,
    data:fakedata,
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
