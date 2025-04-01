import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";
import AddCustomerModal from "../components/AddCustomerModal";
import { Customer } from "../utils/types";
import { toast } from "react-toastify";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomerTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
    toast.success("Yeni istifadəçi uğurla əlavə olundu");
    setIsModalOpen(false);
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    toast.error("İstifadəçi uğurla silindi");
  };

  return (
    <Paper elevation={3} sx={{ padding: { xs: 1, sm: 2 }, marginTop: 2 }}>
      <Typography
        sx={{ textAlign: "center" }}
        fontSize={{ xs: 16, sm: 20, md: 24 }}
        variant="h6"
        gutterBottom
      >
        CRM sisteminin istifadəçi və müştəri məlumatları
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<PersonAddIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{ fontSize: { xs: 12, sm: 14 } }}
        >
          İstifadəçi əlavə et
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No:</TableCell>
              <TableCell>Ad</TableCell>
              <TableCell>Soyad</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telfon</TableCell>
              <TableCell>Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={customer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.surname}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddCustomerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCustomer={handleAddCustomer}
      />
    </Paper>
  );
};

export default CustomerTable;
