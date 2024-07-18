import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Form from "./pages/Form";
import Accordion from './pages/Accordion';
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart";
import Register from './pages/Register';
import {store} from "./store";
import {Provider} from "react-redux"
import Login from './pages/Login';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/addGrocery",
    element: <Form />
  }, {
    path: "/faq",
    element: <Accordion />
  },
  {
    path: "/product-details/:id",
    element: <ProductDetails />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
