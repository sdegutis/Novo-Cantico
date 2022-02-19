import { makeFontComponent } from "../../../util/css";

export const DavidLibre = {
  fontFamily: `'David Libre', serif`,
  load: makeFontComponent(__dir.filesByName['david-libre.css']!),
};
