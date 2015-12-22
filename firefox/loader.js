var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
	include: "*",
	exclude: "*.supermariomaker.nintendo.com",
	contentScriptWhen: "ready",
	contentScriptFile: data.url("mariomaker.js")
});
