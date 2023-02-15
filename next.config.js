const withLess = require('next-with-less');
/** @type {import('next').NextConfig} */
module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        // Add variables here
        'font-family': 'Quicksand, sans-serif',
        'border-radius-base': '50px',
      },
    },
  },
  compiler: {
    styledComponents: true,
  },
});
