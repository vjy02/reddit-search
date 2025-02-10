document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hostname === "www.google.com" && window.location.pathname === "/search") {
    // Check if the search query ends with 'reddit'
    const searchQuery = new URLSearchParams(window.location.search).get('q');
    if (searchQuery && searchQuery.toLowerCase().endsWith('reddit')) {
      createSummaryButton();
    }
  }
});

// on page load (optional, if you want to keep it)
window.addEventListener("load", function () {
  if (window.location.hostname === "www.google.com" && window.location.pathname === "/search") {
    // Check if the search query ends with 'reddit'
    const searchQuery = new URLSearchParams(window.location.search).get('q');
    if (searchQuery && searchQuery.toLowerCase().endsWith('reddit')) {
      createSummaryButton();
    }
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
    redditBtn.classList.add("reddit-btn");

    const redditBtnText = document.createElement("p")
    redditBtnText.classList.add("reddit-btn-text");
    redditBtnText.textContent = "Generate Summary"

    redditBtn.appendChild(redditIcon)
    redditBtn.appendChild(redditBtnText)

    resultsContainer.parentNode.insertBefore(redditBtn, resultsContainer);
  }
}
