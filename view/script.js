document.addEventListener('DOMContentLoaded', () => {
    const catForm = document.getElementById('catForm');
    const catList = document.getElementById('catList');

    catForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const title = document.getElementById('title').value;
        const imageName = document.getElementById('imageName').value;
        const description = document.getElementById('description').value;

        const catData = {
            name,
            title,
            imageName: `${imageName}`, // Assuming image is already in the images folder
            description
        };

        try {
            const response = await fetch('http://localhost:5000/api/cats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(catData)
            });

            const newCat = await response.json();
            addCatToDOM(newCat);

            // Reset the form
            catForm.reset();
        } catch (error) {
            console.error('Error adding cat:', error);
        }
    });

    async function loadCats() {
        try {
            const response = await fetch('http://localhost:5000/api/cats');
            const cats = await response.json();
            cats.forEach(cat => addCatToDOM(cat));
        } catch (error) {
            console.error('Error loading cats:', error);
        }
    }

    function addCatToDOM(cat) {
        const catItem = document.createElement('div');
        catItem.className = 'cat-item';

        console.log("here",cat.image)

        catItem.innerHTML = `
            <img src="./images/${cat.image}" alt="${cat.name}">
            <div class="cat-details">
                <h3>${cat.name} - ${cat.title}</h3>
                <p>${cat.description}</p>
            </div>
        `;

        catList.appendChild(catItem);
    }

    // Load existing cats on page load
    loadCats();
});
