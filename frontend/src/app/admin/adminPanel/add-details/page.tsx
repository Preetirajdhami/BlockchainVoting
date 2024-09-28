"use client"
import { useState, useEffect } from 'react';
import getContractInstance from '../../../utility/contract.js';

// Define the Candidate interface
interface Candidate {
  firstName: string;
  lastName: string;
  position: string;
  addressInfo: string;
  voteCount: number;
}

const CandidatesPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [addressInfo, setAddressInfo] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Specify the type
  const [candidateCount, setCandidateCount] = useState(0);

  const fetchCandidates = async () => {
    const contract = await getContractInstance();
    const count = await contract.candidateCount();
    setCandidateCount(count.toNumber());
    const candidatesList: Candidate[] = []; // Specify the type

    for (let i = 1; i <= count; i++) {
      const candidate = await contract.getCandidate(i);
      candidatesList.push({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        position: candidate.position,
        addressInfo: candidate.addressInfo,
        voteCount: candidate.voteCount.toNumber(), // Convert to number
      });
    }
    setCandidates(candidatesList);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleAddCandidate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contract = await getContractInstance();

    try {
      const tx = await contract.addCandidate(firstName, lastName, position, addressInfo);
      await tx.wait();
      alert('Candidate added successfully!');
      setFirstName('');
      setLastName('');
      setPosition('');
      setAddressInfo('');
      
      // Refresh candidates list
      await fetchCandidates(); // Call the fetch function
    } catch (error) {
      console.error('Error adding candidate:', error);
      alert('Failed to add candidate');
    }
  };

  return (
    <div className="container mx-auto my-10 p-5 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-5">Manage Candidates</h1>
      <form onSubmit={handleAddCandidate} className="mb-5">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Address Info"
          value={addressInfo}
          onChange={(e) => setAddressInfo(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Candidate
        </button>
      </form>
      
      <h2 className="text-xl font-semibold mb-3">Candidates List</h2>
      <ul className="space-y-2">
        {candidates.map((candidate, index) => (
          <li key={index} className="p-4 bg-white border border-gray-200 rounded shadow">
            <h3 className="font-bold">{candidate.firstName} {candidate.lastName}</h3>
            <p><strong>Position:</strong> {candidate.position}</p>
            <p><strong>Address:</strong> {candidate.addressInfo}</p>
            <p><strong>Votes:</strong> {candidate.voteCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidatesPage;
