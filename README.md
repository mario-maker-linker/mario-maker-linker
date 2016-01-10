# Super Mario Maker Course ID Linkifier

Herein lies a script and some browser extensions to turn all unlinked Super Mario Maker Course IDs into Bookmark links.

Thanks to the most excellent (and extensive) work of @freundTech, the script now has several snazzy features. Now it adds a little plus-sign next to all course links that lets you bookmark the course without visiting the Bookmark site, and it watches for new HTML added to the page, so it will work in chat web apps like Kiwi IRC, as well as any other site that loads content via AJAX.

**`mariomaker.js`** can be run by itself as a user script or bookmarklet. The script should be executed after the DOM has finished loading.

## TODO:

### General

- Build script for all extensions, if possible

- Be more graceful about what domains the script runs on
    + Pre-load with common Mario Maker sharing sites
    + Allow domains to be configured
    + Add a toolbar button to toggle the script on and off

- Come up with a snazzier name for this thing

### Safari extension

- Unfortunately this requires a paid developer membership with Apple these days, so someone else might have to take this on


