// atoms.ts
import { atom } from "recoil";

// eslint-disable-next-line no-undef
export const authorNameState = atom<string>({
  key: "authorNameState",
  default: "Anonymous", // Set a default value
});
