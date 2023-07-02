import React, { useCallback, useEffect, useMemo, useState } from 'react';

import MaterialReactTable from 'material-react-table';

import {

  Box,

  Button,

  Dialog,

  DialogActions,

  DialogContent,

  DialogTitle,

  IconButton,

  MenuItem,

  Stack,

  TextField,

  Tooltip,

} from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
import { createUser, deleteUser, getUsers, updateUser } from '../../services/users.service';

const roles = ["DEVELOPER","INSTRUCTOR","RECRUITER","ANALYST"]

const Users = () => {

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await getUsers();
        setTableData(response.data);
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[])
  const handleCreateNewRow = (values) => {

    tableData.push(values);

    setTableData([...tableData]);

  };


  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      try {
        const updatedData = { ...values }; // Prepare the updated data to send to the backend
        const response = await updateUser(updatedData,row.original._id);
        console.log(response.data); // Log the response from the backend
        tableData[row.index] = values;
        setTableData([...tableData]);
        exitEditingMode();
      } catch (error) {
        console.log(error);
        // Handle error response from the backend
      }
    }
  };

  const handleCancelRowEdits = () => {

    setValidationErrors({});

  };


  const handleDeleteRow = useCallback((row) => {
    const id = row.original._id; // Access the ID value using row.original._id
    console.log(id); // Log the ID value to verify
  
    // Send API delete request
    deleteUser(id)
      .then((response) => {
        console.log(response.data);
  
        // Remove the deleted row from the tableData array
        const updatedTableData = [...tableData];
        updatedTableData.splice(row.index, 1);
        setTableData(updatedTableData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tableData]);
  


  const getCommonEditTextFieldProps = useCallback(

    (cell) => {

      return {

        error: !!validationErrors[cell.id],

        helperText: validationErrors[cell.id],

        onBlur: (event) => {

          const isValid =

            cell.column.id === 'email'

              ? validateEmail(event.target.value)

              : cell.column.id === 'age'

              ? validateAge(+event.target.value)

              : validateRequired(event.target.value);

          if (!isValid) {

            //set validation error for cell if invalid

            setValidationErrors({

              ...validationErrors,

              [cell.id]: `${cell.column.columnDef.header} is required`,

            });

          } else {

            //remove validation error for cell if valid

            delete validationErrors[cell.id];

            setValidationErrors({

              ...validationErrors,

            });

          }

        },

      };

    },

    [validationErrors],

  );


  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
        hide: true,
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'username',
        header: 'Username',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
      },
      {
        accessorKey: 'password',
        header: 'Password',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'password',
        }),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          )),
        },
      },
      // Add more columns as needed
    ],
    [getCommonEditTextFieldProps, roles] // Include any dependencies
  );


  return (

    <>

      <MaterialReactTable
          columns={columns.filter((column) => !column.hide)}  // Filter out hidden columns
        displayColumnDefOptions={{

          'mrt-row-actions': {

            muiTableHeadCellProps: {

              align: 'center',

            },

            size: 120,

          },

        }}

        

        data={tableData}

        editingMode="modal" //default

        enableColumnOrdering

        enableEditing

        onEditingRowSave={handleSaveRowEdits}

        onEditingRowCancel={handleCancelRowEdits}

        renderRowActions={({ row, table }) => (

          <Box sx={{ display: 'flex', gap: '1rem' }}>

            <Tooltip arrow placement="left" title="Edit">

              <IconButton onClick={() => table.setEditingRow(row)}>

                <Edit />

              </IconButton>

            </Tooltip>

            <Tooltip arrow placement="right" title="Delete">

              <IconButton color="error" onClick={() => handleDeleteRow(row)}>

                <Delete />

              </IconButton>

            </Tooltip>

          </Box>

        )}

        renderTopToolbarCustomActions={() => (

          <Button

            color="secondary"

            onClick={() => setCreateModalOpen(true)}

            variant="contained"

          >

            Create New Account

          </Button>

        )}

      />

      <CreateNewAccountModal

        columns={columns}

        open={createModalOpen}

        onClose={() => setCreateModalOpen(false)}

        onSubmit={handleCreateNewRow}

      />

    </>

  );

};


//example of creating a mui dialog modal for creating new rows

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {

  const [values, setValues] = useState(() =>

    columns.reduce((acc, column) => {

      acc[column.accessorKey ?? ''] = '';

      return acc;

    }, {}),

  );

  const filteredColumns = columns.filter((column) => column.accessorKey !== '_id');
  const handleSubmit = () => {
    // Call the createUser API function with form values
    createUser(values)
      .then((response) => {
        console.log(response.data); // Log the response from the API
        onSubmit(values); // Notify the parent component about the successful submission
        onClose(); // Close the dialog
      })
      .catch((error) => {
        console.log(error); // Handle error response from the API
        // Handle error cases if needed
      });
  };


  return (

    <Dialog open={open}>

      <DialogTitle textAlign="center">Create New Account</DialogTitle>

      <DialogContent>
  <form onSubmit={(e) => e.preventDefault()}>
    <Stack
      sx={{
        width: '100%',
        minWidth: { xs: '300px', sm: '360px', md: '400px' },
        gap: '1.5rem',
      }}
    >
      {filteredColumns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
     
    </Stack>
  </form>
</DialogContent>

      <DialogActions sx={{ p: '1.25rem' }}>

        <Button onClick={onClose}>Cancel</Button>

        <Button color="secondary" onClick={handleSubmit} variant="contained">

          Create New Account

        </Button>

      </DialogActions>

    </Dialog>

  );

};


const validateRequired = (value) => !!value.length;

const validateEmail = (email) =>

  !!email.length &&

  email

    .toLowerCase()

    .match(

      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    );

const validateAge = (age) => age >= 18 && age <= 50;


export default Users;

