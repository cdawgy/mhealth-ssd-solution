import starIcon from "../../assets/star-icon.svg";
import { tableRowColours } from "../../types/TableRowColours";
type headerProps = {
  awardCost: number;
  colours: tableRowColours
};

const AwardTableRowHeader = (props: headerProps) => {
  return (
    <div
      className="award-table-row-header"
      style={{ backgroundColor: props.colours.primaryColour }}
    >
      <img src={starIcon} alt="star icon" />
      <h2 className="font-white title-font">{props.awardCost}</h2>
    </div>
  );
};

export default AwardTableRowHeader;
