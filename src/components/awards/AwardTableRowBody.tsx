import { Award } from "../../types/Award";
import "../../css/components/awards/AwardTableRowBody.css";
import { tableRowColours } from "../../types/TableRowColours";
import { getChildPoints, isChild } from "../../utils/AccountUtils";
import axios, { AxiosResponse } from "axios";
import { ACCOUNT_ID } from "../../constants/LocalStorageConstants";
import { getBaseUrl } from "../../utils/BaseUrlUtils";
import { localStorageGet } from "../../utils/LocalStorageUtils";

type awardBody = {
  awards: Award[];
  colours: tableRowColours;
};

const AwardTableRowBody = (props: awardBody) => {
  const purchaseAward = async (awardPointCost: number) => {
    const childPoints = await getChildPoints();
    if (isChild()) {
      if (!(childPoints >= awardPointCost)) {
        alert("Not enought points!");
        return;
      }
      const resp: AxiosResponse = await axios.post(
        `${getBaseUrl()}/account/points`,
        {
          accountId: localStorageGet(ACCOUNT_ID),
          points: awardPointCost * -1,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (resp.status === 200) {
        alert(`Successfully purchased award!`);
      } else {
        alert("An error occured purchasing award...");
      }
    }
  };
  return (
    <div
      className="award-table-row-body"
      style={{ backgroundColor: props.colours.secondaryColour }}
    >
      {props.awards.map((award) => (
        <p
          onClick={() => {
            purchaseAward(award.cost);
          }}
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
