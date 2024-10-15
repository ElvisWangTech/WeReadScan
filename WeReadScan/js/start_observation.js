// @name         Weread Scraper
// @namespace    https://github.com/Sec-ant/weread-scraper
// @version      0.3
// @description  Export Weread books to html file
// @author       Secant

// start observation
const targetNode = document.getElementById('preRenderContent');
contentObserver.observe(targetNode, {
    childList: true,
    subtree: true,
});