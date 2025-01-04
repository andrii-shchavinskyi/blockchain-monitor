const { ethers } = require('ethers');
const Notification = require('../models/notificationModel');
require('dotenv').config();

const EVMMonitor = {
  monitorTransactions: async (chain, alerts) => {
    console.log(`[EVM MONITOR] Starting block-by-block polling for ${chain.name}`);
    const provider = new ethers.JsonRpcProvider(process.env.EVM_RPC_URL);

    let lastProcessedBlock = await provider.getBlockNumber();

    const pollBlocks = async () => {
        try {
          const currentBlock = await provider.getBlockNumber();
      
          // Process all blocks between the last processed and the latest block
          for (let blockNumber = lastProcessedBlock + 1; blockNumber <= currentBlock; blockNumber++) {
            const block = await provider.getBlock(blockNumber);
      
            console.log(`[EVM MONITOR] Processing block: ${blockNumber} (${block.transactions.length} transactions)`);
      
            for (const txHash of block.transactions) {
              const tx = await provider.getTransaction(txHash);
      
              alerts.forEach((alert) => {
                if (tx && (tx.from === alert.address || tx.to === alert.address)) {
                  console.log(`[ALERT TRIGGERED] Address: ${alert.address}, Transaction: ${tx.hash}`);
                  Notification.createNotification(alert.id, `Transaction detected: ${tx.hash} on ${chain.name}`);
                }
              });
            }
          }
      
          lastProcessedBlock = currentBlock; // Update the last processed block
        } catch (error) {
          console.error(`[EVM MONITOR ERROR]`, error);
        }
      };      

    // Poll every 5 seconds
    setInterval(pollBlocks, 20000);
  },
};

module.exports = EVMMonitor;
