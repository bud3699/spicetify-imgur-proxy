// @name         imgur-proxy
// @description  Use DuckDuckGo's proxy to load Imgur images for people in the UK
// @author       bud3699
// @version      1.0.0

(function imgurProxyExtension() {
  const duckDuckGoProxy = "https://proxy.duckduckgo.com/iu/?u=";

  function proxyImgurImages() {
    const images = document.querySelectorAll("img");
    images.forEach(img => {
      const src = img.src;
      if (src.includes("imgur.com") && !src.startsWith(duckDuckGoProxy)) {
        img.src = duckDuckGoProxy + encodeURIComponent(src);
      }
    });
  }

  proxyImgurImages();

  const observer = new MutationObserver(() => proxyImgurImages());
  observer.observe(document.body, { childList: true, subtree: true });

  console.log("Imgur Proxy Extension loaded.");
})();
