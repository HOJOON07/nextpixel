import { CSSPropertyFlexDirection } from "./styles.d";
import { type } from "os";

/**
 * Responsive 속성
 * CSS 속성값을 브레이크 포인트별로 설정할 수 있다.
 * T는 CSS 속성값의 타입
 */
export type ResponisveProp<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export type Responsive<T> = ResponisveProp<T>;

/**
 * Fles
 */

type SelfPosition =
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "self-end"
  | "self-start"
  | "start";

type ContentPosition = "center" | "end" | "flex-end" | "flex-start" | "start";

type ContentDistribution =
  | "space-around"
  | "space-between"
  | "space-evenly"
  | "stretch";

type CSSPropertyGlobals =
  | "-moz-initial"
  | "inherit"
  | "initial"
  | "revert"
  | "unset";

export type CSSPropertyAlignItems =
  | CSSPropertyGlobals
  | SelfPosition
  | "baseline"
  | "normal"
  | "stretch"
  | (string & {});

export type CSSPropertyAlignContent =
  | CSSPropertyGlobals
  | ContentDistribution
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "start"
  | "baseline"
  | "normal"
  | (string & {});

export type CSSPropertyJustifyItems =
  | CSSPropertyGlobals
  | SelfPosition
  | "baseline"
  | "left"
  | "legacy"
  | "normal"
  | "right"
  | "stretch"
  | (string & {});

export type CSSPropertyJustifyContent =
  | CSSPropertyGlobals
  | "nowrap"
  | "wrap"
  | "wrap-reverse";

export type CSSPropertyFlexDirection =
  | CSSPropertyGlobals
  | "column"
  | "column-reverse"
  | "row"
  | "row-reverse";

export type CSSPropertyJustifySelf =
  | CSSPropertyGlobals
  | SelfPosition
  | "auto"
  | "baseline"
  | "left"
  | "normal"
  | "right"
  | "stretch"
  | (string & {});

export type CSSPropertyAlignSelf =
  | CSSPropertyGlobals
  | SelfPosition
  | "auto"
  | "baseline"
  | "normal"
  | "stretch"
  | (string & {});

/**
 * Grid
 */

type GridLine = "auto" | (string & {});

export type CSSPropertyGridColumn =
  | CSSPropertyGlobals
  | GridLine
  | (string & {});

export type CSSPropertyGridRow = CSSPropertyGlobals | GridLine | (string & {});

export type CSSPropertyGridAutoFlow =
  | CSSPropertyGlobals
  | "column"
  | "dense"
  | "row"
  | (string & {});

export type CSSPropertyGridArea = CSSPropertyGlobals | GridLine | (string & {});
