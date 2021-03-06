import Header from "./component/layout/Header";
import './App.css';
import Footer from "./component/layout/Footer";
import Home from "./component/Home";
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom';
import { Fragment, useEffect } from "react";
import ProductDetails from "./component/product/ProductDetails";
import Login from "./component/user/Login";
import Register from "./component/user/Register";


function App() {


  return (
    <Fragment>
      <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/newuser" element={<Register/>} />
      </Routes>
      <Footer/>
      </Router>
    </Fragment>
  );
}

export default App;
