import React from "react";
import Select from "react-select";
import { SelectOption } from "../../types/SelectOption";
import DropdownIndicator from "../prescribe/DropDownIndicator";

type state = {
  parentFormStateHandler: (obj: any) => void;
};

export default class AccountSelect extends React.Component<state> {
  private parentFormStateHandler: (obj: any) => void;
  private listOptions: SelectOption[] = [
    { label: "Therapist", value: "therapist" },
    { label: "Parent", value: "parent" },
  ];

  constructor(props: state) {
    super(props);
    this.parentFormStateHandler = props.parentFormStateHandler;
  }

  state = {
    selectedOption: null,
  };

  handleChange = (selectedOption: any) => {
    const explicitSelectedOption: SelectOption = selectedOption;
    this.setState({
      selectedOption: explicitSelectedOption,
    });
    this.parentFormStateHandler({
      accountType: explicitSelectedOption.value,
    });
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.listOptions}
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
