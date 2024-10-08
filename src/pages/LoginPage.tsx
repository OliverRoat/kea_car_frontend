import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Defining props
}

function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/brands");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default LoginPage;
