chrome.omnibox.onInputEntered.addListener((text) => {
  const searchUrl = `https://www.google.com/search?q=${
    encodeURIComponent(text) + " reddit"
  }`;
  chrome.tabs.update({ url: searchUrl });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "google_results") {
    const redditPosts = message.data.filter((post) =>
      post.url.includes("reddit.com/r/")
    );
    fetchRedditComments(redditPosts);
  }
});

function fetchRedditComments(posts) {
  const redditResults = [];
  console.log(posts);
  
  const fetchPromises = posts.map(async (post) => {
    try {
      const redditUrl = post.url + ".json";
      const redditResponse = await fetch(redditUrl);
      const redditData = await redditResponse.json();
      redditResults.push(getTopComments(redditData));
    } catch (err) {
      console.log(err);
    }
  });

  Promise.allSettled(fetchPromises).then(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "reddit_comments",
          data: redditResults,
        }, function (response) {
          console.log('Response from content script:', response);
        });
      }
    });
  });
}


function getTopComments(response) {
  if (!response[1].data) return

  // Extract top comments based on Reddit comment JSON structure
  const comments = response[1].data.children;
  const mainComments = comments.filter((comment) => comment.data.depth === 0);
  mainComments.sort((a, b) => b.data.ups - a.data.ups);
  const top5Comments = mainComments.slice(0, 5);
  const top5CommentsInfo = top5Comments.map((comment) => ({
    author: comment.data.author,
    body: comment.data.body,
    upvotes: comment.data.ups,
  }));

  return top5CommentsInfo;
}
