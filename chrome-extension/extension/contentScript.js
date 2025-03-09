const NUM_REDDIT_THREADS = 10;

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.hostname === "www.google.com" &&
    window.location.pathname === "/search"
  ) {
    // Check if the search query ends with 'reddit'
    const searchQuery = new URLSearchParams(window.location.search).get("q");
    if (searchQuery && searchQuery.toLowerCase().endsWith("reddit")) {
      createSummaryButton();
    }
  }
});

window.addEventListener("load", function () {
  if (
    window.location.hostname === "www.google.com" &&
    window.location.pathname === "/search"
  ) {
    const searchQuery = new URLSearchParams(window.location.search).get("q");
    if (searchQuery && searchQuery.toLowerCase().endsWith("reddit")) {
      createSummaryButton();
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "reddit_summary") {
    const boxNode = document.createElement("div");
    const paragraph = document.createElement("div");
    const redditBtn = document.getElementById("reddit-btn");
    paragraph.innerHTML = message.data;
    boxNode.className = "summary-box";
    boxNode.appendChild(paragraph);
    redditBtn.after(boxNode);
    const redditIconImg = document.getElementById("reddit-logo-summary");
    redditIconImg.src = chrome.runtime.getURL("redditLogo.svg");
    sendResponse({ status: "received" });
    redditBtn.remove();
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

    const redditBtnText = document.createElement("p");
    redditBtnText.id = "reddit-btn-text";
    redditBtnText.classList.add("reddit-btn-text");
    redditBtnText.textContent = "Generate Summary";

    redditBtn.appendChild(redditIcon);
    redditBtn.appendChild(redditBtnText);
    redditBtn.addEventListener("click", () => {
      createLoadingAnimation(redditBtnText);
      redditBtn.classList.add("loading");
      extractGoogleResults();
    });

    resultsContainer.parentNode.insertBefore(redditBtn, resultsContainer);
  }
}

function extractGoogleResults() {
  const results = [];
  const searchQuery = new URLSearchParams(window.location.search).get("q"); // get the query

  document.querySelectorAll("h3").forEach((el, index) => {
    if (index < NUM_REDDIT_THREADS) {
      const parent = el.closest("a");
      if (parent) {
        results.push({
          title: el.innerText,
          url: parent.href,
        });
      }
    }
  });
  chrome.runtime.sendMessage({
    type: "google_results",
    data: results,
    searchQuery: searchQuery,
  });
}

function createLoadingAnimation(loadingTextElement) {
  let dotCount = 1;
  const maxDots = 3;
  const interval = 500;
  function updateLoadingText() {
    loadingTextElement.textContent = "Loading" + ".".repeat(dotCount);
    dotCount = dotCount < maxDots ? dotCount + 1 : 1;
  }
  return setInterval(updateLoadingText, interval);
}
