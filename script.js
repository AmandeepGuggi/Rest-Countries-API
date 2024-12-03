const countryContainer = document.querySelector('.countries-container')
const darkMode = document.querySelector('.dark-mode')
const sunMoon = document.querySelector('#sun-moon')
const main = document.querySelector('main')
const countryCard = document.querySelector('.country')
const input = document.querySelector('.search-input')
const select = document.querySelector('select')
const header = document.querySelector('header')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-input')
let allCountriesData

fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data) => {
    renderCountries(data)
    allCountriesData = data
  
})

filterByRegion.addEventListener('change',(e) => {
    countryContainer.innerHTML = ''
    const region =  e.target.value
   fetch(`https://restcountries.com/v3.1/region/${region}`)
.then((res)=> res.json())
.then(renderCountries)

})

searchInput.addEventListener('input',(e) => {
  
    const filteredCountries =  allCountriesData.filter((country) => {
     return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    renderCountries(filteredCountries)
})

function renderCountries(data){
    countryContainer.innerHTML = ''
    data.forEach(country => {
        
        const countryCard = document.createElement("a");
countryCard.classList.add("country");
countryCard.href = `country.html?name=${country.name.common}`
countryCard.innerHTML = `
<img src='${country.flags.svg}' alt="flag">
                <div class="country-text">
                    <h2>${country.name.common}</h2>
                    <p><b>Population:</b> ${Intl.NumberFormat('en-IN').format(country.population)}</p>
                    <p><b>Region:</b> ${country.region}</p>
                    <p><b>Capital:</b> ${country.capital}</p>
                </div>
`;
countryContainer.append(countryCard)
    });
}




darkMode.addEventListener('click',()=>{
    countryContainer.classList.toggle('dark')
    main.classList.toggle('dark')
    input.classList.toggle('dark')
    select.classList.toggle('dark')
    header.classList.toggle('dark')
    let hasClass = sunMoon.classList.contains('fa-moon')
    if(hasClass){
        console.log('dark on');
        sunMoon.classList.replace('fa-moon','fa-sun')
    }else{
        sunMoon.classList.replace('fa-sun','fa-moon')
    }
    darkMode()
    function darkMode(){
        if(hasClass){
            localStorage.setItem('darkMode',true)
        }else{
            localStorage.setItem('darkMode',false)
        }
    }
})
let isDarkMode = JSON.parse(localStorage.getItem('darkMode'))

if(isDarkMode){
    sunMoon.classList.replace('fa-moon','fa-sun')
    countryContainer.classList.add('dark')
    main.classList.add('dark')
    input.classList.add('dark')
    select.classList.add('dark')
    header.classList.add('dark')
}else{
    sunMoon.classList.replace('fa-sun','fa-moon')
    countryContainer.classList.remove('dark')
    main.classList.remove('dark')
    input.classList.remove('dark')
    select.classList.remove('dark')
    header.classList.remove('dark')
   
}