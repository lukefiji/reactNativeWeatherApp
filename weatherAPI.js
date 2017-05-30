import privateKeys from "./privateKeys";
const rootURL = `http://api.openweathermap.org/data/2.5/weather?appid=${privateKeys.weatherAPIkey}`;

export const fetchWeather = (lat, lon) => {
  const url = `${rootURL}&lat=${lat}&lon=${lon}&units=imperial`;
  console.log(url);

  return fetch(url).then(res => res.json()).then(json => ({
    temp: json.main.temp,
    weather: json.weather[0].main
  }));
};
