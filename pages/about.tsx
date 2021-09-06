import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Footer from '../components/Footer'
import Header from '../components/Header'
import config from '../lib/config'
import styles from '../styles/util.module.scss'

import type { NextPage } from 'next'
const About: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>About me - {config.title}</title>
    </Head>
    <Header />

    <main className={styles.main}>
      <section>
        <h2>Welcome stalkers!</h2>
        <p>
          First &amp; foremost I am a career driven person. I love what I do, I’m good at what I do,
          &amp; I want to get better at what I do. But because of that, I need a lot of release.
        </p>
        <p>
          I’ve worked in a ton of stuff over the years, starting out in{' '}
          <span className={styles.nobreak}>
            <Image src="/img/cf.webp" width={16} height={16} alt="ColdFusion" /> ColdFusion,
          </span>
          then to{' '}
          <span className={styles.nobreak}>
            <span className="icon-java" /> Java,
          </span>
          to{' '}
          <span className={styles.nobreak}>
            <span className="icon-react" /> React &amp; <span className="icon-javascript" />{' '}
            JavaScript,
          </span>
          to{' '}
          <span className={styles.nobreak}>
            <span className="icon-typescript" /> TypeScript,
          </span>
          with a little bit of{' '}
          <span className={styles.nobreak}>
            <span className="icon-csharp" /> C# &amp;
          </span>
          <span className={styles.nobreak}>
            <span className="icon-go" /> GoLang
          </span>
          in there too, I’ve even dabbled in a bit of{' '}
          <span className={styles.nobreak}>
            <span className="icon-scala" /> Scala,
          </span>
          but it’s been years. I am really looking forward to what{' '}
          <span className={styles.nobreak}>
            <a href="https://deno.land/" rel="noopener">
              <span className="icon-deno" /> Deno
            </a>
          </span>
          brings to the table &amp; have really high hopes for it, but haven’t messed around with it
          a ton myself. Now that I’m in a{' '}
          <span className={styles.nobreak}>
            <span className="icon-rails" /> Ruby on Rails
          </span>
          shop, I need to learn that soon. And when I have the choice,{' '}
          <span className={styles.nobreak}>
            <span className="icon-postgresql" /> PostgreSQL
          </span>
          is my go-to database, but I have been experimenting with GraphDBs lately.
        </p>
        <p>
          I’d prefer to not work without a{' '}
          <span className={styles.nobreak}>
            <span className="icon-apple" /> Mac
          </span>
          , but I could deal with Linux if I had to. Even though I love my Macs, I’m not a fan of
          iPhones &amp; have been a{' '}
          <span className={styles.nobreak}>
            <span className="icon-google" /> Google Pixel/Nexus
          </span>
          user since at least the Nexus 4.
        </p>
      </section>

      <section>
        <h2>Hobbies</h2>
        <p>
          So, like I said on the front page I have a ton of hobbies... probably too many in fact.
          I’ve done a good bit of backpacking, love playing board or card games, sometimes sculpt
          with clay, I make mini-terrain out of foam &amp; basically trash, paint minis, 3D
          printing, dabble in writing, trying to learn to draw again, I’m pretty good at PhotoShop
          but no professional, huge movie buff when it comes to quality or anything with an
          action/adventure vibe to it, same thing with TV but I am obsessed with most adult cartoons
          (Futurama, Rick &amp; Morty, American Dad, Invincible, etc.) or anything nerdy, comic
          books, fiction novels, &amp; the list goes on.
        </p>
        <p>
          Then I also like mixing in my love of technology &amp; coding skills in with all of these
          things. I am constantly spinning up a service, community, or at least doing some kind of
          Proof of Concept or something related to one of my hobbies. I ❤️ mentoring programmers
          when I can. I love to see people succeed &amp; feel like I’ve probably changed more than a
          few lives this way.
        </p>
        <p>
          Not to mention, I love just chatting with people in online communities like Slack,
          Discord, Reddit, or anywhere there is a place to chat.
        </p>
      </section>
      <section>
        <h2>Dabbled in Streaming &amp; the birth of hypnoCode</h2>
        <div className={styles.center}>
          <Image src="/img/hypnoCode-animated.webp" height={100} width={100} alt="hypnoToad gif" />
        </div>
        <p>
          For a while, I did a bit of{' '}
          <a href="https://www.twitch.tv/hypnocode" rel="noopener">
            <span className="icon-twitch" /> <strong>Twitch Streaming</strong>
          </a>
          , where I mostly streamed programming &amp; a little gaming, but that was mostly demoing
          my app.{' '}
          <a href="https://youtu.be/pI81UkjKbKA?t=30">
            Here’s a little clip from one of my streams where I died playing Albion Online while
            demoing one of my projects called Portaler.
          </a>{' '}
          This was pretty early on an my streaming quality picked up a lot before I quit. I picked
          up the name{' '}
          <Image src="/img/hypnoCode-animated.webp" height={20} width={20} alt="hypnoToad gif" />{' '}
          “hypnoCode” as a streaming name &amp; and have kept it for my main online screen name. My
          screen name “mawburn” still remains purely professional. You’ll usually find me online
          using this name most actively. Especially on{' '}
          <span className={styles.nobreak}>
            <a href="https://reddit.com/u/_hypnoCode" rel="noopener nofollow">
              <span className="icon-reddit" /> Reddit
            </a>
          </span>
          or{' '}
          <span className={styles.nobreak}>
            <span className="icon-discord" /> Discord as <code>hypnoCode#4242</code>.
          </span>
        </p>
        <p>
          The only reason I quit was because it was difficult with my daughter’s bedtime schedule
          which made me stream very late at night, when there are almost no viewers. I’d definitely
          like to get back to it, especially if I was able to play a TTRPG on stream.
        </p>
      </section>
      <section>
        <h2>Boardgames &amp; TTRPGs</h2>
        <details>
          <summary>Tabletop Role-Playing Games</summary>
          <div>
            Everyone’s heard of Dungeons &amp; Dragons, but what if I told you there are endless
            options out there! It’s just collective storytelling, nothing more.
          </div>
        </details>
        <figure className={styles.center}>
          <div className={styles.imgRounder}>
            <Image src="/img/table.jpg" width={200} height={200} alt="gaming table" />
          </div>
          <figcaption>My second child</figcaption>
        </figure>
        <p>
          I love playing &amp; hosting games at my house as well as at game shops. Board games have
          been a passion for a number of years &amp; is strong enough that I had a lovely custom
          built dining room table made that converts into a gaming table. My favorite games are{' '}
          <a href="https://amzn.to/3BJ7i1f" rel="noopener nofollow">
            Scythe
          </a>
          ,{' '}
          <a href="https://amzn.to/3n13LYe" rel="noopener nofollow">
            Here to Slay
          </a>
          ,{' '}
          <a href="https://amzn.to/3BKa5Y5" rel="noopener nofollow">
            Dice Throne
          </a>
          ,{' '}
          <a href="https://amzn.to/3n84jvo" rel="noopener nofollow">
            Sushi Go
          </a>
          , &amp; a few other good games. I just like good time with good friends &amp; good drinks.
        </p>
        <h3>TTRPGs</h3>
        <div className={clsx(styles.center, styles.spread)}>
          <Image src="/img/d4.webp" width={48} height={50} alt="d4" />
          <Image src="/img/d6.webp" width={44} height={50} alt="d6" />
          <Image src="/img/d8.webp" width={50} height={50} alt="d8" />
          <Image src="/img/d10.webp" width={50} height={50} alt="d10" />
          <Image src="/img/d20.webp" width={50} height={50} alt="d20" />
        </div>
        <p>
          Most recently I’ve dove head-first into the magical world of Tabletop Role-Playing Games
          &amp; other collective story-telling games. I started watching Wil Wheaton’s{' '}
          <a href="https://www.youtube.com/watch?v=YWn6b8vi-PY" rel="noopener nofollow">
            Titansgrave
          </a>{' '}
          actual play YouTube series way back in 2015, but didn’t make the leap myself until 2020.
          Mostly out of not knowing anyone to play with &amp; social anxiety.
        </p>
        <p>
          I fell in love! It mixes so many of my favorite things, like storytelling, mini-painting,
          board gaming, terrain building, &amp; getting together with friends to just sit around a
          table &amp; have fun with each other. Even if it’s a virtual table.
        </p>
        <p>
          Not only did I fall in love with the genre itself, I fell in love with being the Game
          Master... which has completely changed me as a person. It has helped me learn leadership
          skills, it has helped me get comfortable with talking in front of groups about things I
          have no idea about, &amp; it has let me scratch tons of creative itches I have outside of
          programming.{' '}
          <a
            href="https://www.reddit.com/r/happy/comments/p0fr6r/after_years_of_crippling_social_anxiety_i_ran_my/"
            rel="noopener"
          >
            Here is a post on Reddit
          </a>
          , with more pictures of my table &amp; me running my first game of{' '}
          <a
            href="https://www.drivethrurpg.com/product/319036/Deadlands-The-Weird-West?filters=1600_0_0_0_0?affiliate_id=2703170"
            rel="noopener nofollow"
          >
            Deadlands: The Weird West
          </a>
          .
        </p>
        <div className={styles.center}>
          <Image src="/img/savageworlds.webp" width={125} height={125} alt="Savage Worlds" />
        </div>
        <p>
          I dabbled a bit in Dungeons &amp; Dragons, but quickly realized I wasn’t a huge fan of the
          system nor the high fantasy genre so I started looking other places. After a bit of
          searching, I was introduced to <a href="https://amzn.to/3zQcRKT">Savage Worlds</a> &amp;
          made my home there. I still like other systems, like{' '}
          <a
            href="https://www.drivethrurpg.com/browse/pub/11437/Free-League-Publishing?affiliate_id=2703170"
            rel="noopener nofollow"
          >
            games by Free League Publishing
          </a>
          , &amp; others. But Savage Worlds is a great generic system. Deadlands: The Weird West is
          the original setting for Savage Worlds &amp; probably still one of the best. But the
          system can handle everything from Fantasy to Realism to SciFi &amp; and literally
          everything in between.
        </p>
        <p>
          On my <Link href="/projects">PROJECTS</Link> page, you’ll find 2 main projects I’ve
          started in this genre. The first is called{' '}
          <a href="https://agentsofsyn.com" rel="noopener">
            Agents of Syn
          </a>
          , which is a{' '}
          <a
            href="https://rpg.stackexchange.com/questions/120770/what-defines-a-west-marches-campaign"
            rel="noopener nofollow"
          >
            Living World or West Marches
          </a>{' '}
          style campaign set in the beautiful world of{' '}
          <a href="https://uptofourplayers.com" rel="noopener">
            Crystal Heart
          </a>
          , &amp; secondly a local gaming club called{' '}
          <a href="https://cltrpg.com" rel="noopener">
            The Carolina Roleplayers’ Society
          </a>
          , which I was able to secure the domain <strong>CLTRPG.com</strong>!
        </p>
      </section>
    </main>
    <Footer />
  </div>
)

export default About
