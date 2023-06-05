import { Col, Row } from "react-bootstrap";
import { Award } from "../../types/Award";
import "../../css/components/awards/AwardTableRow.css";
import AwardTableRowHeader from "./AwardTableRowHeader";
import AwardTableRowBody from "./AwardTableRowBody";
import { determineRowColours } from "../../utils/AwardUtils";

type tableRow = {
  rowCost: string;
  awards: Award[];
};

const AwardTableRow = (props: tableRow) => {
  const colours = determineRowColours(Number.parseInt(props.rowCost));
  return (
    <div>
      <Row>
        <Col xs={12}>
          <AwardTableRowHeader
            awardCost={Number.parseInt(props.rowCost)}
            colours={colours}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <AwardTableRowBody colours={colours} awards={props.awards} />
        </Col>
      </Row>
    </div>
  );
};

export default AwardTableRow;
