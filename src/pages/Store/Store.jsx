import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Store() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    setProducts(savedProducts);

  }, []);

  return (
    <div className="container mt-4">

      <h2 className="text-white mb-4">
        Ürünler
      </h2>

      <div className="row">

        {products.map((product) => (

          <div
            key={product.id}
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
          >

            <div className="stat-card p-3 h-100">

              <h5 className="text-white">
                {product.name}
              </h5>

              <p className="text-secondary">
                {product.category}
              </p>

              <h6 className="text-success">
                {product.price}
               
              </h6>
              

              <Link
                to={`/product/${product.id}`}
                className="btn btn-primary w-100 mt-3"
              >
                İncele
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Store;