# Super Mario Maker Course ID Linkifier

<small>(I'm open to suggestions for a better name)</small>

## 2015\-12\-05: None of this works yet! This is all speculative! Read on only if you are a developer!

Herein lies a script, and maybe in the future also some browser extensions, to turn all unlinked Super Mario Maker Course IDs into Web Portal links.

Of course, as of this writing, the Web Portal doesn't exist yet. My effort here is made under the assumption that the portal URL for a course will be able to be constructed from only the Course ID. If that ends up not being the case, then, well, I'll know more about browser extensions than I did before.

**`mariomaker.js`** can be run by itself as a user script (is Greasemonkey still a thing? I don't even know) or bookmarklet. The script should be executed after the DOM has finished loading.

## TODO:

### General

- Change the script to make it work with the actual Web Portal when it launches, of course
- Build script for all extensions, if possible
    + Including modifying the bookmarklet in the README

### Chrome extension

- Be more graceful about what domains the script runs on
    + Pre-load with common Mario Maker sharing sites?
    + Allow domains to be configured? Will require UI and way deeper Chrome extension knowledge than I have at this moment
    + A simple toolbar button to toggle the script on and off?

### Firefox extension

- Research making one or recruit help

### Safari extension

- Research making one or recruit help


