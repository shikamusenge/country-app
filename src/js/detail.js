const country= JSON.parse(localStorage.getItem("country"))[0];
const modeBtn = document.querySelector("#mode-icon");
const detailDiv = document.querySelector("#detail-div");
let languages = "";
let borders = ""
country.borders.forEach(element => {
    borders += `<div style="background-color:var( --eltsBgColor); padding-inline:0.6rem;">${element}</div>`; 
 });
 borders.replace(" ",", ");
country.languages.forEach(element => {
   languages += ", "+element.name; 
});
console.log(country);
const dataDiv=`
<div id="flag">
<img src="${country.flag}" alt="${country.name}" srcset="">
</div>
<div>
<div id="country-name">${country.name}</div>
<div id="country-detail">
<p>
Native name: ${country.name}<br>
population: ${country.population}<br>
region: ${country.region}<br>
capital: ${country.capital}<br>
</p>
<p>
Top level domain: ${country.topLevelDomain[0]}<br>
currencies: ${country.region.currencies}<br>
languegies: ${languages}
</div>
<section style="display:flex; gap:0.5rem;">border country: ${borders} </section>
</div>
`
detailDiv.innerHTML=dataDiv;
modeBtn.onclick=()=>{
    const newMode = localStorage.getItem("mode")=="light"? "dark":"light";
    switchMode(newMode);
}
const switchMode =  (newMode)=>{
    console.log("mode changing");
const root = document.documentElement;
const mode = localStorage.getItem("mode");
localStorage.setItem("mode",`${newMode}`);
if(newMode=="light"){
        root.style.setProperty('--bgColor', 'hsl(0, 0%, 98%)');
        root.style.setProperty('--eltsBgColor', 'hsl(0, 0%, 100%)');
        root.style.setProperty('--color', 'hsl(200, 15%, 8%)');
        localStorage.setItem("mode",`light`);
        modeBtn.innerHTML=`
        <div id="mode-icon" data-mode="light"><span class="material-symbols-outlined">
            light_mode
            </span> Light Mode
        `
    }
    else{
    root.style.setProperty('--bgColor', 'hsl(207, 26%, 17%)');
    root.style.setProperty('--eltsBgColor', 'hsl(209, 23%, 22%)');
    root.style.setProperty('--color', 'hsl(0, 0%, 100%)');
    localStorage.setItem("mode",`dark`);
    modeBtn.innerHTML=`
    <div id="mode-icon" data-mode="dark"><span class="material-symbols-outlined">
        dark_mode
        </span> dark mode
    `
    }
}
if(!localStorage.getItem("mode")){
    localStorage.setItem("mode","light")
}
else{
    switchMode(localStorage.getItem("mode"));
}
