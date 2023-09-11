import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import AsteroidPage from '../../pages/AsteroidPage/AsteroidPage';
import OrderPage from '../../pages/OrderPage/OrderPage';
import MainLayout from '../../UI/MainLayout/MainLayout';
import "./../../styles/_global.scss"
import { useEffect, useState } from 'react';
import { getAllAsteroids } from '../../services/asteroidsService';
import Loader from '../Loader/Loader';

const App = () => {

  const [orders, setOrders] = useState([]);
  const [asteroids, setAsteroids] = useState(null);
  const [disabled, setDisabled] = useState([]);

  const addOrder = (item) => {
    setOrders([...orders, item]);
    setDisabled([...disabled, item.id]);
  };

  const removeOrderItem = (id) => {
    setOrders(orders.filter((el) => el.id !== id));
    setDisabled(disabled.filter((el) => el !== id));
  };

  const clearOrder = () => {
    setOrders([]);
    setDisabled([]);
  };
  

  useEffect(() => {
    getAllAsteroids().then((result) => setAsteroids(result))
  },[])
  
  return (
     <MainLayout>
        <Router>
        <Routes>
          <Route path="/" element={asteroids ? <MainPage asteroids={asteroids}
                                             disabled={disabled}
                                             onOrder={addOrder}
                                             onDelete={removeOrderItem}
                                             orders={orders}
                                             onClear={clearOrder}
                                             />
                                             : <Loader />} />
          <Route path="/order" element={<OrderPage orders={orders}
                                                   onDelete={removeOrderItem}
                                                   onClear={clearOrder} />} />
          <Route path="/:id" element={<AsteroidPage  />}/>
        </Routes>
      </Router>
    </MainLayout>
      
  );
}

export default App;
