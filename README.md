# **Blockchain Monitor**

Blockchain Monitor is a service designed to monitor blockchain transactions and specific events, such as ERC-20 token transfers. Users can set up alerts for specific addresses or tokens, and the system triggers notifications when conditions are met.

---

## **Features**

1. **User Authentication**:
   - Users can register and log in to manage their alerts.

2. **Transaction Monitoring**:
   - Tracks new transactions where a specified address is involved as the `from` address.

3. **ERC-20 Transfer Monitoring**:
   - Tracks transfers of specified ERC-20 tokens, with optional filters for `from` and `to` addresses.

4. **Multi-Chain Support**:
   - Built to support multiple blockchains, starting with Ethereum.

5. **Notifications**:
   - Triggers, stores, and displays notifications when alerts are matched.

---

## **Project Structure**

```
blockchain-monitor/
├── src/
│   ├── config/           # Database and app configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Authentication middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Monitoring and alert services
│   └── server.js         # App entry point
├── .env                  # Environment variables
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # Project documentation
```

---

## **Getting Started**

### **Prerequisites**
- Node.js (v16+)
- Docker
- PostgreSQL
- Infura or Alchemy API Key (for Ethereum RPC)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/blockchain-monitor.git
   cd blockchain-monitor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database using Docker:
   ```bash
   docker-compose up -d
   ```

4. Configure the `.env` file:
   ```plaintext
   PORT=3000
   DATABASE_URL=postgres://alert_user:password@localhost:5432/crypto_alerts
   EVM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID
   JWT_SECRET=your_jwt_secret
   ```

5. Run database migrations:
   ```bash
   docker exec -i blockchain-monitor-db psql -U alert_user -d crypto_alerts < src/config/db-init.sql
   ```

6. Start the server:
   ```bash
   node src/server.js
   ```

---

## **API Endpoints**

### **User Routes**
- **POST /users/register**: Register a new user.
- **POST /users/login**: Log in and receive a JWT token.

### **Alerts Routes**
- **POST /alerts/create**: Create a new transaction alert.
- **POST /alerts/create-erc20**: Create a new ERC-20 transfer alert.

### **Notifications Routes**
- **GET /notifications/:alertId**: Get notifications for a specific alert.

---

## **Contributing**

Contributions are welcome! Please submit a pull request with your changes.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
