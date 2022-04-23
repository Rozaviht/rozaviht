const { PHASE_DEVELOPMENT_SERVER} = require('next/constants')

module.exports = (phase, {defaultConfig}) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      reactStrictMode: true,
      images: {
        domains: ["rozaviht-media.s3.eu-west-3.amazonaws.com"]
      }
    }
  }

  return {
    /* config options for all phases except development here */
    reactStrictMode: true,
    images: {
      domains: ["rozaviht-media.s3.eu-west-3.amazonaws.com"]
    }
  }
}