const allowedUrls = [
  'https://pvp.giustizia.it/pvp/it/detail_annuncio.page',
  'https://www.astegiudiziarie.it/vendita-asta'
];

function updateIcon(tabId, url) {
  const isAllowed = allowedUrls.some(allowedUrl => url.startsWith(allowedUrl));
  
  if (isAllowed) {
    chrome.action.setBadgeText({
      text: 'ON',
      tabId: tabId
    });
    chrome.action.setBadgeBackgroundColor({
      color: '#006400',
      tabId: tabId
    });
  } else {
    chrome.action.setBadgeText({
      text: '',
      tabId: tabId
    });
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    updateIcon(tabId, tab.url);
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      updateIcon(activeInfo.tabId, tab.url);
    }
  });
});
