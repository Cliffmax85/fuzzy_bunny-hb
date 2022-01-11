import { 
    checkAuth, 
    deleteBunny, 
    getFamilies, 
    logout,
} from '../fetch-utils.js';
import { renderBunny } from '../render-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familiesEl.textContent = '';
    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        const wholeFamilyEl = document.createElement('div');
        const nameEl = document.createElement('p');
        const bunniesEl = document.createElement('div');

        // add the bunnies css class to the bunnies el, and family css class to the family el
        wholeFamilyEl.classList.add('family');
        bunniesEl.classList.add('bunnies');
        // put the family name in the name element
        nameEl.textContent = family.name;
        wholeFamilyEl.append(nameEl, bunniesEl);
        // for each of this family's bunnies

        for (let bunny of family.fuzzy_bunnies) {

            const bunnyEl = renderBunny(bunny);
            bunnyEl.addEventListener('click', async() => {
                await deleteBunny(bunny.id);

                displayFamilies();
            });

            bunniesEl.append(bunnyEl);
            wholeFamilyEl.append(bunniesEl);
        }

        // make an element with the css class 'bunny', and put the bunny's name in the text content
        familiesEl.append(wholeFamilyEl);
        // add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.


        // append this bunnyEl to the bunniesEl
    }

    // append the bunniesEl and nameEl to the familyEl

    // append the familyEl to the familiesEl
}

window.addEventListener('load', async() => {
    const families = await getFamilies();

    displayFamilies(families);
});