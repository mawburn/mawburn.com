import clsx from 'clsx'
import Head from 'next/head'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import config from '../../lib/config'
import styles from '../../styles/util.module.scss'

import type { NextPage } from 'next'
import Link from 'next/link'

const GM: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Game Master Stuff - {config.title}</title>
    </Head>
    <Header />

    <main className={clsx(styles.main)}>
      <section>
        <h2>Game Mastering</h2>
        <div style={{ textAlign: 'center' }}>
          <Link href="/gm/rules">My GM Rules</Link>
        </div>
        <blockquote>
          <u>
            <strong>Definition</strong> (
            <a href="https://en.wikipedia.org/wiki/Gamemaster" rel="noopener">
              wikipedia
            </a>
            ):
          </u>
          <br />
          <span style={{ display: 'inline-block', paddingLeft: '2ch', paddingTop: '0.5rem' }}>
            A
          </span>{' '}
          gamemaster{' '}
          <em>
            (GM; also known as dungeon master, game master, game manager, game moderator, referee,
            or storyteller)
          </em>{' '}
          is a person who acts as an organizer, officiant for regarding rules, arbitrator, and
          moderator for a multiplayer role-playing game. They are more common in co-operative games
          in which players work together than in competitive games in which players oppose each
          other. The act performed by a gamemaster is sometimes referred to as “Gamemastering” or
          simply “GMing”.
        </blockquote>
        <p>
          Basically, a <strong>Game Master</strong>{' '}
          <em style={{ fontWeight: 'lighter', fontSize: '0.95rem' }}>
            (or Dungeon Master if you’re playing Dungeons &amp; Dragons)
          </em>{' '}
          is the person who runs a tabletop roleplaying game. They are the person who makes the core
          story, role plays multiple non-player characters, throws things at the players, prepares a
          game session, organizes game sessions, knows most of the rules &amp; nuances of the
          setting or game system, &amp; tries to create a great experience for the players. And it’s
          a hell of a a lot of <strong>fun</strong>! Game Masters are just another player at the
          table even though they are playing <u>all</u> the antagonists, they are still a fan of the
          players &amp; on their side.
        </p>
        <p>
          A game master is usually running a tabletop role playing game, like D&amp;D, but a game
          master can also run other types of board games, wargames, or any other tabletop game.
        </p>
        <p>
          I am happy to be a player or a game master, but being a game master is much more
          therapeutic for me. It’s not something I want to always do, but it’s something that
          scratches almost all my creative itches.
        </p>
        <ul className={styles.noStyleList}>
          <li>
            I’m not a great writer, but I can tell a good story. Being a GM lets me help tell a good
            story &amp; build a coherent world. (the players are just as involved!)
          </li>
          <li>
            I’m not a actor, but pretend &amp; improvise anyone even if it’s done badly &amp; I love
            doing voices.
          </li>
          <li>
            I’m not an artist, but painting minis &amp; building scale models to increase the
            immersion is really fun.
          </li>
          <li>
            I’m not comfortable public speaking, but being at the head of the table &amp;
            improvising new things off the top of my head as the players throw them at me really
            helps my anxiety with this.
          </li>
          <li>
            I’m not a game designer, but I understand good game mechanics &amp; how to make them
            fun. GMing lets me exercise this.
          </li>
          <li>
            I’m ambitious, but not an outgoing person or comfortable in crowded places, except I am
            an extrovert. (<em>technically</em> an{' '}
            <a href="https://www.dictionary.com/browse/ambivert" rel="noopener">
              {' '}
              I’m an ambivert.
            </a>
            )
          </li>
        </ul>
        <p>You get the idea.</p>
      </section>
      <section>
        <h2>Games I play and/or run</h2>
        <p>
          Dungeons &amp; Dragons is by far the most popular tabletop role playing game out there,
          but it’s not something I enjoy very much. I have played it &amp; would play it again, but
          I’d rather not play it given the choice. My tastes fluctuate a lot, so I am partial to{' '}
          <a href="https://en.wikipedia.org/wiki/Generic_role-playing_game_system" rel="noopener">
            generic systems
          </a>
          , so I can play a lot of different settings &amp; while still sticking to tested &amp;
          proven gaming mechanics.
        </p>
        <h3>My favorite systems and/or games</h3>
        <ol>
          <li>
            <a href="https://en.wikipedia.org/wiki/Savage_Worlds" rel="noopener">
              Savage Worlds
            </a>{' '}
            - Deadlands, Holler, 50 Fathoms, Crystal Heart, Wise Guys
          </li>
          <li>
            <a href="https://freeleaguepublishing.com/en/open-gaming-license/" rel="noopener">
              Year Zero Engine by Free League Publishing
            </a>{' '}
            - Mutant Year Zero, Vaesen, Alien, Coriolis
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Powered_by_the_Apocalypse" rel="noopener">
              Powered by the Apocalypse
            </a>{' '}
            - Fluxfall Horizon, Root RPG, Avatar Legends, Ironsworn/Starforged, Monster of the Week,
            Dungeon World, City of Mist
          </li>
          <li>
            <a
              href="https://www.drivethrurpg.com/browse/pub/10267/Gallant-Knight-Games/subcategory/26112_27017/TinyD6?affiliate_id=2703170"
              rel="nooopener"
            >
              TinyD6
            </a>{' '}
            - Tiny Wastelands, Tiny Dungeon, Tiny Frontiers
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Blades_in_the_Dark#Publication_history"
              rel="noopener"
            >
              Forged in the Dark
            </a>{' '}
            - Blades in the Dark, Wicked Ones, Scum &amp; Villainy, Copperhead County
          </li>
          <li>
            Fate, Call of Cthulhu, Delta Green, Dungeon Crawl Classics / Mutant Crawl Classics, 2D20
            games, etc.
          </li>
        </ol>
        <p>
          And lots of others. I’ll play just about anything at least once. I tend to gravitate more
          towards rules light, rather than “crunchy” games with a lot of rules. I feel like rules
          should help the game not be the game.
        </p>
      </section>
    </main>
    <Footer />
  </div>
)

export default GM
