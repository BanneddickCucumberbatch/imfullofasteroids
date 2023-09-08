import Order from "../../components/Order/Order";

const OrderPage = ({ orders, onShowCart, onClear, onDelete }) => {

  return (

    <Order
      orders={orders}
      onShowCart={onShowCart}
      onDelete={onDelete}
      onClear={onClear}
    />
  );
};

export default OrderPage;
