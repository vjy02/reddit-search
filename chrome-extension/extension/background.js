chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "google_results") {
    const redditPosts = message.data.filter((post) =>
      post.url.includes("reddit.com/r/")
    );
    fetchRedditComments(redditPosts, message.searchQuery);
  }
});

async function fetchRedditComments(posts, searchQuery) {
  const redditResults = [];
  console.log(posts)
  const fetchPromises = posts.map(async (post) => {
    try {
      const redditUrl = post.url + ".json";
      const redditResponse = await fetch(redditUrl);
      const redditData = await redditResponse.json();
      redditResults.push({
        title: post.title,
        source: post.url,
        comments: getTopComments(redditData)
      });
    } catch (err) {
      console.log(err);
    }
  });

  await Promise.all(fetchPromises)

  fetchAISummary(redditResults, searchQuery)
}

async function fetchAISummary(redditResults, searchQuery){
  const prompt = `
    Summarise the most relevant and actionable advice (50-75 words) from selected information threads based on the query: "${searchQuery}". 
    Focus on practical suggestions, solutions, and insights shared by users. 
    Keep the response clear and concise, avoiding unnecessary details or subjective opinions. 
    It is okay not to use all of the sources, just use the most relevant ones.
    Always format your response like the following:

    <p>SUMMARY CONTENT</p>
    <h4 style="margin-bottom: 5px;">Further Reading:</h4>
    <ul style="list-style-type: none; padding-left: 0;">
      <li><a href="URL">title</a></li>
      <li><a href="URL">title</a></li>
      <li><a href="URL">title</a></li>
    </ul>

    Reddit data in JSON: ${JSON.stringify(redditResults)}
  `;

  const response = await fetch("http://localhost:5000/summarise", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: prompt }),
  })
  if (!response.ok) {
    throw new Error('Failed to summarize');
  }
  const data = await response.json();

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "reddit_comments",
        data: data.message,
      }, function (response) {
        console.log("Response from content script:", response);
      });
    }
  });
}

function getTopComments(response) {
  if (!response[1]?.data?.children) return;

  // Extract top comments based on Reddit comment JSON structure
  const comments = response[1].data.children;
  const mainComments = comments.filter((comment) => comment.data.depth === 0);
  mainComments.sort((a, b) => b.data.ups - a.data.ups);
  const top5Comments = mainComments.slice(0, 5);
  const top5CommentsInfo = top5Comments.map((comment) => {
    if (comment.data.body === "[deleted]") cont
    return {
      author: comment.data.author,
      body: comment.data.body,
      upvotes: comment.data.ups,
    };
  })

  return top5CommentsInfo;
}
