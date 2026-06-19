import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header d-flex justify-content-between align-items-center px-4 py-3">

      {/* SEARCH */}
      <div className="search-box">

        <input
          type="text"
          placeholder="Ara..."
        />

        <i className="bi bi-search"></i>

      </div>

      {/* PROFILE */}
      <div className="d-flex align-items-center gap-3 text-white">

        <i className="bi bi-bell fs-5"></i>

        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-person-circle fs-4"></i>

          <Link
            to="/login"
            className="text-white text-decoration-none"
          >
            Giriş Yap
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Header;