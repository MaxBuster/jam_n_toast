document.getElementById("apps_link").addEventListener("click", function() {
	chrome.runtime.sendMessage({apps: true}, function(response) {});
});

document.getElementById("history_link").addEventListener("click", function() {
	chrome.runtime.sendMessage({history: true}, function(response) {});
});