const btn = document.querySelector('button');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

btn.addEventListener('click', () => {
    const newListItem = document.createElement('li');
    const newParagraph = document.createElement('p');
    const newButton = document.createElement('button');

    newParagraph.textContent = input.value + ' ';
    input.value = '';

    newButton.textContent = 'Cancella';
    newButton.addEventListener('click', () => {
        newListItem.remove();
    });

    newListItem.appendChild(newParagraph);
    newListItem.appendChild(newButton);
    ul.appendChild(newListItem);
});