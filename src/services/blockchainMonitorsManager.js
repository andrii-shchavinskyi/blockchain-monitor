const Blockchain = require('../models/blockchainModel');
const Alert = require('../models/alertModel');
const EVMMonitor = require('./evmMonitor');

const BlockchainMonitorsManager = {
  monitorTransactions: async () => {
    console.log(`[MANAGER START] Multi-chain monitoring started at ${new Date().toISOString()}`);

    const blockchains = await Blockchain.getAll();
    const alerts = await Alert.getAllAlerts();

    blockchains.forEach((chain) => {
      const chainAlerts = alerts.filter((alert) => alert.blockchain_id === chain.id);

      if (chain.type === 'evm') {
        EVMMonitor.monitorTransactions(chain, chainAlerts);
      } else {
        console.log(`[MONITOR UNSUPPORTED] Unsupported chain type for ${chain.name}`);
      }
    });

    console.log(`[MANAGER END] Multi-chain monitoring initialization completed.`);
  },
};

module.exports = BlockchainMonitorsManager;
