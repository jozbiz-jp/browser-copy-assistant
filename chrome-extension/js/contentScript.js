document.addEventListener('copy', (event) => {
    const selectedText = window.getSelection().toString().trim();
    
    if (selectedText) {
      const pageUrl = window.location.host || window.location.href; // Get the current page URL
  
      chrome.storage.local.get({ copiedStack: [] }, (result) => {
        let copiedStack = result.copiedStack || [];
  
        // Check if the text already exists in the list
        const alreadyExists = copiedStack.some(item => item.text === selectedText && item.url === pageUrl);
  
        if (!alreadyExists) {
          // Add the new text and URL to the stack
          copiedStack.push({ text: selectedText, url: pageUrl });
  
          // Limit the list to the last 100 entries
          if (copiedStack.length > 100) {
            copiedStack = copiedStack.slice(-100); // Keep only the last 100 entries
          }
  
          // Save the updated list
          chrome.storage.local.set({ copiedStack }, () => {
            // console.log(`Text added to stack: ${selectedText} from ${pageUrl}`);
          });
        }
      });
    }
  });