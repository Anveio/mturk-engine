# Mturk Engine

[Download](https://raw.githubusercontent.com/Anveio/mturk-engine/master/build/mturk-engine.latest.user.js)

[Download (Lite version)](https://greasyfork.org/en/scripts/33403-mturk-engine-lite)

Download the Lite version if your browser or user script manager does not allow you to install the script with the main download link. The lite version inserts the main script into the MTurk page so it works exactly the same, but incurs a 300kb download.

[Homepage](https://www.mturk.com/mturk/findhits?mturkengine) (You must have installed Mturk Engine first.)

This is a userscript. You must install it with a userscript manager (TamperMonkey for Chrome or Greasemonkey for FireFox).

### Mturk Engine only works on this page: https://www.mturk.com/mturk/findhits?mturkengine

## What is Mturk Engine?

Mturk Engine is a user script that enables you to be more productive on Amazon's Mechanical Turk work platform. You install it with one of the download links above and then navigate to https://www.mturk.com/mturk/findhits?mturkengine while logged in to use it. Mturk Engine brings everything you do on Amazon's Mechanical Turk work platform into a single page. You can search for HITs, accept HITs, add HITs to be auto accepted, monitor your queue, and return HITs all in a single browser tab without ever having to wait for a to page reload.

Scroll down to the animated gifs and get a sense of what Mturk Engine looks like and what you can do with it.

## Why use Mturk Engine? What does it do that HitScraper/HitFinder & PandaCrazy don't?

### TL;DR: Mturk Engine is a combination of HitFinder + PandaCrazy with queue monitoring, instant accepting of HITs and instant returning of HITs, wrapped in a high-performing, easy-to-use, and accessible UI.

Mturk Engine in its current state can be described as a combination of HitScraper + PandaCrazy, with a few extra features like adding a watcher directly from your search results (watchers automatically accept HITs for you). Scroll down to the "Preview" section to see what that looks like.

You can also accept HITs and know immediately if your accept went through without having to wait for a full page reload and being disappointed when it didn't. Mturk Engine is also super fast, and should handle 0 second delays between searches and 1 billion+ blocked requesters/HITs without slowing down. From what I've seen of the source code of other tools like HitScraper/HitFinder, they use regular expressions to block requesters/hits, meaning that performance will degrade quickly as your block lists get larger. This is not a worry with Mturk Engine.

Mturk Engine uses [Immutable.s Maps](https://facebook.github.io/immutable-js/) under the hood to do blocklist lookups in O(log32n) time for each HIT, meaning that you don't have to worry that your blocklists are slowing things down and you can keep them growing infinitely. 

Mturk Engine uses React to update elements on the page, which means that rapidly updating pages in response to changes is faster than other tools. I spend a lot of time making sure Mturk Engine is performant, and [write about some performance related stuff on my blog](https://blog.shovonhasan.com/pattern-for-rendering-lists-of-connected-components-with-react-redux/).

There's also some other technologies used, like [redux-saga](https://github.com/redux-saga/redux-saga) which allows Mturk Engine to simultaneously run your main search while running a bunch of watchers in the background to automatically accept HITs on <1 second intervals (if that's what you need) for maximum productivity.

Imagine setting up a watcher to automatically accept a rare HIT when it shows up while simultaneously being notified of any new HITs as they're posted. Imagine then quickly switching to a new HIT, clicking the accept button, and instantly being notified of wther or not your accept went through without having to wait for your browser to refresh or open a new tab. That's what Mturk Engine allows you to do. All in a single tab -- without any page refreshes.

Mturk Engine is under active development so feel free to suggest features or submit changes, no matter how big or small.

## Installation & Usage

1. You'll need a userscript manager to use Mturk Engine. If you're using Chrome download [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en). If you're using Firefox download [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/). If you already have a userscript manager you're good to move on to the next step.

2. [Download Mturk Engine here.](https://raw.githubusercontent.com/Anveio/mturk-engine/master/build/mturk-engine.latest.user.js) Your userscript manager should prompt you to install the script.

2a. If your userscript manager or browser is not letting you download the script, install the Lite version here: https://greasyfork.org/en/scripts/33403-mturk-engine-lite

3. Navigate to https://www.mturk.com/mturk/findhits?mturkengine with your Amazon Mechanical Turk account to begin using Mturk Engine. It's a good idea to bookmark this link if you intend on using it frequently.

## Preview

###

### The Mturk Engine UI
<img src="https://i.imgur.com/JE0M8RB.png" alt="Still image showing the UI for searching for HITs, seeing unread HITS, hiding HITs, and blocking requesters."/>

 ### Search for HITs and block requesters.
<img src="https://i.imgur.com/Z5UEVbs.gif" alt="Animated GIF showing the normal flow of searching for HITs, hiding HITs, blocking requesters, accepting HITs, viewing your queue, and returning a HIT"/>

### Add watchers to automatically accept HITs

<img src="https://i.imgur.com/XRMcGtz.gif" alt="Animated GIF showing a search result being added as a watcher, switching to the watcher tab, starting the watcher to automatically accept the HIT periodically, edit the time between auto-accepts to 1 second, and add a custom description."/>

## Features

* Search for HITs periodically without waiting for full page reloads.
* New HITs are highlighted and grouped together at the top of your search results.
* Optionally receive a sound alert when you find a new HIT.
* Have TO data at your fingertips.
* Use watchers to automatically accept HITs.
* Add watchers manually or add them directly from search results.
* Click on each search result to see additional info.
* Block requesters (you can unblock them later).
* Get instant feedback on whether a HIT you accepted was added to your queue.
* Hide unwanted HITs easily.
* Monitor your queue in the 'Queue' tab and refresh it instantly.
* Return HITs instantly.

## Roadmap

* Working HIT export to MTC and other forums. 
* ~~Watchers for continually accepting HITs and snagging rare ones.~~ <~ Added in 1.1.0
* Integration with your dashboard and data visualization of income over time, your highest $/hr time of day, earning streaks etc. 
* ~~New HIT highlighting~~ <~ Added in 1.2.0
* CAPTCHA detection

