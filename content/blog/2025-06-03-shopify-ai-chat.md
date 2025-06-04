---
title: 'The Inside Story of How I Accidentally Became Responsible for Shopify’s Internal AI Chat'
date: '2025-06-03 16:00'
image: '2025-06-03-shopify-ai-chat.webp'
excerpt: 'What started as a personal quest to find a better open source AI chat interface after losing all my data became an unexpected journey into an AI subject matter expert Shopify. From evaluating tons of interfaces, to pushing commits upstream on weekends, here’s how I accidentally became the go-to person for our AI chat platform and learned that sometimes the best career moves are the ones you never planned.'
tags:
  [
    'Shopify',
    'AI tools',
    'ChatGPT alternatives',
    'internal tools',
    'engineering stories',
    'AI adoption',
    'developer experience',
  ]
---

In the beginning, Shopify was quick to move into AI tooling and soon after GPT-4 was launched, an open-source project called ChatBot UI v1 was deployed internally. At the time, this project worked great. It was fast, had no backend, and you could do things like save System Prompts and create custom saved prompts that you could reuse. I quickly became a power user, both here at work and in my personal life using the official UI.

But the open-source project had issues and development was “flaky” at best. The maintainer started working on a v2 and claimed it was no longer going to be open-source in favor of his SaaS option.

For me, personally, I thought v1 was still going great all the way until I had an issue with a corrupted proxy cert. The fix for that was clearing my entire browser cache, which should have been fine... but as it turned out, ChatBot UI was storing EVERYTHING in localStorage. So in one fell swoop, I lost months of chat history and dozens of carefully crafted prompts that I had saved.

Since I was interested in this anyway, I started experimenting with every 3rd party UI I could get my hands on. As it turned out, even as a power user using the API was significantly cheaper than using the official UI. I went through quite a few open-source projects and even started experimenting with creating my own. But, then I found [LibreChat](https://www.librechat.ai/).

At the time, LibreChat only had around 1-2k stars on GitHub and it was rough around the edges, but it had potential. But most importantly it was MIT licensed, quick to adopt features, didn’t rely on localStorage, and looked like it had a clear direction for the future.

So, I made a post on our internal blog sometime around Feb 2024 pitching the idea that we should switch to LibreChat, naming all the reasons I mentioned above. The post was fairly popular, but eventually a very high up person in leadership said LibreChat was the way to go and we should get it deployed. I was working on the Checkout team at the time, so his blessing gave me the leeway with my managers to take a few days to get it deployed on our infrastructure.

With the help of a developer and an infrastructure engineer, we were able to get something deployed with our internal deployment system. There were some challenges around it being a Node-based application with MongoDB as a database, but we got it done. The developer implemented custom authentication and we were off, LibreChat was launched.

It was fairly stable early on, but started suffering issues when ChatBot UI v1 was turned off and all traffic was redirected. We started having significant issues, which turned out to be a silly fix. But during that time, ChatBot UI v1 was turned back on and the developer deployed ChatBot UI v2, since the maintainer randomly dropped a new open-source version. These served as backups when LibreChat would go down.

I started making upstream contributions to the open-source repo on nights and weekends, where I improved memory usage, migrated from crypto to Node’s multi-threaded crypto implementation, and caching of static assets. The problem ended up being that the app didn’t scale horizontally well, and would get stuck in cycles where Cloud Run would continuously spin instances up and down.
After that, it was stable for a few months. In the beginning of the project being deployed, I was also making minor customizations to the code on our fork (mostly frontend) to improve it for our specific use case. But, LibreChat moved fairly quickly and I eventually stopped because it made upgrades hard.

A small cohort was formed to determine if LibreChat was the right way to go or if we should use other solutions. Realistically, the only contenders were LibreChat, ChatBot UI v2 (which had flaky development), and Open WebUI. I had already gone through almost everything else in my free time and none were on par with any of these. Open WebUI wasn’t widely released to a lot of people internally, but there were a few people using it and it was a VERY solid contender. But, since it was plugin based (called pipelines in their architecture), it would have quickly grown out of hand since everything was treated as a “model.” That included customizations, custom system prompts (similar to agents without MCPs), and the models themselves. Looking at the code, it became clear it was too far from being something that we could customize or something that could have been fixed in a reasonable amount of time upstream. So, I made the call to ditch it.

So from that point on, we were left with LibreChat and ChatBot UI v2 as a backup for when it had hiccups. For those who were internal users of it during that time it probably felt like it was a scrappy project deployed in a couple days, with two people (another developer and myself) working on it outside of our project work in their free time, that’s because that’s exactly what it was.

I had to go back to project work where I was working on the Checkout migration and didn’t have as much time to keep things up. But, LibreChat was stable.

It wasn’t until sometime around the new year that it started becoming less stable again. I fought with it some more, but thanks to one of our VPs, eventually LibreChat was finally given a team to maintain it and I went with it to the newly formed Augmented Engineering team, where a Senior Staff Engineer took over as project lead.

The Senior Staff Engineer was able to figure out that a change to the caching strategy, something that I had originally pushed upstream, was changed in one of those last upgrades around the new year that introduced a significant issue of pre-compressing our static assets, **which included every file that every Shopify employee had ever uploaded!**

And that brings us to today. Currently, we officially have a small dedicated team, with plans to grow in the future. Most importantly, we’re treating it like a real project that thousands of Shopifolk rely on for their day to day work. We are working on stabilizing it even further, adding usage metrics, and working with the open-source repo and consistently pushing features upstream that are important to Shopify, while also helping lower the tech debt it’s built up over time in the process and increasing their test coverage (which could be better) so we can make even more changes without the fear of breaking things.

If it isn’t cool enough that we have extremely talented Shopify engineers working on this, both [Tobi Lütke](https://github.com/tobi) and [Shopify](https://github.com/orgs/Shopify/sponsoring) became financial supporters of the project recently on GitHub. I also learned the other day that [Julien Chaumond](https://github.com/julien-c), the CTO of [Hugging Face](https://huggingface.co) (a major open source AI organization), is also a supporter. While I’m sure all 3 are contributing significantly more, I am proud to say that I predate them all by about a year... with my measly $20/mo. 😅
