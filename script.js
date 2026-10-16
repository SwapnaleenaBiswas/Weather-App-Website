const url="https://api.openweathermap.org/data/2.5/weather?";
const apiKey="09903626998f1cd13d1e2f1f74cbd72d";
const startbtn = document.querySelector(".start");
const search=document.querySelector("#inputfield");
const searchIcon=document.querySelector("#searchicon");
const desc=document.querySelector("#desc");
const temp=document.querySelector("#temp");
const cityName=document.querySelector("#city");
const wind=document.querySelector("#windspeed");
const humidity=document.querySelector("#humidityspeed");
const GoHome=document.querySelector(".homebtn");
const iconbtn=document.querySelector("#icon");
const mainBox1=document.querySelector(".mainbox1");
const mainBox2=document.querySelector(".mainbox2");
const mainBox3=document.querySelector(".mainbox3");
startbtn.addEventListener("click",()=>{
    mainBox1.classList.add("inactive");
    mainBox2.classList.remove("inactive");
})

async function getWeatherData(city) {
    let finalUrl=`${url}q=${city}&appid=${apiKey}`;
    let weatherData=await fetch(finalUrl).then(res=>res.json());
    console.log(weatherData);
    if(weatherData.cod==="404"){
       mainBox2.classList.add("inactive");
    mainBox3.classList.remove("inactive");  
    desc.innerHTML="Description";
    temp.innerHTML="0°c";
    cityName.innerHTML="New York";
    wind.innerHTML="0 km/h";
    humidity.innerHTML="0%";
    search.value="";
    iconbtn.src="./clear.png";
}
function changeicon(weatherMain){
    let icons={
        Clouds:"./clouds.png",
        Clear:"./clear.png",
        Rain:"./rain.png",
        Mist:"./mist.png",
        Snow:"./snow.png",
        Haze:"./haze.png",
    }
    iconbtn.src=icons[weatherMain]||"./clear.png";
}
desc.innerHTML=weatherData.weather[0].description;
temp.innerHTML=Math.round(weatherData.main.temp-273.15)+"°c";
cityName.innerHTML=weatherData.name;
wind.innerHTML=weatherData.wind.speed+"km/h";
humidity.innerHTML=weatherData.main.humidity+"%";

changeicon(weatherData.weather[0].main);
}
searchIcon.addEventListener("click",()=>{
    getWeatherData(search.value);
})
search.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        getWeatherData(search.value); 
    }
})
GoHome.addEventListener("click",()=>{
      mainBox3.classList.add("inactive");
    mainBox1.classList.remove("inactive");
})
