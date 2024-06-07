// import React, { useState } from "react";
// import { generatePrivateKey, getPublicKey } from "nostr-tools";
// import LightningClient from "lightning-client";
// import jwt from "jsonwebtoken";

// const lightning = new LightningClient("/path/to/your/lightning/node");

// const NostrWallet = () => {
//   const [privateKey, setPrivateKey] = useState("");
//   const [publicKey, setPublicKey] = useState("");
//   const [invoice, setInvoice] = useState("");
//   const [token, setToken] = useState("");

//   const generateKeys = () => {
//     const privKey = generatePrivateKey();
//     const pubKey = getPublicKey(privKey);
//     setPrivateKey(privKey);
//     setPublicKey(pubKey);
//   };

//   const createInvoice = async (amount) => {
//     const invoice = await lightning.addInvoice({ value: amount });
//     setInvoice(invoice.payment_request);
//   };

//   const payInvoice = async (invoice) => {
//     const payment = await lightning.payInvoice(invoice);
//     alert(`Payment successful: ${payment}`);
//   };

//   const generateNwcToken = () => {
//     const token = jwt.sign({ publicKey }, "your-secure-secret", {
//       expiresIn: "1h",
//     });
//     setToken(token);
//   };

//   return (
//     <div>
//       <h1>Nostr Wallet</h1>

//       <div>
//         <h2>Key Generation</h2>
//         <button onClick={generateKeys}>Generate Keys</button>
//         {privateKey && (
//           <div>
//             <p>Private Key: {privateKey}</p>
//             <p>Public Key: {publicKey}</p>
//           </div>
//         )}
//       </div>

//       {publicKey && (
//         <div>
//           <h2>Bitcoin Lightning</h2>
//           <button onClick={() => createInvoice(1000)}>Create Invoice</button>
//           {invoice && (
//             <div>
//               <p>Invoice: {invoice}</p>
//               <button onClick={() => payInvoice(invoice)}>Pay Invoice</button>
//             </div>
//           )}
//         </div>
//       )}

//       {publicKey && (
//         <div>
//           <h2>NWC Token</h2>
//           <button onClick={generateNwcToken}>Generate NWC Token</button>
//           {token && (
//             <div>
//               <p>NWC Token: {token}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NostrWallet;
