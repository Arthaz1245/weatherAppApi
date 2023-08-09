const ICON_BASE_URL = "https://google.github.io/material-design-icons/";

export const getIconUrl = (iconName) => `${ICON_BASE_URL}${iconName}.svg`;

export const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

export const convertToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
