import { toHtml, icon } from '@fortawesome/fontawesome-svg-core';

// https://stackoverflow.com/questions/66663686/using-font-awesome-icon-for-background-image-in-react

export const getSVGURL = (faIcon, color) => {
  const abstract = icon(faIcon).abstract[0];
  if (color) abstract.children[0].attributes.fill = color;
  return `data:image/svg+xml;base64,${btoa(toHtml(abstract))}`;
};
