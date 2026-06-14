function StatCard({ title, value, icon }) {
  return (
    <div className="col-md-3">
      <div className="stat-card p-3">

        <div className="d-flex justify-content-between align-items-center">
          
          <div>
            <h6 className="stat-title">{title || "Başlık"}</h6>
            <h3 className="stat-value">{value || "0"}</h3>
          </div>

          <div className="stat-icon">
            <i className={`bi ${icon || "bi-circle"}`}></i>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StatCard;