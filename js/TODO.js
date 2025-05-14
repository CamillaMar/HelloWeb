const b = document.querySelector("button");
const input = document.querySelector("input");
b.addEventListener("click", function() {
	const text = input.value;
	const list = document.querySelector("ul");
	const listItem = document.createElement("li");
	const newListItem = document.createElement("p");
	newListItem.textContent = text;
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	listItem.appendChild(newListItem);
	listItem.appendChild(deleteButton);
	list.appendChild(listItem);

	deleteButton.addEventListener("click", function() {
		list.removeChild(listItem);
	});
});
const input = document.querySelector("input");
input.addEventListener("keypress", function(event) {
	if(event.key === "Enter") {
		document.querySelector("button").click();
	}
})

