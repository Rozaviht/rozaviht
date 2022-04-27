export const reactStrictMode = true
export const images = {
  domains: ["rozaviht-media.s3.eu-west-3.amazonaws.com"]
}
export function webpack(config) {
  const fileLoaderRule = config.module.rules.find(
    (rule) => rule.test && rule.test.test('.svg')
  )
  fileLoaderRule.exclude = /\.svg$/
  config.module.rules.push({
    test: /\.svg$/,
    loader: require.resolve('@svgr/webpack')
  })
  return config
}
  

