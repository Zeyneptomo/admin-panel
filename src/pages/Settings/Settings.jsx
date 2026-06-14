import { useState, useEffect } from "react";

function Settings() {

    const [companyInfo, setCompanyInfo] = useState({
        name: "",
        phone: "",
        address: ""
    });

    useEffect(() => {

        const savedCompany =
            JSON.parse(localStorage.getItem("companyInfo"));

        if (savedCompany) {
            setCompanyInfo(savedCompany);
        }

    }, []);

    const handleSave = () => {

        localStorage.setItem(
            "companyInfo",
            JSON.stringify(companyInfo)
        );

        alert("Firma bilgileri kaydedildi.");
    };

    return (
        <div>

            <h2 className="text-white fw-bold mb-4">
                Ayarlar
            </h2>

            <div className="table-container p-4">

                <h4 className="text-white mb-4">
                    Firma Bilgileri
                </h4>

                <div className="row g-3">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Firma Adı"
                            value={companyInfo.name}
                            onChange={(e) =>
                                setCompanyInfo({
                                    ...companyInfo,
                                    name: e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Telefon"
                            value={companyInfo.phone}
                            onChange={(e) =>
                                setCompanyInfo({
                                    ...companyInfo,
                                    phone: e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Adres"
                            value={companyInfo.address}
                            onChange={(e) =>
                                setCompanyInfo({
                                    ...companyInfo,
                                    address: e.target.value
                                })
                            }
                        />

                    </div>

                </div>

                <button
                    className="btn btn-primary mt-4"
                    onClick={handleSave}
                >
                    Kaydet
                </button>

            </div>

        </div>
    );
}

export default Settings;