import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardInfo from './pages/dashboard/dashboardInfo'
import Customers from './pages/customer/Customers'
import Layout from './componants/Layout'
import ProductIn from './pages/Products/ProductInStock'
import ProductOut from './pages/Products/ProductOutOf'
import ProductDetail from './pages/Products/ProductDetail'
import Order from './pages/Orders/Order'
import OrderDetails from './pages/Orders/OrderDetails'
import Categories from './pages/categories/Categories'
import FlashSale from './pages/FlashSales/FlashSale'
import AddFlashSale from './pages/FlashSales/AddFlashSale'
import AddFlashSale1 from './pages/FlashSales/AddFlashsale1'
import SignIn from './pages/SignIn'
import CutomerDetails from './pages/customer/CutomerDetails'
import ContactUsTable from "./pages/Contact";
import Revenue from './revenue/Revenue'
import Invoice from './pages/invoces/Invoice'

const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='signin' element={<SignIn />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<DashboardInfo />} />
          <Route path='productIn' element={<ProductIn />} />
          <Route path='productOut' element={<ProductOut />} />
          <Route path='customers' element={<Customers />} />
          <Route path='customers' element={<Customers />} />
          <Route path='customerDetails/:customerId' element={<CutomerDetails />} />
          <Route path='order' element={<Order />} />
          <Route path='orderdetail/:orderId' element={<OrderDetails />} />
          <Route path='categories' element={<Categories />} />
          <Route path='flashsale' element={<FlashSale />} />
          <Route path='flashsale1' element={<AddFlashSale1 />} />
          <Route path='addflashsale' element={<AddFlashSale />} />

          <Route path='productdetail/:id' element={<ProductDetail />} />
          <Route path='invoice' element={< Invoice />} />
          <Route path='revenue' element={<Revenue />} />
          <Route path='ContactUsTable' element={<ContactUsTable />} />

        </Route>

        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
};


export default App;



