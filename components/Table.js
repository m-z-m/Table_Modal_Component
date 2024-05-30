import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from './EditModal'; // Import the modal component

const TableData = () => {
  // Sample data
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [data, setData] = useState([
    { name: 'John Doe', mobile: '9876543210', customerId: 'C001', address: '123 Street, City' },
    { name: 'Tom Cruise', mobile: '9234567890', customerId: 'C002', address: '456 Street, City' },
    { name: 'Alice Smith', mobile: '9754655555', customerId: 'C003', address: '789 Street, City' },
    { name: 'Bob Johnson', mobile: '9666666666', customerId: 'C004', address: '101 Street, City' },
    { name: 'Emma Watson', mobile: '9112223333', customerId: 'C005', address: '222 Street, City' },
    { name: 'Michael Jordan', mobile: '9445556666', customerId: 'C006', address: '333 Street, City' },
    { name: 'Samantha Jones', mobile: '7478889999', customerId: 'C007', address: '444 Street, City' },
    { name: 'David Beckham', mobile: '7231231234', customerId: 'C008', address: '555 Street, City' },
    { name: 'Jennifer Lopez', mobile: '9564564567', customerId: 'C009', address: '666 Street, City' },
    { name: 'Jane Doe', mobile: '7897897890', customerId: 'C010', address: '777 Street, City' }
  ]);

  const [showProgress, setShowProgress] = useState(false); // State to manage showing CircularProgress

  const handleEditClick = (rowData) => {
    setSelectedData(rowData);
    setShowProgress(true); // Show CircularProgress
    setTimeout(() => {
      setShowProgress(false); // Hide CircularProgress after 1 second
      setOpenModal(true); // Open modal after 1 second
    }, 1000);
  };

  const handleSave = (updatedData) => {
    // Find the index of selected data in the array
    const index = data.findIndex(item => item.customerId === selectedData.customerId);
    // Update the data array with the updated data
    const newData = [...data];
    newData[index] = updatedData;
    // Update the state with the new data
    setData(newData);
  };

  return (
    <div style={{ overflowX: 'auto', opacity: showProgress ? 0.5 : 1 }}>
      <h1>Table Data</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.customerId}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" onClick={() => handleEditClick(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showProgress && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <CircularProgress size={50} />
        </div>
      )}
      <EditModal open={openModal} setOpen={setOpenModal} data={selectedData} handleSave={handleSave} />
    </div>
  );
}

export default TableData;
