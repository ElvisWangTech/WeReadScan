// @name         Weread Scraper
// @namespace    https://github.com/Sec-ant/weread-scraper
// @version      0.3
// @description  Export Weread books to html file
// @author       Secant

// construct html root
const rootElement = document.createElement("html");
const styleElement = document.createElement("style");
const bodyElement = document.createElement("body");
rootElement.append(styleElement);
rootElement.append(bodyElement);

// define observer handlers
const contentObserver = new MutationObserver((mutiationsList, observer) => {
  for (let mutation of mutiationsList) {
    if (mutation.type === 'childList') {
      console.log('dbg: occured!!')
      const content = document.querySelector(".preRenderContainer:not([style])");
      if (content) {
        // define styles
        if (styleElement.childNodes.length === 0) {
          const contentStyle = content.querySelector("style");
          if (contentStyle?.childNodes.length) {
            styleElement.innerHTML = contentStyle.innerHTML
              .replaceAll(".readerChapterContent", ".preRenderContent")
              .replaceAll(/汉仪旗黑(?=\d)/g, "汉仪旗黑 ")
              .replaceAll(/汉仪楷体(?!S)/g, "汉仪楷体S");
            styleElement.append(
              ".preRenderContent { page-break-after: always; }"
            );
          }
        }
        // append contents
        const contentDiv = content.querySelector("#preRenderContent");
        if (contentDiv) {
          const contentDivCloned = contentDiv.cloneNode(true)
          contentDivCloned.removeAttribute("id");
          contentDivCloned.removeAttribute('style');
          contentDivCloned
            .querySelectorAll("img")
            .forEach(
              (img) => (img.src = img.getAttribute("data-src") || img.src)
            );
          if (contentDivCloned.innerHTML) {
            let dup = false
            bodyElement.querySelectorAll('.preRenderContent').forEach(nd => {
              if (nd.textContent === contentDivCloned.textContent) dup = true;
            })
            if (!dup) {
              bodyElement.append(contentDivCloned);
            }
          }
        }
      }
    }
  }
})