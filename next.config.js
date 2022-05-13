const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
]

module.exports =  {
      reactStrictMode: true,
      images: {
        domains: ["rozaviht-media.s3.eu-west-3.amazonaws.com"]
      },
      webpack(config) {
        const fileLoaderRule = config.module.rules.find(
          (rule) => rule.test && rule.test.test('.svg')
        )
        fileLoaderRule.exclude = /\.svg$/
        config.module.rules.push({
          test: /\.svg$/,
          loader: require.resolve('@svgr/webpack')
        })
        return config
      },
      async headers() {
        return [
          {
            source: '/:path*',
            headers: securityHeaders
          }
        ]
      },
}
