import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Sidebar() {

    const [companyName, setCompanyName] = useState("Firma Adı");
    const [role, setRole] = useState("");


    const navigate = useNavigate();

    useEffect(() => {

        const companyInfo =
            JSON.parse(localStorage.getItem("companyInfo"));

        if (companyInfo?.name) {
            setCompanyName(companyInfo.name);
        }

        const userRole =
            localStorage.getItem("role");

        if (userRole) {
            setRole(userRole);
        }

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");

        navigate("/login");
    };
    
    return (
        <div
            className="sidebar bg-dark text-white vh-100 p-3"
            style={{ width: "250px" }}
        >

            <h4 className="mb-4">
                {companyName}
            </h4>

            <ul className="nav nav-pills flex-column">

                <li className="nav-item mb-2">
                    <Link
                        to="/"
                        className="nav-link text-white"
                    >
                        <i className="bi bi-house-fill me-2"></i>
                        <span className="menu-text">
                            Kontrol Paneli
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        to="/orders"
                        className="nav-link text-white"
                    >
                        <i className="bi bi-cart me-2"></i>
                        <span className="menu-text">
                            Siparişler
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        to="/products"
                        className="nav-link text-white"
                    >
                        <i className="bi bi-box-seam me-2"></i>
                        <span className="menu-text">
                            Ürünler
                        </span>
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link
                        to="/customers"
                        className="nav-link text-white"
                    >
                        <i className="bi bi-people me-2"></i>
                        <span className="menu-text">
                            Müşteriler
                        </span>
                    </Link>
                </li>

                {role === "admin" && (

                    <li className="nav-item mb-2">

                        <Link
                            to="/reports"
                            className="nav-link text-white"
                        >
                            <i className="bi bi-bar-chart me-2"></i>

                            <span className="menu-text">
                                Raporlar
                            </span>
                        </Link>

                    </li>

                )}

            </ul>

            <hr />

            <ul className="nav flex-column">

                {role === "admin" && (

                    <li className="nav-item mb-2">

                        <Link
                            to="/settings"
                            className="nav-link text-white"
                        >
                            <i className="bi bi-gear me-2"></i>

                            <span className="menu-text">
                                Ayarlar
                            </span>
                        </Link>

                    </li>

                )}

                <li className="nav-item">

                    <button
                        onClick={handleLogout}
                        className="nav-link text-white border-0 bg-transparent w-100 text-start"
                    >
                        <i className="bi bi-box-arrow-left me-2"></i>
                        <span className="menu-text">
                            Oturumu Kapat
                        </span>
                    </button>

                </li>

            </ul>

        </div>
    );
}

export default Sidebar;