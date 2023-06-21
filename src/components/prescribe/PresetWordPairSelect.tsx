import React from "react";
import Select from "react-select";
import { SelectOption } from "../../types/SelectOption";
import DropdownIndicator from "./DropDownIndicator";
import { Col, Row } from "react-bootstrap";
import {
  fetchAllProcessPresets,
  fetchAllProcesses,
  fetchProcessPreset,
} from "../../utils/CustomWordUtils";
import { Word } from "../../types/Word";
import { WordPair } from "../../types/WordPair";

type props = {
  parentFormStateHandler: (obj: any) => void;
};

type state = {
  selectedProcessOption: any;
  processesOptions: SelectOption[];
  presetOptions: SelectOption[];
  selectedProcessPresetOption: undefined | any[];
  selectedPreset: { first: Word; second: Word }[];
};

export default class PresetWordPairSelect extends React.Component<props> {
  private parentFormStateHandler: (obj: any) => void;

  constructor(props: props) {
    super(props);
    this.parentFormStateHandler = props.parentFormStateHandler;
  }

  state: state = {
    selectedProcessOption: null,
    processesOptions: [],
    selectedProcessPresetOption: undefined,
    presetOptions: [],
    selectedPreset: [],
  };

  handleProcessChange = async (selectedOption: any) => {
    const explicitSelectedOption: SelectOption = selectedOption;
    const fetchedProcessPresets = await fetchAllProcessPresets(
      explicitSelectedOption.value
    );

    this.setState({
      presetOptions: fetchedProcessPresets,
      selectedProcessOption: explicitSelectedOption,
    });
  };

  handlePresetChange = async (selectedOption: any) => {
    const explicitSelectedOption: SelectOption = selectedOption;
    const selectedPreset = await fetchProcessPreset(
      this.state.selectedProcessOption.value,
      explicitSelectedOption.value
    );
    this.setState({
      selectedProcessPresetOption: explicitSelectedOption,
      selectedPreset: selectedPreset,
    });

    const wordPairs: WordPair[] = selectedPreset.map((pair) => {
      return {
        firstWordId: pair.first.id,
        secondWordId: pair.second.id,
      };
    });

    this.parentFormStateHandler({
      wordPairs: wordPairs,
    });
  };

  async componentDidMount(): Promise<void> {
    const processes: SelectOption[] = await fetchAllProcesses();
    this.setState({
      processesOptions: processes,
    });
  }

  printCurrentSet = () => {
    return this.state.selectedPreset.map((wordPair, index) => {
      return index === 0
        ? `${wordPair.first.word} and ${wordPair.second.word}`
        : `, ${wordPair.first.word} and ${wordPair.second.word}`;
    });
  };

  render() {
    const {
      selectedProcessOption,
      processesOptions,
      selectedProcessPresetOption,
    } = this.state;

    const renderSubSelect =
      this.state.presetOptions.length > 0 ? "block" : "none";

    return (
      <div>
        <Row>
          <Col xs={12}>
            <p>Phonological Processes</p>
            <Select
              value={selectedProcessOption}
              onChange={this.handleProcessChange}
              options={processesOptions}
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
            <p>List of presets</p>
            <Select
              value={selectedProcessPresetOption}
              onChange={this.handlePresetChange}
              options={this.state.presetOptions}
              isOptionDisabled={() => {
                if (selectedProcessPresetOption != undefined) {
                  return selectedProcessPresetOption.length === 2;
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
          <Col>
            <p>Current Set:</p>
            <p>{this.printCurrentSet()}</p>
          </Col>
        </Row>
      </div>
    );
  }
}
