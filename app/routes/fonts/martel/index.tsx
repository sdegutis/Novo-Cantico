import { makeFontComponent } from "../../../util/css";

export const Martel = {
  fontFamily: `'Martel', serif`,
  load: makeFontComponent(__dir.filesByName['martel.css']!),
};
