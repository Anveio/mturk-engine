# Mturk Engine

[Download](https://raw.githubusercontent.com/Anveio/mturk-engine/master/build/mturk-engine.latest.user.js)

[Download (Lite version)](https://greasyfork.org/en/scripts/33403-mturk-engine-lite)

Download the Lite version if your browser or user script manager does not allow you to install the script with the main download link. The lite version inserts the main script into the MTurk page so it works exactly the same, but incurs a 300kb download.

[Homepage](https://www.mturk.com/mturk/findhits?mturkengine) (You must have installed Mturk Engine first.)

This is a userscript. You must install it with a userscript manager (TamperMonkey for Chrome or Greasemonkey for FireFox).

### MTurk Engine only works on this page: https://www.mturk.com/mturk/findhits?mturkengine

## Why use Mturk Engine?

Imagine setting up a watcher to automatically accept a rare HIT when it shows up while simultaneously being notified of any new HITs as they're posted. Imagine then quickly switching to a new HIT, clicking the accept button, and instantly being notified of wther or not your accept went through without having to wait for your browser to refresh or open a new tab. That's what MTurk Enging allows you to do. All in a single tab -- without any page refreshes.

MTurk Engine brings all of the things that make for an efficient workflow into a single place. You can monitor new HITs in the background, have instant feedback as to whether your accept request went through, block requesters and HITs you're not interested in, set up watchers to automatically accept rare and high-paying HITs or hoard lots of the same HIT, and quickly check your queue when you need to, and never have to wait for your browser to refresh a full page.

Mturk Engine is under active development so feel free to suggest features or submit changes, no matter how big or small.

## Installation & Usage

1. You'll need a userscript manager to use Mturk Engine. If you're using Chrome download [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en). If you're using Firefox download [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/). If you already have a userscript manager you're good to move on to the next step.

2. [Download Mturk Engine here.](https://raw.githubusercontent.com/Anveio/mturk-engine/master/build/mturk-engine.latest.user.js) Your userscript manager should prompt you to install the script.

2a. If your userscript manager or browser is not letting you download the script, install the Lite version here: https://greasyfork.org/en/scripts/33403-mturk-engine-lite

3. Navigate to https://www.mturk.com/mturk/findhits?mturkengine with your Amazon Mechanical Turk account to begin using Mturk Engine. It's a good idea to bookmark this link if you intend on using it frequently.

## Preview

###

### The MTurk Engine UI
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

