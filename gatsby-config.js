module.exports = {
  siteMetadata: {
    title: `mawburn.com`,
    description: `Matt Burnett`,
    author: `@mawburn_`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        modules: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`oswald\:500,700`, `montserrat\:700`],
        display: "swap",
      },
    },
  ],
}
