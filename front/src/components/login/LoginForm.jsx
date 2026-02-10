import { useState } from "react";
import { loginUser } from "../../services/Auth/LoginApi";
import { useNavigate } from "react-router";

// formulaire de connexion utilisateurs
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if ((!email.trim() || !password.trim())) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const result = await loginUser(email, password);
      localStorage.setItem("token", result.token);
      setSuccess('Connection successful !');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
      

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-mail address * :</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password * :</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Login</button>
         <div>
          {success && <p>{success}</p>}
         {error && <p>{error}</p>}
         </div>
      </form>
    </>
  );
}

export default LoginForm;
