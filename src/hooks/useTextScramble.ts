import { useState, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
const SCRAMBLE_SPEED = 30;
const RESOLVE_STAGGER = 40;

export function useTextScramble(text: string) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const chars = text.split("");
    const locked = new Array(chars.length).fill(false);

    chars.forEach((_, i) => {
      const timeout = setTimeout(() => {
        locked[i] = true;
      }, i * RESOLVE_STAGGER);
      timeoutsRef.current.push(timeout);
    });

    intervalRef.current = setInterval(() => {
      let allLocked = true;
      const next = chars.map((char, i) => {
        if (char === " ") return " ";
        if (locked[i]) return chars[i];
        allLocked = false;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplay(next.join(""));
      if (allLocked) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, SCRAMBLE_SPEED);
  }, [text]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setDisplay(text);
  }, [text]);

  return { display, scramble, reset };
}
