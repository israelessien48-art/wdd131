// FOOTER DATE + COPYRIGHT
const year = document.getElementById("year");
const lastModified = document.getElementById("lastModified");

year.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

// WIND CHILL FUNCTION
function calculateWindChill(t, s) {
  // Wind chill formula for Celsius (one line only)
  return 13.12 + 0.6215*t - 11.37*Math.pow(s,0.16) + 0.3965*t*Math.pow(s,0.16);
}

const temp = 28; // °C
const wind = 10; // km/h
const windchillElement = document.getElementById("windchill");

// Only calculate if conditions are met
if (temp <= 10 && wind > 4.8) {
  const chill = calculateWindChill(temp, wind);
  windchillElement.textContent = `${chill.toFixed(1)} °C`;
} else {
  windchillElement.textContent = "N/A";
}
