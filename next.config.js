/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // compiler: (() => {
  //   let compilerConfig = {
  //     styledComponents: true,
  //   };
  //   if (procee.env.NODE_ENV === "production") {
  //     compilerConfig = {
  //       ...compilerConfig,
  //       reactRemoveProperties: {
  //         properties: ["^data-testid&"],
  //       },
  //     };
  //   }
  //   return compilerConfig;
  // })(),
  compiler: (() => {
    let compilerConfig = {
      styledComponents: true,
    };
    if (process.env.NODE_ENV === "production") {
      compilerConfig = {
        ...compilerConfig,
        reactRemoveProperties: {
          properties: ["^data-testid$"],
        },
      };
    }
    return compilerConfig;
  })(),
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match*`,
      },
    ];
  },
};

module.exports = nextConfig;
