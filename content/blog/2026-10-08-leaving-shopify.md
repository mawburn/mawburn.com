---
title: 'Looking back at more than 5 years at Shopify'
date: '2026-10-08 14:30'
excerpt: "Looking back at nearly 5½ years at Shopify, from building the Checkout Editor to bringing LibreChat to thousands of employees, and the incredible engineers I worked alongside. It's made me realize just how much I accomplished, how much I'd forgotten, and why I wish I'd been writing it all down along the way."
tags: ['Shopify', 'engineering career', 'personal journey', 'developer experience']
---

After nearly 5½ years at Shopify, my time came to a close in August 2026. The longest I've ever spent at any company.

Since August, I’ve taken some time to decompress, reflect on what I want to do next, and enjoy having a real break for the first time in a long while.

One thing I didn't expect was just how much of my own work I'd forgotten. I'm talking about things I spent months building, things seen by hundreds of millions of people, that I'd almost completely forgotten I had anything to do with.

Which is just kind of insane to me. After all, I'm just a dude who went to a small school in Southern Arkansas at the same college my dad graduated from in 1985.

And the more I look back, the more surreal the whole experience feels. There were plenty of "wow, that's cool!" moments while I was there, but I don't think I fully appreciated the scale of everything until I left.

I spent about 4 years on Checkout, watching it grow from a relatively small group into a full blown org with more than a hundred people, possibly even more by now. I worked specifically in Checkout Extensibility, where we built the systems developers use to customize and extend Shopify's "New Checkout Experience."

My very first project was adding support for [metafields](https://help.shopify.com/en/manual/custom-data/metafields) to the actual checkout page. Something that, at the time, I honestly didn't really understand the significance of. I was new to ecommerce, and suddenly I was working on a core part of one of the fastest growing companies in the world.

Looking back, I realize how important that work actually was. Metafields let merchants and developers work with custom data that Shopify doesn't provide out of the box, and making that data available in checkout opened up possibilities for integrations, extensions, and features specific to individual merchants.

Then for nearly 3 of those years, I was one of three core members of the team building the Checkout Editor, where I helped shape its technical direction by designing systems, architecture, and patterns that were adopted by other teams integrating their own systems into the editor. I joined the project when it was still a scrappy proof-of-concept, and was there through its launch and growth into a major production application. All of it designed to be maintainable for the long term, capable of supporting the unknown, and able to accommodate growing complexity without becoming unmanageable.

I drove decisions around iframe sandboxing and communication, frontend state management and its later migration to a new approach standardized by the org, Shop Pay integration, and countless others.

Recently, I went back and watched some of the videos from [Shopify Editions: Winter ’23](https://www.youtube.com/watch?v=98QZKeeYz5M) and [Winter ’24](https://www.youtube.com/watch?v=pW1L3iKNpA0) and it was absolutely wild. It's hard to remember all the things you did on a project that large and how much of an influence you personally had on it while surrounded by some of the best engineers in the world, until you see something like that. There are things in those videos that I spent months on, where I had to change the core underlying systems we built just to accommodate an odd quirk of a new requirement... and I had completely forgotten about it.

Then when AI hit big and Shopify became one of the early adopters, I jumped into it quickly. After running into limitations with our internal chat tools, I tried nearly every open source alternative I could find and even started building my own before finding [LibreChat](https://www.librechat.ai). I made the case internally that Shopify should switch to it, then drove the deployment and largely kept it running in my free time while I was still on Checkout.

This was later mentioned by [Tobi Lütke](https://x.com/tobi/) in the viral internal email he posted publicly in 2025, [“Reflexive AI usage is now a baseline expectation at Shopify.”](https://x.com/tobi/status/1909231499448401946) In it, he said: “There is `chat.shopify.io`, which we had for years now.” That was the LibreChat application I had driven the deployment of and largely kept running in my free time, and it was used by thousands of employees across the company.

Later on, that application found a home under a new org within the company and I moved over to the "Augmented Engineering" team, later renamed to simply "Dev AI." That LibreChat team grew to seven people. We collectively made significant contributions upstream, and I personally worked on some of LibreChat's core performance improvements. Even all of that barely scratched the surface of what we had designed internally.

I wrote [another blog post about how that happened](https://mawburn.com/blog/2025-06-03-shopify-ai-chat), which was picked up by several publications and eventually earned me a quote in [ClickHouse's announcement of its acquisition of LibreChat](https://clickhouse.com/blog/clickhouse-acquires-librechat). Which, I obviously thought was really cool.

One of the nastier problems I worked on was MCP reconnection storms, where a single server having a bad day could cause reconnection attempts to spiral out of control across users. At one point, we had an incident that generated over 280,000 log lines in a single minute. Which, as you can probably imagine, generated a whole lot of alerts and alarms going off everywhere, triggered by our observability tooling. And the logs were only a symptom. Those runaway reconnections were spiking CPU usage and were more or less taking down the entire LibreChat application, not just the server that was having problems.

I tracked down a bunch of issues that were feeding into each other and implemented safeguards like throttling, circuit breakers, exponential backoff, and fixes to OAuth reconnection at the MCP connection level. Then I pushed those changes into the open source repo ([PR](https://github.com/LibreChat-AI/LibreChat/pull/12162)), so that nobody else would have those issues like we did in the future.

Now, if you're a non-technical person reading this and thinking "I have no idea what any of that means," then you actually still caught the gist of it. It hurt my brain too. I'm right there with you. I'm not going to tell you it was exceptionally complicated, but it certainly was a lot.

On the frontend side, I also worked on how LibreChat handles chat configurations in URLs ([PR](https://github.com/danny-avila/LibreChat/pull/7151)), allowing users to share or bookmark specific model configurations. Along the way, I fixed a race condition that could cause a prompt to be sent using the default model instead of the one specified in the URL. This specific contribution was actually requested by Tobi directly.

Two very different problems, but I think that's a pretty good example of the range of work I was doing there.

That's just a little bit of what I did. I am glossing over so much it just blows my mind. I really do need to sit down and catalog it to preserve it for the future.

The fact that I spent five and a half years at a company that became a household name while I was there, working on the most visible part of the entire platform alongside some of the best engineers in the world, is absolutely insane to me.

And I do mean some of the best engineers in the world. Here's the first time it really hit me.

I was reading a [web.dev](https://web.dev/) blog post about HTTP/2 when I noticed the core author was at the company in my org. While I didn't work with him directly, he did substantial work in Checkout. Then I noticed the co-author, so I clicked him, and realized "oh, I work with him too! That's not going to help my imposter syndrome, is it?"

Hell, even though I didn't work with him, I spent a good bit of time chatting with [Mike Shaver](https://en.wikipedia.org/wiki/Mike_Shaver) about our shared TTRPG hobby, specifically solo-TTRPGs. He was on Netscape's early JavaScript team back in the '90s and went on to become one of Mozilla's founding members. This is a person who kind of shaped my whole career and by proxy, my life, who I got to spend time with chatting about a dorky little side hobby of what amounts to silly little writing prompts.

Sometimes I would find myself chatting with someone about something, whether technical or a hobby, then go to add them on LinkedIn and sometimes be met with an "oh crap" moment when I realize they were someone who was highly influential in some way or another.

I'm an extrovert, what can I say? I like to chat.

All of that, the people, the projects, the scale, is why it still seems nuts to me that this is where I ended up and at this period of time.

I went to a no-name school in Arkansas. My best option for paying for college was joining the Army National Guard, which ended up taking me all the way to Baghdad, Iraq, between my sophomore and junior years.

I **certainly** never expected to end up working alongside people whose work had already influenced so much of my life. Working right alongside them, solving complicated problems and making incredibly impactful decisions on software used by millions of people.

I think a lot of it comes down to how much I love engineering. Helping people do things, solving complex, ambiguous problems, and building things that actually get used. Since that's how I landed the job in the first place, after all.

A manager I had during my time on LibreChat, Daniel ([his blog](https://code.dblock.org/about/)), actually convinced me to write my original "AI Chat" blog post, and I wish I'd kept it up. More importantly, I wish I'd been doing more of this all along, even before Shopify. If I'd documented those first few months on the Checkout Editor, the problems I ran into along the way, and then kept writing after the AI Chat post, I'd have a much better record of what I've accomplished and how I've grown as an engineer and a person.

As I write this, I don't know where or what I'm going to do with the next phase of my career. I needed this time off, I really did. I've been doing this for 15 years now, over 20 if you count college considering I hopped over to the Middle East for a bit in the middle of my studies.

But hopefully, I can find a company doing something cool, with a strong engineering culture, solving some interesting problem or creating some interesting tool/app/system/AI Robot Overlord, and I'll be able to contribute something more to the world.

...maybe this time I'll actually write some of it down before I forget half of what I did.
