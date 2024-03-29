// @ts-ignore
// import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import React from "react";
import { theme } from "./../src/themes/index";
import type { Preview } from "@storybook/react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import * as NextImage from "next/image";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    decorators: [
      (Story) => (
        <ThemeProvider theme={theme}>
          <Story></Story>
        </ThemeProvider>
      ),
    ],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const GlobalStyles = createGlobalStyle`
html,
body,
textarea{
  padding: 0;
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
*{
  box-sizing: border-box;
}
a{
  text-decoration: none;
  transition: .25s;
  color: #000000;
}
`;

// export const decorators = [
//   withThemeFromJSXProvider({
//     Provider: ThemeProvider,
//     themes: theme,
//     GlobalStyles,
//   }),
// ];

// const OriginalNextImage = NextImage.default;

// Object.defineProperty(NextImage, "default", {
//   configurable: true,
//   //@ts-ignore
//   value: (props) =>
//     typeof props.src === "string" ? (
//       <OriginalNextImage {...props} blurDataURL={props.src}></OriginalNextImage>
//     ) : (
//       <OriginalNextImage {...props}></OriginalNextImage>
//     ),
// });

export default preview;
