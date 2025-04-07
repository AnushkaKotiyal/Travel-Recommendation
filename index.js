let countries = [];
fetch("data.json")
  .then((response) => response.json())
  .then((data) => (countries = data.countries))
  .catch((error) => {
    console.log(error);
  });
function clearResponse(){
  const input = document.getElementById("search");
  input.value="";
  const options = document.getElementById("options");
  options.innerHTML="";
  const timeElement = document.getElementById("time"); 
  timeElement.innerHTML="";
  timeElement.classList.remove("time");
}
function searchHandler() {
  const input = document.getElementById("search");
  const options = document.getElementById("options");
  const timeElement = document.getElementById("time"); 
  const value = input.value.trim().toLowerCase();
  const country = countries.find(
    (country) => country.name.toLowerCase() === value
  );
  const typeWiseCountries = countries.filter((country) =>
    country.cities.some((city) => city.type.toLowerCase() === value)
  );
  options.innerHTML = "";
  if (country) {
    timeElement.innerHTML="loading time...";
    timeElement.classList.add("time");
    const apiKey = "XM8F37tNknoiSbUjmAkpCA==CXt2FaGAHQkZemSM";
    fetch(`https://api.api-ninjas.com/v1/worldtime?timezone=${country.timezone}`, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        if (timeElement && data.datetime) {
          timeElement.innerHTML = `Current Locale time ${country.name}: ${data.datetime}`;
        }
      })
      .catch((error) => {
        console.error("Failed to fetch time:", error);
      });
    country.cities.forEach((city) => {
      const cityContainer = document.createElement("div");
      cityContainer.style.margin = "20px";
      cityContainer.style.padding = "10px";
      cityContainer.style.border = "1px solid #ccc";
      cityContainer.style.borderRadius = "8px";

      const name = document.createElement("h2");
      name.textContent = city.name;
      name.style.color = "black";
      name.style.padding = "5px";
      const desc = document.createElement("p");
      desc.textContent = city.description;
      desc.style.color = "black";
      const imgDiv = document.createElement("div");
      imgDiv.style.width = "100%";
      imgDiv.style.height = "200px";
      imgDiv.style.backgroundImage = `url('${city.images}')`;
      imgDiv.style.backgroundSize = "cover";
      imgDiv.style.backgroundPosition = "center";
      imgDiv.style.borderRadius = "6px";
      imgDiv.style.marginTop = "10px";
      cityContainer.appendChild(imgDiv);
      cityContainer.appendChild(name);
      cityContainer.appendChild(desc);
      options.appendChild(cityContainer);
    });
  } else if (typeWiseCountries) {
    typeWiseCountries.forEach((country) => {
      country.cities
        .filter((city) => city.type.toLowerCase() === value)
        .forEach((city) => {
          const cityContainer = document.createElement("div");
          cityContainer.style.margin = "20px";
          cityContainer.style.padding = "10px";
          cityContainer.style.border = "1px solid #ccc";
          cityContainer.style.borderRadius = "8px";

          const name = document.createElement("h2");
          name.textContent = city.name;
          name.style.color = "black";
          name.style.padding = "5px";

          const desc = document.createElement("p");
          desc.textContent = city.description;
          desc.style.color = "black";

          const imgDiv = document.createElement("div");
          imgDiv.style.width = "100%";
          imgDiv.style.height = "200px";
          imgDiv.style.backgroundImage = `url('${city.images}')`;
          imgDiv.style.backgroundSize = "cover";
          imgDiv.style.backgroundPosition = "center";
          imgDiv.style.borderRadius = "6px";
          imgDiv.style.marginTop = "10px";
          cityContainer.appendChild(imgDiv);
          cityContainer.appendChild(name);
          cityContainer.appendChild(desc);
          options.appendChild(cityContainer);
        });
    });
  } else {
    options.innerHTML = "<p>No data found for this country.</p>";
  }
}
