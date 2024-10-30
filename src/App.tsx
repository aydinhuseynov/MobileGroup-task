import React from 'react';
import CustomerTable from './components/CostumerTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <React.Fragment>
      <CustomerTable />
      <ToastContainer position="top-right" />
   </React.Fragment>
  )
}

export default App
