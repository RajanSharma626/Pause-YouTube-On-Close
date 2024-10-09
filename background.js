chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    chrome.tabs.get(tabId, function(tab) {
      if (chrome.runtime.lastError) {
        return; // Ignore errors.
      }
      if (tab && tab.url && tab.url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: pauseYouTubeVideo
        });
      }
    });
  });
  
  chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
      if (tab && tab.url && tab.url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: playYouTubeVideo
        });
      }
    });
  });
  
  function pauseYouTubeVideo() {
    const video = document.querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  }
  
  function playYouTubeVideo() {
    const video = document.querySelector('video');
    if (video && video.paused) {
      video.play();
    }
  }
  