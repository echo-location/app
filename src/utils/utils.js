import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import HelpIcon from "@mui/icons-material/Help";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

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
    case "Report An Item":
      window.location.href = "Login?Page=ReportItem";
      break;
    case "Map":
      window.location.href = "Map";
      break;
    case "User Information":
      window.location.href = "Login?Page=User";
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
      return <AddLocationAltIcon />;
    case 2:
      return <MapIcon />;
    case 3:
      return <PersonIcon />;
    case 4:
      return <HelpIcon />;
    default:
      return;
  }
};

const validateForm = (credentials) => {
  let errors = [];
  console.log(credentials);
  for (const [key, value] of Object.entries(credentials)) {
    console.log(key, value);
    switch (key) {
      case "username":
        break;
      case "password":
        if (value.length < 6) errors.push({ [key]: value });
        break;
      case "confirm":
        if (!("password" in credentials) || credentials.password !== value)
          errors.push({ [key]: value });
        break;
      case "email":
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value))
          errors.push({ [key]: value });
        break;
      case "phone":
        if (!/^([0-9]{3})-([0-9]{3})-([0-9]{4})$/.test(value))
          errors.push({ [key]: value });
        break;
      default:
        break;
    }
  }
  return errors;
};
export { getItems, pageSelect, iconSelect, validateForm };
