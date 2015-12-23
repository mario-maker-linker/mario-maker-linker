# Super Mario Maker Course ID Linkifier

<small>(I'm open to suggestions for a better name)</small>

## 2015\-12\-22: Bookmark is live, and this now works!

Herein lies a script and one or more browser extensions to turn all unlinked Super Mario Maker Course IDs into Bookmark links.

At the moment this uses a very, very crude regular expression replacement on every DOM node in the document. This is not ideal, of course, so any pull requests to make this thing better are most welcome.

**`mariomaker.js`** can be run by itself as a user script (is Greasemonkey still a thing? I don't even know) or bookmarklet. The script should be executed after the DOM has finished loading.

## TODO:

### General

- Build script for all extensions, if possible

- Be more graceful about what domains the script runs on
    + Pre-load with common Mario Maker sharing sites?
    + Allow domains to be configured? Will require UI and way deeper extension knowledge than I have at this moment
    + A simple toolbar button to toggle the script on and off?

### Safari extension

- Unfortunately this requires a paid developer membership with Apple these days, so someone else might have to take this on


