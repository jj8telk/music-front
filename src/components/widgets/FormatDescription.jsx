import { Label } from "semantic-ui-react";

const FormatDescription = ({ description }) => {
  let color = "lightgrey";
  switch (description) {
    case "CD":
    case "CDr":
    case "Vinyl":
    case "Cassette":
      color = "grey";
      break;
    case "Album":
    case "LP":
      color = "purple";
      break;
    case "Maxi-Single":
    case "Single":
      color = "blue";
      break;
    case '12"':
    case '10"':
    case '7"':
    case "Promo":
      color = "green";
      break;
    case "Compilation":
      color = "yellow";
      break;
    case "EP":
    case "Mini-Album":
    case "Unofficial Release":
      color = "teal";
      break;
    case "DVD-Video":
      color = "grey";
      break;
    case "Remastered":
    case "Reissue":
    case "Repress":
      color = "red";
      break;
    default:
      color = "lightgrey";
      break;
  }

  if (description.includes("Reissue") > 0) color = "red";
  if (description.includes("Remastered") > 0) color = "red";
  if (description.includes("Repress") > 0) color = "red";

  return <Label color={color}>{description}</Label>;
};

export default FormatDescription;
