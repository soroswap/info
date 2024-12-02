import { Mercury } from "mercury-sdk";

export const getMercuryInstance = (network: "MAINNET" | "TESTNET") => {
  let backendEndpoint = null;
  let graphqlEndpoint = null;
  let email = null;
  let password = null;
  let apiKey = null;
  let jwt = null;

  if (network === "MAINNET") {
    email = process.env.MERCURY_EMAIL_MAINNET!;
    password = process.env.MERCURY_PASSWORD_MAINNET!;
    backendEndpoint = process.env.MERCURY_BACKEND_ENDPOINT_MAINNET!;
    graphqlEndpoint = process.env.MERCURY_GRAPHQL_ENDPOINT_MAINNET!;
    apiKey = process.env.MERCURY_API_KEY_MAINNET!;
    jwt = process.env.MERCURY_JWT_MAINNET!;
  } else {
    email = process.env.MERCURY_EMAIL_TESTNET!;
    password = process.env.MERCURY_PASSWORD_TESTNET!;
    backendEndpoint = process.env.MERCURY_BACKEND_ENDPOINT_TESTNET!;
    graphqlEndpoint = process.env.MERCURY_GRAPHQL_ENDPOINT_TESTNET!;
    apiKey = process.env.MERCURY_API_KEY_TESTNET!;
    jwt = process.env.MERCURY_JWT_TESTNET!;
  }

  return new Mercury({
    backendEndpoint,
    graphqlEndpoint,
    apiKey,
    jwt,
    shouldFetchApiKey: true,
  });
};
