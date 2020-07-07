const form = document.querySelector("form");
const loading = document.querySelector(".loading");
const tweetDiv = document.querySelector(".tweets");

const API_URL = "https://malikker.herokuapp.com/tweets";

loading.style.display = "none";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = form.querySelector("#name").value;
  let content = form.querySelector("#content").value;
  const tweet = { name, content };
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(tweet),
    headers: {
      "content-type": "application/json",
    },
  });

  tweetDiv.innerHTML = "";
  loading.style.display = "block";
  listTweets();
  form.reset();
});

async function listTweets() {
  const res = await fetch(API_URL);
  const tweets = await res.json();
  tweets.forEach((tweet) => {
    const div = document.createElement("div");
    div.classList.add("tweet");
    const name = document.createElement("h3");
    name.textContent = tweet.name;
    const content = document.createElement("p");
    content.textContent = tweet.content;
    const date = document.createElement("small");
    date.style.color = "#a1a1a1";
    date.textContent = new Date(tweet.date).toLocaleString();
    div.appendChild(name);
    div.appendChild(content);
    div.appendChild(date);
    tweetDiv.appendChild(div);
  });
  loading.style.display = "none";
}

listTweets();
