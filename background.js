chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    if (chrome.runtime.lastError) {
      console.log("Error:", chrome.runtime.lastError.message);
      return;
    }
    
    // Check if the newly activated tab is YouTube
    if (tab && tab.url && tab.url.includes("youtube.com/watch")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: playYouTubeVideo
      });
    } else {
      // Pause YouTube video if switching away
      chrome.tabs.query({url: "*://www.youtube.com/*"}, function(tabs) {
        for (let youtubeTab of tabs) {
          chrome.scripting.executeScript({
            target: { tabId: youtubeTab.id },
            function: pauseYouTubeVideo
          });
        }
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
