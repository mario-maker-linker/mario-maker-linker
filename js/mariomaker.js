(function() {
	function searchInElement(element, regex) {
		for (var i = 0; i < element.childNodes.length; i++) {
			var child = element.childNodes[i];
			if (child.nodeType == Node.ELEMENT_NODE) {
				var tag = child.nodeName.toLowerCase();
				if (tag != 'style' && tag != 'script' ) // special cases, don't touch CDATA elements
					searchInElement(child, regex);
			} else if (child.nodeType == Node.TEXT_NODE) {
				searchInText(child, regex);
			}
		}
	}
	function searchInText(text, regex) {
		var match;
		var matches = [];
		while (match = regex.exec(text.data)) {
			matches.push(match);
		}

		for (var i = 0; i < matches.length; i++) {
			getCourseInfo(matches[i], text);
		}
	}

	function getCourseInfo(match, text) {
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == XMLHttpRequest.DONE) {
				if (request.status == 200) {
					var parser = new DOMParser();
					var doc = parser.parseFromString(request.responseText, "text/html");

					var metas = doc.getElementsByTagName("meta");
					for (var i = 0; i < metas.length; i++) {
						if (metas[i].getAttribute("name") == "csrf-token") {
							var token = metas[i].getAttribute("content");
						}
					}

					var bookmarkbutton = doc.getElementsByClassName("button playlist link off")[0];
					var isBookmarked = true;
					if (bookmarkbutton.classList.contains("disabled")) {
						isBookmarked = false;
					}

					if (token !== null) {
						insertLink(id, match, token, isBookmarked, text);
						insertButton(id, match, token, isBookmarked, text);
					}
				}
			}
		}
		var id = normalizedCourseID(match[0]);
		request.open("GET", "https://supermariomakerbookmark.nintendo.net/courses/"+id);
		request.withCredentials = true;
		request.send()
	}

	function normalizedCourseID(string) {
		return string.replace(/ /g, '-').toUpperCase();
	}

	function insertLink(id, match, token, isBookmarked, text) {
		var link = document.createElement('a');
		link.href = 'https://supermariomakerbookmark.nintendo.net/courses/'+id;
		link.appendChild(document.createTextNode(match[0]));
		text.splitText(match.index);
		text.nextSibling.splitText(match[0].length);
		text.parentNode.replaceChild(link, text.nextSibling);

	}

	function insertButton(id, match, token, isBookmarked, text) {
		var directbookmark = document.createElement('a');
		directbookmark.href = "";
		if (isBookmarked) {
			directbookmark.onclick = function(event) {
				setBookmark(id, token, event.target);
				return false;
			};
			imageSrc = imageBookmark;
		}
		else {
			directbookmark.onclick = function(event) {
				unsetBookmark(id, token, event.target);
				return false;
			};
			imageSrc = imageUnbookmark;
		}
		directbookmarkimage = document.createElement('img');
		directbookmarkimage.setAttribute('src', imageSrc);
		directbookmarkimage.className = "marioMakerDirectBookmark";
		directbookmark.appendChild(directbookmarkimage);

		text.parentNode.insertBefore(directbookmark, text.nextSibling.nextSibling);
	}

	function setBookmark(id, token, button) {
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == XMLHttpRequest.DONE) {
				if (request.status == 200) {
					button.setAttribute('src', imageUnbookmark);
					button.parentElement.onclick = function(event) {
						unsetBookmark(id, token, event.target);
						return false;
					}
				}
				else {
					alert("Error. Please make sure that you are logged in on supermariomakerbookmark.nintendo.net");
				}
			}
		};

		request.open('POST', "https://supermariomakerbookmark.nintendo.net/courses/"+id+"/play_at_later");
		request.setRequestHeader("Accept", "application/json");
		request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		request.setRequestHeader("X-CSRF-Token", token);
		request.setRequestHeader("Referer", "https://supermariomakerbookmark.nintendo.net/courses/"+id);
		request.withCredentials = true;
		request.send();
	}

	function unsetBookmark(id, token, button) {
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == XMLHttpRequest.DONE) {
				if (request.status == 200) {
					button.setAttribute('src', imageBookmark);
					button.parentElement.onclick = function(event) {
						setBookmark(id, token, event.target);
						return false;
					}
				}
				else {
					alert("Error. Please make sure that you are logged in on supermariomakerbookmark.nintendo.net");
				}
			}
		};

		request.open('DELETE', "https://supermariomakerbookmark.nintendo.net/bookmarks/"+id);
		request.setRequestHeader("Accept", "application/json");
		request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		request.setRequestHeader("X-CSRF-Token", token);
		request.setRequestHeader("Referer", "https://supermariomakerbookmark.nintendo.net/courses/"+id);
		request.withCredentials = true;
		request.send();
	}

	function onDOMChange(mutations) {
		mutations.forEach(function(mutation) {
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				node = mutation.addedNodes[i];
				if (node.parentNode.nextSibling == null || !node.parentNode.nextSibling.classList.contains("marioMakerDirectBookmark")) {
					if (node.nodeType == Node.ELEMENT_NODE) {
						var tag = node.nodeName.toLowerCase();
						if (tag != 'style' && tag != 'script' ) // special cases, don't touch CDATA elements
							searchInElement(node, regex);
					} else if (node.nodeType == Node.TEXT_NODE) {
						searchInText(node, regex);
					}
				}
			}
		});
	}

	var imageBookmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wwWEgEDAI72/QAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAQElEQVQ4y2P8//8/AyWACZ+k3EbG/3IbGf+TbQDFLhghBjD+//+fgVBI4wKP/P8zUscF+NIBzKbRaKR1OqAEAACkzxevPUlGPgAAAABJRU5ErkJggg==';
	var imageUnbookmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wwWEgIEtccwnQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAASklEQVQ4y2P8//8/AyWACZ+k3EZGBrmNjOQbQLELhoYBjPhi4R0PD5wt9OULbgPe8fCQFZdCX74w0tYLsDTwyP//aDoYsIREDAAAcYEarSA1+NcAAAAASUVORK5CYII=';

	var regex = /[0-9a-f]{4}[- ][0-9a-f]{4}[- ][0-9a-f]{4}[- ][0-9a-f]{4}/gi;


	searchInElement(document.body, regex);

	var observer = new MutationObserver(onDOMChange);
	var config = {childList: true, subtree: true};
	observer.observe(document.body, config);

})();
