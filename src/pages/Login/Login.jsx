import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    const users = [
      {
        email: "admin@gmail.com",
        password: "admin",
        role: "admin"
      },
      {
        email: "personel@gmail.com",
        password: "personel",
        role: "personel"
      }
    ];

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (user) {

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "role",
        user.role
      );

      navigate("/");

    } else {

      alert("E-posta veya şifre hatalı");
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(135deg,#1e1e2f,#2d2f45)"
      }}
    >

      <div
        className="p-4 rounded"
        style={{
          width: "400px",
          background: "#25263a"
        }}
      >

        <h2 className="text-white text-center mb-4">
          Admin Girişi
        </h2>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="E-posta"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Şifre"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Giriş Yap
        </button>

      </div>

    </div>
  );
}

export default Login;