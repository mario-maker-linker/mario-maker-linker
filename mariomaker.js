// All credit to http://stackoverflow.com/questions/1444409/in-javascript-how-can-i-replace-text-in-an-html-page-without-affecting-the-tags

function marioMakerReplaceInElement(element, find, replace) {
    // iterate over child nodes in reverse, as replacement may increase
    // length of child node list.
    for (var i= element.childNodes.length; i-->0;) {
        var child= element.childNodes[i];
        if (child.nodeType==1) { // ELEMENT_NODE
            var tag= child.nodeName.toLowerCase();
            if (tag!='style' && tag!='script' && tag!='a') // special cases, don't touch CDATA elements or links
                marioMakerReplaceInElement(child, find, replace);
        } else if (child.nodeType==3) { // TEXT_NODE
            marioMakerReplaceInText(child, find, replace);
        }
    }
}
function marioMakerReplaceInText(text, find, replace) {
    var match;
    var matches = [];
    while (match = find.exec(text.data))
        matches.push(match);
    for (var i = matches.length; i-->0;) {
        match = matches[i];
        text.splitText(match.index);
        text.nextSibling.splitText(match[0].length);
        text.parentNode.replaceChild(replace(match), text.nextSibling);
    }
}

var find= /[0-9a-f]{4}[- ][0-9a-f]{4}[- ][0-9a-f]{4}[- ][0-9a-f]{4}/gi;

marioMakerReplaceInElement(document.body, find, function(match) {
    var link = document.createElement('a');
    link.href= 'https://supermariomakerbookmark.nintendo.net/courses/'+match[0];
    link.appendChild(document.createTextNode(match[0]));
    return link;
});