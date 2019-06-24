const input = document.querySelector("#search");
const result = document.querySelector("#results");

const apiEndpoint = "https://restcountries.eu/rest/v2/name/";

let country;

const fixNumbersArea = (x) => {

    // numbers with commas
    // const num = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if(x) {
      const num = x.toLocaleString()
      return num + ' km&sup2';
    }
    return 'Data not available'
}

const fixNumbersPopulation = (x) => {

  // numbers with commas
  // const num = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if(x) {
    const num = x.toLocaleString()
    return num;
  }
  return 'Data not available'
}


const fetchCountry = async searchTerm => {
  const country = await fetch(`${apiEndpoint}${searchTerm}`);

  const response = await country.json();

  // console.log(response);

  return response;
};

const updateUI = data => {
  const countries = data;

  // console.log(countries);

  const countryResult = countries
    .map(country => {
      return `
<div class="container">
    <h1 class="text-center city-name">${
      country.name
    } <span class="text-muted small">(${country.nativeName})</span></h1>
  <div class="row">
    <div class="col-lg-3 col-md-3 col-sm-6">
      <div class="data-cont align-center">
        <img src=${country.flag} class="img-fluid smaller-img"/>
      </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-6">
      <div class="data-cont">
        <h5>Capital city</h5>
        <h3>${country.capital}</h3>
        <h5>Region</h5>
        <h3>${country.region}</h3>
      </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-6">
      <div class="data-cont">
        <h5>Population</h5>
        <h3>${fixNumbersPopulation(country.population)}</h3>
        <h5>Area</h5>
        <h3>${fixNumbersArea(country.area)}</h3>
      </div>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-6">
      <div class="data-cont">
        <h5>Currency</h5>
        <h6><span class="text-muted">Code:</span> ${
          country.currencies[0].code
        }<br>
        <span class="text-muted">Name:</span> ${country.currencies[0].name}<br>
        <span class="text-muted">Symbol:</span> ${country.currencies[0].symbol}
        </h6>
        <h6>Domain</h6>
        <h5>${country.topLevelDomain[0]}</h5>
      </div>
    </div>
  </div>
</div>
`;
    })
    .join("");

  result.innerHTML = countryResult;
};

const updateCountryName = async searchTerm => {
  const country = await fetchCountry(searchTerm);

  console.log(country);

  return country;
};

input.addEventListener("input", e => {
  const searchTerm = input.value.trim();

  // console.log(searchTerm);

  if (searchTerm.length > 0) {
    updateCountryName(searchTerm)
      .then(response => updateUI(response))
      .catch(err => console.log(err));
  } else {
    result.innerHTML = "";
  }
});
