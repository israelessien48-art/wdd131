
// Set the last modified date in "DD/MM/YYYY HH:MM:SS" format
const lastModified = new Date(document.lastModified);
const formattedDate = lastModified.toLocaleString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
document.querySelector("#lastModified").textContent = formattedDate;
