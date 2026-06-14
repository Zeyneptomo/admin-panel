import { useEffect, useState } from "react";

function Reports() {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setProducts(
            JSON.parse(localStorage.getItem("products")) || []
        );

        setCustomers(
            JSON.parse(localStorage.getItem("customers")) || []
        );

        setOrders(
            JSON.parse(localStorage.getItem("orders")) || []
        );
    }, []);

    const totalStock = products.reduce(
        (total, product) => total + Number(product.stock),
        0
    );

    const categoryStats = {};

    products.forEach((product) => {
        if (categoryStats[product.category]) {
            categoryStats[product.category]++;
        } else {
            categoryStats[product.category] = 1;
        }
    });

    return (
        <div>

            <h2 className="text-white fw-bold mb-4">
                Raporlar
            </h2>

            {/* İSTATİSTİK KARTLARI */}
            <div className="row">

                <div className="col-md-3 mb-3">
                    <div className="stat-card p-3">
                        <h6 className="text-light">
                            Toplam Ürün
                        </h6>

                        <h3 className="text-white">
                            {products.length}
                        </h3>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="stat-card p-3">
                        <h6 className="text-light">
                            Toplam Müşteri
                        </h6>

                        <h3 className="text-white">
                            {customers.length}
                        </h3>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="stat-card p-3">
                        <h6 className="text-light">
                            Toplam Sipariş
                        </h6>

                        <h3 className="text-white">
                            {orders.length}
                        </h3>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="stat-card p-3">
                        <h6 className="text-light">
                            Toplam Stok
                        </h6>

                        <h3 className="text-white">
                            {totalStock}
                        </h3>
                    </div>
                </div>

            </div>

            {/* ALT RAPORLAR */}
            <div className="row mt-4">

                {/* SON ÜRÜNLER */}
                <div className="col-md-4 mb-4">

                    <div className="table-container p-3">

                        <h5 className="text-white mb-3">
                            Son Eklenen Ürünler
                        </h5>

                        {products.slice(-5).reverse().map((product) => (

                            <div
                                key={product.id}
                                className="d-flex justify-content-between mb-2 text-white"
                            >
                                <span>{product.name}</span>

                                <span>{product.stock} adet</span>
                            </div>

                        ))}

                    </div>

                </div>

                {/* SON SİPARİŞLER */}
                <div className="col-md-4 mb-4">

                    <div className="table-container p-3">

                        <h5 className="text-white mb-3">
                            Son Siparişler
                        </h5>

                        {orders.slice(-5).reverse().map((order) => (

                            <div
                                key={order.id}
                                className="d-flex justify-content-between mb-2 text-white"
                            >
                                <span>{order.product}</span>

                                <span>{order.status}</span>
                            </div>

                        ))}

                    </div>

                </div>

                {/* SON MÜŞTERİLER */}
                <div className="col-md-4 mb-4">

                    <div className="table-container p-3">

                        <h5 className="text-white mb-3">
                            Son Müşteriler
                        </h5>

                        {customers.slice(-5).reverse().map((customer) => (

                            <div
                                key={customer.id}
                                className="d-flex justify-content-between mb-2 text-white"
                            >
                                <span>{customer.name}</span>

                                <span>{customer.status}</span>
                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* KATEGORİ DAĞILIMI */}
            <div className="table-container p-4 mt-3">

                <h4 className="text-white mb-4">
                    Kategori Dağılımı
                </h4>

                {Object.entries(categoryStats).map(
                    ([category, count]) => (

                        <div
                            key={category}
                            className="d-flex justify-content-between text-white mb-2"
                        >
                            <span>{category}</span>

                            <span>{count} ürün</span>
                        </div>

                    )
                )}

            </div>

        </div>
    );
}

export default Reports;