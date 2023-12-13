import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import CompanyTable from "../Components/CompanyTable";
import useFetch from "../Hooks/useFetch";
import { useParams } from 'react-router-dom';

const CompanyList = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState(undefined);
  const { page } = useParams();
  const email = localStorage.getItem("email");
  const comp = useFetch("/getOwnCompanies/" + email);

  useEffect(() =>{
    setCompanies(comp);
    setLoading(false);
  }, [comp]);

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <CompanyTable
          companies = { companies }
          page = { page }/>
      )}
    </div>
  );
};

export default CompanyList;
