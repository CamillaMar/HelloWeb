const btn = document.querySelector('button');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

btn.addEventListener('click', () => {
    const newListItem = document.createElement('li');
    const newButton = document.createElement('button');

    newListItem.textContent = input.value + ' ';

    newButton.textContent = 'Cancella';
    newButton.addEventListener('click', () => {
        newListItem.remove();
    });

    newListItem.appendChild(newButton);
    ul.appendChild(newListItem);
});