import base64url from "base64url";
import crypto from "crypto";
import readLine from "readline";

const clientId = process.argv[2];
const clientSecret = process.argv[3];
const codeVerifier = process.argv[4];
const redirectUri = process.argv[5];
const codeChallenge = base64url(
  crypto.createHash("sha256").update(codeVerifier).digest()
);

const clean = {
  redirectUri: encodeURIComponent(redirectUri),
  codeChallenge: encodeURIComponent(codeChallenge),
  codeVerifier: encodeURIComponent(codeVerifier),
  clientSecret: encodeURIComponent(clientSecret),
};

console.log(
  `\nOpen https://sandboxapp.gaidge.com/api/v1/connect/authorize?client_id=${clientId}&response_type=code&code_challenge=${clean.codeChallenge}&code_challenge_method=S256&scope=openid%20email%20profile%20offline_access&redirect_uri=${clean.redirectUri}\n`
);

const readlineInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readlineInterface.question("Provide the returned code: ", (code) => {
  console.log(
    `\ncurl -d "code=${code}&grant_type=authorization_code&client_id=${clientId}&code_verifier=${clean.codeVerifier}&client_secret=${clean.clientSecret}&redirect_uri=${clean.redirectUri}" -X POST https://sandboxapp.gaidge.com/api/v1/connect/token\n`
  );
  readlineInterface.close();
});
