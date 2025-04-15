import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './Components/Context/AuthContext'

import SystemAdmin from './Components/Users/SystemAdmin/SystemAdmin'
import ResturantAdmin from './Components/Users/ResturantAdmin/ResturantAdmin'
import Customer from './Components/Users/Customer/Customer'
import Header from './Components/Common/Header/Header'
import Footer from './Components/Common/Footer/Footer'
import LandingPage from './Components/Common/Landing Page/LandingPage'
import Login from './Components/Common/Login/Login'
import CustomerRegister from './Components/Common/Register/CustomerRegistration/CustomerRegister'
import RegisterDirection from './Components/Common/Register/RegisterDirection/RegisterDirection'
import ResturantRegistration from './Components/Common/Register/ResturantRegistration/ResturantRegistration'
import DileveryPersonRegistration from './Components/Common/Register/DileveryPersonRegistration/DileveryPersonRegistration'






function App() {

  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {user ? (
          <>
            {user.role === "SystemAdmin" && (
              <>
                <Route path='/SystemAdmin' element={<SystemAdmin />} />
              </>
            )}
            {user.role === "ResturantAdmin" && (
              <>
                <Route path='/ResturantAdmin' element={<ResturantAdmin />} />
              </>
            )}
            {user.role === "DeliveryPerson" && ( //Sandun's part
              <>
                <Route path="/DeliveryPerson" element={<DeliveryPerson />} /> 
                <Route path="/OrderDetails" element = {<OrderDetails/>}/>
                <Route path="/Deliveryconfirm" element = {<Deliveryconfirm/>}/>
                <Route path="/DeliveryDashboard" element = {<DeliveryDashboard/>}/>
              </>
            )}
            {user.role === "Customer" && (
              <>
                <Route path="/Customer" element={<Customer />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<RegisterDirection />} />
            <Route path='/CustomerRegister' element={<CustomerRegister />} />
            <Route path='/DileveryPersonRegistration' element={<DileveryPersonRegistration />} />
            <Route path='/ResturantRegistration' element={<ResturantRegistration />} />

          </>
        )}
      </Routes>
      <Footer />
    </>
  )
}

export default App;