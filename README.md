# Tab Grouper Chrome Extension

## Description

**Tab Grouper** is a Chrome extension that helps organize your browser tabs by grouping them based on their domain names. It also groups search engine result tabs separately. Easily group or ungroup all tabs in the current window with a click.

---

## Features

- Group tabs by website domain (e.g., all tabs from `example.com` grouped together)
- Separate group for search result tabs (Google, Bing, Yahoo, DuckDuckGo, Yandex)
- Colored group labels with two-letter domain abbreviations
- Does **not** group single tabs (avoids groups with only one tab)
- Ungroup all grouped tabs in the current window with one click

---

## Installation

1. Download or clone the extension files.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top right toggle).
4. Click **Load unpacked** and select the extension folder.
5. The extension icon will appear in your toolbar.

---

## Usage

1. Click the extension icon.
2. Click **Group Tabs** to group tabs by domain.
3. Click **Ungroup Tabs** to ungroup all tabs in the current window.

---

## File Structure

- `manifest.json` — Extension manifest and permissions
- `background.js` — Logic for grouping and ungrouping tabs
- `popup.html` — Popup UI with Group and Ungroup buttons
- `popup.js` — Handles popup button actions
- `icon.png` — Extension icon

---

## Permissions

- `tabs` — Access and control tabs
- `tabGroups` — Manage tab groups
- `activeTab` — Interact with the active browser tab

---

## Notes

- Works only on the current Chrome window
- Requires Chrome version 88+
- Group titles show a two-letter domain abbreviation
- Search result tabs grouped separately with red color

---

## Troubleshooting

- Update Chrome to the latest version
- Reload extension after any changes
- Check console logs for errors in the background or popup scripts

---

## License

MIT License
