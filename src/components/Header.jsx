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
          <span>Admin</span>
        </div>

      </div>

    </div>
  );
}

export default Header;