//fetch and console  dot log the calue from the api
(() => {
  const getDoc = (item) => document.querySelector(item);
  const changeAttr =(attr, item ,setter)=>{
    item.removeAttribute(attr)
    item.setAttribute(attr, setter )
  }
  const form = getDoc("form");
  const input = getDoc("input");
  const idName = getDoc(".name");
  const current = getDoc(".feelsLike");
  const min = getDoc(".minimumTemp");
  const max = getDoc(".maximumTemp");
  const pressure = getDoc(".pressure");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    newRequest(input.value)
  });

  let city = "London";
  let cnt = "15";
  const unit = true;
  const weatherIcon = document.querySelector(".wicon");

  const newRequest = (city = "London", unit = true) => {
    const YOUR_KEY_HERE = "5f86ba1265797a9b1c7977587c03ac2a";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${
        unit ? "metric" : "imperial"
      }&appid=${YOUR_KEY_HERE}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { weather, main, name } = data;
        const iconcode = weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        weatherIcon.setAttribute("src", iconurl);
        changeAttr("src", weatherIcon, iconcode)

        return data;
      })
      .then((data) => {
        const { weather, main, name } = data;
      idName.textContent= `Location ${name}`
      current.textContent = `current Temp ${main.temp}`;
      })
      .catch((err) => console.log(err));
  };
  newRequest();
})();
