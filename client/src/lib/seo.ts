export const HOME_SEO_TITLE = "Blue Tape Sites | Home-Service Web Design";
export const HOME_SEO_DESCRIPTION =
  "Premium web design for plumbers, electricians, cleaners, and contractors that need stronger trust and more leads.";

export const applyHomeSeo = () => {
  if (typeof document === "undefined") {
    return;
  }

  document.title = HOME_SEO_TITLE;

  let descriptionTag = document.querySelector('meta[name="description"]');

  if (!descriptionTag) {
    descriptionTag = document.createElement("meta");
    descriptionTag.setAttribute("name", "description");
    document.head.appendChild(descriptionTag);
  }

  descriptionTag.setAttribute("content", HOME_SEO_DESCRIPTION);
};
