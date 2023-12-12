import { useContext, useMemo } from 'react';
import {
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { Box, Button, Flex, Menu, Text, Title } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { NopTienContext } from '../NopTienContext';
import { deleteItem, updateItem,deleteItems } from '../controller/listController';
import { useScrollTrigger } from '@mui/material';
import { useState } from 'react';
import Update from './Update';
import Add from './Add';
import { useEffect } from 'react';

const NopTienView = () => {
    const {listNopTien,setListNopTien} = useContext(NopTienContext);
    useEffect(()=>{

    },[listNopTien])
    const [choicedUpdate,setChoicedUpdate] = useState();
    const [updatePopup,setUpdatePopup] = useState(false);
    const [addPopup,setAddPopup] = useState(false);
    if(updatePopup||addPopup){
      document.body.classList.add('active-popup')
    }else{
      document.body.classList.remove('active-popup')
    }
  const columns = useMemo(
    () => [
      {
        id: 'noptien',
        columns: [
          {
            accessorFn: (row) => `${row.tenchuho} (${row.bietdanh})`, //accessorFn used to join multiple data into a single cell
            id: 'tenchuho', //id is still required when using accessorFn instead of accessorKey
            header: 'Tên chủ hộ',
            size: 200,
            filterVariant: 'autocomplete',
            
          },
          {
            accessorKey: 'diachi', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: 'Địa chỉ',
            size: 200,
            id:'diachi',
            filterVariant: 'autocomplete',
          },
          {
            accessorKey: 'tenkhoanthu', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: 'tên khoản thu',
            size: 100,
            id:'tenkhoanthu',
            filterVariant: 'autocomplete',
          },
          {
            accessorKey: 'sotien', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: 'Số tiền nộp',
            size: 70,
            id:'sotien',
            filterVariant: 'autocomplete',
          },
          {
            accessorFn: (row) => {
              //convert to Date for sorting and filtering
              const sDay = new Date(row.ngaynop);
              sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
              return sDay;
            },
            id: 'startDate',
            header: 'Ngày nộp',
            filterVariant: 'date-range',
            sortingFn: 'datetime',
            size: 50,
            enableColumnFilterModes: false, //keep this as only date-range filter with between inclusive filterFn
            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
          },
        ],
      }
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data : listNopTien, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
    mantineSearchTextInputProps: {
      placeholder: 'Search Employees',
    },
    renderRowActionMenuItems: ({row}) => (
      <>
        <Menu.Item icon={<IconEdit/>} onClick = {(e)=>updateItem(setUpdatePopup,setChoicedUpdate,row.original)}>Edit</Menu.Item>
        <Menu.Item icon={<IconTrash />} onClick = {(e)=>deleteItem(setListNopTien,row.original.mahokhau,row.original.makhoanthu)}>Delete</Menu.Item>
      </>
    ),
    renderTopToolbar: ({ table }) => {

      return (
        <Flex p="md" justify="space-between">
          
          <Flex gap="xs">
            {/* import MRT sub-components */}
            <Button
              color="green"
              onClick={(e)=>setAddPopup(true)}
            >
             Thêm khoản nộp
            </Button>
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex sx={{ gap: '8px' }}>
            <Button
              color="red"

           
              disabled={!(table.getIsSomeRowsSelected()||table.getIsAllRowsSelected())}
              onClick={(e)=>deleteItems(setListNopTien,table)}
              variant="filled"
            >
              Xóa nhiều
            </Button>
            
            
          </Flex>
        </Flex>
      );
    },
  });

  return (
    <div>
        {updatePopup?<Update setTrigger={setUpdatePopup} data = {choicedUpdate}/>:''}
        {addPopup?<Add setTrigger = {setAddPopup} />:''}
        <MantineReactTable table={table} />
    </div>
  );
};

export default NopTienView;