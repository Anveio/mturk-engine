#!/bin/sh

RELEASE_VERSION=$1

# mv /build/*.js /build/mturk-engine.yeehaw.user.js}
find . -name "main.*.js" -exec sh -c 'mv -T "$1" "./build/mturk-engine.latest.user.js"' _ {} \;

# Prepending stuff to a file is hard. Append instead and move text manually.

echo "// ==UserScript==
// @name         Mturk Engine
// @namespace    https://github.com/Anveio/mturk-engine/
// @version      $RELEASE_VERSION
// @description  Earn money more efficiently on Amazon's Mechanical Turk work platform.
// @author       Anveio (Shovon Hasan)
// @match        https://www.mturk.com/mturk/findhits?mturkengine
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Anveio/mturk-engine/master/build/mturk-engine.latest.user.js
// ==/UserScript==

/**
 * READ THIS:
 * After downloading this script visit https://www.mturk.com/mturk/findhits?mturkengine
 * 
 * If you're installing Mturk Engine you're in the right place. Your userscript manager should be prompting you to begin installation at the top of your browser.
 * 
 * If you're here to read the source code you're in the wrong place. This is minified production code that isn't meant to be read by humans.
 * For the full (readable) source code, visit this project's github page at: https://github.com/Anveio/mturk-engine
 * There you can post issues, submit changes, suggest features, and download the latest version.
*/


/**
 * This is minified production code that isn't meant to be read by humans.
 * For the full source code, visit this project's github page at: https://github.com/Anveio/mturk-engine
 * There you can post issues, submit changes, suggest features, and download the latest version.
 */" >> ./build/mturk-engine.latest.user.js

rm -rf ./build/static