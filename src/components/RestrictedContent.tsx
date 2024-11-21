import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

interface RestrictedContentProps {
  children: ReactNode;
}

const RestrictedContent = (probs: RestrictedContentProps) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access_token");
  if (!token) {
    navigate("/login");
  }
  return (
    <>
      <NavBar />
      {probs.children}
    </>
  );
};

export default RestrictedContent;
