var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
	include: ["*", "file://*"],
	exclude: "*.supermariomakerbookmark.nintendo.net",
	contentScriptWhen: "ready",
	contentScriptFile: data.url("mariomaker.js")
});
