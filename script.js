const selectElement = document.querySelector("select");

selectElement.addEventListener("change", () => {
  const selectedCountryName = selectElement.value;
  fetch(`https://restcountries.com/v3.1/name/${selectedCountryName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((countries) => {
      const selectedCountry = countries[0];
      // display them in HTML
      const countryDetails = `
  <h2>${selectedCountry.name.common}</h2>
  <img src="${selectedCountry.flags.svg}" alt="${selectedCountry.name.common} flag ">
  <p>Population: ${selectedCountry.population}</p>
  <p>Capital: ${selectedCountry.capital}</p>
  <p>Region: ${selectedCountry.region}</p>
  <p>Subregion: ${selectedCountry.subregion}</p>
`;
      document.querySelector("#country-details").innerHTML =
        countryDetails;
    })
    .catch((err) => console.log(err.message));
});

fetch("https://restcountries.com/v3.1/all")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((countries) => {
    const countryOptions = countries.map(
      (country) => `<option>${country.name.common}</option>`
    );
    document.querySelector("select").innerHTML = countryOptions.join("");
  })
  .catch((err) => console.log(err.message));