import { makeFontComponent } from "../../../util/css";

export const Carattere = {
  fontFamily: `'Carattere', cursive`,
  load: makeFontComponent(__dir.filesByName['carattere.css']!),
};
