import { useState, useEffect } from "react";
import { fetchAwards } from "../../utils/AwardUtils";
import AwardTableRow from "./AwardTableRow";
import { GroupedAwards } from "../../types/GroupedAwards";
import "../../css/components/awards/AwardTable.css";

const AwardTable = () => {
  const emptyAward: GroupedAwards = {
    7: [],
    5: [],
    3: [],
  };
  const [groupedAwards, setAwards] = useState(emptyAward);
  const listOfAwardCosts: string[] = Object.getOwnPropertyNames(groupedAwards);
  useEffect(() => {
    (async () => {
      const fetchedAwards: GroupedAwards = await fetchAwards();
      setAwards(fetchedAwards);
    })();
  }, []);
  return (
    <div className="award-table">
      {listOfAwardCosts.map((awardCost) => (
        <AwardTableRow
          rowCost={awardCost}
          awards={
            groupedAwards[Number.parseInt(awardCost) as keyof GroupedAwards]
          }
        />
      ))}
    </div>
  );
};

export default AwardTable;
