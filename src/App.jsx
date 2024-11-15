import { useState } from 'react';
import { Search } from 'lucide-react';

const APP_ID = 'e9595357';
const APP_KEY = 'b3a598d6972b38e9d0264e6970bde9bb';
const USER_ID = 'shadosx';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`,
        {
          method: 'GET',
          headers: {
            'Edamam-Account-User': USER_ID,
          },
        }
      );
      const data = await response.json();
      if (data.count === 0) {
        setError('No recipes found for the given search.');
        setRecipes([]);
      } else {
        setRecipes(data.hits.map((hit) => hit.recipe));
        setError('');
      }
    } catch {
      setError('An error occurred while fetching recipes.');
      setRecipes([]);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchRecipes();
    }
  };

  return (


<div className="App bg-gradient-to-r from-black to-gray-900 min-h-screen text-gray-300">
  <div className="flex flex-col items-center justify-center py-16">
    <h1 className="text-6xl text-cyan-400 font-extrabold mb-12 tracking-widest uppercase">
      Recipe Finder
    </h1>
    <div className="w-full max-w-3xl p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="flex items-center w-full bg-gray-700 border border-gray-600 rounded-lg overflow-hidden">
          <Search className="text-cyan-400 ml-4" size={28} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search for a recipe..."
            className="outline-none bg-transparent w-full text-cyan-300 placeholder-gray-500 p-4"
          />
        </div>
      </div>
    </div>
  </div>

  {error && (
    <div className="flex justify-center p-4">
      <div
        className="bg-red-800 border border-red-600 text-red-300 px-4 py-3 rounded-lg shadow-lg"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span>{error}</span>
      </div>
    </div>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 py-12">
    {recipes.length === 0 && !error ? (
      <div className="text-cyan-400 text-lg">
        Start by searching for a recipe above!
      </div>
    ) : (
      recipes.map((recipe, index) => (
        <div
          key={index}
          className="max-w-sm rounded-lg overflow-hidden border border-gray-700 bg-gray-800 shadow-lg hover:scale-105 transform transition-transform duration-300"
        >
          <img
            className="w-full h-48 object-cover"
            src={recipe.image}
            alt={recipe.label}
          />
          <div className="px-6 py-4">
            <h2 className="font-bold text-lg text-cyan-400 mb-2">
              {recipe.label}
            </h2>
            <p className="text-gray-400 text-sm">Ingredients:</p>
            <ul className="text-gray-400 text-sm space-y-1 mt-2 list-disc list-inside">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient.text}</li>
              ))}
            </ul>
          </div>
        </div>
      ))
    )}
  </div>
</div>

);
 };

export default App;
