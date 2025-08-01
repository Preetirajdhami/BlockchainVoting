# QuickVote - Blockchain Voting Platform

<div align="center">
  <img src="https://quickvote-blockchain.vercel.app/logo.png" alt="QuickVote Logo" width="200"/>
  
  <h3>Secure, Transparent, and Accessible Voting for the Digital Age</h3>
  
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-quickvote--blockchain.vercel.app-blue?style=for-the-badge&logo=vercel)](https://quickvote-blockchain.vercel.app/)
  [![Backend API](https://img.shields.io/badge/Backend%20API-Live-green?style=for-the-badge&logo=node.js)](https://blockchainvoting-z1xf.onrender.com)
  [![Smart Contract](https://img.shields.io/badge/Smart%20Contract-Verified-purple?style=for-the-badge&logo=ethereum)](https://sepolia.etherscan.io/address/0xC3D8F9101AE21728962D9FE91f46c337E171a1EB)
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
  ![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat&logo=solidity&logoColor=white)
  ![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=flat&logo=ethereum&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
</div>

---

## 🚀 Live Application

- **Frontend**: [https://quickvote-blockchain.vercel.app/](https://quickvote-blockchain.vercel.app/)
- **Backend API**: [https://blockchainvoting-z1xf.onrender.com](https://blockchainvoting-z1xf.onrender.com)
- **Smart Contract**: [0xC3D8F9101AE21728962D9FE91f46c337E171a1EB](https://sepolia.etherscan.io/address/0xC3D8F9101AE21728962D9FE91f46c337E171a1EB)
- **API Documentation**: [Swagger Docs](https://blockchainvoting-z1xf.onrender.com/api-docs)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Smart Contracts](#-smart-contracts)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Security](#-security)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

QuickVote is a cutting-edge blockchain-powered voting platform that revolutionizes the democratic process through secure, transparent, and accessible online voting. Built with modern web technologies and Ethereum smart contracts, QuickVote ensures the integrity of every vote while providing real-time results and comprehensive audit trails.

### Why QuickVote?

- **🔒 Immutable Security**: Blockchain technology prevents vote tampering
- **🌐 Global Accessibility**: Vote from anywhere with internet access
- **⚡ Real-time Results**: Instant vote counting and live updates
- **🔍 Full Transparency**: Every vote is verifiable on the blockchain
- **📱 Cross-platform**: Works on desktop, tablet, and mobile devices
- **🎯 User-friendly**: Intuitive interface for all technical skill levels

---

## ✨ Features

### For Voters
- **Secure Registration** with email verification
- **MetaMask Integration** for blockchain authentication
- **Candidate Profiles** with detailed information and images
- **One-click Voting** with confirmation dialogs
- **Vote Verification** with blockchain transaction receipts
- **Real-time Results** dashboard
- **Mobile Responsive** design

### For Administrators
- **Candidate Management** - Add, edit, and remove candidates
- **Election Control** - Start/stop voting periods
- **Real-time Monitoring** - Live vote counts and statistics
- **Result Analytics** - Comprehensive charts and breakdowns
- **Election Reset** - Clear data for new elections
- **Security Dashboard** - Monitor system integrity

### Technical Features
- **IPFS Integration** for decentralized file storage
- **JWT Authentication** with refresh tokens
- **Email Notifications** for important events
- **Responsive Design** across all devices
- **Progressive Web App** capabilities
- **Comprehensive Logging** and error tracking

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **UI Library**: React 18 with Tailwind CSS
- **State Management**: Redux Toolkit
- **Blockchain**: Ethers.js v6
- **Charts**: Chart.js with React-Chartjs-2
- **Forms**: Formik with Yup validation
- **Icons**: React Icons & Lucide React
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with JWT
- **File Upload**: Multer with IPFS
- **Email**: Nodemailer
- **Documentation**: Swagger UI
- **Security**: CORS, Helmet, Rate Limiting

### Blockchain
- **Network**: Ethereum (Sepolia Testnet)
- **Smart Contracts**: Solidity ^0.8.0
- **Development**: Truffle Framework
- **Wallet**: MetaMask Integration
- **Storage**: IPFS for candidate images

### DevOps & Deployment
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **Database**: MongoDB Atlas
- **Version Control**: Git with GitHub
- **CI/CD**: Automated deployments

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                 │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   Voter Panel   │ │  Admin Panel   │ │   Public Pages  ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
                                │
                               HTTP/WebSocket
                                │
┌─────────────────────────────────────────────────────────────┐
│                      Backend (Express.js)                  │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   Auth Service  │ │   User Service  │ │  Admin Service  ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
                                │
                           Database Connection
                                │
┌─────────────────────────────────────────────────────────────┐
│                        MongoDB Atlas                       │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │     Users       │ │  Voting Status  │ │  Verification   ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Ethereum Blockchain                     │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │  AdminPanel.sol │ │ VoterPanel.sol  │ │   IPFS Storage  ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (Atlas account recommended)
- **MetaMask** browser extension
- **Git**

### Environment Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/quickvote.git
   cd quickvote
   ```

2. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install

   # Install blockchain dependencies
   cd ../Ethereum
   npm install
   ```

3. **Environment Variables**

   **Frontend** (`frontend/.env.local`):
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

   **Backend** (`backend/.env`):
   ```env
   PORT=8000
   DATABASE_URL=mongodb+srv://your-mongodb-uri
   JWT_ACCESS_TOKEN_SECRET_KEY=your-jwt-access-secret
   JWT_REFRESH_TOKEN_SECRET_KEY=your-jwt-refresh-secret
   SALT=12
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   FRONTEND_HOST=http://localhost:3000
   ADMIN_EMAIL=admin@quickvote.com
   ADMIN_PASSWORD=hashed-admin-password
   NODE_ENV=development
   ```

   **Blockchain** (`Ethereum/.env`):
   ```env
   PRIVATE_KEY=your-ethereum-private-key
   ALCHEMY_API_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
   ```

### Local Development

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Deploy Smart Contracts** (Optional - contracts are already deployed)
   ```bash
   cd Ethereum
   truffle migrate --network sepolia
   ```

3. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

4. **Start Frontend Application**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - API Docs: [http://localhost:8000/api-docs](http://localhost:8000/api-docs)

---

## 📖 Usage Guide

### For Voters

1. **Registration**
   - Visit the registration page
   - Fill in personal details and upload a photo
   - Verify email with OTP
   - Install MetaMask if not already installed

2. **Voting Process**
   - Login with verified credentials
   - Connect MetaMask wallet
   - View candidate profiles
   - Cast your vote (requires gas fees)
   - Receive transaction confirmation

3. **View Results**
   - Access real-time results after voting ends
   - View detailed analytics and charts
   - Verify your vote on the blockchain

### For Administrators

1. **Admin Access**
   - Login with admin credentials
   - Access admin dashboard

2. **Election Management**
   - Add candidates with profiles and images
   - Start/stop voting periods
   - Monitor real-time statistics
   - Generate final reports

3. **System Administration**
   - Reset elections for new cycles
   - Monitor system health
   - View transaction logs

### Smart Contract Interaction

The platform automatically handles all blockchain interactions, but users can also:

- View transactions on [Etherscan](https://sepolia.etherscan.io/)
- Verify votes using transaction hashes
- Interact directly with contracts (advanced users)

---

## 📜 Smart Contracts

### AdminPanel Contract
- **Address**: `0xC3D8F9101AE21728962D9FE91f46c337E171a1EB`
- **Functions**:
  - `addCandidate()` - Add new candidates
  - `getAllCandidates()` - Retrieve all candidates
  - `getWinners()` - Get election winners
  - `resetCandidates()` - Clear all data

### VoterPanel Contract
- **Address**: `0x7cdCF12a5fFdCCEDfF1A27eb3FA2D514f38a22C8`
- **Functions**:
  - `castVote(candidateID)` - Cast a vote
  - `checkIfVoted(voter)` - Check voting status
  - `hasVoted` - Mapping of voter addresses

### Security Features
- **Access Control**: Only authorized addresses can perform admin functions
- **Vote Validation**: Prevents double voting and invalid candidates
- **Immutable Records**: All votes permanently stored on blockchain
- **Gas Optimization**: Efficient contract design minimizes transaction costs

---

## 🔌 API Documentation

### Authentication Endpoints

```http
POST /api/user/register
POST /api/user/login
POST /api/user/verify-email
POST /api/user/refresh-token
GET  /api/user/me
```

### Admin Endpoints

```http
POST /api/admin/login
GET  /api/admin/voting-status
POST /api/admin/voting-status/toggle
```

### File Upload

```http
POST /upload
```

For complete API documentation, visit: [https://blockchainvoting-z1xf.onrender.com/api-docs](https://blockchainvoting-z1xf.onrender.com/api-docs)

---

## 🚀 Deployment

### Frontend (Vercel)

1. **Connect Repository** to Vercel
2. **Set Environment Variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

### Backend (Render)

1. **Create Web Service** on Render
2. **Connect Repository** and set build commands:
   ```bash
   npm install
   ```
3. **Set Start Command**:
   ```bash
   npm start
   ```
4. **Configure Environment Variables**

### Smart Contracts (Ethereum)

Contracts are deployed on Sepolia testnet. To deploy new versions:

```bash
cd Ethereum
truffle migrate --network sepolia --reset
```

---

## 🔒 Security

### Implemented Security Measures

- **JWT Authentication** with secure token rotation
- **Password Hashing** using bcrypt with salt
- **Input Validation** on all forms and API endpoints
- **CORS Protection** with whitelist origins
- **Rate Limiting** to prevent abuse
- **SQL Injection Prevention** through parameterized queries
- **XSS Protection** with content sanitization
- **HTTPS Enforcement** in production
- **Blockchain Immutability** for vote integrity

### Best Practices

- Regular security audits of smart contracts
- Environment variable protection
- Database encryption at rest
- Secure communication protocols
- Multi-factor authentication ready
- Comprehensive logging and monitoring

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code style and conventions
- Write comprehensive tests for new features
- Update documentation for any API changes
- Ensure all tests pass before submitting PR
- Use clear, descriptive commit messages

### Areas for Contribution

- 🐛 Bug fixes and security improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🧪 Test coverage expansion
- 🎨 UI/UX improvements
- 🌐 Internationalization support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**QuickVote Team**

- **Website**: [https://quickvote-blockchain.vercel.app/](https://quickvote-blockchain.vercel.app/)
- **Email**: quickvote450@gmail.com
- **Location**: Itahari, Sunsari, Nepal
- **Phone**: +977-9800000000

### Follow Us

- **Facebook**: [QuickVote Official](https://www.facebook.com/share/1EzbvPcRPT/?mibextid=wwXIfr)
- **Twitter**: [@quickvote450](https://x.com/quickvote450)
- **Instagram**: [@quickvote450](https://www.instagram.com/quickvote450/)

---

## 👥 Authors

<table>
<tr>
<td align="center">
<strong>Preeti Rajdhami</strong>
<br />
<em>Backend Developer</em>
<br />
<a href="https://github.com/Preetirajdhami">
<img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white" alt="GitHub"/>
</a>
</td>

<td align="center">
<strong>Manoj Shrestha</strong>
<br />
<em>Frontend Developer</em>
<br />
<a href="https://github.com/ManojScripts-dot">
<img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white" alt="GitHub"/>
</a>
</td>

<td align="center">
<strong>Sohit Sharma Tiwari</strong>
<br />
<em>UI/UX Designer</em>
<br />
<a href="https://github.com/MrSOHIT">
<img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white" alt="GitHub"/>
</a>
</td>
</tr>
</table>

---

## 🙏 Acknowledgments

- **Ethereum Community** for blockchain infrastructure
- **Next.js Team** for the amazing React framework
- **MongoDB** for reliable database services
- **Vercel** for seamless deployment platform
- **Open Source Contributors** who made this project possible
- **Our Users** who trust us with their democratic participation

---

<div align="center">
  <p><strong>Empowering Democracy Through Technology</strong></p>
  <p><em>From Itahari, Sunsari, Nepal 🇳🇵</em></p>
  
  <br>
  
  ⭐ **Star this repository if you found it helpful!** ⭐
  
  <br>
  
  <p>
    <strong>Join us in revolutionizing the future of voting!</strong>
  </p>
</div>