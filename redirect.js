
chrome.runtime.onMessage.adListener(
function(requests, sender, sendRequest){
	if(request.new == true){
		chrome.tabs.create({}, function(tab) {});
	}
});


chrome.extension.onRequest.addListener(function(request, sender) {
        chrome.tabs.update(sender.tab.id, {url: request.redirect});
});