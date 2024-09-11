// Listen for the extension installation
browser.runtime.onInstalled.addListener(() => {
  console.log('Browser Copy Assistant Extension Installed');
});

// Listen for messages from other parts (like popup.js) to add copied text to the storage
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'copy') {
    browser.storage.local.get({ copiedStack: [] }).then((result) => {
      const copiedStack = result.copiedStack || [];
      copiedStack.push(message.text);
      browser.storage.local.set({ copiedStack }).then(() => {
        console.log(`Text added to stack: ${message.text}`);
      });
    });
  }
});
