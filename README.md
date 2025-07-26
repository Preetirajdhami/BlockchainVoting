# QuickVote - Blockchain Voting Platform

QuickVote is a secure, user-friendly online voting platform built with Next.js for the frontend and Ethereum smart contracts for the backend. It leverages blockchain technology to ensure transparency, integrity, and privacy in elections.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Smart Contracts](#smart-contracts)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- Secure user authentication (JWT, email verification)
- Admin and voter panels
- Candidate management
- Real-time voting status
- Blockchain-based vote recording
- IPFS integration for file uploads
- Responsive UI with Tailwind CSS
- RESTful API with Swagger documentation

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Blockchain:** Ethereum, Solidity, Truffle
- **Other:** IPFS, Passport.js, JWT

## Project Structure

```
QuickVote/
├── backend/         # Node.js/Express API server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── ...
├── Ethereum/        # Smart contracts and Truffle config
│   ├── contracts/
│   ├── migrations/
│   ├── build/
│   └── test/
├── frontend/        # Next.js frontend
│   ├── src/
│   ├── public/
│   └── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, or pnpm
- MongoDB
- Truffle & Ganache (for local blockchain)
- Metamask (for testing)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on [http://localhost:8000](http://localhost:5000) by default.

### Blockchain Setup

```bash
cd Ethereum
npm install -g truffle
truffle compile
truffle migrate --network development
```

## Smart Contracts

- `AdminPanel.sol`: Admin operations
- `VoterPanel.sol`: Voter operations
- `Migrations.sol`: Truffle migration contract

Contracts are located in `Ethereum/contracts/`. ABI files are in `Ethereum/build/contracts/`.

## API Documentation

Swagger documentation is available at `/api-docs` when the backend is running.

## Deployment

### Vercel (Frontend)

Deploy the Next.js frontend easily on [Vercel](https://vercel.com/).

### Backend

Deploy the backend on platforms like Heroku, Render, or AWS.

### Blockchain

For production, deploy smart contracts to Ethereum mainnet or testnets (e.g., Goerli).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

