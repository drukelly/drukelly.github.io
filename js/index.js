(function () {
  var CONSENT_KEY = 'cookie-consent';
  var GA_ID = 'G-8V7LBDDE0S';

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {}
  }

  function loadGoogleAnalytics() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);
  }

  function showBanner() {
    var banner = document.getElementById('cookie-consent');
    if (banner) {
      banner.hidden = false;
    }
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-consent');
    if (banner) {
      banner.hidden = true;
    }
  }

  function updateFooterText() {
    var el = document.getElementById('cookie-preference-text');
    if (!el) return;
    var consent = getConsent();
    if (consent === 'accept') {
      el.innerHTML =
        'This site uses cookies via <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">Google Analytics</a> to understand how visitors use the site. <button type="button" id="cookie-preferences" class="footer-fine-print__link">Cookie preferences</button>';
    } else if (consent === 'reject') {
      el.innerHTML =
        'Analytics cookies are disabled. <button type="button" id="cookie-preferences" class="footer-fine-print__link">Cookie preferences</button>';
    } else {
      el.innerHTML =
        'This site uses cookies via <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">Google Analytics</a> to understand how visitors use the site. <button type="button" id="cookie-preferences" class="footer-fine-print__link">Cookie preferences</button>';
    }
    bindFooterPreference();
  }

  function bindFooterPreference() {
    var prefBtn = document.getElementById('cookie-preferences');
    if (prefBtn) {
      prefBtn.replaceWith(prefBtn.cloneNode(true));
      document.getElementById('cookie-preferences').addEventListener('click', openPreferences);
    }
  }

  function openPreferences() {
    setConsent('');
    showBanner();
    updateFooterText();
  }

  function bindBanner() {
    var accept = document.getElementById('cookie-consent-accept');
    var reject = document.getElementById('cookie-consent-reject');
    if (accept) {
      accept.addEventListener('click', function () {
        setConsent('accept');
        loadGoogleAnalytics();
        hideBanner();
        updateFooterText();
      });
    }
    if (reject) {
      reject.addEventListener('click', function () {
        setConsent('reject');
        hideBanner();
        updateFooterText();
      });
    }
  }

  var consent = getConsent();
  if (consent === 'accept') {
    loadGoogleAnalytics();
    hideBanner();
  } else if (consent === 'reject') {
    hideBanner();
  } else {
    showBanner();
  }
  bindBanner();
  updateFooterText();
  bindFooterPreference();
})();
