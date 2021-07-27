const config = {
  style: {
    background:
      "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Fredpanda.jpeg?v=1622936997670",
    circular: false,
    css: ""
  },
  modules: {
    time: {
      show: true,
      "24hour": false,
      ampm: false
    },
    weather: {
      show: true,
      units: "metric",
      location: false
    },
    search: {
      show: true,
      engine: "https://www.google.com/search",
      placeholder: false
    },
    bookmarks: {
      show: false,
      items: [
        "https://google.com",
        "https://youtube.com",
        "https://mail.google.com"
      ]
    }
  },
  settings: {
    timezone: false
  }
};


const style = document.querySelector("style");
const time = document.getElementById("time");
const weather = document.getElementById("weather");
const icon = document.getElementById("icon");
const type = document.getElementById("type");
const temp = document.getElementById("temp");
const search = document.getElementById("search");
const input = search.elements.q;
const bookmarks = document.getElementById("bookmarks");

// Style
style.innerHTML = config.style.css;

if (config.style.circular === true) {
  search.setAttribute("class", "circle");
  bookmarks.setAttribute("class", "circle");
}

// Time
if (config.modules.time.show === true) {
  time.style.display = "";

  var options = config.modules.time["12hour"]
    ? { hour: "numeric", minute: "numeric", hour12: true }
    : {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      };

  if (config.settings.timezone !== false)
    options.timeZone = config.settings.timezone;

  time.innerText = config.modules.time.ampm
    ? new Date().toLocaleString("en-GB", options)
    : new Date().toLocaleString("en-GB", options).replace(/am|pm| /gi, "");

  setInterval(() => {
    time.innerText = config.modules.time.ampm
      ? new Date().toLocaleString("en-GB", options)
      : new Date().toLocaleString("en-GB", options).replace(/am|pm| /gi, "");
  }, 1000);
}

// Weather
if (config.modules.weather.show === true) {
  weather.style.display = "";

  const loadWeather = async function() {
    const location = await (await fetch("https://ip2tz.isthe.link/")).json();

    var units = config.modules.weather.units;

    const weatherData = await (await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lang=EN&lat=${location.latitude}&lon=${location.longitude}&units=${units}&appid=8e586fc94a1f3326672f6733aa38fd55`
    )).json();

    icon.setAttribute("class", "wi wi-owm-" + weatherData.weather[0].id);
    type.innerText = weatherData.weather[0].main;
    temp.innerText = Math.round(weatherData.main.temp) + "°";
  };

  loadWeather();
}

// Search
if (config.modules.search.show === true) {
  search.style.display = "";

  const placeholders = [
    "Weather? Look up!",
    "What is reddit?",
    "Why is the sky blue?",
    "What is my IP?",
    "What should I eat tonight?",
    "Is Facebook stealing my data?",
    "How do I clear my history?"
  ];
  const placeholder =
    placeholders[Math.floor(Math.random() * placeholders.length)];

  search.setAttribute("action", config.modules.search.engine);
  if (config.modules.search.placeholder !== false) {
    input.setAttribute("placeholder", config.modules.search.placeholder);
  } else {
    input.setAttribute("placeholder", placeholder);
  }
}

// Bookmarks
if (config.modules.bookmarks.show === true) {
  bookmarks.style.display = "";

  config.modules.bookmarks.items.forEach(bookmark => {
    bookmarks.innerHTML += `
  <a href="${bookmark}">
    <img 
      src="https://favicon.splitbee.io/?url=${bookmark}"
      width="22px"
      height="22px"
    />
  </a>
  `;
  });
}
