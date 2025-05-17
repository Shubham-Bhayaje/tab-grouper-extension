function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (e) {
    return null;
  }
}

const searchEngines = [
  { domain: "google.com", pathIncludes: "/search" },
  { domain: "bing.com", pathIncludes: "/search" },
  { domain: "yahoo.com", pathIncludes: "/search" },
  { domain: "in.search.yahoo.com", pathIncludes: "/search" },
  { domain: "duckduckgo.com", pathIncludes: "/" },
  { domain: "yandex.ru", pathIncludes: "/search" },
];

const niceColors = ["grey", "green", "cyan", "purple", "pink", "orange"];
const searchGroupColor = "red";

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === "group-tabs") {
    try {
      const tabs = await chrome.tabs.query({ currentWindow: true });

      const groups = {};
      const searchTabs = [];

      for (const tab of tabs) {
        const domain = getDomain(tab.url);
        if (!domain) continue;

        let isSearchPage = false;
        for (const se of searchEngines) {
          if (domain === se.domain || domain.endsWith("." + se.domain)) {
            if (tab.url.includes(se.pathIncludes)) {
              isSearchPage = true;
              break;
            }
          }
        }

        if (isSearchPage) {
          searchTabs.push(tab.id);
        } else {
          if (!groups[domain]) {
            groups[domain] = [];
          }
          groups[domain].push(tab.id);
        }
      }

      if (searchTabs.length > 0) {
        const searchGroupId = await chrome.tabs.group({ tabIds: searchTabs });
        await chrome.tabGroups.update(searchGroupId, {
          title: "SEARCH RESULTS",
          color: searchGroupColor,
        });
      }

      for (const domain in groups) {
        const tabIds = groups[domain];
        // Don't group if only 1 tab in that domain
        if (tabIds.length <= 1) continue;

        const groupId = await chrome.tabs.group({ tabIds });

        const domainName = domain.replace(/^www\./, "");
        const tagText = domainName.slice(0, 2).toUpperCase();

        const randomColor =
          niceColors[Math.floor(Math.random() * niceColors.length)];

        await chrome.tabGroups.update(groupId, {
          title: tagText,
          color: randomColor,
        });
      }

      sendResponse({ status: "Grouped tabs successfully" });
    } catch (e) {
      sendResponse({ status: "Error: " + e.message });
    }
    return true; // will respond asynchronously
  }

  if (msg.action === "ungroup-tabs") {
    try {
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const groupedTabs = tabs.filter((tab) => tab.groupId !== -1);
      const tabIds = groupedTabs.map((tab) => tab.id);

      if (tabIds.length > 0) {
        await chrome.tabs.ungroup(tabIds);
        sendResponse({ status: "Ungrouped all tabs" });
      } else {
        sendResponse({ status: "No grouped tabs found" });
      }
    } catch (e) {
      sendResponse({ status: "Error: " + e.message });
    }
    return true;
  }

  // Unknown action
  sendResponse({ status: "Unknown action" });
  return false; // no async response
});
