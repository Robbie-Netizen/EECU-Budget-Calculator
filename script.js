// @ts-check
const page_view = /** @type {HTMLDivElement} */ (document.querySelector('.current-page'));
const visible_page_counters = /** @type {NodeListOf<HTMLSpanElement>} */ (document.querySelectorAll('[class^=visible-page]'));
let current_page_number = 0;
const templates = [...document.querySelectorAll('template')];
const nextBtn = document.querySelector('.next');
const backBtn = document.querySelector('.back');
const clone = document.importNode(templates[0], true);
const job_selector = clone.querySelectorAll("#job-selector");

console.log(clone);
console.log(job_selector);


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

if(nextBtn) nextBtn.addEventListener('click', next_page);
if(backBtn) backBtn.addEventListener('click', back_page);

import { fetchJson } from './utility.js';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

async function init() {
    const url = 'https://eecu-data-server.vercel.app/data';

    try {
        const jobs = await fetchJson(url);
        if(clone) clone.append(buildList(jobs));
    } catch (err) {
        if(clone) clone.textContent = `Error: ${err.message}`;
    }
}

function buildList(jobs = []) {
    const frag = document.createElement('section');
    for (const { Occupation, Salary } of jobs) {
  
      const occ = document.createElement('option');
      occ.innerHTML = `<strong>Occupation</strong>: ${Occupation} <strong>Salary</strong>: ${formatter.format(Salary)}`;
      
  
      frag.append(occ);
      console.log(frag);
    }
    return frag;
  }
  
  document.addEventListener('DOMContentLoaded', init);

  const careerList = document.getElementById