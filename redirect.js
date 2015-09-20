chrome.extension.onRequest.addListener(function(request, sender) {
        chrome.tabs.update(sender.tab.id, {url: request.redirect});
    });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.tab == true) {
       chrome.tabs.create({}, function(tab) {});
	} 
  });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.apps == true) {
       chrome.tabs.update(null, {url : "chrome://apps/"}, function(tab) {});
	} 
  });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.history == true) {
       chrome.tabs.update(null, {url : "chrome://history/"}, function(tab) {});
	} 
  });
