export function generateCountry(country) {
	const languages = Object.values(country.languages).join(', ');

return `<h2><img src="${country.flags.svg}" alt="${country.name.common}" width = 40px> ${country.name.official}</h2>
<p><b>Capital: </b>${country.capital}</p>
<p><b>Population: </b>${country.population}</p>
<p><b>Languages: </b>${languages}</p>`
}


export function generateCountries(countries) {
return countries.map(generateCountriesList).join('');
}

export function generateCountriesList(country) {
return `<li><img src="${country.flags.svg}" alt="${country.name.common}" width = 20px> ${country.name.official}</li>`
} 