// === Element-Wrapping Utilities ===

export function strong(text) {
  return `<strong>${text}</strong>`;
}

export function italic(text) {
  return `<em>${text}</em>`;
}

export function span(text, className = "") {
  return `<span class="${className}">${text}</span>`;
}

export function link(text, href) {
  return `<a href="${href}">${text}</a>`;
}

export function paragraph(...elements) {
  return `<p>${elements.join(' ')}</p>`;
}

export function list(items) {
  return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

// === Section Generators ===

export function createHeader(title, subtitle) {
  return `<h1>${title}</h1><p>${subtitle}</p>`;
}

export function createNavbar(links) {
  return links.map(link => `<a href="${link.href}">${link.label}</a>`).join('');
}

export function createCardSection(title, content) {
  return `<section class="section card"><h2>${title}</h2>${content}</section>`;
}

export function createFooter(year, siteName) {
  return `<p>&copy; ${year} ${siteName}. All rights reserved. | ${link("Contact", "#")}</p>`;
}
