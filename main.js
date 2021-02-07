//  data from server
const getServerdata = async api => {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}

const displayIngredients = detailsInfo => {
    //to get property value of properties `strIngredient1 to 20` and `strMeasure1 to 20`
    for (let i = 1; i <= 20; i++) {
        const ingredient = `strIngredient${i}`;
        const ingredientMeasure = `strMeasure${i}`;

        //"if" used to ignore null or empty("") value  
        if(detailsInfo[ingredient]){
            const listItem = document.createElement("li");
            listItem.innerText = `${detailsInfo[ingredientMeasure]} ${detailsInfo[ingredient]}`;
            document.getElementById("ingredients-list").appendChild(listItem);
        }
    }
}

const displayMealDetails = mealId => {
    const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const detailsSection = document.getElementById("details-area");

    getServerdata(api).then(data => {
        const detailsInfo = data.meals[0];
        const info = `
            <div>
                <img src="${detailsInfo.strMealThumb}">
                <h1>${detailsInfo.strMeal}</h1>
                <h4>Ingredients</h4>
                <ul id="ingredients-list"></ul>
            </div>
        `;

        detailsSection.innerHTML = info;
        displayIngredients(detailsInfo);
    }).catch(error => {
        document.getElementById("error-message").innerText = "Connection Lost! Please Check Your Internet Connection";
        document.getElementById("error-message").style.display = "block";
    });
}

const displaySearchResult = mealName => {
    const api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    const resultSection = document.getElementById("search-results-area");

    getServerdata(api).then( data => {
        //Server gives the array of multiple meal info of maximum keyword matching meal name
        //map used to display all meal name and image in individual div element
        data.meals.map(meal => {
            const mealDiv = document.createElement("div");
            const mealInfo = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}<h3>
            `;
            mealDiv.innerHTML = mealInfo;
            resultSection.appendChild(mealDiv);
            mealDiv.addEventListener("click", () => {
                document.getElementById("search-bar").style.display = "none";
                document.getElementById("search-results-area").style.display = "none";
                document.getElementById("details-area").style.display = "block";

                displayMealDetails(meal.idMeal);
            });
        });
    }).catch(error => {
        document.getElementById("error-message").style.display = "block";
    });
}
const getInputValue = () => document.getElementById("meal-input").value;
document.getElementById("search-btn").addEventListener("click", () => {
    document.getElementById("search-results-area").innerHTML = '';
    document.getElementById("error-message").style.display = "none";
    const mealName = getInputValue();
    displaySearchResult(mealName);
});
