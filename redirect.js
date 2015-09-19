chrome.extension.onRequest.addListener(function(request, sender) {
        chrome.tabs.update(sender.tab.id, {url: request.redirect});
        chrome.tabs.create({
	        'url': chrome.extension.getURL('redirect.html')
	    }, function(tab) {

	    });
    });