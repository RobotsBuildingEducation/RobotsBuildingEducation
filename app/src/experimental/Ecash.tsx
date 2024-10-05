import { useState, useEffect } from "react";

import { CashuMint, CashuWallet, getEncodedToken } from "@cashu/cashu-ts";

export const useProofStorage = () => {
  const [proofs, setProofs] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const storedProofs = localStorage.getItem("proofs");
    if (storedProofs) {
      const parsedProofs = JSON.parse(storedProofs);
      setProofs(parsedProofs);
      const initialBalance = parsedProofs.reduce(
        (total, proof) => total + proof.amount,
        0
      );
      localStorage.setItem("balance", initialBalance);
      setBalance(initialBalance);
    }
  }, []);

  useEffect(() => {
    if (!proofs) return;
    localStorage.setItem("proofs", JSON.stringify(proofs));
    const newBalance = proofs.reduce((total, proof) => total + proof.amount, 0);
    localStorage.setItem("balance", newBalance);
    setBalance(newBalance);
  }, [proofs]);

  const addProofs = (newProofs) => {
    setProofs((prevProofs) => [...(prevProofs || []), ...newProofs]);
  };

  const removeProofs = (proofsToRemove) => {
    if (!proofsToRemove) return;
    setProofs((prevProofs) =>
      prevProofs.filter((proof) => !proofsToRemove.includes(proof))
    );
  };

  const getProofsByAmount = (amount, keysetId = undefined) => {
    const result = [];
    let sum = 0;

    for (const proof of proofs) {
      if (sum >= amount) break;
      if (keysetId && proof.id !== keysetId) continue;
      result.push(proof);
      sum += proof.amount;
    }

    return result.length > 0 && sum >= amount ? result : [];
  };

  return {
    addProofs,
    removeProofs,
    getProofsByAmount,
    balance,
  };
};

export const useCashuProtocol = () => {
  const url = "https://cash.app";
  const deposit = 25;
  const cost = 1;

  const [walletReference, setWalletReference] = useState(null);

  //handle signatures, verification, etc.
  const { addProofs, removeProofs, getProofsByAmount, balance } =
    useProofStorage();

  useEffect(() => {
    connectMint();
  }, []);

  const connectMint = async () => {
    const mint = new CashuMint(url);

    try {
      const { keysets } = await mint.getKeys();
      const satKeyset = keysets.find((k) => k.unit === "sat");

      let wallet = new CashuWallet(mint, { keys: satKeyset, unit: "sat" });
      setWalletReference(wallet);

      await createMoney(wallet);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyMoney = async (wallet) => {
    const quote = await wallet.getMintQuote(deposit);

    const interval = setInterval(async () => {
      const { proofs } = await wallet.mintTokens(deposit, quote.quote, {
        keysetId: wallet.keys.id,
      });

      addProofs(proofs);
      clearInterval(interval);
    }, 5000);
  };

  const handleSend = async () => {
    const proofs = getProofsByAmount(cost);

    const { send, returnChange } = await walletReference.send(cost, proofs);

    const encodedToken = getEncodedToken({
      token: [{ proofs: send, mint: walletReference.mint.mintUrl }],
    });

    removeProofs(proofs);
    addProofs(returnChange);

    return encodedToken;
  };
};
