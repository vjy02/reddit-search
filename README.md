<br />
<div align="center">
  <a href="">
    <img src="chrome-extension/extension/redditLogo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Reddit Summariser</h3>

  <p align="center">
    Escape the AI slop by gathering authentic opinions from reddit threads for your google queries.
    <br />
    <br />
    <br />
    <a href="">View Demo</a>
    &middot;
    <a href="https://github.com/vjy02/reddit-search/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/vjy02/reddit-search/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>


## About

Reddit Summariser is a chrome extension that will generate a summary based off of your reddit sources for your google searches. A pet project made to explore a solution similar to Gemini AI summarises on google queries.


### Built With

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?logo=GoogleChrome&logoColor=white)](#)




<!-- GETTING STARTED -->
## Getting Started

_We will set up both the server and extension._

1. Clone the repo
   ```sh
   git clone https://github.com/vjy02/reddit-search.git
   ```
2. Adjust your OpenAI key, hostname and port accordingly in ```.env``` inside of ```/server``` 
    ```
    OPENAI_API_KEY=sk-XXXXXX
    BASE_URL=http://localhost:5000
    PORT=5000
    ```
3. Install NPM packages and run the node server
   ```sh
   npm install
   node server.js
   ```
4. Now direct to ```/chrome-extension``` and install NPM packages
   ```sh
   npm install
   ```
5. In Chrome, navigate to ```chrome://extensions```, ensure that **Developer mode** is enabled. Then click Load unpacked and select the ```/extension``` folder.
