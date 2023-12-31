import React, { useContext, useEffect } from "react";
import SubnavBar from "../component/SubnavBar";
import { RecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const HomePage = () => {
  const { state, dispatch } = useContext(RecipeContext);
  const { loading, recipes, error, selectedCategory } = state;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: "RECIPE_FETCH_REQ" });

    const response = await fetch(
      "https://recipe-app-backend-1wcb.onrender.com/api/recipe"
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "RECIPE_FETCH_SUCCESS", payload: json });
      })
      .catch((error) => {
        dispatch({ type: "RECIPE_FETCH_ERROR"})
      });
  };

  return (
    <>
      <SubnavBar />
      <div className="container mx-auto">
        <h1 className="ms-4 mt-5 " style={{ fontSize: "40px" }}>
          {selectedCategory}
        </h1>
        <div
          className="container my-4 d-flex flex-wrap"
          style={{ justifyContent: "center" }}
        >
          <ClipLoader color="#235db7" loading={loading} size={50} />

          <div className="d-flex flex-wrap">
          {recipes.map((recipe) => {
            return (
              <Link
                to={`/recipe/${recipe._id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  class="card p-2 px-3 m-3"
                  style={{ width: " 17rem", height: "19.5rem" }}
                >
                  <img
                    src={recipe.image}
                    style={{ height: "15rem" }}
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body p-0 text-center">
                    <h5 class="card-title m-2 mb-0">{recipe.recipeName}</h5>
                    <p class="card-text m-0">{recipe.type}</p>
                  </div>
                </div>
              </Link>
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
