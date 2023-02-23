import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { DisplayHealthCases } from '../components';
import "./form.css";

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [healthCases, setHealthCases] = useState([]);

  const { address, contract, getCases } = useStateContext();

  const fetchHealthCases = async () => {
    setIsLoading(true);
    const data = await getCases();
    setHealthCases(data);
    setIsLoading(false);

  }

  useEffect(() => {
    if (contract) fetchHealthCases();
  }, [address, contract]);

  return (
    <DisplayHealthCases 
      title="All health cases"
      isLoading={isLoading}
      healthCases={healthCases}
    
    />
  )
}

export default Home