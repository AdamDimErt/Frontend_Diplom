/** @format */

import { useEffect, useRef } from "react";
import { TonConnectUI } from "@tonconnect/ui";

export const useTonConnect = () => {
  const tonRef = useRef<TonConnectUI | null>(null);

  useEffect(() => {
    const init = () => {
      const root = document.getElementById("ton-connect");

      if (root && !tonRef.current) {
        try {
          tonRef.current = new TonConnectUI({
            manifestUrl: "/tonconnect-manifest.json",
            buttonRootId: "ton-connect",
          });
        } catch (e) {
          console.warn("TON Connect init error", e);
        }
      } else if (!root) {
        setTimeout(init, 100);
      }
    };

    init();
  }, []);

  return tonRef;
};
