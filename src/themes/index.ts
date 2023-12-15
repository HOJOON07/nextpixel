import { DefaultTheme } from "styled-components";
import colors from "./colors";
import fontSizes from "./fontSizes";
import letterSpacings from "./letterSpacing";
import lineHeights from "./lineHeight";
import space from "./space";

export const theme: DefaultTheme = {
  space,
  lineHeights,
  letterSpacings,
  fontSizes,
  colors,
} as const;
