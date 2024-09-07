# Browser Copy Assistant

Browser Copy Assistant is a simple Chrome extension that captures copied text across your browser tabs and allows you to manage it efficiently. 
The extension prevents saving duplicate entries and limits the stored text to the last 100 copied items. Users can view, copy, and delete individual entries or download the entire list of copied texts


## Features

- Automatically stores any copied text from any website.
- Avoids adding duplicate copied texts.
- Limits the copied text stack to the most recent 100 entries.
- Allows users to view, copy, or delete individual texts.
- "View More" and "View Less" functionality for long copied texts.
- Provides pagination with 10 items per page.
- Users can copy all stored texts or download them as a text file.
- The latest copied text is always shown at the top.
- The url of each copied text is maintained as well.

## Installation & Testing

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click on the **Load unpacked** button.
5. Select the folder where you have downloaded this extension.
6. The **Browser Copy Assistant** extension should now appear in your extensions bar.
7. Pin the extension to see it on your toolbar across tabs.

## How It Works

### Copy Handling
- When a user copies text from any webpage using **Ctrl+C** or **Cmd+C**, the extension captures the text and checks if it already exists in the stack.
- If the text is new, it gets added to the copied stack, and the stack is automatically trimmed to the last 100 entries.
  
### Popup UI
- The extension popup shows a paginated list of up to 10 copied texts per page.
- Each entry has a **"View More/Less"** toggle for long texts, a **copy** button to re-copy the text to the clipboard, and a **delete** button to remove the entry.
  
### Buttons
- **Copy All**: Copies all stored texts to the clipboard.
- **Download All**: Downloads all stored texts as a `.txt` file.

## Future Enhancements

- Option to clear the entire list of copied texts.
- Dark mode for the popup interface.
- Support for syncing copied texts across multiple devices using Chrome Sync.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
