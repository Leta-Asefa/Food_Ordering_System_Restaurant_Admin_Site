import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auths/Login';
import Signup from './components/auths/Signup';
import Logout from './components/auths/Logout';
import HomeLayout from './layouts/Home';
import RegisterRestaurants from './components/auths/RegisterRestaurants';
import Dashboard from './components/dashboard/Dashboard';
import DashboardLayout from './layouts/Dashboard';
import Order from './components/dashboard/Order';
import Menu from './components/dashboard/Menu';
import Profile from './components/dashboard/Profile';
import OrderLayout from './layouts/Order';
import All from './components/dashboard/order_statuses/All';
import Pending from './components/dashboard/order_statuses/Pending';
import Delivered from './components/dashboard/order_statuses/Delivered';
import OnTransit from './components/dashboard/order_statuses/OnTransit';
import MenuLayout from './layouts/Menu';
import AddItem from './components/dashboard/menu_navigation/AddItem';
import Food from './components/dashboard/menu_navigation/Food';
import Drink from './components/dashboard/menu_navigation/Drink';
import PaymentLayout from './layouts/Payment';
import History from './components/dashboard/payment/History';
import Refund from './components/dashboard/payment/Refund';
import Subscription from './components/dashboard/payment/Subscription';
import Payment from './components/dashboard/Payment';
import AddDeliveryPerson from './components/dashboard/AddDeliveryPerson';
import Cancelled from './components/dashboard/order_statuses/Cancelled';
import Catering from './components/dashboard/menu_navigation/Catering';
import Report from './components/dashboard/Report';
import Promotion from './components/dashboard/Promotion';
import PromotionLayout from './layouts/Promotion';
import CreateNew from './components/dashboard/promotion/CreateNew';
import PromotionList from './components/dashboard/promotion/PromotionList';
import UnderApplication from './components/dashboard/promotion/UnderApplication';
import Processing from './components/dashboard/order_statuses/Processing';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Router>
      <Routes>


        <Route element={<HomeLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register_restaurant' element={<RegisterRestaurants />} />
        </Route>


        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report" element={<Report/>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/adddeliveryperson" element={<AddDeliveryPerson />} />


          <Route element={<OrderLayout />}>
            <Route path="/orders/all" element={<All />} />
            <Route path="/orders/pending" element={<Pending />} />
            <Route path="/orders/processing" element={<Processing />} />
            <Route path="/orders/delivered" element={<Delivered />} />
            <Route path="/orders/ontransit" element={<OnTransit />} />
            <Route path="/orders/cancelled" element={<Cancelled />} />
          </Route>


          <Route element={<MenuLayout />}>
            <Route path="/menu/additem" element={<AddItem />} />
            <Route path="/menu/food" element={<Food />} />
            <Route path="/menu/drink" element={<Drink />} />
            <Route path="/menu/catering" element={<Catering />} />
          </Route>

          <Route element={<PaymentLayout />}>
            <Route path="/payment/history" element={<History />} />
            <Route path="/payment/refund" element={<Refund />} />
            <Route path="/payment/subscription" element={<Subscription />} />
          </Route>

          <Route element={<PromotionLayout />}>
            <Route path="/promotion/create" element={<CreateNew />} />
            <Route path="/promotion/list" element={<PromotionList />} />
            <Route path="/promotion/underapplication" element={<UnderApplication />} />
          </Route>


        </Route>




      </Routes>
    </Router>
  );
}

export default App;