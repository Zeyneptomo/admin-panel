import OrdersTable from "./OrdersTable";

function Orders () {
  return (
    <div>

      <h2 className="text-white fw-bold mb-4">
        Siparişler
      </h2>

      <OrdersTable />

    </div>
  );
}

export default Orders;