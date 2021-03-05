import React from 'react'

import MyImage from '../MyImage'

import Color from '../Color'

import Cloudflare from '../Cloudflare'

import s from './styles.module.scss'

const AboutMe = () => (
  <div className={s.about}>
    <article>
      <p>
        My name is Matt and I'm a software engineer who likes building stuff for
        the web. My main passion is <Color>JavaScript</Color> sweetened up with
        some tasty <Color>TypeScript</Color> sugar and building things that
        users get to see and touch, but I'm well rounded in full stack
        development with <Color name="node">Node.js</Color>, <Color>Java</Color>
        , <Color>Go</Color>, <Color name="csharp">C#</Color>, and experience in
        a variety of other languages. I'm also on board the{' '}
        <a href="https://deno.land">
          <Color>Deno</Color>
        </a>{' '}
        hype train, but it still needs to mature a bit before I'd be comfortable
        using it for real.
      </p>
    </article>
    <section>
      <p>
        My <Color>COVID</Color> lockdown project has been an open source project
        called{' '}
        <a href="https://portaler.zone" className={s.portalerLink}>
          <Color>Portaler</Color>
        </a>
        . Portaler is a collaborative mapping tool and the number one of its
        kind for the game Albion Online. In about 3 months after I launched, it
        started receiving about 15,000 monthly active users according to
        Cloudflare metrics. Which, I believe is a fairly heavy chunk of the
        game's active players .
      </p>
      <Cloudflare />
      <p>
        The project is written entirely in <Color>TypeScript</Color> using{' '}
        <Color>Node</Color> & <Color>React</Color>.
      </p>
      <ul>
        <li>
          The repo can be found here:{' '}
          <a href="https://github.com/Portaler-Zone/portaler-core">
            github.com/Portaler-Zone/portaler-core
          </a>
        </li>
        <li>
          You can find the main site here:{' '}
          <a href="https://portaler.zone">Portaler.zone</a>
        </li>
        <li>
          But the real action is at either{' '}
          <ul>
            <li>
              On the curated version done by volunteers here:{' '}
              <a href="https://map.portaler.zone">map.portaler.zone</a>
            </li>
            <li>
              Or you can demo it by joining my <Color>Discord</Color> server
              linked on both of the other links and then going to{' '}
              <a href="https://public.portaler.zone">public.portaler.zone</a>
            </li>
          </ul>
        </li>
      </ul>
      <p>
        As far as tech goes, it's just a simple crud app, due to rules set by
        the game's owners all user input is manual. It's run on less than &lt;
        $30 a month of hardware with <strong>plenty</strong> of room to grow.
      </p>
      <p>
        As of this writing, it doesn't use a GraphDB, but it definitely should
        and that's probably coming soon, ...or websockets (if you couldn't tell
        by the insane number of requests it runs off a heartbeat).
      </p>
      <p>
        Here you can see a{' '}
        <a href="https://twitch.tv/hypnoCode">
          <Color>Twitch</Color>
        </a>{' '}
        stream of me using it & ultimately dying in the process.
      </p>
      <div className={s.youtubeContainer}>
        <iframe
          loading="lazy"
          title="First Death - Portaler Mapping"
          className={s.youtube}
          src="https://www.youtube.com/embed/pI81UkjKbKA?start=7"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </section>
    <section>
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
            Written as part of their "Quick Tip" series and meant to be short
            and light on technical stuff.
          </p>
        </li>
        <li>
          <a href="https://www.sitepoint.com/author/mburnett" rel="nofollow">
            Then a couple more on my SitePoint profile (2016)
          </a>
          <p>
            A couple jQuery based articles I updated in 2016 because they had a
            lot of traffic. I think both were originally written in 2011 by
            other people.
          </p>
        </li>
      </ul>
    </section>
    <section>
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
    </section>
  </div>
)

export default AboutMe
