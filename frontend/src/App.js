import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./components/SingleProduct";



function App() {
  return (
    <div>
      <Header/>
      <main>

        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="product/:id" element={<SingleProduct/>}/>
        </Routes>

      </main>
      <Footer/>
    </div>
  );
}

export default App;
