document.getElementById("groupBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "group-tabs" }, (response) => {
    console.log(response.status);
  });
});

document.getElementById("ungroupBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "ungroup-tabs" }, (response) => {
    console.log(response.status);
  });
});
