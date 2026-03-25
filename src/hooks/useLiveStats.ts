import { useState, useEffect, useRef } from "react";

export interface LiveStats {
  priceEur: number | null;
  blockHeight: number | null;
  halfHourFee: number | null;
}

export function useFlash(value: unknown): boolean {
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value && value != null) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 500);
      prev.current = value;
      return () => clearTimeout(t);
    }
    prev.current = value;
  }, [value]);
  return flash;
}

export function useLiveStats(): LiveStats {
  const [priceEur, setPriceEur] = useState<number | null>(null);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [halfHourFee, setHalfHourFee] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = () =>
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur")
        .then((r) => r.json())
        .then((d) => setPriceEur(d.bitcoin.eur))
        .catch(() => {});

    const fetchBlock = () =>
      fetch("https://mempool.space/api/blocks/tip/height")
        .then((r) => r.text())
        .then((t) => setBlockHeight(parseInt(t, 10)))
        .catch(() => {});

    const fetchFees = () =>
      fetch("https://mempool.space/api/v1/fees/recommended")
        .then((r) => r.json())
        .then((d) => setHalfHourFee(d.halfHourFee))
        .catch(() => {});

    fetchPrice();
    fetchBlock();
    fetchFees();

    const priceInterval = setInterval(fetchPrice, 60_000);
    const blockInterval = setInterval(fetchBlock, 30_000);
    const feeInterval = setInterval(fetchFees, 30_000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(blockInterval);
      clearInterval(feeInterval);
    };
  }, []);

  return { priceEur, blockHeight, halfHourFee };
}
