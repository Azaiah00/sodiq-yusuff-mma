/* Shared nav + footer partials injected into every page.
   Keeps code DRY — edit here, updates everywhere. */

const NAV_HTML = `
<div class="announce">Now Enrolling in Waldorf, MD — New Students Train FREE for 30 Days. Limited Spots. No Credit Card Required.</div>
<header class="nav">
  <div class="nav-inner">
    <a href="index.html" class="logo" aria-label="Sodiq Yusuff MMA Home">
      <img src="assets/images/logo-super-sodiq-green.jpg" alt="Super Sodiq MMA" class="logo-img" />
      <span>Super<span style="color:var(--nigeria-green-bright)">Sodiq</span> MMA</span>
    </a>
    <nav class="nav-links" aria-label="Primary navigation">
      <a href="index.html">Home</a>
      <a href="programs.html">Programs</a>
      <a href="about.html">About</a>
      <a href="media.html">Media</a>
      <a href="blog.html">Blog</a>
      <a href="fighters.html">Fighters Only</a>
      <a href="contact.html">Contact</a>
      <a href="contact.html#trial" class="btn btn-primary btn-sm nav-cta">Claim 30-Day Free Trial</a>
    </nav>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">
          <img src="assets/images/logo-super-sodiq-green.jpg" alt="Super Sodiq MMA" class="logo-img" />
          <span>Sodiq "Super" Yusuff MMA</span>
        </div>
        <p>Southern Maryland's only UFC Fighter-owned Mixed Martial Arts academy. From the Octagon to your community.</p>
        <p class="footer-tag mt-md">From the UFC Octagon to Southern Maryland — Built for Champions at Every Level.</p>
      </div>
      <div>
        <h5>Visit</h5>
        <p>3480 Rockefeller Ct<br/>Suite I-J<br/>Waldorf, MD 20602</p>
      </div>
      <div>
        <h5>Contact</h5>
        <p><a href="tel:3018887285">301-888-7285</a></p>
        <p><a href="https://instagram.com/supersodiqmma" target="_blank" rel="noopener">@supersodiqmma</a></p>
        <p><a href="https://instagram.com/supersodiq" target="_blank" rel="noopener">@supersodiq</a></p>
      </div>
      <div>
        <h5>Navigate</h5>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="programs.html">Programs</a></li>
          <li><a href="about.html">About Sodiq</a></li>
          <li><a href="media.html">Media</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="fighters.html">Fighters Only</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year></span> Sodiq Yusuff MMA. All rights reserved.</span>
      <span>Waldorf, Maryland · Est. 2025</span>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  const navSlot = document.getElementById('nav-slot');
  const footSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.innerHTML = NAV_HTML;
  if (footSlot) footSlot.innerHTML = FOOTER_HTML;
  document.dispatchEvent(new Event('partials:loaded'));
});
