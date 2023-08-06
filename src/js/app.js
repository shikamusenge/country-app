const countriesDiv=document.querySelector("#countries");
const modeBtn = document.querySelector("#mode-icon");
const regionDiv=document.querySelector("#region");
const searchBtn = document.querySelector("#find-country");
regionDiv.onchange=()=>{
    countriesDiv.innerHTML='Loding .......'
    changeRegion(regionDiv.value);
}
modeBtn.onclick=()=>{
    const newMode = localStorage.getItem("mode")=="light"? "dark":"light";
    switchMode(newMode);
}
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const name = document.querySelector("#search-text").value;
    const All = JSON.parse(localStorage.getItem("allCountries"));
const regionCountries = All.filter(cntr=>cntr.name==name);
displayResult(regionCountries);
})
// functions
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
const fetchCountries= async ()=>{
const hr= await fetch("./src/db/data.json");
const countries = await hr.json();
localStorage.setItem("allCountries",JSON.stringify(countries));
const regions = ["Africa","Asia","Oceania","Europe","Americas","Antarctic Ocean"];
regions.forEach(rg=>{
    const opt = document.createElement("option");
    opt.value=rg;
    opt.innerText=rg;
    regionDiv.appendChild(opt)
})
displayResult(countries);
return countries;
}
// filter rerigion
function changeRegion(region){
const All = JSON.parse(localStorage.getItem("allCountries"));
const regionCountries = All.filter(cntr=>cntr.region==region);
displayResult(regionCountries);
}
// display Result
function displayResult(countries){
const contryListDiv=countries.map(cntr=>{
    const div=`
    <div class="coutry" id='${cntr.name}'>
     <div class="falag"><img src="${cntr.flag}" alt=" ${cntr.name}" srcset=""></div> 
     <div class="detail">
        <div class="name">${cntr.name}</div>
        <div class="population"><b> population: </b> <span>${cntr.population}</span></div>
        <div class="Region"><b> Region: </b><span>${cntr.region}</span></div>
        <div class="Capital"><b> Capital: </b><span>${cntr.capital}</span></div>
     </div>  
    </div> 
    `;
    return div;
}).join(" ");
countriesDiv.innerHTML=contryListDiv;
setCountry();
}
function setCountry(){
    const allCountries= document.querySelectorAll(".coutry");
    const All = JSON.parse(localStorage.getItem("allCountries"));
    allCountries.forEach(ctry=>{
        ctry.onclick=()=>{
        const countryDetail = All.filter(cntr=>cntr.name==ctry.id);
        localStorage.setItem("country",JSON.stringify(countryDetail));
        location.href="detail.html";
        console.log(ctry);  
        }

    })
}
fetchCountries();