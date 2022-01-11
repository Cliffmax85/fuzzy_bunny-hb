export function renderBunny(bunny) {
    const bunnyEl = document.createElement('p');
    const bunnyCard = document.createElement('div');

    bunnyEl.textContent = bunny.name; 
    bunnyEl.classList.add('bunny');

    bunnyCard.append(bunnyEl);
    return bunnyCard;
}