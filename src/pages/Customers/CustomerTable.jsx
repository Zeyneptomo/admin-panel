import { useState, useEffect } from "react";

function CustomerTable() {

  // SEARCH
  const [customerSearch, setCustomerSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // SHOW FORM
  const [showForm, setShowForm] = useState(false);

  // CUSTOMERS
  const [customers, setCustomers] = useState(() => {

    const savedCustomers = localStorage.getItem("customers");

    return savedCustomers
      ? JSON.parse(savedCustomers)
      : [];
  });

  // LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem(
      "customers",
      JSON.stringify(customers)
    );
  }, [customers]);

  // NEW CUSTOMER
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    status: ""
  });

  // ADD CUSTOMER
  const addCustomer = () => {

    if (
      !newCustomer.name ||
      !newCustomer.email ||
      !newCustomer.phone ||
      !newCustomer.status
    ) {
      return;
    }
    if (editId) {

      const updatedCustomers = customers.map((customer) =>
        customer.id === editId
          ? {
            ...customer,
            ...newCustomer
          }
          : customer
      );

      setCustomers(updatedCustomers);

      setEditId(null);

    } else {

      const customer = {
        id: customers.length + 1,
        ...newCustomer
      };

      setCustomers([...customers, customer]);
    }

    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: ""
    });

    setShowForm(false);
  };

  // DELETE CUSTOMER
  const deleteCustomer = (id) => {

    const updatedCustomers = customers.filter(
      (customer) => customer.id !== id
    );

    setCustomers(updatedCustomers);
  };
  const editCustomer = (customer) => {

    setNewCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status
    });

    setEditId(customer.id);

    setShowForm(true);
  };

  // FILTER
  const filteredCustomers = customers.filter((customer) =>
    customer.name
      .toLowerCase()
      .includes(customerSearch.toLowerCase())
  );

  return (
    <div className="table-container mt-4 p-4">

      {/* TOP */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">

        {/* SEARCH */}
        <div className="customer-search-box">

          <input
            type="text"
            className="search-product"
            placeholder="Müşteri ara..."
            value={customerSearch}
            onChange={(e) =>
              setCustomerSearch(e.target.value)
            }
          />

          <i className="bi bi-search"></i>

        </div>

        {/* BUTTON */}
        <button
           className="btn btn-primary add-customer-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Müşteri Ekle
        </button>

      </div>

      {/* FORM */}
      {showForm && (

        <div className="product-form mb-4">

          <div className="row g-3">

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ad Soyad"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    name: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    email: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Telefon"
                value={newCustomer.phone}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    phone: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-2">
              <select
                className="form-control"
                value={newCustomer.status}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    status: e.target.value
                  })
                }
              >
                <option value="">Durum</option>
                <option value="Aktif">Aktif</option>
                <option value="Pasif">Pasif</option>
              </select>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={addCustomer}
              >
                {editId ? "Güncelle" : "Kaydet"}
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="table-responsive">

        <table className="table custom-table align-middle">

          <thead>
            <tr>
              <th>ID</th>
              <th>Ad Soyad</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>

                <td>#{customer.id}</td>

                <td>{customer.name}</td>

                <td>{customer.email}</td>

                <td>{customer.phone}</td>

                <td>
                  <span
                    className={`badge ${customer.status === "Aktif"
                      ? "bg-success"
                      : "bg-danger"
                      }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editCustomer(customer)}
                  >
                    Düzenle
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteCustomer(customer.id)
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

export default CustomerTable;