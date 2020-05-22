import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import HeroBar from '../components/HeroBar'
import AboutMe from '../components/AboutMe'
import SocialBar from '../components/SocialBar'

const IndexPage = () => (
  <Layout>
    <SEO />
    <HeroBar />
    <SocialBar />
    <AboutMe />
  </Layout>
)

export default IndexPage
