
import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useFetching } from "../hooks/useFetching";
import RecipeService from "../API/RecipeService";
import RecipeItem from "../components/RecipeItem/RecipeItem";



const Recipe = () => {
    const params = useParams();

    const [recipe, setRecipe] = useState(null);
    const [fetchRecipeById, isLoading, error] = useFetching(async () => {
        const response = await RecipeService.getById(params.id);
        setRecipe(response.data)
    })

  

    useEffect(() => {
        fetchRecipeById()
    }, [])


 
    return (
        <>
            {isLoading ? <p>Loading</p> : recipe && 
            <div className="recipe">

                <h1 className="recipe__title">{recipe.title}</h1>
                <p>{recipe.description}</p>
                <p>
                    {recipe.steps}
                </p>
                <p>{recipe.difficulty}</p>
                <ul>{recipe.ingredients && recipe.ingredients.map((item, index) =>
                    <li key={index}>{item.title}</li>
                )}
                </ul>
                <p>{recipe.time}</p>
                {/* <button onClick={() => remove(recipe)} className="post__delete-button">Delete</button> */}
            </div>
            }
        </>
    );
}

export default Recipe;