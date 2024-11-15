import PropTypes from 'prop-types';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover rounded-t-xl"
        src={recipe.image}
        alt={recipe.label}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-green-600">{recipe.label}</div>
        <ul className="text-gray-700 text-sm space-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="list-disc ml-4">{ingredient.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default RecipeCard;
