
const page_view = document.querySelector('.current-page');
let current_page_number = 0;
const templates = [...document.querySelectorAll('template')];
const nextBtn = document.getElementsByClassName('next');
const backBtn = document.getElementsByClassName('back');
const clone = document.importNode(templates[0], true);
const job_selector = clone.querySelectorAll('#job-selector');
const grossIncome = document.getElementById('gross-income');

const netIncome = document.getElementById('net-income');
const taxes = document.getElementById('taxes');
const studentLoans = document.getElementById('student-loans');
const housing = document.getElementById('housing');
const essentials = document.getElementById('essentials');
const lifestyle = document.getElementById('lifestyle');
const futureProofing = document.getElementById('future-proofing');

function render_page() {
    const fragment = templates[current_page_number].content.cloneNode(true);
    page_view.replaceChildren(fragment);

    let number = current_page_number + 1;
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
import { fetchJson } from './utility.js';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

async function init() {
    const url = 'https://eecu-data-server.vercel.app/data';

    try {
        const jobs = await fetchJson(url);
        templates[0].content.querySelector('select')?.append(buildList(jobs));
    } catch (err) {
        if (clone) clone.textContent = `Error: ${/** @type {Error} */ (err).message}`;
    }
}

/**
 * @param {any[]} [jobs]
 */
function buildList(jobs = []) {
    const frag = document.createElement('section');
    for (const { Occupation, Salary } of jobs) {
        const occ = document.createElement('option');
        occ.classList.add('job-options');
        occ.innerHTML = Occupation;

        frag.append(occ);
    }
    return frag;
}

await init();

render_page();

nextBtn[0].addEventListener('click', next_page);
backBtn[0].addEventListener('click', back_page);
