const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

const searchMealBtn = document.getElementById('searchMeal');
const searchInput = document.getElementById('searchInput');

get_meal_btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
		createMeal(res.meals[0]);
	});
});

const createMeal = (meal) => {
	const ingredients = [];
	for(let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			break;
		}
	}
	
	const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<div class="columns seven">
					<h2>${meal.strMeal}</h2>
					<p>${meal.strInstructions}</p>
				</div>
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<h3>Ingredients:</h3>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
		</div>
		${meal.strYoutube ? `
		<div class="row">
			<h3>Video Recipe</h3>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;
	
	meal_container.innerHTML = newInnerHTML;
}

// Function to fetch meals based on search term
const searchMeal = () => {
    const searchTerm = searchInput.value;

    if (searchTerm.trim() !== '') {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(res => res.json())
            .then(res => {
                if (res.meals) {
                    // Display the first meal from the search results
                    createMeal(res.meals[0]);
                } else {
                    mealContainer.innerHTML = '<p>No matching meals found.</p>';
                }
            });
    } else {
        mealContainer.innerHTML = '<p>Please enter a search term.</p>';
    }
};

searchMealBtn.addEventListener('click', searchMeal);
