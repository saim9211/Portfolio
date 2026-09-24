document.getElementById("year").textContent = new Date().getFullYear();

const searchForm = document.getElementById("site-search");
const searchInput = document.getElementById("site-search-input");
const searchStatus = document.getElementById("search-status");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLocaleLowerCase();
  if (!query) {
    searchStatus.textContent = "Enter a search term.";
    return;
  }

  const sections = ["home", "work", "about", "skills", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const match = sections.find((section) => section.textContent.toLocaleLowerCase().includes(query));

  if (match) {
    const label = match.querySelector("h1, h2")?.textContent.trim() || "Overview";
    searchStatus.textContent = `Found in ${label}.`;
    match.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    searchStatus.textContent = "No matching section found.";
  }
});

const pageSections = ["home", "work", "about", "skills", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const contentsLinks = document.querySelectorAll('.sidebar-links a[href^="#"]');

if ("IntersectionObserver" in window) {
  const contentsObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];
    if (!visibleSection) return;

    contentsLinks.forEach((link) => {
      if (link.hash === `#${visibleSection.target.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });

  pageSections.forEach((section) => contentsObserver.observe(section));
}
