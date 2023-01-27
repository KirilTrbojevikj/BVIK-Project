import React, { useContext, createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xEfd2C4548841D0DB47b4AdfA11Dd379C8e418877');

    const { mutateAsync: createHealthCase } = useContractWrite(contract, 'createHealthCase');

    const address = useAddress();
    const connect = useMetamask();

    const publishCase = async (form) => {

        try {
            const data = await createHealthCase([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime()
            ])

            console.log("contract call success", data);

        } catch (error) {
            console.log("contract call failure", error);
        }
    }


    const getCases = async () => {

        const healthCases = await contract.call('getHealthCases');

        const parsedHealthCases = healthCases.map((healthCase, i) =>
        ({
            owner: healthCase.owner,
            title: healthCase.title,
            description: healthCase.description,
            target: ethers.utils.formatEther(healthCase.target.toString()),
            deadline: healthCase.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(healthCase.amountCollected.toString()),
            pId: i

        }));

        return parsedHealthCases;
    }

    const getUserHealthCases = async () => {

        const allHealthCases = await getCases();

        const filterCases = allHealthCases.filter((healthCase) => healthCase.owner === address);

        return filterCases;
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createHealthCase: publishCase,
                getCases,
                getUserHealthCases,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);