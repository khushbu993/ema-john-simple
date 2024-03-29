import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/productDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h3>email: {loggedInUser.email}</h3>
      <Router>
        <Header></Header>
        <Switch>
          <Route path = "/shop">
            <Shop></Shop>
          </Route>
          <Route path = "/review">
            <Review></Review>
          </Route>
          <PrivateRoute path = "/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path = "/login">
            <Login></Login>
          </Route>
          <PrivateRoute path = "/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path = "/">
            <Shop></Shop>
          </Route>
          <Route path = "/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path = "*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
