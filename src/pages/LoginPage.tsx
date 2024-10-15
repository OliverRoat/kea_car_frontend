import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useState } from "react";
import { SalesPerson } from "../hooks/useLogin";

interface LoginPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Defining props
}
const credentials = {
  email: "lars@gmail.com",
  password: "hemmeligkode123"
}

function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const { salesPerson, error } = useLogin(credentials);
  //const [salesPerson, setSalesPerson] = useState({} as SalesPerson)
  const navigate = useNavigate();

  const handleLogin = () => {
    //const { salesPerson, error } = useLogin(credentials); // skaf en bedre måde at håndtere at logge ind
    //setSalesPerson(salesPerson)
    setIsLoggedIn(true);
    navigate("/brands");
  };

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Login Page</h1>
      <div>Sales Person first name: {salesPerson.first_name}</div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default LoginPage;
