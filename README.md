# Super Mario Maker Course ID Linkifier

<small>(I'm open to suggestions for a better name)</small>

## 2015\-12\-05: None of this works yet! This is all speculative! Read on only if you are a developer!

Herein lies a script, and maybe in the future also some browser extensions, to turn all unlinked Super Mario Maker Course IDs into Web Portal links.

Of course, as of this writing, the Web Portal doesn't exist yet. My effort here is made under the assumption that the portal URL for a course will be able to be constructed from only the Course ID. If that ends up not being the case, then, well, I'll know more about browser extensions than I did before.

**`mariomaker.js`** can be run by itself as a user script (is Greasemonkey still a thing? I don't even know) or bookmarklet. The script should be executed after the DOM has finished loading. Here's the current script as a bookmarklet:

### <a href="javascript:(function(){function%20marioMakerReplaceInElement(element,find,replace){for(var%20i=element.childNodes.length;i-->0;){var%20child=element.childNodes[i];if(child.nodeType==1){var%20tag=child.nodeName.toLowerCase();if(tag!='style'&&tag!='script'&&tag!='a')marioMakerReplaceInElement(child,find,replace);}else%20if(child.nodeType==3){marioMakerReplaceInText(child,find,replace);}}}function%20marioMakerReplaceInText(text,find,replace){var%20match;var%20matches=[];while(match=find.exec(text.data))matches.push(match);for(var%20i=matches.length;i-->0;){match=matches[i];text.splitText(match.index);text.nextSibling.splitText(match[0].length);text.parentNode.replaceChild(replace(match),text.nextSibling);}}var%20find=/[0-9a-f]{4}[-][0-9a-f]{4}[-][0-9a-f]{4}[-][0-9a-f]{4}/gi;marioMakerReplaceInElement(document.body,find,function(match){var%20link=document.createElement('a');link.href='http://supermariomaker.nintendo.com/course/'+match[0];link.appendChild(document.createTextNode(match[0]));return%20link;});})();">Mario Maker Linkifier</a>

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


