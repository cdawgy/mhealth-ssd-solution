import React from "react";
import Select from "react-select";
import { createWordPairSelectOptions } from "../../utils/PrescribeUtils";
import { SelectOption } from "../../types/SelectOption";
import DropdownIndicator from "./DropDownIndicator";

export default class WordPairSelect extends React.Component {
  state = {
    selectedOption: null,
    optionList: [],
  };

  handleChange = (selectedOption: any) => {
    this.setState({
      selectedOption: selectedOption,
      optionList: this.state.optionList,
    });
  };

  async componentDidMount(): Promise<void> {
    const selectOptions: SelectOption[] = await createWordPairSelectOptions();
    this.setState({
      selectedOption: this.state.selectedOption,
      optionList: selectOptions,
    });
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        isMulti
        onChange={this.handleChange}
        options={this.state.optionList}
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
    );
  }
}
