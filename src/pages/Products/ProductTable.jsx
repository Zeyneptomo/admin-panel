import { useState, useEffect } from "react";

function ProductTable() {


  const [productSearch, setProductSearch] = useState("");
  const [editId, setEditId] = useState(null);


  const [showForm, setShowForm] = useState(false);


  const [products, setProducts] = useState(() => {

    const savedProducts = localStorage.getItem("products");

    return savedProducts
      ? JSON.parse(savedProducts)
      : [
        {
          id: 1,
          name: "Laptop",
          category: "Elektronik",
          price: "25.000₺",
          stock: 12
        },

        {
          id: 2,
          name: "Telefon",
          category: "Elektronik",
          price: "18.000₺",
          stock: 20
        },

        {
          id: 3,
          name: "Klavye",
          category: "Aksesuar",
          price: "1.200₺",
          stock: 35
        },

        {
          id: 4,
          name: "Mouse",
          category: "Aksesuar",
          price: "850₺",
          stock: 40
        }
      ];
  });
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);


  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: ""
  });
  const addProduct = () => {

    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.stock
    ) {
      return;
    }

    if (editId) {

      const updatedProducts = products.map((product) =>
        product.id === editId
          ? {
            ...product,
            ...newProduct
          }
          : product
      );

      setProducts(updatedProducts);

      setEditId(null);

    } else {

      const product = {
        id: products.length + 1,
        ...newProduct
      };

      setProducts([...products, product]);
    }

    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: ""
    });

    setShowForm(false);
  };



  const deleteProduct = (id) => {

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
  };
  const editProduct = (product) => {

    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock
    });

    setEditId(product.id);

    setShowForm(true);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="table-container mt-4 p-4">


      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">


        <div className="product-search-box">

          <input
            type="text"
            className="search-product"
            placeholder="Ürün ara..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
          />

          <i className="bi bi-search"></i>

        </div>


        <button
          className="btn btn-primary add-product-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Ürün Ekle
        </button>

      </div>


      {showForm && (

        <div className="product-form mb-4">

          <div className="row g-3 align-items-end">

            <div className="col-12 col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ürün Adı"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value
                  })
                }
              />
            </div>

            <div className="col-12 col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Kategori"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: e.target.value
                  })
                }
              />
            </div>

           <div className="col-12 col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Fiyat"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value.replace("₺", "")
                  })
                }
              />
            </div>

            <div className="col-12 col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Stok"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: e.target.value
                  })
                }
              />
            </div>

            <div className="col-12 col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={addProduct}
              >
                {editId ? "Güncelle" : "Kaydet"}
              </button>
            </div>

          </div>

        </div>
      )}


      <div className="table-responsive">

        <table className="table custom-table align-middle">

          <thead>
            <tr>
              <th>ID</th>
              <th>Ürün</th>
              <th>Kategori</th>
              <th>Fiyat</th>
              <th>Stok</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((product) => (
              <tr key={product.id}>

                <td>#{product.id}</td>

                <td className="fw-semibold">
                  {product.name}
                </td>

                <td>
                  <span className="badge bg-primary">
                    {product.category}
                  </span>
                </td>

                <td>{product.price}₺</td>

                <td>
                  <span className="badge bg-success">
                    {product.stock} adet
                  </span>
                </td>
                <td>

                  <div className="action-buttons">

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => editProduct(product)}
                    >
                      Düzenle
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Sil
                    </button>

                  </div>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}


export default ProductTable;