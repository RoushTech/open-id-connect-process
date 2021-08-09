import base64url from "base64url";
import crypto from "crypto";
import readLine from "readline";

const clientId = process.argv[2];
const clientSecret = process.argv[3];
const codeVerifier = process.argv[4];
const codeChallenge = base64url(
  crypto.createHash("sha256").update(codeVerifier).digest()
);

console.log(
  `\nOpen https://sandboxapp.gaidge.com/api/v1/connect/authorize?client_id=${clientId}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256\n`
);

const readlineInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readlineInterface.question("Provide the returned code: ", (code) => {
  console.log(
    `\ncurl -d "code=${code}&grant_type=authorization_code&client_id=${clientId}&code_verifier=${codeVerifier}&client_secret=${clientSecret}" -X POST https://sandboxapp.gaidge.com/api/v1/connect/token\n`
  );
  readlineInterface.close();
});
