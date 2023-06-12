import React from "react";
import Select from "react-select";
import { SelectOption } from "../../types/SelectOption";
import DropdownIndicator from "../prescribe/DropDownIndicator";
import { createSelectOptionsForTherapist } from "../../utils/AccountUtils";

type state = {
  parentFormStateHandler: (obj: any) => void;
};

export default class TherapistSelect extends React.Component<state> {
  private parentFormStateHandler: (obj: any) => void;

  constructor(props: state) {
    super(props);
    this.parentFormStateHandler = props.parentFormStateHandler;
  }

  state = {
    selectedOption: null,
    optionList: [],
  };

  handleChange = (selectedOption: any) => {
    const explicitSelectedOption: SelectOption = selectedOption;
    this.setState({
      selectedOption: explicitSelectedOption,
    });
    this.parentFormStateHandler({
      selectedTherapist: explicitSelectedOption.value,
    });
  };

  async componentDidMount(): Promise<void> {
    const selectOptions: SelectOption[] = await createSelectOptionsForTherapist();
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
