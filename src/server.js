const app = require('./app');
const BlockchainMonitorsManager = require('./services/blockchainMonitorsManager');

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Start the Blockchain Monitors Manager
  BlockchainMonitorsManager.monitorTransactions().catch((error) => {
    console.error('[MONITOR MANAGER ERROR] Failed to start:', error);
  });
});
