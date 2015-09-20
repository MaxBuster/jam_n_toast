var pattern = /amazon/;
if (pattern.test(window.location.href)){
	// localStorage.setItem('buying', 'true');
	chrome.runtime.sendMessage({new: true}, function(response) {});
}
