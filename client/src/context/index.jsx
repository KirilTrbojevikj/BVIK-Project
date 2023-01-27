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

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createHealthCase: publishCase,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);