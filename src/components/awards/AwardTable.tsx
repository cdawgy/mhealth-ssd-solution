import { useState, useEffect } from "react";
import { fetchAwards } from "../../utils/AwardUtils";
import AwardTableRow from "./AwardTableRow";
import { GroupedAwards } from "../../types/GroupedAwards";
import "../../css/components/awards/AwardTable.css";
import { Award } from "../../types/Award";

const AwardTable = () => {
  const emptyMapOfGroupedAwards: Map<string, Award[]> = new Map();
  const [mapOfGroupedAwards, setAwards] = useState(emptyMapOfGroupedAwards);
  useEffect(() => {
    (async () => {
      const fetchedGroupedAwards: Map<string, Award[]> = await fetchAwards();
      setAwards(fetchedGroupedAwards);
    })();
  }, []);
  return (
    <div className="award-table">
      {Object.keys(mapOfGroupedAwards).map((groupedCost: string) => {
        const awards =
          mapOfGroupedAwards[groupedCost as keyof unknown];
        return <AwardTableRow rowCost={groupedCost} awards={awards} />;
      })}
    </div>
  );
};

export default AwardTable;
