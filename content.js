var pattern = /amazon/;
if (pattern.test(window.location.href)){
	//window.open('', '_blank');
	chrome.runtime.sendMessage({new: true}, function(response) {});
}