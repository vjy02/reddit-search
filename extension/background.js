chrome.omnibox.onInputEntered.addListener(text => {
  console.log('User searched for:', text);
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(text) + ' reddit'}`;
  chrome.tabs.update({ url: searchUrl });
});