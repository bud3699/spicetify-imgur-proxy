// @name         imgur-proxy
// @description  Use DuckDuckGo's proxy to load Imgur images for people in the UK
// @author       bud3699
// @version      1.1.1

(function imgurProxyExtension() {
  const duckDuckGoProxy = "https://proxy.duckduckgo.com/iu/?u=";

  function proxyImgurImages() {
    const images = document.querySelectorAll("img");
    images.forEach(img => {
      const src = img.src;
      if (
        /imgur\.com/.test(src) &&
        !src.startsWith(duckDuckGoProxy) &&
        !decodeURIComponent(src).includes(duckDuckGoProxy)
      ) {
        img.src = duckDuckGoProxy + encodeURIComponent(src);
      }
    });
  }

  function proxyImgurCSS() {
    const allElements = document.querySelectorAll("*");
    allElements.forEach(el => {
      const bgImage = getComputedStyle(el).backgroundImage;
      if (
        bgImage &&
        /imgur\.com/.test(bgImage) &&
        !bgImage.includes(duckDuckGoProxy) &&
        !decodeURIComponent(bgImage).includes(duckDuckGoProxy)
      ) {
        const urlMatch = bgImage.match(/url\(["']?(https?:\/\/[^"')]+)["']?\)/);
        if (urlMatch && urlMatch[1]) {
          const proxiedUrl = duckDuckGoProxy + encodeURIComponent(urlMatch[1]);
          el.style.backgroundImage = `url("${proxiedUrl}")`;
        }
      }
    });

    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (
            rule.style &&
            rule.style.backgroundImage &&
            /imgur\.com/.test(rule.style.backgroundImage) &&
            !rule.style.backgroundImage.includes(duckDuckGoProxy) &&
            !decodeURIComponent(rule.style.backgroundImage).includes(duckDuckGoProxy)
          ) {
            const urlMatch = rule.style.backgroundImage.match(/url\(["']?(https?:\/\/[^"')]+)["']?\)/);
            if (urlMatch && urlMatch[1]) {
              const proxiedUrl = duckDuckGoProxy + encodeURIComponent(urlMatch[1]);
              rule.style.backgroundImage = `url("${proxiedUrl}")`;
            }
          }
        }
      } catch (e) {
      }
    }
  }

  function proxyAllImgurContent() {
    proxyImgurImages();
    proxyImgurCSS();
  }

  proxyAllImgurContent();

  const observer = new MutationObserver(() => proxyAllImgurContent());
  observer.observe(document.body, { childList: true, subtree: true });

  console.log("Imgur Proxy Extension loaded.");
})();
