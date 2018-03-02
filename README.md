# Mturk Engine

[Download](https://raw.githubusercontent.com/Anveio/mturk-engine/master/build/mturk-engine.latest.user.js)

[Download (Greasyfork)](https://greasyfork.org/en/scripts/33403-mturk-engine)

This is a userscript. In order to use it, install Mturk Engine with a userscript manager (e.g. TamperMonkey) and then nagivate to https://worker.mturk.com/?mturkengine while logged in to your Mturk account. **Firefox users: Mturk Engine is not compatible with Greasemonkey, use [TamperMonkey for Firefox instead.](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)**

### Mturk Engine only works on this page: https://worker.mturk.com/?mturkengine

## What is Mturk Engine?

Mturk Engine is a free and open source user script for Chrome & Firefox that enables you to be more productive on Amazon's Mechanical Turk work platform. You install it with one of the download links above and then navigate to https://worker.mturk.com/?mturkengine while logged in to use it. Mturk Engine brings everything you do on Amazon's Mechanical Turk work platform into a single page. You can search for HITs, accept HITs, add HITs to be auto accepted, monitor your queue, monitor your dashboard, keep track of all the HITs you've submitted and their statuses, and return HITs all in a single browser tab without ever having to wait for a to page reload.

## Why use Mturk Engine? What does it do that other tools don't?

**1. It's fast**

Mturk Engine uses the latest web technologies to handle large volumes of rapidly changing data. That means Mturk Engine won't slow down even when your hit database has tens of thousands of entries or after you've blocked tens of thousands of requesters and HITs.

**2. It's powerful**

Mturk Engine combines much of the functionality of other tools like Hit Scraper, Panda Crazy, and Hit Database into a single tool. This saves time because you're not bouncing between multiple different browser tabs to manage your different scripts. This also allows for integration between features, such as being able to see all the work you've done for a requester in your search results.

**3. It's easy to use**

Mturk Engine's interface is intuitive and clear. You (hopefully) won't need to read a manual to find out what a button or setting does. Mturk Engine's design abides by many of the principles laid out in [Shopify's Polaris documentation](https://polaris.shopify.com/principles/principles) such as "empower but don't overwhelm" and "be polished but not ornamental." Accessibility is also a top priority. If something is difficult to read or a color difficult to see, feel free to [post an issue on Github](https://github.com/Anveio/mturk-engine/issues.

## Installation & Usage

1.  You'll need a userscript manager to use Mturk Engine. If you're using Chrome download [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en). **Firefox users: Mturk Engine is not compatible with Greasemonkey, use [TamperMonkey for Firefox instead.](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)** If you already have a userscript manager you're good to move on to the next step.

2.  [Download Mturk Engine here.](https://raw.githubusercontent.com/Anveio/mturk-engine/master/build/mturk-engine.latest.user.js) Your userscript manager should prompt you to install the script. An alternative is to download the script from Greasyfork: https://greasyfork.org/en/scripts/33403-mturk-engine

3.  Navigate to https://worker.mturk.com/?mturkengine with your Amazon Mechanical Turk account to begin using Mturk Engine. It's a good idea to bookmark this link if you intend on using it frequently.

## Developer Guide

If you want to know more about any of the following:

* Starting Mturk Engine in development.
* Creating a build (single file) of Mturk Engine.
* Technologies used in Mturk Engine.
* Explanation of file structure.

Check out the [Developer Guide](https://github.com/Anveio/mturk-engine/blob/master/DEVELOPERS.md).

## Preview

### The Mturk Engine UI

<img src="https://i.imgur.com/JE0M8RB.png" alt="UI for searching for HITs, seeing unread HITS, hiding HITs, and blocking requesters."/>

### Keep track of your work with the Account tab

<img src="https://i.imgur.com/q764FG0.gif" alt="Usage of the account tab to monitor your dashboard, update your HIT database, and edit bonuses"/>

### Search for HITs and block requesters.

<img src="https://i.imgur.com/Z5UEVbs.gif" alt="The normal flow of searching for HITs, hiding HITs, blocking requesters, accepting HITs, viewing your queue, and returning a HIT"/>

### Add watchers to automatically accept HITs

<img src="https://i.imgur.com/XRMcGtz.gif" alt="Search result being added as a watcher, switching to the watcher tab, starting the watcher to automatically accept the HIT periodically, edit the time between auto-accepts to 1 second, and add a custom description."/>

### Backup your data

<img src="https://i.imgur.com/HYR5MSJ.gif" alt="How to import from a backup file" />

## Features

* Search for HITs periodically without waiting for full page reloads.
* New HITs are highlighted and grouped together at the top of your search results.
* Optionally receive a sound alert or notification when you find a new HIT.
* See what other HITs you've done for a requester in your search results.
* Have TO data at your fingertips.
* Use watchers to automatically accept HITs.
* Add watchers manually or add them directly from search results.
* Click on each search result to see additional info.
* Block requesters (you can unblock them later).
* Get instant feedback on whether a HIT you accepted was added to your queue.
* Hide unwanted HITs easily.
* Monitor your queue in the 'Queue' tab and refresh it instantly.
* Return HITs instantly.
* Monitor all the information in your dashboard.
* Keep track of your work over time with the HIT Database.
* Easily backup and import your data across devices and browsers.

## Roadmap

* ~~Watchers for continually accepting HITs and snagging rare ones.~~ <~ Added in 1.1.0
* ~~Integration with your dashboard and data visualization of income over time, earning streaks etc.~~ <~ Added in 1.3.0
* ~~New HIT highlighting~~ <~ Added in 1.2.0
* CAPTCHA detection <~ Coming soon
