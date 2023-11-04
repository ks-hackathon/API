import { Curve, CurveName, Point } from "@cypherlab/types-ring-signature";
import { modulo } from "@cypherlab/types-ring-signature/dist/src/utils";
import { SignPayload } from "../src/routes/sign";

const message = "0x1234";

const secp256k1 = new Curve(CurveName.SECP256K1);

const ring = [
  new Point(
    secp256k1,
    [
      BigInt(65635616549041115910492749811099163290387315428114550455346908809100510426782),
      BigInt(30888767950022954707871982847285169392037268134002841607619046758134896439539)
    ]
  ),
  new Point(
    secp256k1,
    [
      BigInt(26978617571988867303429540461406656496036492562554075931365823092839011889373),
      BigInt(50038004826647663184375237364755049221543971914508636411038605315417494040790)
    ]
  ),
]

const signerPrivKey = modulo(BigInt(75694273895265887873804843930965748174179121845378990244230691197634719341994), secp256k1.N);

const fmRing: [string, string][] = [];
for (let i = 0; i < ring.length; i++) {
  fmRing.push([ring[i].x.toString(), ring[i].y.toString()]);
}

const body: SignPayload = {
  ring: fmRing,
  message: message,
  privKey: signerPrivKey.toString(),
}

//fetch to localhost:3000
// fetch("http://localhost:3000/api/sign/", {
fetch("http://176.146.201.74:3000/api/sign/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
}).then((res) => {
  res.json().then((data) => {
    console.log(data);
  });
}).catch((err) => {
  console.log(err);
});