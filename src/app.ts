import express, { Express } from "express";
import cors from "cors"; // Import the CORS package

const app: Express = express();

// Setup CORS
const corsOptions = {
  origin: 'https://near.org', // This should be the domain you want to allow connections from
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Use the CORS middleware with the specified options

import checkBTCBalance from "./routes/checkBTCBalance";
import sign from "./routes/sign";

app.use("/api/check-btc-balance", checkBTCBalance);
app.use("/api/sign", sign);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
