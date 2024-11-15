const axios = require('axios');

// Function to get logs from a transaction using Sepolia Etherscan API
async function getTransactionLogs(txHash, apiKey) {
  try {
    const response = await axios.get('https://api-sepolia.etherscan.io/api', {
      params: {
        module: 'logs',
        action: 'getLogs',
        txhash: txHash,
        apikey: apiKey
      }
    });

    if (response.data.status === '1') {
      return response.data.result;  // Return the logs
    } else {
      return `Error: ${response.data.message || response.data.result}`;
    }
  } catch (error) {
    console.error('Error fetching transaction logs:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Example usage
const txHash = '0x5d329954fae7d19b2fb9abf0e6862735243b1079c58e0ea307d7e933657ac083';  // Transaction hash
const apiKey = 'INDGXUFIYJHXJZ8IK5XD8HWCWMR3IYX9MF';  // Your Etherscan API key

getTransactionLogs(txHash, apiKey)
  .then(logs => console.log(logs))
  .catch(err => console.error('Caught error:', err));
