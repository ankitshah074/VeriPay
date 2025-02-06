 import React, { useState } from "react";
 import Web3 from "web3";
 import EscrowContractABI from "./abis/EscrowContract.json";
 import DAODisputeResolutionABI from "./abis/DAODisputeResolution.json";

 const web3 = new Web3(Web3.givenProvider);
 const escrowContractAddress = "0x..."; // Deployed contract address
 const daoContractAddress = "0x..."; // Deployed DAO contract address

 function App() {
   const [jobDescription, setJobDescription] = useState("");
//     const [submittedWork, setSubmittedWork] = useState("");
//     const [disputeDescription, setDisputeDescription] = useState("");

//     const createJob = async () => {
//         const accounts = await web3.eth.getAccounts();
//         const escrowContract = new web3.eth.Contract(EscrowContractABI, escrowContractAddress);
//         await escrowContract.methods
//             .createJob(jobDescription)
//             .send({ from: accounts[0], value: web3.utils.toWei("1", "ether") });
//     };

//     const submitWork = async () => {
//         const accounts = await web3.eth.getAccounts();
//         const escrowContract = new web3.eth.Contract(EscrowContractABI, escrowContractAddress);
//         await escrowContract.methods.submitWork(submittedWork).send({ from: accounts[0] });
//     };

//     const createDispute = async () => {
//         const accounts = await web3.eth.getAccounts();
//         const daoContract = new web3.eth.Contract(DAODisputeResolutionABI, daoContractAddress);
//         await daoContract.methods.createDispute(accounts[0], disputeDescription).send({ from: accounts[0] });
//     };

//     return (
//         <div>
//             <h1>Freelance Payment System</h1>
//             <div>
//                 <h2>Post a Job</h2>
//                 <input
//                     type="text"
//                     placeholder="Job Description"
//                     value={jobDescription}
//                     onChange={(e) => setJobDescription(e.target.value)}
//                 />
//                 <button onClick={createJob}>Create Job</button>
//             </div>
//             <div>
//                 <h2>Submit Work</h2>
//                 <input
//                     type="text"
//                     placeholder="Submitted Work"
//                     value={submittedWork}
//                     onChange={(e) => setSubmittedWork(e.target.value)}
//                 />
//                 <button onClick={submitWork}>Submit Work</button>
//             </div>
//             <div>
//                 <h2>Create Dispute</h2>
//                 <input
//                     type="text"
//                     placeholder="Dispute Description"
//                     value={disputeDescription}
//                     onChange={(e) => setDisputeDescription(e.target.value)}
//                 />
//                 <button onClick={createDispute}>Create Dispute</button>
//             </div>
//         </div>
//     );
 }

export default App;