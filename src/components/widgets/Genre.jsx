import { Label } from "semantic-ui-react";

const Genre = ({ genre, size = "medium" }) => {
  var color = "lightgrey";
  switch (genre) {
    case "Electronic":
      color = "green";
      break;
    case "Classical":
      color = "yellow";
      break;
    case "Jazz":
    case "Blues":
      color = "teal";
      break;
    case "Rock":
    case "Funk / Soul":
      color = "blue";
      break;
    case "Folk, World, & Country":
      color = "purple";
      break;
    case "Stage & Screen":
      color = "orange";
      break;
    case "Hip Hop":
      color = "red";
      break;
    case "Pop":
      color = "pink";
      break;
    case "Non-Music":
      color = "grey";
      break;
  }

  return (
    <Label color={color} size={size}>
      {genre}
    </Label>
  );
};

export default Genre;
