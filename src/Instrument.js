import { Howl, Howler } from "howler";

export default function Instrument({ src }) {
  const sound = new Howl({
    src: [src],
  });
  return sound;
}
