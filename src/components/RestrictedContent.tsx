import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

interface RestrictedContentProps {
  slot: ReactNode;
}

const RestrictedContent = (props: RestrictedContentProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <NavBar />
      {props.slot}
    </>
  );
};

export default RestrictedContent;
