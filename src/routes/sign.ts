import { Curve, CurveName, RingSignature, Point } from '@cypherlab/types-ring-signature';
import { SignatureConfig } from '@cypherlab/types-ring-signature/dist/src/ringSignature';
import { Router, Request, Response, json } from 'express';
import { keccak256 } from "js-sha3";

const router = Router();
router.use(json());

export interface SignPayload {
  ring: [string, string][]; // [x, y][]
  message: string; // clear text message
  privKey: string; // user private key -> easier for poc
}

// POST route to check balances
router.post('/', async (req: Request, res: Response) => {
  const payload: SignPayload = req.body;

  // sign
  const config: SignatureConfig = {
    evmCompatibility: true,
  }
  const curve = new Curve(CurveName.SECP256K1);
  const signature = await RingSignature.sign(
    payload.ring.map((point) => {
      return new Point(curve, [BigInt(point[0]), BigInt(point[1])]);
    }),
    BigInt(payload.privKey),
    payload.message,
    curve,
    config
  );
    console.log(signature.responses);
  res.json({
    message: keccak256(payload.message),
    c: signature.c.toString(),
    responses: signature.responses.map((response) => response.toString()),
  });
});

export default router;