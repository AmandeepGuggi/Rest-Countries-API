const darkMode = document.querySelector('.dark-mode')
const sunMoon = document.querySelector('#sun-moon')
const main = document.querySelector('main')
const header = document.querySelector('header')
const backBtn = document.querySelector('back-btn')
const flagImage = document.querySelector('.country-image img')
const countryNameHeading = document.querySelector('.country-name') 
const nativeName = document.querySelector('.native-name') 
const population = document.querySelector('.population') 
const region = document.querySelector('.region') 
const subRegion = document.querySelector('.sub-region') 
const capital = document.querySelector('.capital') 
const topLevelDomain = document.querySelector('.top-level-domain') 
const currencies = document.querySelector('.currencies') 
const language = document.querySelector('.language') 
const borderCountriesContainer = document.querySelector('.border-countries')


const countryName =  new URLSearchParams(window.location.search)
.get('name')
countryNameHeading.textContent = countryName

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json())
.then(([country])=>{
    flagImage.src = country.flags.svg
    if(country.name.nativeName){
        nativeName.textContent = Object.values(country.name.nativeName)[0].common
    }
    else{
        nativeName.textContent = countryName
    }
    population.textContent =` ${Intl.NumberFormat('en-IN').format(country.population)}`
    region.textContent = country.region
    if(country.subregion){
       subRegion.textContent = country.subregion
    }
    if(country.capital){
        capital.textContent = country.capital[0]
    }
    topLevelDomain.textContent = country.tld.join(', ')
    if(country.languages){
        language.textContent = Object.values(country.languages).map((lang)=> lang )
    }
    if(country.currencies){
        currencies.textContent = Object.values(country.currencies).map((curr)=> curr.name )
    }
    if(country.borders){
        country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
                const countryLink = document.createElement('a')
                countryLink.textContent = borderCountry.name.common
                countryLink.href = `country.html?name=${borderCountry.name.common}`
                borderCountriesContainer.append(countryLink)
               console.log(borderCountry);
            })
        })
    }
    
})

























darkMode.addEventListener('click',()=> {
    main.classList.toggle('dark')
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
    main.classList.add('dark')
    header.classList.add('dark')
    
}else{
    sunMoon.classList.replace('fa-sun','fa-moon')
    main.classList.remove('dark')
    header.classList.remove('dark')
   
}
