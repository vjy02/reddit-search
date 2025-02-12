const NUM_REDDIT_THREADS = 10

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hostname === "www.google.com" && window.location.pathname === "/search") {
    // Check if the search query ends with 'reddit'
    const searchQuery = new URLSearchParams(window.location.search).get('q');
    if (searchQuery && searchQuery.toLowerCase().endsWith('reddit')) {
      createSummaryButton();
    }
  }
});

window.addEventListener("load", function () {
  if (window.location.hostname === "www.google.com" && window.location.pathname === "/search") {
    const searchQuery = new URLSearchParams(window.location.search).get('q');
    if (searchQuery && searchQuery.toLowerCase().endsWith('reddit')) {
      createSummaryButton();
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "reddit_comments") {
    const redditBtn = document.getElementById("reddit-btn");

    const paragraph = document.createElement('div');
    paragraph.innerHTML = message.data; 
    paragraph.style.marginBottom = "1.5rem";
    redditBtn.after(paragraph);

    sendResponse({ status: "received" });
  }
});

function createSummaryButton() {
  const resultsContainer = document.getElementById("search");
  if (resultsContainer) {
    const redditIcon = document.createElement("i");
    const redditIconImg = document.createElement("img");
    redditIconImg.src = chrome.runtime.getURL("redditLogo.svg");
    redditIconImg.width = 30;
    redditIconImg.height = 30;
    redditIcon.appendChild(redditIconImg);

    const redditBtn = document.createElement("button");
    redditBtn.id = "reddit-btn";

    const redditBtnText = document.createElement("p")
    redditBtnText.classList.add("reddit-btn-text");
    redditBtnText.textContent = "Generate Summary";

    redditBtn.appendChild(redditIcon);
    redditBtn.appendChild(redditBtnText);
    redditBtn.addEventListener("click", extractGoogleResults);

    resultsContainer.parentNode.insertBefore(redditBtn, resultsContainer);
  }
}

function extractGoogleResults() {
    const results = [];
    document.querySelectorAll('h3').forEach((el, index) => {
        if (index < NUM_REDDIT_THREADS) {
            const parent = el.closest('a');
            if (parent) {
                results.push({
                    title: el.innerText,
                    url: parent.href
                });
            }
        }
    });
    chrome.runtime.sendMessage({ type: "google_results", data: results });
}