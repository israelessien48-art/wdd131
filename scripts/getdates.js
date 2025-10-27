// Dynamically display the copyright year and last modified date

// Get the current year
const currentYear = new Date().getFullYear();

// Select the footer paragraph
const footerParagraph = document.querySelector("footer p");

// Set the copyright text to match the example format
footerParagraph.innerHTML = `©${currentYear} 🌸 Israel Godwin Essien 🌸 Uyo, Nigeria`;

// Format and display the last modified date
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

