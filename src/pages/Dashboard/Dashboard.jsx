import { useEffect, useState } from "react";

import StatCard from "../../components/StatCard";
import Chart from "../../components/Chart";

function Dashboard() {

  // STATES
  const [productsCount, setProductsCount] = useState(0);

  const [customersCount, setCustomersCount] = useState(0);

  const [ordersCount, setOrdersCount] = useState(0);

  const [totalStock, setTotalStock] = useState(0);

  // LOAD DATA
  useEffect(() => {

    // PRODUCTS
    const products =
      JSON.parse(localStorage.getItem("products")) || [];

    // CUSTOMERS
    const customers =
      JSON.parse(localStorage.getItem("customers")) || [];

    // ORDERS
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // COUNTS
    setProductsCount(products.length);

    setCustomersCount(customers.length);

    setOrdersCount(orders.length);

    // TOTAL STOCK
    const stockTotal = products.reduce(
      (total, product) =>
        total + Number(product.stock),
      0
    );

    setTotalStock(stockTotal);

  }, []);

  return (
    <>

      {/* STAT CARDS */}
      <div className="row mb-4">

        <StatCard
          title="Ürünler"
          value={productsCount}
          icon="bi-box-seam"
        />

        <StatCard
          title="Müşteriler"
          value={customersCount}
          icon="bi-people"
        />

        <StatCard
          title="Siparişler"
          value={ordersCount}
          icon="bi-cart"
        />

        <StatCard
          title="Toplam Stok"
          value={totalStock}
          icon="bi-bar-chart"
        />

      </div>

      {/* CHART */}
      <Chart />

    </>
  );
}

export default Dashboard;