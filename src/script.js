// @ts-check
const page_view = /** @type {HTMLDivElement} */ (document.querySelector('.current-page'));
const visible_page_counters = /** @type {NodeListOf<HTMLSpanElement>} */ (document.querySelectorAll('[class^=visible-page]'));
let current_page_number = 0;
const [...templates] = /** @type {NodeListOf<HTMLTemplateElement>} */ (document.querySelectorAll('template'));

function next_page() {
    const fragment = templates[current_page_number++].content.cloneNode(true);
    page_view.replaceChildren(fragment);
    let number = current_page_number;
    for (const counter of visible_page_counters) {
        counter.textContent = `${number++}`;
    }
}

next_page();
