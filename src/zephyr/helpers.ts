import * as StellarSdk from "@stellar/stellar-sdk";

export const parseScvalValue = (value: any) => {
  const scval = StellarSdk.xdr.ScVal.fromXDR(value, "base64");
  return StellarSdk.scValToNative(scval);
};

export const parseMercuryScvalResponse = (data: any) => {
  return data.map((d: any) => {
    let n: any = {};

    for (let key in d) {
      const value = parseScvalValue(d[key]);

      if (typeof value === "bigint" || typeof value === "number") {
        n[key] = value.toString();
      } else {
        n[key] = value;
      }
    }

    return n;
  });
};
