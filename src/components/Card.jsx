import PropTypes from "prop-types";
import { IoHeartCircle } from "react-icons/io5";
import { supabase } from "../utils/supabaseClient";
import { useAuth } from "../hooks/useAuth";

const Card = ({ movie, onClick }) => {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const poster = posterPath ? (
    <img
      className="w-full"
      src={posterPath}
      alt={movie.title}
      style={{ aspectRatio: "2 / 3" }}
    />
  ) : (
    <div
      className="w-full bg-gray text-center flex items-center justify-center"
      style={{ aspectRatio: "2 / 3" }}
    >
      Poster not found
    </div>
  );
  const { user } = useAuth();

  const handleWishlistClick = async () => {
    const { status, error } = await supabase
      .from("wishlist")
      .insert({ movie_id: movie.id, user_id: user.id });

    console.log(status, error);
  };

  return (
    <div className="relative">
      <button
        className="absolute top-4 right-4 text-4xl text-white drop-shadow-md"
        onClick={() => handleWishlistClick()}
      >
        <IoHeartCircle />
      </button>
      <div
        className="rounded overflow-hidden shadow-md p-4 bg-white cursor-pointer"
        onClick={() => onClick()}
      >
        <div>{poster}</div>
        <div className="font-bold text-xl py-4">{movie.title}</div>
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
