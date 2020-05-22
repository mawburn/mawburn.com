import React from 'react'

import MyImage from '../MyImage'

import Color from '../Color'

import s from './styles.module.scss'

const AboutMe = () => (
  <article className={s.about}>
    <p>
      My name is Matt and I'm a software engineer who likes building stuff for
      the web. My main passion is <Color>JavaScript</Color> sweetened up with
      some tasty <Color>TypeScript</Color> sugar and building things that users
      get to see and touch, but I'm well rounded in full stack development with{' '}
      <Color name="node">Node.js</Color>, <Color>Java</Color>, <Color>Go</Color>
      , <Color name="csharp">C#</Color>, and experience in a variety of other
      languages. I'm also on board the{' '}
      <a href="https://deno.land">
        <Color>Deno</Color>
      </a>{' '}
      hype train, but it still needs to mature a bit before I'd be comfortable
      using it for real.
    </p>
    <hr />
    <p>
      I've written a few articles but it's nothing I do regularly. Mostly for
      SitePoint because I had some friends who freelanced for them.
    </p>
    <ul className={s.articles}>
      <li>
        <p>
          <a href="https://www.sitepoint.com/essential-sublime-text-javascript-plugins/">
            10 Essential Sublime Text Plugins for JavaScript Developers (2015)
          </a>
        </p>
        <p>Updated: 2018</p>
        <p>#1 on Google for the phrase "Sublime JavaScript" from 2015-2019</p>
        <p className={s.caveat}>
          I've since found the glory that is Visual Studio Code
        </p>
      </li>
      <li>
        <a href="https://www.sitepoint.com/an-introduction-to-jsx/">
          An Introduction to JSX (2017)
        </a>
        <p>
          Written as part of their "Quick Tip" series and meant to be short and
          light on technical stuff.
        </p>
      </li>
      <li>
        <a href="https://www.sitepoint.com/author/mburnett" rel="nofollow">
          Then a couple more on my SitePoint profile (2016)
        </a>
        <p>
          A couple jQuery based articles I updated in 2016 because they had a
          lot of traffic. I think both were originally written in 2011 by other
          people.
        </p>
      </li>
    </ul>

    <hr />
    <p>
      This page was totally over-engineered using{' '}
      <a className={s.gatsby} href="https://www.gatsbyjs.org/">
        <Color>Gatsby.js</Color>
      </a>{' '}
      and then hosted on{' '}
      <a className={s.netlify} href="https://www.netlify.com/">
        <Color>Netlify</Color>
      </a>
      , because they're just awesome.
    </p>
    <MyImage />
  </article>
)

export default AboutMe
