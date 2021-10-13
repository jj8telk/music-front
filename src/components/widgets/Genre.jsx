import { Label } from "semantic-ui-react";

const Genre = ({ genre }) => {
  var color = "lightgrey";
  switch (genre) {
    case "Electronic":
      color = "green";
      break;
    case "Classical":
      color = "yellow";
      break;
    case "Jazz":
      color = "teal";
      break;
    case "Rock":
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

  return <Label color={color}>{genre}</Label>;
};

export default Genre;
