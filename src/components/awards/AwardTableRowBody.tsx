import { Award } from "../../types/Award";
import "../../css/components/awards/AwardTableRowBody.css";
import { tableRowColours } from "../../types/TableRowColours";

type awardBody = {
  awards: Award[];
  colours: tableRowColours;
};

const AwardTableRowBody = (props: awardBody) => {
  return (
    <div
      className="award-table-row-body"
      style={{ backgroundColor: props.colours.secondaryColour }}
    >
      {props.awards.map((award) => (
        <p
          className="award-table-row-body-item"
          style={{ color: props.colours.primaryColour }}
        >
          {award.title}
        </p>
      ))}
    </div>
  );
};

export default AwardTableRowBody;
