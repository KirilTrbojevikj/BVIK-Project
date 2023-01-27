import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { DisplayHealthCases } from '../components';

const Profile = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [healthCases, setHealthCases] = useState([]);

  const { address, contract, getUserHealthCases } = useStateContext();

  const fetchHealthCases = async () => {
    setIsLoading(true);
    const data = await getUserHealthCases();
    setHealthCases(data);
    setIsLoading(false);

  }

  useEffect(() => {
    if (contract) fetchHealthCases();
  }, [address, contract]);

  return (
    <DisplayHealthCases 
      title="My health cases"
      isLoading={isLoading}
      healthCases={healthCases}
    
    />
  )
}

export default Profile