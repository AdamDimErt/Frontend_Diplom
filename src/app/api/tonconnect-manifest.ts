/** @format */

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  res.status(200).json({
    url: "https://adamdim-2911717626d6.herokuapp.com",
    name: "Smart Home Store",
    iconUrl:
      "https://adamdim-2911717626d6.herokuapp.com/logo.png",
    termsOfUseUrl:
      "https://adamdim-2911717626d6.herokuapp.com/terms",
    privacyPolicyUrl:
      "https://adamdim-2911717626d6.herokuapp.com/privacy",
    bridgeUrl: "https://bridge.tonapi.io/bridge",
  });
}
