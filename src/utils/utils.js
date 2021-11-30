import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import HelpIcon from "@mui/icons-material/Help";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const getItems = async (query = null) => {
  let url = `http://localhost:8000/item/search`;
  if (query) url += `?q=${query}`;
  const response = await fetch(url);
  return response.json();
};

const pageSelect = (page) => {
  switch (page) {
    case "Lost Items":
      window.location.href = "LostItems";
      break;
    case "Map":
      window.location.href = "Map";
      break;
    case "User Information":
      window.location.href = "Login";
      break;
    case "Help":
      window.location.href = "Help";
      break;
    default:
      return;
  }
};

const iconSelect = (index) => {
  switch (index) {
    case 0:
      return <CatchingPokemonIcon />;
    case 1:
      return <MapIcon />;
    case 2:
      return <PersonIcon />;
    case 3:
      return <HelpIcon />;
    default:
      return;
  }
};

export { getItems, pageSelect, iconSelect };
