import AsteroidList from "../../components/AsteroidList/AsteroidList";
import Cart from "../../components/Cart/Cart";

const MainPage = ({
  asteroids,
  orders,
  disabled,
  onOrder,
  onDelete,
  onShowCart,
  onClear,
}) => {
  
  return (
    <>
      <AsteroidList
        asteroids={asteroids}
        orders={orders}
        disabled={disabled}
        onOrder={onOrder}
        onDelete={onDelete}
        onShowCart={onShowCart}
        onClear={onClear}s
      />
      <Cart orders={orders}
            onShowCart={onShowCart}
            onClear={onClear}
            onDelete={onDelete}/>
      </>
  );
};

export default MainPage;
