import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import SingleProduct from './components/SingleProduct';
import LoginScreen from './screens/LoginScreen';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; 
import AddProduct from './components/AddProduct';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const accessToken = Cookies.get('access_token');

    if (accessToken) {
      try {

        const decodedToken = jwtDecode(accessToken); 
        console.log('User email:', decodedToken.username);
        console.log('User email:', decodedToken.email);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to decode the token:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (

      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="product-add" element={< AddProduct />} />
          </Routes>
        </main>
        <Footer />
      </div>

  );
}

export default App;

