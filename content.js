var pattern = /amazon/;
if (pattern.test(window.location.href)){
	// localStorage.setItem('buying', 'true');
	chrome.runtime.sendMessage({tab: true}, function(response) {});
}