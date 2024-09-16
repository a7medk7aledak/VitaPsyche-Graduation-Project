type TCountriesData = {
  [key: string]: string[]; // A key-value pair where the key is a country name and the value is an array of governments (states/provinces/cities)
};

export const countriesData: TCountriesData = {
  USA: ["California", "Texas", "Florida", "New York"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
  Egypt: ["Cairo", "Giza", "Alexandria", "Luxor", "Aswan", "Sharm El-Sheikh"],
  Germany: ["Bavaria", "Berlin", "Hamburg", "Hesse"],
};
