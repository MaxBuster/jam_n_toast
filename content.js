var pattern = /amazon/;
if (pattern.test(window.location.href)){
	//window.open('', '_blank');
	chrome.tabs.create({
	        'url': chrome.extension.getURL('redirect.html')
	    }, function(tab) {

	    });
}