/* Shared nav + footer partials injected into every page.
   Keeps code DRY - edit here, updates everywhere. */

const NAV_HTML = `
<div class="announce">Now Enrolling in Waldorf, MD - New Students Train FREE for 30 Days. Limited Spots. No Credit Card Required.</div>
<header class="nav">
  <div class="nav-inner">
    <a href="index.html" class="logo" aria-label="Sodiq Yusuff MMA Home">
      <img src="assets/images/super-sodiq-logo.png" alt="Super Sodiq MMA" class="logo-img" />
      <span>Super<span style="color:var(--nigeria-green-bright)">Sodiq</span> MMA</span>
    </a>
    <nav class="nav-links" aria-label="Primary navigation">
      <a href="index.html">Home</a>
      <div class="nav-dropdown" data-dropdown>
        <a href="programs.html" class="nav-dropdown-trigger">Programs <span class="nav-caret">\u25BE</span></a>
        <div class="nav-dropdown-menu" role="menu" style="display:none;">
          <a href="parent-and-me.html" role="menuitem">Parent &amp; Me</a>
          <a href="kids.html" role="menuitem">Kids</a>
          <a href="teens.html" role="menuitem">Teens</a>
          <a href="adults.html" role="menuitem">Adults</a>
        </div>
      </div>
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
          <img src="assets/images/super-sodiq-logo.png" alt="Super Sodiq MMA" class="logo-img" />
          <span>Sodiq "Super" Yusuff MMA</span>
        </div>
        <p>Southern Maryland's only UFC Fighter-owned Mixed Martial Arts academy. From the Octagon to your community.</p>
        <p class="footer-tag mt-md">From the UFC Octagon to Southern Maryland - Built for Champions at Every Level.</p>
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
        <h5>Programs</h5>
        <ul>
          <li><a href="programs.html">All Programs</a></li>
          <li><a href="parent-and-me.html">Parent &amp; Me</a></li>
          <li><a href="kids.html">Kids</a></li>
          <li><a href="teens.html">Teens</a></li>
          <li><a href="adults.html">Adults</a></li>
        </ul>
      </div>
      <div>
        <h5>Navigate</h5>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Sodiq</a></li>
          <li><a href="media.html">Media</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="fighters.html">Fighters Only</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>(c) <span data-year></span> Sodiq Yusuff MMA. All rights reserved.</span>
      <span>Waldorf, Maryland - Est. 2025</span>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  const navSlot = document.getElementById('nav-slot');
  const footSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.innerHTML = NAV_HTML;
  if (footSlot) footSlot.innerHTML = FOOTER_HTML;
  document.dispatchEvent(new Event('partials:loaded'));

  // BULLETPROOF DROPDOWN: pure-JS hover (desktop) and click (mobile) — does not rely on CSS
  const dropdown = document.querySelector('[data-dropdown]');
  if (dropdown) {
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    const isMobile = () => window.matchMedia('(max-width: 900px)').matches;
    // CRITICAL: parent must be position:relative so absolute menu anchors to it (not body)
    dropdown.style.position = 'relative';
    dropdown.style.display = 'inline-block';

    const showMenu = () => {
      if (isMobile()) {
        // Mobile: menu shows IN the hamburger flow (block/static)
        menu.style.cssText = 'display:block; position:static; min-width:0; box-shadow:none; border:none; background:transparent; padding:0 0 0 16px;';
      } else {
        // Desktop: menu floats absolute over content - cannot affect header layout
        menu.style.cssText = 'display:flex !important; flex-direction:column; position:absolute; top:100%; left:0; right:auto; min-width:220px; background:#0f1311; border:1px solid #2a302d; border-radius:4px; padding:8px 0; z-index:1000; box-shadow:0 16px 40px rgba(0,0,0,0.6); margin-top:8px;';
      }
    };
    const hideMenu = () => { menu.style.cssText = 'display:none;'; };

    // Desktop: show on mouseenter, hide on mouseleave
    dropdown.addEventListener('mouseenter', () => { if (!isMobile()) showMenu(); });
    dropdown.addEventListener('mouseleave', () => { if (!isMobile()) hideMenu(); });

    // Mobile: tap trigger to toggle
    trigger.addEventListener('click', (e) => {
      if (isMobile()) {
        e.preventDefault();
        if (menu.style.display === 'none' || menu.style.display === '') {
          showMenu();
        } else {
          hideMenu();
        }
      }
    });

    // Tap outside closes (mobile)
    document.addEventListener('click', (e) => {
      if (isMobile() && !dropdown.contains(e.target)) hideMenu();
    });

    // Resize: reset
    window.addEventListener('resize', hideMenu);
  }
});
