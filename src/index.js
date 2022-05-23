import './css/styles.css';
import debounce from 'lodash.debounce'
import {fetchCountries} from './js/countriesFetch'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {generateCountry, generateCountries} from './js/generateDOM'

const DEBOUNCE_DELAY = 300;

const refs = {
	searchBox: document.querySelector('#search-box'),
	countryList: document.querySelector('.country-list'),
	countryInfo: document.querySelector('.country-info'),
}

refs.searchBox.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY));


function onCountriesFetch(e) {
	const inputValue = e.target.value.trim();

	if (inputValue.length === 0) {
		refs.countryList.innerHTML = ""
		return;
	} else {
		fetchCountries(inputValue)
		.then(countries => {
			clearDom();
			markup(countries);
		}).catch(error => Notify.failure('Oops, there is no country with that name'));
		};
	}

function clearDom() {
	refs.countryList.innerHTML = "";
	refs.countryInfo.innerHTML = "";
}

function markup(countries) {
	if (countries.length > 9) {
		Notify.warning("Too many matches found. Please enter more specific name.")
		return
	} else if (countries.length === 1) {
		refs.countryInfo.innerHTML = generateCountry(countries[0]);
		return
	} else {
		refs.countryList.innerHTML = generateCountries(countries)
		return
	}
}