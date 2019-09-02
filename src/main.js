/*
//
*/

//
const container = document.querySelector( '.food-info' )

//
function createElement( tag,content ){
    const element = document.createElement( tag )
    element.textContent = content
    return element
}

//
function foodFactory( food ) {
    const foodElement = document.createElement( 'div' )
    foodElement.appendChild( createElement( 'h2',food.name ) )
    foodElement.appendChild( createElement( 'h3',food.barcode ) )
    foodElement.appendChild( createElement( 'p', food.ingredients ) )
    return foodElement
}

//
function addFoodToDom( element ) {
    container.appendChild( element )
}

//
fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            //console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                      //console.log( "ingredients", food.ingredients )
                    } else {
                      food.ingredients = "no ingredients listed"
                      //console.log( "no ingredients listed" )
                    }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })
