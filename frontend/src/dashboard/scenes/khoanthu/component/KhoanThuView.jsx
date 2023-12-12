import { useMemo } from 'react';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { Box, Button, Flex, Menu, Text, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useContext,useState } from 'react';
import { KhoanThuContext } from '../KhoanThuContext';
import AddKhoanThu from './AddKhoanThu';
import '../css/view.css'
import KhoanThuController from '../controller/KhoanThuController';
import UpdateKhoanThu from './UpdateKhoanThu';
const KhoanThuView = () => {
  const {listKhoanThu,setListKhoanThu} = useContext(KhoanThuContext);
  const [addPopup,setAddPopup] = useState(false);
  const [updatePopup,setUpdatePopup] = useState(false);
  const [choicedUpdate,setChoicedUpdate] = useState();
  if(updatePopup||addPopup){
    document.body.classList.add('active-popup')
  }else{
    document.body.classList.remove('active-popup')
  }
  const columns = useMemo(
    () => [
      {
        id: 'view', //id used to define `group` column
        
        columns: [
        {
            accessorKey:'makhoanthu',
            header:'Mã khoản thu',
            size:100
        },
        {   
            accessorKey:'tenkhoanthu',
            header:'Tên khoản thu',
            size:300
        },
        {
            accessorKey:'loai',
            header:'Loại',
            size:200
        },
        {
            accessorKey:'sotien',
            header:'Số tiền',
            size:200,
            
        }
         
        ],
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data:listKhoanThu, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enablePinning: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: { showColumnFilters: false, showGlobalFilter: true },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
    },
    paginationDisplayMode: 'pages',
    mantineTableContainerProps: {
      sx: { 
        maxHeight: '83vh',
        width: '100%'
      }, //give the table a max height
    },
    mantineSearchTextInputProps: {
      placeholder: 'Tìm kiếm ',
    },
    
    renderRowActionMenuItems: ({row}) => (
      <>
        <Menu.Item icon={<IconEdit />} onClick={(e)=>KhoanThuController.updateItem(setUpdatePopup,setChoicedUpdate,row.original)}>Edit</Menu.Item>
        <Menu.Item icon={<IconTrash />} onClick={(e)=>KhoanThuController.deleteItem(setListKhoanThu,row.original.makhoanthu)}>Delete</Menu.Item>
      </>
    ),
    renderTopToolbar: ({ table }) => {
      
      return (
        <Flex p="md" justify="space-between" >
          <Flex gap="xs">
            {/* import MRT sub-components */}
            <Button
            color="green"
              onClick = {(e)=>setAddPopup(true)}
            >
            Thêm khoản thu
            </Button>
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex sx={{ gap: '8px' }}>
            <Button
              color="red"
              disabled={!(table.getIsSomeRowsSelected()||table.getIsAllRowsSelected())}
              onClick={(e)=>KhoanThuController.deleteItems(setListKhoanThu,table)}
              variant="filled"
            >
              Xóa nhiều
            </Button>
            
            
          </Flex>
         
        </Flex>
      );
    },
  });

  return(
    <div>
         <MantineReactTable table={table} className = "table" />
        {addPopup?<AddKhoanThu setTrigger = {setAddPopup}/>:''}
        {updatePopup?<UpdateKhoanThu data = {choicedUpdate} setTrigger={setUpdatePopup}/>:''}
    </div>
  );
};

export default KhoanThuView;