// ==UserScript==
// @name         HIT Finder Beta
// @namespace    http://kadauchi.com/
// @version      0.18.0
// @description  Monitors mturk.com for HITs
// @author       Kadauchi
// @icon         http://i.imgur.com/oGRQwPN.png
// @include      https://worker.mturk.com/?finder_beta
// @include      https://www.mturk.com/mturk/findhits?match=true?finder_beta
// @grant        GM_log
// @grant        GM_setClipboard
// @require      https://code.jquery.com/jquery-3.1.0.min.js
// ==/UserScript==

var worker = document.URL.match(/https:\/\/worker.mturk.com\//) ? true : false;

var _config = JSON.parse(localStorage.getItem('_finder')) || {};
var blocklist = JSON.parse(localStorage.getItem('_finder_bl')) || {};
var includelist = JSON.parse(localStorage.getItem('_finder_il')) || {};

// Compatability check
if (_config.version !== '1.1') {
  _config = {};
}

var config = {
  version: _config.version || '1.1',
  delay: _config.delay || '3',
  type: _config.type || 'LastUpdatedTime%3A1&pageSize=',
  size: _config.size || '25',
  rew: _config.rew || '0.00',
  avail: _config.avail || '0',
  mto: _config.mto || '0.00',
  alert: _config.alert || '0',
  qual: _config.hasOwnProperty('qual') ? _config.qual : true,
  new: _config.hasOwnProperty('new') ? _config.new : true,
  newaudio: _config.newaudio || 'beep',
  pb: _config.hasOwnProperty('pb') ? _config.pb : false,
  to: _config.hasOwnProperty('to') ? _config.to : true,
  nl: _config.hasOwnProperty('nl') ? _config.nl : false,
  bl: _config.hasOwnProperty('bl') ? _config.bl : false,
  m: _config.hasOwnProperty('m') ? _config.m : false,
  push: _config.push || 'access_token_here',
  theme: _config.theme || 'default',
  custom: _config.custom || {
    main: 'FFFFFF',
    primary: 'CCCCCC',
    secondary: '111111',
    text: '000000',
    link: '0000EE',
    visited: '551A8B',
    prop: false
  },
  to_theme: _config.to_theme || '1'
};

var themes = {
  default: {
    main: 'F2F2F2',
    primary: 'CCCCCC',
    secondary: '111111',
    text: '000000',
    link: '0000EE',
    visited: '551A8B',
    prop: true
  },
  dark: {
    main: '404040',
    primary: '666666',
    secondary: 'FFFFFF',
    text: 'FFFFFF',
    link: 'FFFFFF',
    visited: 'B3B3B3',
    prop: true
  },
  darker: {
    main: '000000',
    primary: '262626',
    secondary: 'FFFFFF',
    text: 'FFFFFF',
    link: 'FFFFFF',
    visited: 'B3B3B3',
    prop: true
  },
  custom: config.custom
};

var hitdb = { db: null };

window.indexedDB.open('HITDB').onsuccess = function() {
  hitdb.db = this.result;
};

var searches = 0,
  logged = 0,
  hitlog = {},
  noti_delay = [],
  push_delay = [];

// Adjust stuff depending on what site we are on.
var url, upd, num, rew, minrew;

if (!worker) {
  url =
    'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&sortType=';
  upd = 'LastUpdatedTime%3A1&pageSize=';
  num = 'NumHITs%3A1&pageSize=';
  rew = 'Reward%3A1&pageSize=';
  minrew = '&minReward=';
} else {
  url = 'https://worker.mturk.com/?';
  upd = '&sort=updated_desc&page_size=';
  num = '&sort=num_hits_desc&page_size=';
  rew = '&sort=reward_desc&page_size=';
  minrew = '&filters%5Bmin_reward%5D=';
}

$('head').html(
  '<title>HIT Finder Beta</title>' +
    '<link rel="icon" type="image/jpg" href="http://kadauchi.com/avatar4.jpg">' +
    '<base target="_blank">' +
    '<audio id="audio_1"><source src="http://www.soundjay.com/button/sounds/button-1.mp3" type="audio/mpeg"></audio>' +
    '<audio id="audio_2"><source src="http://www.soundjay.com/button/sounds/button-3.mp3" type="audio/mpeg"></audio>' +
    '<audio id="audio_3"><source src="http://www.soundjay.com/button/sounds/button-4.mp3" type="audio/mpeg"></audio>' +
    '<audio id="audio_4"><source src="http://www.soundjay.com/button/sounds/button-5.mp3" type="audio/mpeg"></audio>' +
    //'<audio id="audio_default"><source src="http://www.soundjay.com/button/sounds/button-5.mp3" type="audio/mpeg"></audio>' +
    '<audio id="audio_beep"><source src="http://www.soundjay.com/button/sounds/beep-21.mp3" type="audio/mpeg"></audio>' +
    '<audio id="audio_beepbeep"><source src="http://www.soundjay.com/button/sounds/beep-24.mp3" type="audio/mpeg"></audio>' +
    //'<audio id="audio_ding"><source src="data:audio/ogg;base64,T2dnUwACAAAAAAAAAAB8mpoRAAAAAFLKt9gBHgF2b3JiaXMAAAAAARErAAAAAAAAkGUAAAAAAACZAU9nZ1MAAAAAAAAAAAAAfJqaEQEAAACHYsq6Cy3///////////+1A3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA1MDMwNAAAAAABBXZvcmJpcxJCQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBADIAAAYhiGH3knMkFOQSSYpVcw5CKH1DjnlFGTSUsaYYoxRzpBTDDEFMYbQKYUQ1E45pQwiCENInWTOIEs96OBi5zgQGrIiAIgCAACMQYwhxpBzDEoGIXKOScggRM45KZ2UTEoorbSWSQktldYi55yUTkompbQWUsuklNZCKwUAAAQ4AAAEWAiFhqwIAKIAABCDkFJIKcSUYk4xh5RSjinHkFLMOcWYcowx6CBUzDHIHIRIKcUYc0455iBkDCrmHIQMMgEAAAEOAAABFkKhISsCgDgBAIMkaZqlaaJoaZooeqaoqqIoqqrleabpmaaqeqKpqqaquq6pqq5seZ5peqaoqp4pqqqpqq5rqqrriqpqy6ar2rbpqrbsyrJuu7Ks256qyrapurJuqq5tu7Js664s27rkearqmabreqbpuqrr2rLqurLtmabriqor26bryrLryratyrKua6bpuqKr2q6purLtyq5tu7Ks+6br6rbqyrquyrLu27au+7KtC7vourauyq6uq7Ks67It67Zs20LJ81TVM03X9UzTdVXXtW3VdW1bM03XNV1XlkXVdWXVlXVddWVb90zTdU1XlWXTVWVZlWXddmVXl0XXtW1Vln1ddWVfl23d92VZ133TdXVblWXbV2VZ92Vd94VZt33dU1VbN11X103X1X1b131htm3fF11X11XZ1oVVlnXf1n1lmHWdMLqurqu27OuqLOu+ruvGMOu6MKy6bfyurQvDq+vGseu+rty+j2rbvvDqtjG8um4cu7Abv+37xrGpqm2brqvrpivrumzrvm/runGMrqvrqiz7uurKvm/ruvDrvi8Mo+vquirLurDasq/Lui4Mu64bw2rbwu7aunDMsi4Mt+8rx68LQ9W2heHVdaOr28ZvC8PSN3a+AACAAQcAgAATykChISsCgDgBAAYhCBVjECrGIIQQUgohpFQxBiFjDkrGHJQQSkkhlNIqxiBkjknIHJMQSmiplNBKKKWlUEpLoZTWUmotptRaDKG0FEpprZTSWmopttRSbBVjEDLnpGSOSSiltFZKaSlzTErGoKQOQiqlpNJKSa1lzknJoKPSOUippNJSSam1UEproZTWSkqxpdJKba3FGkppLaTSWkmptdRSba21WiPGIGSMQcmck1JKSamU0lrmnJQOOiqZg5JKKamVklKsmJPSQSglg4xKSaW1kkoroZTWSkqxhVJaa63VmFJLNZSSWkmpxVBKa621GlMrNYVQUgultBZKaa21VmtqLbZQQmuhpBZLKjG1FmNtrcUYSmmtpBJbKanFFluNrbVYU0s1lpJibK3V2EotOdZaa0ot1tJSjK21mFtMucVYaw0ltBZKaa2U0lpKrcXWWq2hlNZKKrGVklpsrdXYWow1lNJiKSm1kEpsrbVYW2w1ppZibLHVWFKLMcZYc0u11ZRai621WEsrNcYYa2415VIAAMCAAwBAgAlloNCQlQBAFAAAYAxjjEFoFHLMOSmNUs45JyVzDkIIKWXOQQghpc45CKW01DkHoZSUQikppRRbKCWl1losAACgwAEAIMAGTYnFAQoNWQkARAEAIMYoxRiExiClGIPQGKMUYxAqpRhzDkKlFGPOQcgYc85BKRljzkEnJYQQQimlhBBCKKWUAgAAChwAAAJs0JRYHKDQkBUBQBQAAGAMYgwxhiB0UjopEYRMSielkRJaCylllkqKJcbMWomtxNhICa2F1jJrJcbSYkatxFhiKgAA7MABAOzAQig0ZCUAkAcAQBijFGPOOWcQYsw5CCE0CDHmHIQQKsaccw5CCBVjzjkHIYTOOecghBBC55xzEEIIoYMQQgillNJBCCGEUkrpIIQQQimldBBCCKGUUgoAACpwAAAIsFFkc4KRoEJDVgIAeQAAgDFKOSclpUYpxiCkFFujFGMQUmqtYgxCSq3FWDEGIaXWYuwgpNRajLV2EFJqLcZaQ0qtxVhrziGl1mKsNdfUWoy15tx7ai3GWnPOuQAA3AUHALADG0U2JxgJKjRkJQCQBwBAIKQUY4w5h5RijDHnnENKMcaYc84pxhhzzjnnFGOMOeecc4wx55xzzjnGmHPOOeecc84556CDkDnnnHPQQeicc845CCF0zjnnHIQQCgAAKnAAAAiwUWRzgpGgQkNWAgDhAACAMZRSSimllFJKqKOUUkoppZRSAiGllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimVUkoppZRSSimllFJKKaUAIN8KBwD/BxtnWEk6KxwNLjRkJQAQDgAAGMMYhIw5JyWlhjEIpXROSkklNYxBKKVzElJKKYPQWmqlpNJSShmElGILIZWUWgqltFZrKam1lFIoKcUaS0qppdYy5ySkklpLrbaYOQelpNZaaq3FEEJKsbXWUmuxdVJSSa211lptLaSUWmstxtZibCWlllprqcXWWkyptRZbSy3G1mJLrcXYYosxxhoLAOBucACASLBxhpWks8LR4EJDVgIAIQEABDJKOeecgxBCCCFSijHnoIMQQgghREox5pyDEEIIIYSMMecghBBCCKGUkDHmHIQQQgghhFI65yCEUEoJpZRSSucchBBCCKWUUkoJIYQQQiillFJKKSGEEEoppZRSSiklhBBCKKWUUkoppYQQQiillFJKKaWUEEIopZRSSimllBJCCKGUUkoppZRSQgillFJKKaWUUkooIYRSSimllFJKCSWUUkoppZRSSikhlFJKKaWUUkoppQAAgAMHAIAAI+gko8oibDThwgMQAAAAAgACTACBAYKCUQgChBEIAAAAAAAIAPgAAEgKgIiIaOYMDhASFBYYGhweICIkAAAAAAAAAAAAAAAABE9nZ1MABAgkAAAAAAAAfJqaEQIAAAB89IOyJjhEQUNNRE5TRENHS0xTRllHSEpISUdORk1GSEdISUNHP0ZHS1IhquPYHv5OAgC/7wFATp2pUBdX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" type="audio/mpeg"></audio>' +
    //'<audio id="audio_squee"><source src="data:audio/mp3;base64,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VVVVVVVVVVVVVQBqs0jMnBWmgKng1FRU32lmZmb+N6/V+w+MygnAXTBSU3/Ffjw4KGwvhYijgbg038TRQL8U3//xv5cO4FZf/z8bdj8V3CpuILkwNl5P8KE+53G3eCoQUAIQxdpeAGCps5MdqtGpNehUFBQFS2qx1bDEzNSDATAKKlIBjsJGEQBFZnmMUrStzKW+pXKVDOZ+hnQ2jloarUNK2iGVjPlUVcHRF4NCI9e2HcNCJ4NQ0eEQlnbmh0FYaUxBTUUzLjk5LjNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7kkScD/K0GL+QyBnCYEgHsjBlXAAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=" type="audio/mpeg"></audio>' +
    '<audio id="audio_click"><source src="http://www.soundjay.com/button/sounds/button-20.mp3" type="audio/mpeg"></audio>' +
    '<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">' +
    '<style id="css" type="text/css">'
);

$('body').html(
  // Main
  '<div style="margin-bottom: 5px;">' +
    '<button id="scan_button" style="margin-right: 5px;">Start</button>' +
    '<button id="bloc_button" style="margin-right: 5px;">Block List</button>' +
    '<button id="incl_button" style="margin-right: 5px;">Include List</button>' +
    '<button id="sett_button" style="margin-right: 5px;">Advanced Settings</button>' +
    '<button id="conf_button" style="margin-right: 5px;">Hide Config</button>' +
    '<button id="logg_button" style="margin-right: 0px;">Hide Logged HITs</button>' +
    '</div>' +
    // Config
    '<div id="config" style="margin-bottom: 5px;">' +
    '<div style="margin-bottom: 5px;">' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Delay in seconds between searches.">Search Delay: ' +
    '<input id="delay" style="width: 50px;" type="number" step="1" min="1" value="' +
    config.delay +
    '">' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Filter HITs by minimum reward.">Min Reward: ' +
    '<input id="min_rew" style="width: 50px;" type="number" step="0.01" min="0" value="' +
    config.rew +
    '">' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Filter HITs by minimum available.">Min Avail: ' +
    '<input id="min_avail" style="width: 50px;" type="number" step="1" min="0" value="' +
    config.avail +
    '">' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Filter HITs by minimum TO pay.">Min TO: ' +
    '<input id="min_to" style="width: 50px;" type="number" step="0.1" min="0" max="5" value="' +
    config.mto +
    '">' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Search for this many HITs.">Size: ' +
    '<input id="size" style="width: 50px;" type="number" step="1" min="1" max="100" value="' +
    config.size +
    '">' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Sort HITs by (Latest / Most Available / Highest Reward)">Sort by: ' +
    '<select id="type" value="' +
    config.type +
    '">' +
    '<option value="' +
    upd +
    '">Latest</option>' +
    '<option value="' +
    num +
    '">Most Available</option>' +
    '<option value="' +
    rew +
    '">Reward (Most)</option>' +
    '</select>' +
    '</label>' +
    '<label style="margin-right: 0px; display: inline-block; border-bottom: 1px solid;" title="Only show HITs that you are qualified for.">Qualified' +
    '<input id="qual" type="checkbox" ' +
    (config.qual ? 'checked' : '') +
    '>' +
    '</label>' +
    '</div>' +
    '<div style="margin-bottom: 5px;">' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Delay in seconds between desktop notifications and sound alerts for an include list match.">Alert Delay: ' +
    '<input id="alert_delay" style="width: 50px;" type="number" step="1" min="0" value="' +
    config.alert +
    '">' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Make a sound when a new HIT is found.">Sound On New HIT ' +
    '<input id="new_sound" type="checkbox" ' +
    (config.new ? 'checked' : '') +
    '>' +
    '<select id="new_audio" value="' +
    config.newaudio +
    '">' +
    //'<option value="default">Default</option>' +
    '<option value="beep">Beep</option>' +
    '<option value="beepbeep">Beep Beep</option>' +
    //'<option value="ding">Ding</option>' +
    //'<option value="squee">Squee</option>' +
    '<option value="click">Click</option>' +
    '</select>' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Allow inludelist matches to send Pushbullet notifications if enabled for that match.">Pushbullet ' +
    '<input id="pb" type="checkbox" ' +
    (config.pb ? 'checked' : '') +
    '>' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Use turkopticon.">Enable TO ' +
    '<input id="to" type="checkbox" ' +
    (config.to ? 'checked' : '') +
    '>' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Hide all HITs that do not match your include list.">Hide Non Include List ' +
    '<input id="nl_hide" type="checkbox" ' +
    (config.nl ? 'checked' : '') +
    '>' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;" title="Hide HITs that match your block list.">Hide Block List ' +
    '<input id="bl_hide" type="checkbox" ' +
    (config.bl ? 'checked' : '') +
    '>' +
    '</label>' +
    '<label style="margin-right: 0px; display: inline-block; border-bottom: 1px solid;" title="Hide masters HITs.">Hide Masters ' +
    '<input id="m_hide" type="checkbox" ' +
    (config.m ? 'checked' : '') +
    '>' +
    '</label>' +
    '</div>' +
    '</div>' +
    // HITs
    '<div id="latest_hits">' +
    '<div style="border-bottom: 3px solid; margin-bottom: 5px;">' +
    '<span style="font-size: 20px; font-weight: bold;">HITs</span>' +
    '<span id="hits_data" style="font-size: 11px;"></span>' +
    '</div>' +
    '<div>' +
    '<div style="overflow: hidden; white-space: nowrap;">' +
    '<div style="float: left; width: calc(100% - 270px);">' +
    '<span style="width: 34%; float: left;  display:inline-block; overflow: hidden;">Requester</span>' +
    '<span style="width: 64%; float: right; display:inline-block; overflow: hidden;">Project</span>' +
    '</div>' +
    '<div style="float: right;">' +
    '<span style="width: 60px; display:inline-block; text-align: center;">Tasks</span>' +
    '<span style="width: 60px; display:inline-block; text-align: center;">Accept</span>' +
    '<span style="width: 60px; display:inline-block; text-align: center;">TO</span>' +
    '<span style="width: 30px; display:inline-block; text-align: center;">M</span>' +
    '<span style="width: 60px; display:inline-block; text-align: center;">HIT DB</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div id="new_hits"></div>' +
    '</div>' +
    '<br>' +
    //Logged HITs
    '<div id="logged_hits">' +
    '<div style="border-bottom: 3px solid; margin-bottom: 5px;">' +
    '<span style="font-size: 20px; font-weight: bold;">Logged HITs</span>' +
    '<span id="logged_hits_data" style="font-size: 11px;"></span>' +
    '</div>' +
    '<div>' +
    '<div style="overflow: hidden; white-space: nowrap;">' +
    '<div style="float: left;">' +
    '<span style="width: 80px; display:inline-block;">Time</span>' +
    '</div>' +
    '<div style="float: left; width: calc(100% - 290px);">' +
    '<span style="width: 34%; float: left;  display:inline-block; overflow: hidden;">Requester</span>' +
    '<span style="width: 64%; float: right; display:inline-block; overflow: hidden;">Project</span>' +
    '</div>' +
    '<div style="float: right;">' +
    '<span style="width: 60px; display:inline-block; text-align: center;">Accept</span>' +
    '<span style="width: 60px; display:inline-block; text-align: center;">TO</span>' +
    '<span style="width: 30px; display:inline-block; text-align: center;">M</span>' +
    '<span style="width: 60px; display:inline-block; text-align: center;">HIT DB</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div id="log_hits"></div>' +
    '</div>' +
    // Block List
    '<div id="bl_div" style="z-index: 99; position: fixed; width: 80%; height: 80%; left: 10%; top: 300px; margin-top: -250px; display: none;">' +
    '<div style="position: relative; width: 80%; left: 10%; border-bottom: 3px solid; padding: 2px; text-align: center;">Block List</div>' +
    '<div id="bl_items"></div>' +
    '<div style="text-align: center;">' +
    '<button id="bl_add"    style="margin-right: 5px;">Add</button>' +
    '<button id="bl_close"  style="margin-right: 5px;">Close</button>' +
    '<button id="bl_import" style="margin-right: 5px;">Import</button>' +
    '<button id="bl_export" style="margin-right: 0px;">Export</button>' +
    '</div>' +
    '</div>' +
    // Add Block List Popup
    '<div id="bl" class="add" style="z-index: 100; position: fixed; width: 520px; top: 300px; left: 50%; margin: -250px; padding: 5px; text-align: center; display: none;">' +
    '<div style="position: relative; width: 80%; left: 10%; border-bottom: 3px solid; padding: 2px; text-align: center;">Add To Block List</div>' +
    '<div>' +
    '<p><label>Term: </label><input id="bl_term" value=""></p>' +
    '<p><label>Name: </label><input id="bl_name" value=""></p>' +
    '</div>' +
    '<div>' +
    '<button id="bl_add_save"   style="margin-right: 5px;">Save</button>' +
    '<button id="bl_add_cancel" style="margin-right: 0px;">Cancel</button>' +
    '</div>' +
    '</div>' +
    // Edit Block List Popup
    '<div id="edit_bl" class="add" class="add" style="z-index: 100; position: fixed; width: 520px; top: 300px; left: 50%; margin: -250px; padding: 5px; text-align: center; display: none;">' +
    '<div style="position: relative; width: 80%; left: 10%; border-bottom: 3px solid; padding: 2px; text-align: center;">Edit Block List Item</div>' +
    '<div>' +
    '<p><label>Term: </label><input id="edit_bl_term"  value=""disabled></p>' +
    '<p><label>Name: </label><input id="edit_bl_name" value=""></p>' +
    '</div>' +
    '<div>' +
    '<button id="edit_bl_save"   style="margin-right: 5px;">Save</button>' +
    '<button id="edit_bl_delete" style="margin-right: 5px;">Delete</button>' +
    '<button id="edit_bl_cancel" style="margin-right: 0px;">Cancel</button>' +
    '</div>' +
    '</div>' +
    // Include List
    '<div id="il_div" style="z-index: 99; position: fixed; width: 80%; height: 80%; left: 10%; top: 300px; margin-top: -250px; display: none;">' +
    '<div style="position: relative; width: 80%; left: 10%; border-bottom: 3px solid; padding: 2px; text-align: center;">Include List</div>' +
    '<div id="il_items"></div>' +
    '<div style="text-align: center;">' +
    '<button id="il_add"    style="margin-right: 5px;">Add</button>' +
    '<button id="il_close"  style="margin-right: 5px;">Close</button>' +
    '<button id="il_import" style="margin-right: 5px;">Import</button>' +
    '<button id="il_export" style="margin-right: 0px;">Export</button>' +
    '</div>' +
    '</div>' +
    // Add Include List Popup
    '<div id="il" class="add" style="z-index: 100; position: fixed; width: 520px; top: 300px; left: 50%; margin: -250px; padding: 5px; text-align: center; display: none;">' +
    '<div style="position: relative; width: 80%; left: 10%; border-bottom: 3px solid; padding: 2px; text-align: center;">Add To Include List</div>' +
    '<div>' +
    '<p><label>Term: </label><input id="il_term" value=""></p>' +
    '<p><label>Name: </label><input id="il_name" value=""></p>' +
    '</div>' +
    '<div style="position: relative; width: 80%; left: 10%; border-bottom: 3px solid; padding: 2px; text-align: center;">Alerts</div>' +
    '<p>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;">Sound: ' +
    '<select id="il_sound">' +
    '<option value="1">Sound 1</option>' +
    '<option value="2">Sound 2</option>' +
    '<option value="3">Sound 3</option>' +
    '<option value="4">Sound 4</option>' +
    '</select>' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;">Desktop Notifications' +
    '<input id="il_noti_cb" type="checkbox">' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;">Play Sound' +
    '<input id="il_sound_cb" type="checkbox">' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;">Send Pushbullet' +
    '<input id="il_push_cb" type="checkbox">' +
    '</label>' +
    '</p>' +
    '<div>' +
    '<button id="il_add_save"   style="margin-right: 5px;">Save</button>' +
    '<button id="il_add_cancel" style="margin-right: 0px;">Cancel</button>' +
    '</div>' +
    '</div>' +
    // Edit Include List Popup
    '<div id="edit_il" class="add" style="z-index: 100; position: fixed; width: 520px; top: 300px; left: 50%; margin: -250px; padding: 5px; text-align: center; display: none;">' +
    '<div style="position: relative; width: 80%; left: 10%; border-bottom: 3px solid; padding: 2px; text-align: center;">Edit Include List Item</div>' +
    '<div>' +
    '<p><label>Term: </label><input id="edit_il_term" value="" disabled></p>' +
    '<p><label>Name: </label><input id="edit_il_name" value=""></p>' +
    '</div>' +
    '<div style="position: relative; width: 80%; left: 10%; border-bottom: 3px solid; padding: 2px; text-align: center;"">Alerts</div>' +
    '<p>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;">Sound: ' +
    '<select id="edit_il_sound">' +
    '<option value="1">Sound 1</option>' +
    '<option value="2">Sound 2</option>' +
    '<option value="3">Sound 3</option>' +
    '<option value="4">Sound 4</option>' +
    '</select>' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;">Desktop Notifications' +
    '<input id="edit_il_noti_cb" type="checkbox">' +
    '</label>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;">Play Sound' +
    '<input id="edit_il_sound_cb" type="checkbox">' +
    '</label>' +
    '<label style="margin-right: 0px; display: inline-block; border-bottom: 1px solid;">Send Pushbullet' +
    '<input id="edit_il_push_cb" type="checkbox">' +
    '</label>' +
    '</p>' +
    '<div>' +
    '<button id="edit_il_save"   style="margin-right: 5px;">Save</button>' +
    '<button id="edit_il_delete" style="margin-right: 5px;">Delete</button>' +
    '<button id="edit_il_cancel" style="margin-right: 0px;">Cancel</button>' +
    '</div>' +
    '</div>' +
    // Advanced Settings
    '<div id="sett" class="add" style="z-index: 100; position: fixed; width: 520px; top: 300px; left: 50%; margin: -250px; padding: 5px; text-align: center; display: none;">' +
    '<div style="position: relative; width: 80%; left: 10%; border-bottom: 3px solid; padding: 2px; text-align: center;">Advanced Settings</div>' +
    '<div>' +
    '<p><label>Pushbullet Token: </label><input id="push" value="' +
    config.push +
    '"></p>' +
    '</div>' +
    '<div style="position: relative; width: 80%; left: 10%; border-bottom: 3px solid; padding: 2px; text-align: center;">Theme</div>' +
    '<p>' +
    '<label style="margin-right: 5px; display: inline-block; border-bottom: 1px solid;">Theme: ' +
    '<select id="adv_theme" value="' +
    config.theme +
    '">' +
    '<option value="default">Default (Light)</option>' +
    '<option value="dark">Dark</option>' +
    '<option value="darker">Darker</option>' +
    '<option value="custom">Custom</option>' +
    '</select>' +
    '</label>' +
    '<label style="margin-right: 0px; display: inline-block; border-bottom: 1px solid;">TO Theme: ' +
    '<select id="to_theme" value="' +
    config.to_theme +
    '">' +
    '<option value="1">Default</option>' +
    '<option value="2">Column Only</option>' +
    '<option value="3">Text Only</option>' +
    '</select>' +
    '</label>' +
    '</p>' +
    '<p>' +
    '<label style="width: 150px; margin-right: 5px; display: inline-block; border-bottom: 1px solid; text-align: left;">Main: #' +
    '<input id="theme_main" style="width: 55px; float: right;" maxlength="6">' +
    '</label>' +
    '<label style="width: 150px; margin-right: 5px; display: inline-block; border-bottom: 1px solid; text-align: left;">Primary: #' +
    '<input id="theme_primary" style="width: 55px; float: right;" maxlength="6">' +
    '</label>' +
    '<label style="width: 150px; margin-right: 0px; display: inline-block; border-bottom: 1px solid; text-align: left;">Secondary: #' +
    '<input id="theme_secondary" style="width: 55px; float: right;" maxlength="6">' +
    '</label>' +
    '</p>' +
    '<p>' +
    '<label style="width: 150px; margin-right: 5px; display: inline-block; border-bottom: 1px solid; text-align: left;">Text: #' +
    '<input id="theme_text" style="width: 55px; float: right;" maxlength="6">' +
    '</label>' +
    '<label style="width: 150px; margin-right: 5px; display: inline-block; border-bottom: 1px solid; text-align: left;">Link: #' +
    '<input id="theme_link" style="width: 55px; float: right;" maxlength="6">' +
    '</label>' +
    '<label style="width: 150px; margin-right: 0px; display: inline-block; border-bottom: 1px solid; text-align: left;">Visited: #' +
    '<input id="theme_visited" style="width: 55px; float: right;" maxlength="6">' +
    '</label>' +
    '</p>' +
    '<div>' +
    '<button id="sett_save"  style="margin-right: 5px;">Save</button>' +
    '<button id="sett_close" style="margin-right: 0px;">Close</button>' +
    '</div>' +
    '</div>'
);

// Click functions
$('#scan_button').click(function() {
  if ($(this).text() === 'Start') {
    $(this).text('Stop');
    _scan();
  } else {
    $(this).text('Start');
  }
});

$('#sett_button').click(function() {
  $('#sett').toggle();
});

$('#conf_button').click(function() {
  if ($(this).text() === 'Hide Config') {
    $(this).text('Show Config');
  } else {
    $(this).text('Hide Config');
  }
  $('#config').toggleClass('hidden');
});

$('#logg_button').click(function() {
  if ($(this).text() === 'Hide Logged HITs') {
    $(this).text('Show Logged HITs');
    $('#logged_hits').hide();
  } else {
    $(this).text('Hide Logged HITs');
    $('#logged_hits').show();
  }
});

$('#bloc_button').click(function() {
  $('#bl_div').toggle();
});

$('#bl_add').click(function() {
  $('#bl').show();
});

$('#bl_close').click(function() {
  $('#bl_div').hide();
});

$('#bl_import').click(function() {
  _import_block();
});

$('#bl_export').click(function() {
  _export_block();
});

$('#bl_add_save').click(function() {
  var obj = {
    term: $('#bl_term').val(),
    name: $('#bl_name').val() === '' ? $('#bl_term').val() : $('#bl_name').val()
  };

  _add_block(obj);

  $('#bl_term, #bl_name').val('');
  $('#bl').hide();
});

$('#bl_add_cancel').click(function() {
  $('#bl_term, #bl_name').val('');
  $('#bl').hide();
});

$('#edit_bl_save').click(function() {
  _update_block($(this).val());
  $('#edit_bl_term, #edit_bl_name').val('');
  $('#edit_bl').hide();
});

$('#edit_bl_delete').click(function() {
  _delete_block($(this).val());
  $('#edit_bl_term, #edit_bl_name').val('');
  $('#edit_bl').hide();
});

$('#edit_bl_cancel').click(function() {
  $('#edit_bl_term, #edit_bl_name').val('');
  $('#edit_bl').hide();
});

$('#incl_button').click(function() {
  $('#il_div').toggle();
});

$('#il_add').click(function() {
  $('#il').show();
});

$('#il_close').click(function() {
  $('#il_div').hide();
});

$('#il_import').click(function() {
  _import_include();
});

$('#il_export').click(function() {
  _export_include();
});

$('#il_add_save').click(function() {
  var obj = {
    term: $('#il_term').val().trim(),
    name:
      $('#il_name').val().trim() === ''
        ? $('#il_term').val().trim()
        : $('#il_name').val().trim(),
    sound: $('#il_sound').val(),
    noti_cb: $('#il_noti_cb').prop('checked'),
    sound_cb: $('#il_sound_cb').prop('checked'),
    push_cb: $('#il_push_cb').prop('checked')
  };

  _add_include(obj);

  $('#il_term, #il_name').val('');
  $('#il').hide();
});

$('#il_add_cancel').click(function() {
  $('#il_term, #il_name').val('');
  $('#il').hide();
});

$('#edit_il_save').click(function() {
  _update_include($(this).val());
  $('#edit_il_term, #edit_il_name, #edit_il_sound').val('');
  $('#edit_il_noti_cb, #edit_il_sound_cb, #edit_il_push_cb').prop(
    'checked',
    false
  );
  $('#edit_il').hide();
});

$('#edit_il_delete').click(function() {
  _delete_include($(this).val());
  $('#edit_il_term, #edit_il_name, #edit_il_sound').val('');
  $('#edit_il_noti_cb, #edit_il_sound_cb, #edit_il_push_cb').prop(
    'checked',
    false
  );
  $('#edit_il').hide();
});

$('#edit_il_cancel').click(function() {
  $('#edit_il_term, #edit_il_name, #edit_il_sound').val('');
  $('#edit_il_noti_cb, #edit_il_sound_cb, #edit_il_push_cb').prop(
    'checked',
    false
  );
  $('#edit_il').hide();
});

$('.on, .off').click(function() {
  $(this).toggleClass('on off');
  _save();
});

$('#sett_save').click(function() {
  _save('custom');
  _theme();
});

$('#sett_close').click(function() {
  $('#sett').hide();
});

$('#time').click(function() {
  $('.new').removeClass('new');
});

// Delegated click functions
$('body').on('click', '.blockit', function() {
  _edit_block($(this).val());
});

$('body').on('click', '.includeit', function() {
  _edit_include($(this).val());
});

$('body').on('click', '.rt', function() {
  _block($(this).data('term'), $(this).data('name'));
});

$('body').on('click', '.vb', function() {
  _export_vb($(this).val());
});

$('body').on('click', '.irc', function() {
  _export_irc($(this).val());
});

$('body').on('click', '.details', function() {
  $(this).toggleClass('fa-plus-circle fa-minus-circle');
  $('.info[value="' + $(this).val() + '"]').toggle();
});

// Delegated mouseover functions
$('body').on('mouseover', '.new', function() {
  $(this).removeClass('new');
});

// On change events
$('#new_audio').change(function() {
  _save();
  _sound('new');
});

$('#il_sound').change(function() {
  _sound('il');
});

$('#edit_il_sound').change(function() {
  _sound('il_edit');
});

$('#type, #size, #adv_theme, #to_theme, :checkbox').change(function() {
  _save();
});

$('#adv_theme, #to_theme').change(function() {
  _theme();
});

// On input events
$(
  '#delay, #min_rew, #min_avail, #min_to, #alert_delay'
).on('input', function() {
  _save();
});

function _scan() {
  if ($('#scan_button').text() === 'Stop') {
    var _url =
      url +
      $('#type').val() +
      $('#size').val() +
      minrew +
      $('#min_rew').val() +
      '&qualifiedFor=' +
      (config.qual ? 'on' : 'off');
    console.log(_url);
    var date = new Date(),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds(),
      ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    var timeis = [h, m, s, ampm];

    $.get(_url, function(data) {
      if (!worker) {
        _scrape_old(data, timeis);
      } else {
        _scrape_new(data, timeis);
      }
    }).fail(function() {
      setTimeout(function() {
        _scan();
      }, 2500);
    });
  }
}

function _scrape_old(data, timeis) {
  var keys = [],
    log_keys = [],
    to = [],
    logged_in;

  var $hits = $(data)
    .find('table[cellpadding="0"][cellspacing="5"][border="0"]')
    .eq(0)
    .children('tbody')
    .children('tr');

  for (var i = 0; i < $hits.length; i++) {
    var $hit = $hits.eq(i);

    var req_name, req_id, req_link, con_link, to_link;

    var req = $hit.find(
      'a[href^="/mturk/searchbar?selectedSearchType=hitgroups&requesterId="]'
    );
    if (req.length) {
      logged_in = true;
      req_name = $hit.find('span.requesterIdentity').text().trim();
      req_id = req.prop('href').split('requesterId=')[1];
      req_link =
        'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId=' +
        req_id;
      con_link = 'https://www.mturk.com/mturk/contact?requesterId=' + req_id;
      to_link = 'https://turkopticon.ucsd.edu/' + req_id;
    } else {
      logged_in = false;
      req_name = $hit.find('span.requesterIdentity').text().trim();
      req_id = $hit.find('span.requesterIdentity').text().trim();
      req_link =
        'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&searchWords=' +
        req_id.replace(/ /g, '+');
      con_link = 'https://#';
      to_link =
        'https://turkopticon.ucsd.edu/main/php_search?field=name&query=' +
        req_id.replace(/ /g, '+');
    }

    var group_id, prev_link, pand_link;

    //var prev = $hit.find('a[href^="/mturk/preview?groupId="]');
    var prev = $hit.find('a[href*="groupId="]');
    if (prev.length) {
      //group_id  = prev.prop('href').split('groupId=')[1];
      group_id = prev.prop('href').split('groupId=')[1].split('&')[0];
      prev_link = 'https://www.mturk.com/mturk/preview?groupId=' + group_id;
      pand_link =
        'https://www.mturk.com/mturk/previewandaccept?groupId=' + group_id;
    } else {
      group_id = 'na';
      prev_link = req_link;
      pand_link = req_link;
    }

    var title = $hit.find('a.capsulelink').text();
    var desc = $hit
      .find('td[class="capsule_field_title"]:contains(Description:)')
      .next()
      .text();
    var time = $hit
      .find('td[class="capsule_field_title"]:contains(Time Allotted:)')
      .next()
      .text();
    var reward = $hit
      .find('td[class="capsule_field_title"]:contains(Reward:)')
      .next()
      .text();
    var avail =
      $hit
        .find('td[class="capsule_field_title"]:contains(HITs Available:)')
        .next()
        .text() || 'N/A';

    var quals = $hit.find(
      'td[style="padding-right: 2em; white-space: nowrap;"]'
    );
    var qualif = 'None';
    var masters = 'N';

    if (quals.length) {
      qualif = '';
      for (var j = 0; j < quals.length; j++) {
        qualif += quals.eq(j).text().trim().replace(/\s+/g, ' ') + '; ';
      }
      if (qualif.indexOf('Masters has been granted') !== -1) {
        masters = 'Y';
      }
    }

    var key = req_id.trim() + title.trim() + reward.trim() + group_id.trim();
    keys.push(key);

    if (!hitlog[key]) {
      hitlog[key] = {
        reqname: req_name.trim(),
        reqid: req_id.trim(),
        reqlink: req_link.trim(),
        conlink: con_link.trim(),
        groupid: group_id.trim(),
        prevlink: prev_link.trim(),
        pandlink: pand_link.trim(),
        title: title.trim(),
        desc: desc.trim(),
        time: time.trim(),
        reward: reward.trim(),
        avail: avail.trim(),
        quals: qualif.trim(),
        masters: masters.trim(),
        key: key.trim(),
        tolink: to_link.trim(),
        to: { comm: 'N/A', fair: 'N/A', fast: 'N/A', pay: 'N/A' },
        rcolor: '#F08080',
        tcolor: '#F08080'
      };
      to.push([key, req_id]);
      log_keys.push(key);
      _color_db(hitlog[key]);
    } else {
      hitlog[key].avail = avail.trim();
    }
  }
  if ($hits.length) {
    _to(keys, log_keys, logged_in, to, timeis);
  } else {
    setTimeout(function() {
      _scan();
    }, 2500);
  }
}

function _scrape_new(data, timeis) {
  var keys = [],
    log_keys = [],
    to = [],
    logged_in = true;

  var hits = data.results;

  for (var i = 0; i < hits.length; i++) {
    var hit = hits[i],
      req_name = hit.requester_name,
      req_id = hit.requester_id,
      //req_link  = hit.requester_url,
      req_link =
        'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId=' +
        hit.requester_id,
      con_link =
        'https://www.mturk.com/mturk/contact?requesterId=' + hit.requester_id,
      group_id = hit.hit_set_id,
      //prev_link = hit.project_tasks_url,
      prev_link =
        'https://www.mturk.com/mturk/preview?groupId=' + hit.hit_set_id,
      //pand_link = hit.accept_project_task_url,
      pand_link =
        'https://www.mturk.com/mturk/previewandaccept?groupId=' +
        hit.hit_set_id,
      title = hit.title,
      desc = hit.description,
      time = _convert_seconds(hit.assignment_duration_in_seconds),
      reward = '$' + hit.monetary_reward.amount_in_dollars.toFixed(2),
      avail = hit.assignable_hits_count;

    var key = req_id + title + reward + group_id;
    keys.push(key);

    var qualif = 'None';
    var quals = hit.hit_requirements;

    if (quals.length) {
      qualif = '';
      for (var j = 0; j < quals.length; j++) {
        var q_comp = quals[j].comparator + ' ';
        var q_name = quals[j].qualification_type.name + ' ';

        var q_valu = quals[j].qualification_values;
        var q_values = '';
        for (var k = 0; k < quals.length; k++) {
          if (quals[j].qualification_values[k]) {
            q_values += quals[j].qualification_values[k];
            q_values += k === quals.length ? ', ' : '';
          }
        }
        qualif += (q_name + q_comp + q_values).trim() + '; ';
      }
    }

    console.log(qualif);

    if (!hitlog[key]) {
      hitlog[key] = {
        reqname: req_name,
        reqid: req_id,
        reqlink: req_link,
        conlink: con_link,
        groupid: group_id,
        prevlink: prev_link,
        pandlink: pand_link,
        title: title,
        desc: desc,
        time: time,
        reward: reward,
        avail: avail,
        quals: qualif.trim(),
        masters: '?',
        key: key,
        tolink: 'https://turkopticon.ucsd.edu/' + req_id,
        to: { comm: 'N/A', fair: 'N/A', fast: 'N/A', pay: 'N/A' },
        rcolor: '#F08080',
        tcolor: '#F08080'
      };
      to.push([key, req_id]);
      log_keys.push(key);
    } else {
      hitlog[key].avail = avail;
    }
  }
  _to(keys, log_keys, logged_in, to, timeis);
}

function _to(keys, log_keys, logged_in, to, timeis) {
  var ids = [];

  if (logged_in && to.length && config.to) {
    for (var i = 0; i < to.length; i++) {
      ids.push(to[i][1]);
    }
    $.get(
      'https://turkopticon.ucsd.edu/api/multi-attrs.php?ids=' + ids,
      function(data) {
        var to_data = JSON.parse(data);

        for (i = 0; i < to.length; i++) {
          if (
            !to_data[to[i][1]].length &&
            typeof to_data[to[i][1]].attrs != 'undefined'
          ) {
            hitlog[to[i][0]].to = to_data[to[i][1]].attrs;
          }
        }
      }
    ).always(function() {
      _build(keys, log_keys, timeis);
    });
  } else {
    _build(keys, log_keys, timeis);
  }
}

function _build(keys, log_keys, timeis) {
  var hit_html = '',
    log_html = '';

  for (var i = 0; i < keys.length; i++) {
    var hit = hitlog[keys[i]],
      blocked = _check_block(hit),
      included = _check_include(hit),
      classes = _color_to(hit),
      remove = false;

    if (hit.masters === 'Y') {
      classes += config.m ? ' m_hidden' : ' m';
    }

    if (
      Number(config.avail) > Number(hit.avail) ||
      Number(config.mto) > Number(hit.to.pay)
    ) {
      classes += ' hidden';
      remove = true;
    }

    if (blocked) {
      classes += config.bl ? ' bl_hidden' : ' bl';
      remove = true;
    }
    if (included) {
      classes += ' il';
      _included(included, hit);
    } else {
      classes += config.nl ? ' nl_hidden' : ' nl';
    }

    hit_html +=
      '<div class="cont" style="margin-bottom: 2px;">' +
      '<div class="' +
      classes +
      ' " style="overflow: hidden; white-space: nowrap; margin-bottom: 2px;">' +
      '<div style="float: left; width: calc(100% - 270px);">' +
      '<span style="width: 34%; float: left; display:inline-block; overflow: hidden;">' +
      '<button data-term="' +
      hit.reqid +
      '" data-name="' +
      hit.reqname +
      '" class="rt">R</button>' +
      '<button data-term="' +
      hit.title +
      '" data-name="' +
      hit.title +
      '" class="rt">T</button>' +
      '<a href="' +
      hit.reqlink +
      '">' +
      hit.reqname +
      '</a>' +
      '</span>' +
      '<span style="width: 64%; float: right; display:inline-block; overflow: hidden;">' +
      '<button value="' +
      hit.key +
      '" class="vb">vB</button>' +
      '<button value="' +
      hit.key +
      '" class="irc">IRC</button>' +
      '<a href="' +
      hit.prevlink +
      '">' +
      hit.title +
      '</a>' +
      '</span>' +
      '</div>' +
      '<div style="float: right;">' +
      '<span style="width: 60px; display:inline-block; text-align: center;">' +
      hit.avail +
      '</span>' +
      '<span style="width: 60px; display:inline-block; text-align: center;">' +
      '<a href="' +
      hit.pandlink +
      '">' +
      hit.reward +
      '</a>' +
      '</span>' +
      '<span class="to" style="width: 60px; display:inline-block; text-align: center;">' +
      '<a href="' +
      hit.tolink +
      '">' +
      hit.to.pay +
      '</a>' +
      '</span>' +
      '<span style="width: 30px; display:inline-block; text-align: center;">' +
      hit.masters +
      '</span>' +
      '<span style="width: 60px; display:inline-block; text-align: center;">' +
      '<button style="width: 20px; height: 20px; color: #000000; background-color: ' +
      hit.rcolor +
      '; margin: 1px;  border: 1px solid; font-size: 80%; padding: 1px;">R</button>' +
      '<button style="width: 20px; height: 20px; color: #000000; background-color: ' +
      hit.tcolor +
      '; margin: 1px;  border: 1px solid; font-size: 80%; padding: 1px;">T</button>' +
      '</span>' +
      '</div>' +
      '</div>' +
      '</div>';

    if (remove) {
      var index = log_keys.indexOf(keys[i]);

      if (index > -1) {
        log_keys.splice(index, 1);
      }
    }
  }

  if (log_keys.length) {
    for (var j = 0; j < log_keys.length; j++) {
      var hit_log = hitlog[log_keys[j]],
        included_log = _check_include(hit_log),
        classes_log = _color_to(hit_log);

      if (hit_log.masters === 'Y') {
        classes_log += config.m ? ' m_hidden' : ' m';
      }

      if (included_log) {
        classes_log += ' il';
      } else {
        classes_log += config.nl ? ' nl_hidden' : ' nl';
      }

      var quals = hit_log.quals.split(';');
      var qualif = '';

      for (var k = 0; k < quals.length; k++) {
        if (quals[k] !== '') {
          qualif += '<li style="padding: 2px;">' + quals[k] + '</li>';
        }
      }

      log_html +=
        '<div class="cont" style="margin-bottom: 2px;">' +
        '<div class="' +
        classes_log +
        '" style="overflow: hidden; white-space: nowrap;">' +
        '<div style="float: left;">' +
        '<span style="width: 80px; display:inline-block;">' +
        '<button class="fa fa-plus-circle fa-2 details" aria-hidden="true" value="' +
        hit_log.key +
        '" style="background-color: transparent; border: 0px; padding: 1px;"></button>' +
        timeis[0] +
        ':' +
        timeis[1] +
        timeis[3] +
        '</span>' +
        '</div>' +
        '<div style="float: left; width: calc(100% - 290px);">' +
        '<span style="width: 34%; float: left; display:inline-block; overflow: hidden;">' +
        '<button data-term="' +
        hit_log.reqid +
        '" data-name="' +
        hit_log.reqname +
        '" class="rt">R</button>' +
        '<button data-term="' +
        hit_log.title +
        '" data-name="' +
        hit_log.title +
        '" class="rt">T</button>' +
        '<a href="' +
        hit_log.reqlink +
        '">' +
        hit_log.reqname +
        '</a>' +
        '</span>' +
        '<span style="width: 64%; float: right; display:inline-block; overflow: hidden;">' +
        '<button value="' +
        hit_log.key +
        '" class="vb">vB</button>' +
        '<button value="' +
        hit_log.key +
        '" class="irc">IRC</button>' +
        '<a href="' +
        hit_log.prevlink +
        '">' +
        hit_log.title +
        '</a>' +
        '</span>' +
        '</div>' +
        '<div style="float: right;">' +
        '<span style="width: 60px; display: inline-block; text-align: center;">' +
        '<a href="' +
        hit_log.pandlink +
        '">' +
        hit_log.reward +
        '</a>' +
        '</span>' +
        '<span class="to" style="width: 60px; display:inline-block; text-align: center;">' +
        '<a href="' +
        hit_log.tolink +
        '">' +
        hit_log.to.pay +
        '</a>' +
        '</span>' +
        '<span style="width: 30px; display:inline-block; text-align: center;">' +
        hit_log.masters +
        '</span>' +
        '<span style="width: 60px; display:inline-block; text-align: center;">' +
        '<button style="width: 20px; height: 20px; color: #000000; background-color: ' +
        hit_log.rcolor +
        '; margin: 1px;  border: 1px solid; font-size: 80%; padding: 1px;">R</button>' +
        '<button style="width: 20px; height: 20px; color: #000000; background-color: ' +
        hit_log.tcolor +
        '; margin: 1px;  border: 1px solid; font-size: 80%; padding: 1px;">T</button>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '<div class="info ' +
        _color_to(hit_log) +
        '" value="' +
        hit_log.key +
        '" style="overflow: hidden; display: none; font-size: 11px;">' +
        '<div style="border-bottom: 1px solid #000000;"></div>' +
        '<span style="width: 33%; float: left; display:inline-block; padding: 5px;">' +
        '<span style="text-decoration: underline;">Description</span>' +
        '<div style="padding: 2px;">' +
        hit_log.desc +
        '</div>' +
        '<span style="text-decoration: underline;">Time</span>' +
        '<div style="padding: 2px;">' +
        hit_log.time +
        '</div>' +
        '</span>' +
        '<span style="width: 33%; float: left; display:inline-block; padding: 5px;">' +
        '<span style="text-decoration: underline;">Qualifications</span>' +
        qualif +
        '</span>' +
        '<span style="width: calc(34% - 30px); float: right; display:inline-block; padding: 5px;">' +
        '<span style="text-decoration: underline;">Turkopticon</span>' +
        '<br>' +
        '<span style="width: 70px; display:inline-block; padding: 2px;">Pay  : ' +
        hit_log.to.pay +
        '</span>' +
        '<span style="width: 70px; display:inline-block; padding: 2px;">Fair : ' +
        hit_log.to.fair +
        '</span>' +
        '<br>' +
        '<span style="width: 70px; display:inline-block; padding: 2px;">Comm : ' +
        hit_log.to.comm +
        '</span>' +
        '<span style="width: 70px; display:inline-block; padding: 2px;">Fast : ' +
        hit_log.to.fast +
        '</span>' +
        '</span>' +
        '</div>' +
        '</div>';

      logged++;
    }
    if (config.new) {
      _sound('new');
    }
  }
  $('#new_hits').html(hit_html);
  $('#log_hits').prepend(log_html);

  searches++;
  var hits_data =
    '<span> ' +
    timeis[0] +
    ':' +
    timeis[1] +
    ':' +
    timeis[2] +
    timeis[3] +
    ' Scanned HITs: ' +
    keys.length +
    '</span><span style="float: right;">' +
    searches +
    '</span>';
  var logged_hits_data = '<span style="float: right;">' + logged + '</span>';

  $('#hits_data').html(hits_data);
  $('#logged_hits_data').html(logged_hits_data);

  if ($('#scan_button').text() === 'Stop') {
    setTimeout(function() {
      _scan();
    }, $('#delay').val() * 1000);
  }
}

function _sound(sound) {
  if (sound === 'new') {
    $('#audio_' + config.newaudio)[0].play();
  }
  if (sound === 'include') {
    $('#audio_' + config.newaudio)[0].play();
  }
  if (sound === 'il') {
    $('#audio_' + $('#il_sound').val())[0].play();
  }
  if (sound === 'il_edit') {
    $('#audio_' + $('#edit_il_sound').val())[0].play();
  }
}

function _check_block(hit) {
  for (var key in blocklist) {
    var obj = blocklist[key];
    if (
      obj.term.toLowerCase() === hit.reqname.toLowerCase() ||
      obj.term.toLowerCase() === hit.title.toLowerCase() ||
      obj.term.toLowerCase() === hit.reqid.toLowerCase() ||
      obj.term.toLowerCase() === hit.groupid.toLowerCase()
    ) {
      return obj;
    }
  }
}

function _check_include(hit) {
  for (var key in includelist) {
    var obj = includelist[key];
    if (
      obj.term.toLowerCase() === hit.reqname.toLowerCase() ||
      obj.term.toLowerCase() === hit.title.toLowerCase() ||
      obj.term.toLowerCase() === hit.reqid.toLowerCase() ||
      obj.term.toLowerCase() === hit.groupid.toLowerCase()
    ) {
      return obj;
    }
  }
}

function _included(obj, hit) {
  var check = noti_delay.indexOf(hit.key) !== -1;
  var pushcheck = push_delay.indexOf(hit.key) !== -1;

  if (!check) {
    noti_delay.unshift(hit.key);
    setTimeout(function() {
      noti_delay.pop();
    }, config.alert * 1000);
  }
  if (obj.noti_cb && !check) {
    Notification.requestPermission();
    var n = new Notification(hit.reqname + ' | ' + hit.reward, {
      icon: 'http://kadauchi.com/avatar4.jpg',
      body: hit.title
    });
    setTimeout(n.close.bind(n), 5000);

    n.onclick = function(e) {
      e.preventDefault();
      window.open(hit.prevlink, '_blank');
    };
  }
  if (obj.sound_cb && !check) {
    $('#audio_' + obj.sound)[0].play();
  }
  if (obj.push_cb && !pushcheck && config.pb) {
    push_delay.unshift(hit.key);
    setTimeout(function() {
      push_delay.pop();
    }, 900000);

    var push = {};

    push['type'] = 'note';
    push['title'] = 'HIT Finder';
    push['body'] =
      '[' +
      hit.reqname +
      ']\n[' +
      hit.title +
      ']\n[' +
      hit.reward +
      ']\n[' +
      hit.prevlink +
      ']';

    $.ajax({
      type: 'POST',
      headers: { Authorization: 'Bearer ' + config.push },
      url: 'https://api.pushbullet.com/v2/pushes',
      data: push
    });
  }
}

function _color_to(hit) {
  var to = hit.to.pay;
  if (to > 4) {
    return 'toHigh';
  } else if (to > 3) {
    return 'toGood';
  } else if (to > 2) {
    return 'toAverage';
  } else if (to > 1) {
    return 'toLow';
  } else if (to > 0) {
    return 'toPoor';
  } else {
    return 'toNone';
  }
}

function _color_db(hit) {
  if (hitdb.db && hitdb.db.objectStoreNames.contains('HIT')) {
    hitdb.db
      .transaction('HIT', 'readonly')
      .objectStore('HIT')
      .index('title')
      .get(hit.title).onsuccess = function(e) {
      if (e.target.result) {
        hitlog[hit.key].tcolor = '#90EE90';
      }
    };
    hitdb.db
      .transaction('HIT', 'readonly')
      .objectStore('HIT')
      .index('requesterId')
      .get(hit.reqid).onsuccess = function(e) {
      if (e.target.result) {
        hitlog[hit.key].rcolor = '#90EE90';
      }
    };
  }
}

function _convert_seconds(seconds) {
  seconds = Number(seconds);
  var h = Math.floor(seconds / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 3600 % 60);
  var time = '';
  if (h > 0) {
    time += h + ' hour(s) ';
  }
  if (m > 0) {
    time += m + ' minutes(s) ';
  }
  if (s > 0) {
    time += s + ' seconds(s)';
  }
  return time;
}

function _block(term, name) {
  $('#bl_term').val(term);
  $('#bl_name').val(name);
  $('#bl').show();
}

function _add_block(obj) {
  if (!blocklist[obj.term]) {
    blocklist[obj.term] = obj;
    _init_lists();
  }
}

function _edit_block(term) {
  var obj = blocklist[term];
  $('#edit_bl_term').val(obj.term).text(obj.term);
  $('#edit_bl_name').val(obj.name);
  $('#edit_bl_save').val(obj.term);
  $('#edit_bl_delete').val(obj.term);
  $('#edit_bl').show();
}

function _update_block(block) {
  var obj = blocklist[block];
  obj.name = $('#edit_bl_name').val();
  _init_lists();
}

function _delete_block(block) {
  delete blocklist[block];
  _init_lists();
}

function _add_include(obj) {
  if (!includelist[obj.term]) {
    includelist[obj.term] = obj;
    _init_lists();
  }
}

function _edit_include(term) {
  var obj = includelist[term];

  $('#edit_il_term').val(obj.term).text(obj.term);
  $('#edit_il_name').val(obj.name);
  $('#edit_il_sound').val(obj.sound);

  $('#edit_il_noti_cb').prop('checked', obj.noti_cb);
  $('#edit_il_sound_cb').prop('checked', obj.sound_cb);
  $('#edit_il_push_cb').prop('checked', obj.push_cb);

  $('#edit_il_save').val(obj.term);
  $('#edit_il_delete').val(obj.term);

  $('#edit_il').show();
}

function _update_include(term) {
  var obj = includelist[term];
  obj.name = $('#edit_il_name').val().trim();
  obj.sound = $('#edit_il_sound').val().trim();
  obj.noti_cb = $('#edit_il_noti_cb').prop('checked');
  obj.sound_cb = $('#edit_il_sound_cb').prop('checked');
  obj.push_cb = $('#edit_il_push_cb').prop('checked');
  _init_lists();
}

function _delete_include(term) {
  delete includelist[term];
  _init_lists();
}

function _init_lists() {
  var bl_sort = [],
    il_sort = [],
    bl_html = '',
    il_html = '';

  for (var bl_key in blocklist) {
    bl_sort.push([bl_key, blocklist[bl_key].name]);
  }

  bl_sort.sort(function(a, b) {
    if (a[1].toLowerCase() < b[1].toLowerCase()) return -1;
    if (a[1].toLowerCase() > b[1].toLowerCase()) return 1;
    return 0;
  });

  for (var i = 0; i < bl_sort.length; i++) {
    var bl_obj = blocklist[bl_sort[i][0]];
    bl_html +=
      '<button class="blockit" style="margin: 2px;" value="' +
      bl_obj.term +
      '" title="' +
      bl_obj.term +
      '">' +
      bl_obj.name +
      '</button>';
  }

  for (var il_key in includelist) {
    il_sort.push([il_key, includelist[il_key].name]);
  }

  il_sort.sort(function(a, b) {
    if (a[1].toLowerCase() < b[1].toLowerCase()) return -1;
    if (a[1].toLowerCase() > b[1].toLowerCase()) return 1;
    return 0;
  });

  for (var j = 0; j < il_sort.length; j++) {
    var il_obj = includelist[il_sort[j][0]];
    il_html +=
      '<button class="includeit" style="margin: 2px;" value="' +
      il_obj.term +
      '" title="' +
      il_obj.term +
      '">' +
      il_obj.name +
      '</button>';
  }

  $('#bl_items').html(bl_html);
  $('#il_items').html(il_html);
  _save('init');
}

function _import_block() {
  var import_bl = prompt(
    'Block List Import\n\n' +
      'You can import from HIT Finder or HIT Scraper.\n\n' +
      'This will not delete your current block list, only add to it.\n\n' +
      'Please enter your block list here.',
    ''
  );

  if (import_bl) {
    var json = _json_validator(import_bl);

    if (json) {
      var _bl_obj = JSON.parse(import_bl);
      for (var key in _bl_obj) {
        if (
          _bl_obj[key].hasOwnProperty('term') &&
          _bl_obj[key].hasOwnProperty('name') &&
          !_bl_obj[key].hasOwnProperty('sound')
        ) {
          if (!blocklist[key]) {
            blocklist[key] = {
              term: _bl_obj[key].term,
              name: _bl_obj[key].name
            };
          }
        } else {
          alert(
            'An error occured while importing.\n\n Please check if you have a valid import and try again.'
          );
          break;
        }
      }
      _init_lists();
    } else if (import_bl.match(/^/)) {
      var _bl_arr = import_bl.trim().split('^');
      for (var i = 0; i < _bl_arr.length; i++) {
        if (!blocklist[_bl_arr[i]]) {
          blocklist[_bl_arr[i]] = {
            term: _bl_arr[i],
            name: _bl_arr[i]
          };
        }
      }
      _init_lists();
    }
  } else {
    alert(
      'An error occured while importing.\n\n Please check if you have a valid import and try again.'
    );
  }
}

function _export_block() {
  GM_setClipboard(localStorage.getItem('_finder_bl'));
  alert('Your block list has been copied to your clipboard.');
}

function _import_include() {
  var import_il = prompt(
    'Include List Import\n\n' +
      'You can import from HIT Finder or HIT Scraper.\n\n' +
      'This will not delete your current include list, only add to it.\n\n' +
      'Please enter your include list here.',
    ''
  );

  if (import_il) {
    var json = _json_validator(import_il);

    if (json) {
      var _il_obj = JSON.parse(import_il);

      for (var key in _il_obj) {
        if (
          _il_obj[key].hasOwnProperty('term') &&
          _il_obj[key].hasOwnProperty('name') &&
          _il_obj[key].hasOwnProperty('sound')
        ) {
          if (!includelist[key]) {
            includelist[key] = {
              term: _il_obj[key].term,
              name: _il_obj[key].name,
              sound: _il_obj[key].sound,
              noti_cb: _il_obj[key].noti_cb,
              sound_cb: _il_obj[key].sound_cb,
              push_cb: _il_obj[key].push_cb
            };
          }
        } else {
          alert(
            'An error occured while importing.\n\n Please check that you have a valid import and try again.'
          );
          break;
        }
      }
      _init_lists();
    } else if (import_il.match(/^/)) {
      var _il_arr = import_il.split('^');

      for (var i = 0; i < _il_arr.length; i++) {
        if (!includelist[_il_arr[i]]) {
          includelist[_il_arr[i]] = {
            term: _il_arr[i],
            name: _il_arr[i],
            sound: '1',
            noti_cb: true,
            sound_cb: true,
            push_cb: false
          };
        }
      }
      _init_lists();
    }
  } else {
    alert(
      'An error occured while importing.\n\n Please check that you have a valid import and try again.'
    );
  }
}

function _export_include() {
  GM_setClipboard(localStorage.getItem('_finder_il'));
  alert('Your include list has been copied to your clipboard.');
}

function _export_vb(key) {
  var hit = hitlog[key];

  var pay = hit.to.pay,
    _pay = '#B30000';
  if (pay > 3.99) {
    _pay = '#00B300';
  } else if (pay > 2.99) {
    _pay = '#B3B300';
  } else if (pay > 1.99) {
    _pay = '#B37400';
  }

  var fair = hit.to.fair,
    _fair = '#B30000';
  if (fair > 3.99) {
    _fair = '#00B300';
  } else if (fair > 2.99) {
    _fair = '#B3B300';
  } else if (fair > 1.99) {
    _fair = '#B37400';
  }

  var comm = hit.to.comm,
    _comm = '#B30000';
  if (comm > 3.99) {
    _comm = '#00B300';
  } else if (comm > 2.99) {
    _comm = '#B3B300';
  } else if (comm > 1.99) {
    _comm = '#B37400';
  }

  var fast = hit.to.fast,
    _fast = '#B30000';
  if (fast > 3.99) {
    _fast = '#00B300';
  } else if (fast > 2.99) {
    _fast = '#B3B300';
  } else if (fast > 1.99) {
    _fast = '#B37400';
  }

  var exportcode =
    '[table][tr][td]' +
    '[b]Title:[/b] [URL=' +
    hit.prevlink +
    ']' +
    hit.title +
    '[/URL] | [URL=' +
    hit.pandlink +
    ']PANDA[/URL]\n' +
    '[b]Requester:[/b] [URL=' +
    hit.reqlink +
    ']' +
    hit.reqname +
    '[/URL] [' +
    hit.reqid +
    '] ([URL=' +
    hit.conlink +
    ']Contact[/URL])\n' +
    '([URL=' +
    hit.tolink +
    ']TO[/URL]):' +
    '[b] [Pay: [COLOR=' +
    _pay +
    ']' +
    pay +
    '[/COLOR]][/b]' +
    '[b] [Fair: [COLOR=' +
    _fair +
    ']' +
    fair +
    '[/COLOR]][/b]' +
    '[b] [Comm: [COLOR=' +
    _comm +
    ']' +
    comm +
    '[/COLOR]][/b]' +
    '[b] [Fast: [COLOR=' +
    _fast +
    ']' +
    fast +
    '[/COLOR]][/b]\n' +
    '[b]Description:[/b] ' +
    hit.desc +
    '\n' +
    '[b]Time:[/b] ' +
    hit.time +
    '\n' +
    '[b]HITs Available:[/b] ' +
    hit.avail +
    '\n' +
    '[b]Reward:[/b] [COLOR=green][b] ' +
    hit.reward +
    '[/b][/COLOR]\n' +
    '[b]Qualifications:[/b] ' +
    hit.quals +
    '\n' +
    '[/td][/tr][/table]';

  GM_setClipboard(exportcode);
  alert('Forum export has been copied to your clipboard.');
}

function _export_irc(key) {
  var hit = hitlog[key];

  $.get(
    'https://ns4t.net/yourls-api.php?action=bulkshortener&title=MTurk&signature=39f6cf4959&urls[]=' +
      hit.prevlink +
      '&urls[]=' +
      hit.pandlink,
    function(data) {
      var urls = data.split(';'),
        preview = urls[0],
        panda = urls[1];

      var exportcode =
        hit.masters === 'Y'
          ? 'MASTERS ■ Req: ' +
            hit.reqname +
            ' ■ Title: ' +
            hit.title +
            ' ■ Reward: ' +
            hit.reward
          : 'Req: ' +
            hit.reqname +
            ' ■ Title: ' +
            hit.title +
            ' ■ Reward: ' +
            hit.reward;
      exportcode +=
        preview !== panda
          ? ' ■ Prev: ' + preview + ' ■ PandA: ' + panda
          : ' ■ Search: ' + preview;
      exportcode +=
        ' ■ TO: (Pay: ' +
        hit.to.pay +
        ') (Fair: ' +
        hit.to.fair +
        ') (Comm: ' +
        hit.to.comm +
        ') (Fast: ' +
        hit.to.fast +
        ')';

      GM_setClipboard(exportcode);
      alert('IRC export has been copied to your clipboard.');
    }
  ).fail(function() {
    alert('Failed to shorten links.');
  });
}

function _json_validator(data) {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
}

function _save(type) {
  if (type !== 'init' && type !== 'custom') {
    config.delay = $('#delay').val();
    config.rew = $('#min_rew').val();
    config.avail = $('#min_avail').val();
    config.mto = $('#min_to').val();
    config.alert = $('#alert_delay').val();
    config.type = $('#type').val();
    config.size = $('#size').val();
    config.newaudio = $('#new_audio').val();
    config.theme = $('#adv_theme').val();
    config.to_theme = $('#to_theme').val();

    config.new = $('#new_sound').prop('checked');
    config.pb = $('#pb').prop('checked');
    config.to = $('#to').prop('checked');
    config.qual = $('#qual').prop('checked');
    config.nl = $('#nl_hide').prop('checked');
    config.bl = $('#bl_hide').prop('checked');
    config.m = $('#m_hide').prop('checked');
    console.log($('#push').val());
  }
  if (type === 'custom' && $('#adv_theme').val() === 'custom') {
    config.custom = {
      main: $('#theme_main').val(),
      primary: $('#theme_primary').val(),
      secondary: $('#theme_secondary').val(),
      text: $('#theme_text').val(),
      link: $('#theme_link').val(),
      visited: $('#theme_visited').val(),
      prop: false
    };
    themes.custom = config.custom;
  }
  config.push = $('#push').val();

  localStorage.setItem('_finder', JSON.stringify(config));
  localStorage.setItem('_finder_bl', JSON.stringify(blocklist));
  localStorage.setItem('_finder_il', JSON.stringify(includelist));

  if (config.nl) {
    $('.nl').toggleClass('nl nl_hidden');
  } else {
    $('.nl_hidden').toggleClass('nl nl_hidden');
  }

  if (config.bl) {
    $('.bl').toggleClass('bl bl_hidden');
  } else {
    $('.bl_hidden').toggleClass('bl bl_hidden');
  }

  if (config.m) {
    $('.m').toggleClass('m m_hidden');
  } else {
    $('.m_hidden').toggleClass('m m_hidden');
  }
}

function _theme() {
  var theme = themes[config.theme];

  $('#theme_main').val(theme.main).prop('disabled', theme.prop);
  $('#theme_primary').val(theme.primary).prop('disabled', theme.prop);
  $('#theme_secondary').val(theme.secondary).prop('disabled', theme.prop);
  $('#theme_text').val(theme.text).prop('disabled', theme.prop);
  $('#theme_link').val(theme.link).prop('disabled', theme.prop);
  $('#theme_visited').val(theme.visited).prop('disabled', theme.prop);
  _write_theme();
}

function _write_theme() {
  var css = _to_theme(),
    theme = themes[config.theme];

  css +=
    'html {color: #' +
    theme.text +
    '; background-color: #' +
    theme.main +
    '; line-height: 1.5; font-family: "Roboto", sans-serif; font-size: 15px; font-weight: normal;}' +
    '#bl_items, #il_items {background-color: #' +
    theme.main +
    '; height: calc(100% - 64px); overflow-y: scroll;}' +
    '#bl_div, #il_div {background-color: #' +
    theme.primary +
    '; border: 2px solid #' +
    theme.secondary +
    ';}' +
    '.add {background-color: #' +
    theme.primary +
    '; border: 2px solid #' +
    theme.secondary +
    ';}' +
    '.bl {border: 2px solid  #FF0000;}' +
    '.il {border: 2px solid  #009900;}' +
    '.hidden, .nl_hidden, .bl_hidden, .m_hidden {display: none;}' +
    'button:focus {outline: none !important;}';
  $('#css').html(css);
}

function _to_theme() {
  var to,
    theme = themes[config.theme],
    color = '';

  if (config.theme === 'default') {
    color = 'd9d9d9';
  } else {
    color = '262626';
  }

  switch (config.to_theme) {
    case '1':
      to =
        'td {font-weight: bold;}' +
        '.cont, .hit, .details {color: #000000;}' +
        '.toHigh    {background-color: #33cc59;}' +
        '.toGood    {background-color: #a6cc33;}' +
        '.toAverage {background-color: #cccc33;}' +
        '.toLow     {background-color: #cca633;}' +
        '.toPoor    {background-color: #cc3333;}' +
        '.toNone    {background-color: #cccccc;}' +
        '.rt       {width: 20px; height: 20px; background-color: transparent; margin: 1px;  border: 1px solid  #000000; font-size: 80%; padding: 1px;}' +
        '.vb, .irc {width: 25px; height: 20px; background-color: transparent; margin: 1px;  border: 1px solid  #000000; font-size: 80%; padding: 1px;}';
      return to;
    case '2':
      to =
        'a         {color: #' +
        theme.link +
        ';}' +
        'a:visited {color: #' +
        theme.visited +
        ';}' +
        'tbody td  {color: #' +
        theme.text +
        ';}' +
        '.to a {color: #000000;}' +
        '.cont, .details {color: #' +
        theme.text +
        ';}' +
        '.toHigh    {background-color: #' +
        color +
        ';}' +
        '.toGood    {background-color: #' +
        color +
        ';}' +
        '.toAverage {background-color: #' +
        color +
        ';}' +
        '.toLow     {background-color: #' +
        color +
        ';}' +
        '.toPoor    {background-color: #' +
        color +
        ';}' +
        '.toNone    {background-color: #' +
        color +
        ';}' +
        '.toHigh    .to {background-color: #33cc59;}' +
        '.toGood    .to {background-color: #a6cc33;}' +
        '.toAverage .to {background-color: #cccc33;}' +
        '.toLow     .to {background-color: #cca633;}' +
        '.toPoor    .to {background-color: #cc3333;}' +
        '.toNone    .to {background-color: #cccccc;}' +
        '.rt       {width: 20px; height: 20px; color: #' +
        theme.text +
        '; background-color: transparent; margin: 1px;  border: 1px solid  #' +
        theme.text +
        '; font-size: 80%; padding: 1px;}' +
        '.vb, .irc {width: 25px; height: 20px; color: #' +
        theme.text +
        '; background-color: transparent; margin: 1px;  border: 1px solid  #' +
        theme.text +
        '; font-size: 80%; padding: 1px;}';
      return to;
    case '3':
      to =
        'a         {color: #' +
        theme.link +
        ';}' +
        'a:visited {color: #' +
        theme.visited +
        ';}' +
        'tbody td  {color: #' +
        theme.text +
        ';}' +
        '.cont, .details {color: #' +
        theme.text +
        ';}' +
        '.toHigh    {background-color: #' +
        color +
        ';}' +
        '.toGood    {background-color: #' +
        color +
        ';}' +
        '.toAverage {background-color: #' +
        color +
        ';}' +
        '.toLow     {background-color: #' +
        color +
        ';}' +
        '.toPoor    {background-color: #' +
        color +
        ';}' +
        '.toNone    {background-color: #' +
        color +
        ';}' +
        '.toHigh    .to a {color: #33cc59;}' +
        '.toGood    .to a {color: #a6cc33;}' +
        '.toAverage .to a {color: #cccc33;}' +
        '.toLow     .to a {color: #cca633;}' +
        '.toPoor    .to a {color: #cc3333;}' +
        '.toNone    .to a {color: #cccccc;}' +
        '.rt       {width: 20px; height: 20px; color: #' +
        theme.text +
        '; background-color: transparent; margin: 1px;  border: 1px solid  #' +
        theme.text +
        '; font-size: 80%; padding: 1px;}' +
        '.vb, .irc {width: 25px; height: 20px; color: #' +
        theme.text +
        '; background-color: transparent; margin: 1px;  border: 1px solid  #' +
        theme.text +
        '; font-size: 80%; padding: 1px;}';
      return to;
  }
}

$('#type option[value="' + config.type + '"]').prop('selected', true);
$('#size option[value="' + config.size + '"]').prop('selected', true);
$('#new_audio option[value="' + config.newaudio + '"]').prop('selected', true);
$('#adv_theme option[value="' + config.theme + '"]').prop('selected', true);
$('#to_theme option[value="' + config.to_theme + '"]').prop('selected', true);

_theme();
_init_lists();
