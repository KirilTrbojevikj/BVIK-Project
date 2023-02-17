import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import { CustomButton, CountBox } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';



const DetailsCase = () => {

  const { state } = useLocation();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if (contract) fetchDonators()
      
  }, [contract, address])

  const handleDonate = async() => {
    setIsLoading(true);

    await donate(state.pId,amount);

    setIsLoading(false);
  }


  return (
    <div>
      {isLoading && 'Loading...'}

      <div>
        <div style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>

        </div>
      </div>

      <div>
        <CountBox title="Days Left" value={remainingDays} />
        <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
        <CountBox title="Total Donators" value={donators.length} />
      </div>

      <div>
        <h4>Creator</h4>
        <h4>{state.owner}</h4>
      </div>

      <div>
        <h4>Description</h4>
        <p>{state.description}</p>
      </div>

      <div>
        <h4>Donators</h4>

        {donators.length>0 ? donators.map((item,index) => (
          <div key={`${item.donator}-${index}`}>
            <p>{index + 1}. {item.donator} value: {item.donation}</p>
            
          </div>
        )): (
          <p>No donators.</p>

        )}
      </div>

      <div>
        <h4>Donate</h4>

        <div>
          <p>Donate to this case</p>
          <div>
          <input 
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
          </div>

          <CustomButton 
                btnType="button"
                title="Donate"
                handleClick={handleDonate}
              />
        </div>

      </div>

    </div>
  )
}

export default DetailsCase