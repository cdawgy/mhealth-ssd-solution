import React from "react";
import Select from "react-select";
import { createWordPairSelectOptions } from "../../utils/PrescribeUtils";
import { SelectOption } from "../../types/SelectOption";
import DropdownIndicator from "./DropDownIndicator";
import { Col, Row } from "react-bootstrap";
import {
  fetchAllGroupedWords,
  fetchAllGroupings,
} from "../../utils/CustomWordUtils";
import addPairIcon from "../../assets/add-pair-icon.svg";

type props = {
  parentFormStateHandler: (obj: any) => void;
};

type wordPair = { firstWord: SelectOption; secondWord: SelectOption };

type state = {
  selectedGroupingOption: any;
  groupingOptions: SelectOption[];
  wordOptions: SelectOption[];
  selectedWordPairOption: undefined | any[];
  wordSetBuilder: wordPair[];
};

export default class CustomWordSelect extends React.Component<props> {
  private parentFormStateHandler: (obj: any) => void;

  constructor(props: props) {
    super(props);
    this.parentFormStateHandler = props.parentFormStateHandler;
  }

  state: state = {
    selectedGroupingOption: null,
    groupingOptions: [],
    selectedWordPairOption: undefined,
    wordOptions: [],
    wordSetBuilder: [],
  };

  handleGroupingChange = async (selectedOption: any) => {
    const explicitSelectedOption: SelectOption = selectedOption;
    const fetchedGroupedWords = await fetchAllGroupedWords(
      explicitSelectedOption.value
    );

    this.setState({
      wordOptions: fetchedGroupedWords,
      selectedGroupingOption: explicitSelectedOption,
    });
  };

  handleWordPairChange = (selectedOption: any) => {
    const explicitSelectedOption: SelectOption[] = selectedOption;
    this.setState({
      selectedWordPairOption: explicitSelectedOption,
    });
  };

  async componentDidMount(): Promise<void> {
    const groupings: SelectOption[] = await fetchAllGroupings();
    this.setState({
      groupingOptions: groupings,
    });
  }

  savePair = () => {
    const customPair = this.state.selectedWordPairOption;
    if (customPair?.length == 2) {
      const wordPair: wordPair = {
        firstWord: customPair[0],
        secondWord: customPair[1],
      };
      const newSet = this.state.wordSetBuilder;
      newSet.push(wordPair);
      this.setState({
        wordSetBuilder: newSet,
        selectedWordPairOption: [],
      });

      this.parentFormStateHandler({
        wordPairs: newSet,
      });
    }
  };

  printCurrentSet = () => {
    const prettyWordPairsArr = this.state.wordSetBuilder.map(
      (wordPair, index) => {
        if (index === 0) {
          return `${wordPair.firstWord.label} and ${wordPair.secondWord.label}`;
        } else {
          return `, ${wordPair.firstWord.label} and ${wordPair.secondWord.label},`;
        }
      }
    );
    return prettyWordPairsArr;
  };

  render() {
    const { selectedGroupingOption, groupingOptions, selectedWordPairOption } =
      this.state;

    const renderSubSelect =
      this.state.wordOptions.length > 0 ? "block" : "none";

    return (
      <div>
        <Row>
          <Col xs={12}>
            <p>Phonological Group</p>
            <Select
              value={selectedGroupingOption}
              onChange={this.handleGroupingChange}
              options={groupingOptions}
              components={{
                DropdownIndicator: DropdownIndicator,
                IndicatorSeparator: null,
              }}
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "rgba(119, 119, 119, 0.16) 0px 0px 5px 4px",
                  marginBottom: "10px",
                }),
              }}
            />
          </Col>
        </Row>
        <Row style={{ display: renderSubSelect }}>
          <Col xs={12}>
            <p>List of words</p>
            <Select
              value={selectedWordPairOption}
              isMulti
              onChange={this.handleWordPairChange}
              options={this.state.wordOptions}
              isOptionDisabled={() => {
                if (selectedWordPairOption != undefined) {
                  return selectedWordPairOption.length === 2;
                } else return false;
              }}
              components={{
                DropdownIndicator: DropdownIndicator,
                IndicatorSeparator: null,
              }}
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "rgba(119, 119, 119, 0.16) 0px 0px 5px 4px",
                  marginBottom: "10px",
                }),
              }}
            />
          </Col>
          <Col xs={12} className="text-center">
            <img
              onClick={this.savePair}
              src={addPairIcon}
              alt="add pair icon"
            />
          </Col>
          <Col>
            <p>Current Set:</p>
            <p>{this.printCurrentSet()}</p>
          </Col>
        </Row>
      </div>
    );
  }
}
