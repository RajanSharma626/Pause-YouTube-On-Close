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
  
  function pauseYouTubeVideo() {
    const video = document.querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  }
  