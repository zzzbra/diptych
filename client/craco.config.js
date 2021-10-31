// const path = require('path');

module.exports = {
  // TODO - debug following this guide: https://dev.to/bybruno/configuring-absolute-paths-in-react-for-web-without-ejecting-en-us-52h6
  // webpack: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src/'),
  //   },
  // },
  // jest: {
  //   configure: {
  //     moduleNameMapper: {
  //       '^@(.*)$': '<rootDir>/src$1',
  //     },
  //   },
  // },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
