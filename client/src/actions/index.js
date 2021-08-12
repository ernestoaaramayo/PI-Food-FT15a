import axios from "axios";

export function getRecipes(title) {
   return async function (dispatch) {
      var json = await axios.get(`http://localhost:3001/recipes?title=${title}`);
      return dispatch({ type: "GET_RECIPES", payload: json.data });
   };
}

export function getAllRecipes(title) {
   return async function (dispatch) {
      var json = await axios.get(`http://localhost:3001/recipes`);
      return dispatch({ type: "GET_ALL_RECIPES", payload: json.data });
   };
}

export function getDiets() {
   return async function (dispatch) {
      var json = await axios.get(`http://localhost:3001/diets`);
      return dispatch({ type: "GET_DIETS", payload: json.data });
   };
}

export function getRecipeDetail(id) {
   return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/recipes/" + id)
      return dispatch({ type: "GET_RECIPE_DETAIL", payload: json.data });
   };
};

export function orderByName(payload) {
   return {
      type: 'ORDER_BY_NAME',
      payload
   };
}

export function filterByDiet(payload) {
   return {
      type: 'FILTER_BY_DIET',
      payload
   };
}

export function filterByOrigin(payload) {
   return {
      type: 'FILTER_BY_ORIGIN',
      payload
   };
}

export function orderByScore(payload){
   return {
       type: 'ORDER_BY_SCORE',
       payload
   }
}

export function createRecipe(payload){
   return async function(){
      const response = await axios.post('http://localhost:3001/recipe', payload)
      return response;
   }
}
