import express, { Express } from "express";

const app: Express = express();

import checkBTCBalance from "./routes/checkBTCBalance";
import sign from "./routes/sign";
//tb1qd5f0574r3mghfglmvlpfmknquarjw20r9mwm4v

app.use("/api/check-btc-balance", checkBTCBalance);
app.use("/api/sign", sign);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));