export function createHeader(title, subtitle) {
  return `
    <h1>${title}</h1>
    <p>${subtitle}</p>
  `;
}

export function createNavbar(links) {
  return links.map(link => `<a href="${link.href}">${link.label}</a>`).join('');
}

export function createCardSection(title, content) {
  return `
    <section class="section card">
      <h2>${title}</h2>
      ${content}
    </section>
  `;
}

export function createFooter(year, siteName) {
  return `
    <p>&copy; ${year} ${siteName}. All rights reserved. | <a href="#">Contact</a></p>
  `;
}
