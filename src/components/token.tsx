import React, { ImgHTMLAttributes } from "react";

type Token = "SOL" | "ETH";

const tokenMap: Record<Token, string> = {
  SOL: "sol.png",
  ETH: "eth.png",
};

interface TokenProps extends ImgHTMLAttributes<HTMLImageElement> {
  token: Token;
}

const TokenImage: React.FC<TokenProps> = ({ token, ...imgProps }) => {
  return (
    <img
      src={`/tokens/${tokenMap[token]}`}
      style={{ borderRadius: "100%" }}
      width="26px"
      height="26px"
      {...imgProps}
    />
  );
};

export default TokenImage;
