// CashuWalletContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CashuMint, CashuWallet } from "@cashu/cashu-ts";
import { toast } from "react-toastify";

const initialState = {
  wallet: null,
  mint: null,
  balance: 0,
};

const WalletContext = createContext(initialState);

const walletReducer = (state, action) => {
  switch (action.type) {
    case "SET_WALLET":
      return { ...state, wallet: action.payload };
    case "SET_MINT":
      return { ...state, mint: action.payload };
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    default:
      return state;
  }
};

export const WalletProvider = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  useEffect(() => {
    const setupWallet = async () => {
      try {
        const mint = new CashuMint("https://stablenut.umint.cash");
        console.log("MINT", mint);
        const wallet = new CashuWallet(mint);
        console.log("wallet", wallet);

        dispatch({ type: "SET_MINT", payload: mint });
        dispatch({ type: "SET_WALLET", payload: wallet });

        // Fetch initial balance if necessary
        // const balance = await wallet.getBalance();
        // dispatch({ type: 'SET_BALANCE', payload: balance });
      } catch (error) {
        toast.error("Failed to setup wallet");
        console.error(error);
      }
    };
    setupWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ state, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
