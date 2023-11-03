import axios from 'axios';
import { Router, Request, Response, json } from 'express';

const router = Router();
router.use(json());
// Define the interface for the balance response
interface BalanceResponse {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
}

// Function to check if any address has a balance below the threshold
async function checkBalances(addresses: string[], threshold: number): Promise<boolean> {
  try {
    for (const address of addresses) {
      const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`;
      const response = await axios.get<BalanceResponse>(url);
      const balance = response.data.balance;
      console.log(`Address ${address} has a balance of ${balance}`);

      // Check if the balance is below the threshold
      if (balance < threshold) {
        console.log(`Address ${address} has a balance below the threshold: ${balance}`);
        return false;
      }
    }
    // If none of the addresses have a balance below the threshold
    return true;
  } catch (error) {
    console.error('An error occurred while fetching the balances:', error);
    throw error;
  }
}

// POST route to check balances
router.post('/', async (req: Request, res: Response) => {
  const { addresses, threshold } = req.body;

  // Validate the input
  if (!addresses || !threshold) {
    return res.status(400).json({ error: 'Addresses and threshold are required.' });
  }

  try {
    const allAboveThreshold = await checkBalances(addresses, threshold);
    if (allAboveThreshold) {
      res.status(200).json({ message: 'All addresses have balances above the threshold.', valid: true });
    } else {
      res.status(200).json({ message: 'One or more addresses have balances below the threshold.', valid : false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to check balances' });
  }
});

export default router;