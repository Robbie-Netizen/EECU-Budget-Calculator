// @ts-check
const page_view = /** @type {HTMLDivElement} */ (document.querySelector('.current-page'));
const visible_page_counters = /** @type {NodeListOf<HTMLSpanElement>} */ (document.querySelectorAll('[class^=visible-page]'));
let current_page_number = 0;
const templates = [...document.querySelectorAll('template')];
const nextBtn = (document.querySelector('.next'));
const backBtn = (document.querySelector('.back'));

function render_page() {
    const fragment = templates[current_page_number].content.cloneNode(true);
    page_view.replaceChildren(fragment);

    let number = current_page_number + 1;
    for (const counter of visible_page_counters) {
        counter.textContent = `${number++}`;
    }
}

function next_page() {
    if (current_page_number >= templates.length - 1) return;

    current_page_number++;
    render_page();
}

function back_page() {
    if (current_page_number <= 0) return;

    current_page_number--;
    render_page();
}

render_page();

nextBtn.addEventListener('click', next_page);
backBtn.addEventListener('click', back_page);

import { fetchJson } from './utility.js';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

async function init() {
    const root = document.querySelector('#root');
    const url = 'https://eecu-data-server.vercel.app/data';

    try {
        const jobs = await fetchJson(url);
        root.append(buildList(jobs));
    } catch (err) {
        root.style.color = 'red';
        root.textContent = `Error: ${err.message}`;
    }
}

function buildList(jobs = []) {
    const frag = document.createDocumentFragment();
    for (const { Occupation, Salary } of jobs) {
      const section = document.createElement('section');
  
      const occ = document.createElement('div');
      occ.innerHTML = `<strong>Occupation</strong>: ${Occupation}`;
      section.append(occ);
  
      const sal = document.createElement('div');
      sal.innerHTML = `<strong>Salary</strong>: ${formatter.format(Salary)}`;
      section.append(sal);
  
      frag.append(section);
    }
    return frag;
  }
  
  document.addEventListener('DOMContentLoaded', init);

  const careerList = document.getElementById