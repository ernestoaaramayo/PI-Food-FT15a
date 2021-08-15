const initialState = {
   recipes: [],
   diets: [],
   recipeDetail: {},
   allRecipes: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_RECIPES":
        return {
            ...state,
            recipes: action.payload,
        };

        case "GET_ALL_RECIPES":
        return {
            ...state,
            allRecipes: action.payload,
            recipes: action.payload,
        };

        case "GET_DIETS":
        return {
            ...state,
            diets: action.payload,
        };

        case 'ORDER_BY_NAME':
        switch (action.payload) {
            case 'asc':
                return {
                    ...state,
                    recipes: state.recipes.sort(function (a, b) {
                        if (a.title > b.title) {
                            return 1;
                        }
                        if (b.title > a.title) {
                            return -1;
                        }
                        return 0;
                    }) 
                }
            case 'desc':
            return {
                ...state,
                recipes: state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;
                })
            }
            default: return state;
        }

        case 'FILTER_BY_DIET':
        if (action.payload !== 'all') {
            let recipesFiltered = state.allRecipes.filter(e => {
                if(e.hasOwnProperty('createdInDb')){
                    let aux = e.diets.map(e => e.name).toString()
                    if(aux.includes(action.payload)){
                        return e;
                    }
                }else{
                    if(e.diets.includes(action.payload)){
                        return e
                    }
                }
            })
            return{
                ...state,
                recipes: recipesFiltered
            }
        } else {
            return{
                ...state,
                recipes: state.allRecipes
            }
        }

        case 'ORDER_BY_SCORE':
        switch(action.payload){
            case 'asc':
            return {
                ...state,
                recipes: state.recipes.sort(function(a,b){
                    if(a.spoonacularScore > b.spoonacularScore){
                        return 1
                    }
                    if(b.spoonacularScore > a.spoonacularScore){
                        return -1
                    }
                    return 0
                })
            }
            case 'desc':
            return {
                ...state,
                recipes: state.recipes.sort(function(a,b){
                    if(a.spoonacularScore > b.spoonacularScore){
                        return -1
                    }
                    if(b.spoonacularScore > a.spoonacularScore){
                        return 1
                    }
                    return 0
                    })
            }
            default: return state;
        }

        case "GET_RECIPE_DETAIL":
        return {
            ...state,
            recipeDetail: action.payload
        };

        case 'POST_RECIPE':
        return {
            ...state
        }

        case "FILTER_BY_ORIGIN":
        switch (action.payload) {
            case 'db':
            return {
                ...state,
                recipes: state.allRecipes.filter(el => el.hasOwnProperty('createdInDb'))
            };

            case 'api':
            return {
                ...state,
                recipes: state.allRecipes.filter(el => !el.hasOwnProperty('createdInDb'))
            };

            case 'all':
            return {
                ...state,
                recipes:state.allRecipes
            };

            default: return state;
        }

        default: return state;
   };
};

export default rootReducer;