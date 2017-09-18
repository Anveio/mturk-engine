# Mturk Engine

[Download](https://github.com/Anveio/mturk-engine/raw/master/build/static/js/mturk-engine@latest.user.js)

[Homepage](https://www.mturk.com/mturk/findhits?mturkengine) (You must have downloaded and installed Mturk Engine first.)

## Why use Mturk Engine?

The average workflow on MTurk typically involves refreshing several different pages to find and accept new HITs as they're posted. This involves precious time being spent waiting for full page reloads and manually monitoring multiple things just to *begin* making money.

MTurk Engine brings all of the things that make for an efficient workflow into a single place. You can monitor new HITs in the background, have instant feedback as to whether your accept request went through, block requesters and HITs you're not interested in, and quickly check your queue when you need to, and never have to wait for your browser to refresh a full page.

Mturk Engine is under active development so feel free to suggest features or submit changes, no matter how big or small.

## Installation & Usage

1. You'll need a userscript manager to use Mturk Engine. If you're using Chrome download [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en). If you're using Firefox download [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/). If you already have a userscript manager you're good to move on to the next step.

2. [Download Mturk Engine here.](https://github.com/Anveio/mturk-engine/raw/master/build/static/js/mturk-engine-1.0.0rc.user.js) Your userscript manager should prompt you to install the script.

3. Navigate to https://www.mturk.com/mturk/findhits?mturkengine with your Amazon Mechanical Turk account to begin using Mturk Engine. It's a good idea to bookmark this link if you intend on using it frequently.

## Preview

### Search for HITs and block requesters.
<img src="https://i.imgur.com/Z5UEVbs.gif" alt="Animated GIF showing the normal flow of searching for HITs, hiding HITs, blocking requesters, accepting HITs, viewing your queue, and returning a HIT."/>

### Add watchers to automatically accept HITs

<img src="https://i.imgur.com/XRMcGtz.gif" alt="Animated GIF showing a search result being added as a watcher, switching to the watcher tab, starting the watcher to automatically accept the HIT periodically, edit the time between auto-accepts to 1 second, and add a custom description."/>

## Features

* Search for HITs periodically without waiting for full page reloads.
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
* New HIT highlighting
* CAPTCHA detection

