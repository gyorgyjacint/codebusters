import { useState } from "react";
import Loading from "../Components/Loading";
import CompanyForm from "../Components/CompanyForm";
import { useNavigate } from "react-router-dom";

const CompanyRegistration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createCompany = (company) => {
    const jsonPayload = JSON.stringify(company);
    return fetch(`/CompanyRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonPayload,
    }).then((res) => {
      if(res.status === 201){
        alert("Successfully registered!");
        navigate("/companies");
      } else {
        alert("Something went wrong!");
      }
    });
  };

  const handleSubmit = (company) => {
    setLoading(true);
    createCompany(company);
    setLoading(false);
  }

  const handleCancel = () => {
    navigate("/");
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <CompanyForm
          onSave = { handleSubmit }
          onCancel = { handleCancel }
        />
      )}
    </div>
  );
};

export default CompanyRegistration;
