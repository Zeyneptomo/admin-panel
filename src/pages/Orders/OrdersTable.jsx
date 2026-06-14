import { useState, useEffect } from "react";

function OrdersTable() {




  const [ordersSearch, setOrdersSearch] = useState("");

  const [editId, setEditId] = useState(null);


  const [showForm, setShowForm] = useState(false);


  const [orders, setOrders] = useState(() => {

    const savedOrders = localStorage.getItem("orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });
  const products =
    JSON.parse(localStorage.getItem("products")) || [];


  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);


  const [newOrder, setNewOrder] = useState({
    name: "",
    product: "",
    category: "",
    quantity: "",
    status: ""
  });


  const addOrders = () => {

    if (
      !newOrder.name ||
      !newOrder.product ||
      !newOrder.category ||
      !newOrder.quantity ||
      !newOrder.status
    ) {
      return;
    }
    if (editId) {

      const updatedOrders = orders.map((order) =>
        order.id === editId
          ? {
            ...order,
            ...newOrder
          }
          : order
      );

      setOrders(updatedOrders);

      setEditId(null);

    } else {

      const order = {
        id: orders.length + 1,
        ...newOrder
      };

      setOrders([...orders, order]);
    }

    setNewOrder({
      name: "",
      product: "",
      category: "",
      quantity: "",
      status: ""
    });

    setShowForm(false);
  };

  const deleteOrders = (id) => {

    const updatedOrders = orders.filter(
      (order) => order.id !== id
    );

    setOrders(updatedOrders);
  };
  const editOrder = (order) => {

    setNewOrder({
      name: order.name,
      product: order.product,
      category: order.category,
      quantity: order.quantity,
      status: order.status
    });

    setEditId(order.id);

    setShowForm(true);
  };


  const filteredOrders = orders.filter((orders) =>
    orders.name
      .toLowerCase()
      .includes(ordersSearch.toLowerCase())
  );

  return (
    <div className="table-container mt-4 p-4">


      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">


        <div className="order-search-box">
          <input
            type="text"
            className="search-product"
            placeholder="Sipariş ara..."
            value={ordersSearch}
            onChange={(e) =>
              setOrdersSearch(e.target.value)
            }
          />

          <i className="bi bi-search"></i>

        </div>


        <button
          className="btn btn-primary add-order-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Sipariş Ekle
        </button>

      </div>


      {showForm && (

        <div className="product-form mb-4">

          <div className="row g-3">

            <div className="col-12 col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Sipariş Numarası"
                value={newOrder.name}
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    name: e.target.value
                  })
                }
              />
            </div>

            <select
              className="form-control"
              value={newOrder.product}
              onChange={(e) => {

                const selectedProduct = products.find(
                  (product) => product.name === e.target.value
                );

                setNewOrder({
                  ...newOrder,
                  product: e.target.value,
                  category: selectedProduct?.category || ""
                });
              }}
            >
              <option value="">Ürün Seç</option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.name}
                >
                  {product.name}
                </option>
              ))}
            </select>
            <div className="col-12 col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Kategori"
                value={newOrder.category}
                disabled
              />
            </div>

            <div className="col-12 col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Sipariş Adedi"
                value={newOrder.quantity}
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    quantity: e.target.value
                  })
                }
              />
            </div>

            <div className="col-12 col-md-3">
              <select
                className="form-control"
                value={newOrder.status}
                onChange={(e) =>
                  setNewOrder({
                    ...newOrder,
                    status: e.target.value
                  })
                }
              >
                <option value="">Durum</option>
                <option value="Yeni">Yeni</option>
                <option value="Tamamlandı">Tamamlandı</option>
              </select>
            </div>

            <div className="col-12 col-md-3">
              <button
                className="btn btn-success w-100"
                onClick={addOrders}
              >
                {editId ? "Güncelle" : "Kaydet"}
              </button>
            </div>

          </div>

        </div>
      )};


      <div className="table-responsive">

        <table className="table custom-table align-middle">

          <thead>
            <tr>
              <th>Sipariş Numarası</th>
              <th>Ürün</th>
              <th>Kategori</th>
              <th>Sipariş Adedi</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.map((order) => (
              <tr key={order.id}>

                <td>#{order.name}</td>

                <td>{order.product}</td>

                <td>{order.category}</td>

                <td>{order.quantity}</td>

                <td>
                  <span
                    className={`badge ${order.status === "Yeni"
                      ? "bg-success"
                      : "bg-danger"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editOrder(order)}
                  >
                    Düzenle
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteOrders(order.id)
                    }
                  >
                    Sil
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
export default OrdersTable;