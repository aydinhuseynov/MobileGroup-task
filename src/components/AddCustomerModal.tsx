import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { Customer } from "../utils/types";
import ClearIcon from '@mui/icons-material/Clear';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';



interface AddCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onAddCustomer: (customer: Customer) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ open, onClose, onAddCustomer,}) => {
  
  const [form, setForm] = useState({name: "",surname: "",email: "",phone: "",});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; 
    setForm({ ...form, [name]: value });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value.length > 0) {
        delete newErrors[name]; 
      }
      return newErrors;
    });
  };

  const handleClearField = (fieldName: keyof typeof form) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: "" }));
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" })); 
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Ad boş ola bilməz";
    if (!form.surname) newErrors.surname = "Soyad boş ola bilməz";
    if (!form.email) newErrors.email = "Email boş ola bilməz";
    if (form.email && !form.email.includes("@")) newErrors.email = "Uyğun olmayan email";
    if(form.phone.length === 0) newErrors.phone= "Telefon nömrəsi boş ola bilməz"
    if (form.phone.length >1 && form.phone.length < 10)
      newErrors.phone = "Telefon nömrəsi ən 10 rəqəmli olmalıdır";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newCustomer = { id: Date.now(), ...form };
      onAddCustomer(newCustomer);
      setForm({ name: "", surname: "", email: "", phone: "" });
      setErrors({});
      onClose();
    }
  };

  const handleCancel = () => {
    setForm({ name: "", surname: "", email: "", phone: "" });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Yeni istifadəçi əlavə et</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Adınızı daxil edin"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                endAdornment: form.name ? (
                  <IconButton size="small" onClick={() => handleClearField("name")}>
                    <ClearIcon color="primary"/>
                  </IconButton>
                ) : undefined,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Soyadınızı daxil edin"
              name="surname"
              fullWidth
              value={form.surname}
              onChange={handleChange}
              error={!!errors.surname}
              helperText={errors.surname}
              InputProps={{
                endAdornment: form.surname ? (
                  <IconButton size="small" onClick={() => handleClearField("surname")}>
                    <ClearIcon color="primary"/>
                  </IconButton>
                ) : undefined,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email daxil et"
              name="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                endAdornment: form.email ? (
                  <IconButton size="small" onClick={() => handleClearField("email")}>
                    <ClearIcon color="primary"/>
                  </IconButton>
                ) : undefined,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Telefon nömrəsi daxil et"
              name="phone"
              fullWidth
              value={form.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (/^\d*$/.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              error={!!errors.phone}
              helperText={errors.phone}
              placeholder=" (###) ###-##-##"
              inputProps={{
                maxLength: 10, 
              }}
              InputProps={{
                endAdornment: form.phone ? (
                  <IconButton size="small" onClick={() => handleClearField("phone")}>
                    <ClearIcon color="primary"/>
                  </IconButton>
                ) : undefined,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="error" variant="contained" endIcon={<ClearIcon/>}>
          Təmizlə
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" endIcon={<DownloadDoneIcon/>}>
          Əlavə et
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomerModal;
