// ==UserScript==
// @name         Toggle Focus Mode in Brave/Ahoy platforms
// @namespace    http://tampermonkey.net/
// @version      2024-11-01
// @description  Removes distractions by hiding sidebar, navigation, etc. Leaves only article content. Default shortcut: `ctrl =` to toggle the focus on/off.
// @author       Maciek Sitkowski
// @include      https://bravecourses.circle.so*
// @include      https://spolecznosc.eduweb.pl*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=circle.so
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    const FOCUS_ON = 'on';

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      .focus-mode div.main {
        position: fixed !important;
        inset: 0 !important;
        z-index: 99999 !important;
        overflow-y: auto !important;
        height: 100vh !important;
        width: 100vw !important;
        color-scheme: dark !important;
      }`;
    document.head.appendChild(styleSheet);

    // Make it possible to go to the page with the focus already applied
    const isFocusSearchParamOn =
        new URL(window.location.href).searchParams.get('focus') === FOCUS_ON;
    // Persist the focus mode in the local storage, so that it's remembered when changing pages
    const isFocusLocalStorageOn = localStorage.getItem('focus') === FOCUS_ON;

    let hasFocus = isFocusSearchParamOn || isFocusLocalStorageOn;
    if (hasFocus) {
        document.body.classList.add('focus-mode');
    }

    document.addEventListener('keydown', (event) => {
        // 👇👇👇 CHANGE SHORTCUT HERE
        if (event.ctrlKey && event.key === '=') {
            event.preventDefault();

            hasFocus = !hasFocus;

            document.body.classList.toggle('focus-mode', hasFocus);

            if (hasFocus) {
                localStorage.setItem('focus', FOCUS_ON);
            } else {
                localStorage.removeItem('focus');
            }
        }
    });
})();
