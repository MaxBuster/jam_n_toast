chrome.extension.onRequest.addListener(function(request, sender) {
        chrome.tabs.update(sender.tab.id, {url: request.redirect});
    });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.new == true)
      chrome.tabs.create({}, function(tab) {});
  });