// All credit to http://stackoverflow.com/questions/1444409/in-javascript-how-can-i-replace-text-in-an-html-page-without-affecting-the-tags

function marioMakerCreateLink(match) {
	 var link = document.createElement('a');
    link.href = 'https://supermariomakerbookmark.nintendo.net/courses/'+match[0];
    link.appendChild(document.createTextNode(match[0]));
    return link;
}

function marioMakerReplaceInElement(element, regex) {
    // iterate over child nodes in reverse, as replacement may increase
    // length of child node list.
    for (var i = 0; i < element.childNodes.length; i++) {
        var child = element.childNodes[i];
        if (child.nodeType == 1) { // ELEMENT_NODE
            var tag = child.nodeName.toLowerCase();
            if (tag != 'style' && tag != 'script' && tag != 'a') // special cases, don't touch CDATA elements or links
                marioMakerReplaceInElement(child, regex);
        } else if (child.nodeType == 3) { // TEXT_NODE
            marioMakerReplaceInText(child, regex);
        }
    }
}
function marioMakerReplaceInText(text, regex) {
    var match;
    var matches = [];
    while (match = regex.exec(text.data))
        matches.push(match);
    for (var i = 0; i < matches.length; i++) {
        match = matches[i];
        text.splitText(match.index);
        text.nextSibling.splitText(match[0].length);
        text.parentNode.replaceChild(marioMakerCreateLink(match), text.nextSibling);
    }
}

var regex = /[0-9a-f]{4}[- ][0-9a-f]{4}[- ][0-9a-f]{4}[- ][0-9a-f]{4}/gi;

marioMakerReplaceInElement(document.body, regex);
