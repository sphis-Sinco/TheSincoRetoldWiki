document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const navbar = document.getElementById("navbar");
  const main = document.getElementById("main-content");
  const footer = document.getElementById("footer");

  header.innerHTML = `
    <h1>The Sinco Retold Wiki</h1>
    <p>Your definitive guide to the reimagined world of Sinco</p>
  `;

  navbar.innerHTML = `
    <a href="#">Home</a>
    <a href="#">Characters</a>
    <a href="#">Timeline</a>
    <a href="#">Factions</a>
    <a href="#">Locations</a>
    <a href="#">Community</a>
  `;

  main.innerHTML = `
    <section class="section card">
      <h2>Welcome to The Sinco Retold Wiki</h2>
      <p>This fan-maintained encyclopedia documents the lore, characters, events, and universe of <strong>Sinco Retold</strong>.
      Whether you're a new reader or a returning veteran, this wiki will help you dive deeper into the story.</p>
    </section>

    <section class="section card">
      <h2>Featured Article</h2>
      <p><strong>The Siege of Halden’s Rise</strong> — One of the most pivotal battles in Sinco history. Learn how the conflict shaped the political landscape of the Third Age.</p>
      <a href="#">Read more...</a>
    </section>

    <section class="section card">
      <h2>Recent Updates</h2>
      <ul>
        <li><strong>May 25:</strong> Added new details to the "Sky Reavers" faction page.</li>
        <li><strong>May 20:</strong> Timeline updated with entries from the Dawnfall Arc.</li>
        <li><strong>May 18:</strong> New artwork added to the character profile of Lysira.</li>
      </ul>
    </section>
  `;

  footer.innerHTML = `
    <p>&copy; 2025 The Sinco Retold Wiki. All rights reserved. | <a href="#" style="color: #ccc;">Contact</a></p>
  `;
});
