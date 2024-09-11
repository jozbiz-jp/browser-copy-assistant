document.addEventListener('DOMContentLoaded', () => {
  const copiedList = document.getElementById('copied-list');
  const paginationContainer = document.getElementById('pagination-container');
  const copyAllBtn = document.getElementById('copy-all-btn');
  const downloadBtn = document.getElementById('download-btn');
  const addTextBtn = document.getElementById('add-text-btn');
  const textInput = document.getElementById('text-input');
  const itemsPerPage = 5;
  let currentPage = 1;


  // error/success messaging
  function showStatusMessage(type, text) {
    document.getElementById("add-text-status-err").style.display = "none";
    document.getElementById("add-text-status-success").style.display = "none";
    document.getElementById("add-text-status-err").textContent = "";
    document.getElementById("add-text-status-success").textContent = "";
    if (type === "success") {
      document.getElementById("add-text-status-err").style.display = "none";
      document.getElementById("add-text-status-success").style.display = "block";
      document.getElementById("add-text-status-success").textContent = text;
    } else if (type === "error") {
      document.getElementById("add-text-status-err").style.display = "block";
      document.getElementById("add-text-status-success").style.display = "none";
      document.getElementById("add-text-status-err").textContent = text;
    }
  }

  // Add text from input to storage
  addTextBtn.addEventListener('click', () => {
    const enteredText = textInput.value.trim();

    if (enteredText) {
      // Get the current tab URL
      browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        const pageUrl = activeTab.url; // Use the active tab's URL

        // Add the text and URL to local storage
        browser.storage.local.get({ copiedStack: [] }, (result) => {
          let copiedStack = result.copiedStack || [];

          // Check if the text already exists in the list
          const alreadyExists = copiedStack.some(item => item.text === enteredText && item.url === pageUrl);

          if (!alreadyExists) {
            // Add the new text and URL to the stack
            copiedStack.push({ id: Date.now(), text: enteredText, url: pageUrl });

            // Limit the list to the last 100 entries
            if (copiedStack.length > 100) {
              copiedStack = copiedStack.slice(-100); // Keep only the last 100 entries
            }

            // Save the updated list
            browser.storage.local.set({ copiedStack }, () => {
              updateCopiedList(copiedStack); // Update the list in the popup
              textInput.value = ''; // Clear the input field
              showStatusMessage("success", "Text added successfully.");
            });
          } else {
            showStatusMessage("error", "This text already exists in the list.");
          }
        });
      });
    } else {
      showStatusMessage("error", "Please enter some text.");
    }
  });


  // Function to paginate the copied list
  function paginateCopiedList(copiedStack) {
    copiedList.innerHTML = ''; // Clear the existing list

    // Calculate the start and end indexes based on the current page
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Get only the items for the current page
    const paginatedItems = copiedStack.slice(start, end);

    paginatedItems.forEach((item, index) => {
      const row = document.createElement('tr');

      // Table data for copied text
      const textTd = document.createElement('td');
      textTd.className = 'copied-list-table-txt';

      // Create a span to handle the "View More/Less" toggle
      const textSpan = document.createElement('span');
      textSpan.className = 'ellipsis-text';
      textSpan.textContent = item.text;

      const toggleSpan = document.createElement('span');
      toggleSpan.className = 'view-toggle';
      toggleSpan.textContent = 'View More';
      toggleSpan.addEventListener('click', () => {
        if (toggleSpan.textContent === 'View More') {
          textSpan.style.whiteSpace = 'normal';
          toggleSpan.textContent = 'View Less';
        } else {
          textSpan.style.whiteSpace = 'nowrap';
          toggleSpan.textContent = 'View More';
        }
      });

      // Create URL element
      const urlSpan = document.createElement('span');
      urlSpan.className = 'copied-url';
      urlSpan.textContent = item.url;


      textTd.appendChild(textSpan);
      textTd.appendChild(urlSpan);
      if (item?.text?.length > 50) {
        textTd.appendChild(toggleSpan);
      }

      // Table data for actions
      const actionsTd = document.createElement('td');
      actionsTd.className = 'copied-list-table-actions';

      // Copy button
      const copySpan = document.createElement('span');
      copySpan.className = 'table-icons';
      const copyIcon = document.createElement('i');
      copyIcon.className = 'material-icons right list-copy';
      copyIcon.textContent = 'content_copy';
      copyIcon.addEventListener('click', () => {
        navigator.clipboard.writeText(item.text).then(() => {
          showStatusMessage("success", "Copied to clipboard.");
        });
      });
      copySpan.appendChild(copyIcon);

      // Delete button
      const deleteSpan = document.createElement('span');
      deleteSpan.className = 'table-icons';
      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'material-icons right list-delete';
      deleteIcon.textContent = 'delete';
      deleteIcon.addEventListener('click', () => {
        removeItemFromStack(item.id); // Unique ID to delete the item
      });
      deleteSpan.appendChild(deleteIcon);

      // Append copy and delete icons to actionsTd
      actionsTd.appendChild(copySpan);
      actionsTd.appendChild(deleteSpan);

      // Append text and actions to row
      row.appendChild(textTd);
      row.appendChild(actionsTd);

      // Append the row to the copied list table body
      copiedList.appendChild(row);
    });
  }

  // Function to remove item from the stack and update the table
  function removeItemFromStack(id) {
    browser.storage.local.get({ copiedStack: [] }).then((result) => {
      let copiedStack = result.copiedStack || [];
      copiedStack = copiedStack.filter(item => item.id !== id); // Remove by ID
      browser.storage.local.set({ copiedStack }).then(() => {
        updateCopiedList(copiedStack); // Update the list after deletion
      });
    });
  }

  // Function to render pagination controls
  function renderPaginationControls(copiedStack) {
    paginationContainer.innerHTML = ''; // Clear existing pagination controls

    const pageCount = Math.ceil(copiedStack.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.className = 'pagination-btn';
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        currentPage = i;
        paginateCopiedList(copiedStack); // Update the list for the selected page
        renderPaginationControls(copiedStack); // Update active page button
      });
      paginationContainer.appendChild(pageButton);
    }
  }

  // Function to update the copied list and pagination
  function updateCopiedList(copiedStack) {
    document.getElementById('copied-list-empty').style.display = copiedStack?.length > 0 ? "none" : "block";
    document.getElementById('copied-list-content').style.display = copiedStack?.length > 0 ? "block" : "none";
    document.getElementById('copied-list-top-btns').style.display = copiedStack?.length > 0 ? "block" : "none";
    // Sort to show the latest one on top
    const sortedStack = [...copiedStack].reverse();
    paginateCopiedList(sortedStack); // Show paginated list
    renderPaginationControls(sortedStack); // Show pagination controls
  }

  // Load copied stack from storage
  browser.storage.local.get({ copiedStack: [] }, (result) => {
    const copiedStack = result.copiedStack || [];
    updateCopiedList(copiedStack); // Render copied texts in table
  });

  // Copy all items to clipboard
  copyAllBtn.addEventListener('click', () => {
    browser.storage.local.get({ copiedStack: [] }, (result) => {
      const allText = result.copiedStack.map(item => item.text).join('\n');
      navigator.clipboard.writeText(allText).then(() => {
        showStatusMessage("success", "Copied all to clipboard.");
      });
    });
  });

  // Download all copied text as a text file
  downloadBtn.addEventListener('click', () => {
    browser.storage.local.get({ copiedStack: [] }, (result) => {
      const allText = result.copiedStack
        .map(item => `${item.url}\n${item.text}\n`) // First the URL, then the text, then a blank line
        .join('\n'); // Join each entry with a new line
      
      const blob = new Blob([allText], { type: 'text/plain' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'bca_copied_texts.txt';
      downloadLink.click();
    });
  });
});
