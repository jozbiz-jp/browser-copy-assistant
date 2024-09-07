chrome.runtime.onInstalled.addListener(() => {
  console.log('Browser Copy Assistant Extension Installed');
});

// Listen for messages from contentScript.js to add copied text to the storage
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addToCopiedStack') {
    chrome.storage.local.get({ copiedStack: [] }, (result) => {
      const copiedStack = result.copiedStack || [];
      copiedStack.push(message.text);
      chrome.storage.local.set({ copiedStack }, () => {
        // console.log(`Text added to stack: ${message.text}`);
      });
    });
  }
});
