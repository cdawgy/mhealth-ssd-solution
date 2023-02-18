import React from "react";
import axios from "axios";
import { EndPoints } from "../constants/PostRequests";
import Select from "react-select";

type SelectedOption = {
  label: string;
  value: string;
};

type SoundRecord = {
  dateCreated: string;
  id: string;
  location: string;
};

type State = {
  selectedSoundClipName: string;
  selectedSoundClipUrl: string;
  listOfSounds: SoundRecord[];
};

class DisplaySounds extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedSoundClipName: "",
      selectedSoundClipUrl: "",
      listOfSounds: [],
    };
  }

  componentDidMount(): void {
    this.getAllSoundDocs();
  }

  getAllSoundDocs = () => {
    axios.get(EndPoints.getAllSoundClips).then((resp) => {
      this.setState({
        listOfSounds: resp.data,
      });
    });
  };

  setChosenSoundRecord = (selectedOption: any) => {
    if (
      selectedOption == null ||
      selectedOption == undefined ||
      selectedOption.length == 0
    ) {
      return;
    }
    this.setState({
      selectedSoundClipName: selectedOption[0].id,
      selectedSoundClipUrl: selectedOption[0].location,
    });
    var audio = new Audio(selectedOption[0].location);
    audio.controls = true;
    audio.load();
    document.getElementById("displaySoundsContainer")?.appendChild(audio);
  };

  getOptionValue = (SoundRecord: SoundRecord) => {
    return SoundRecord.location;
  };

  getOptionId = (SoundRecord: SoundRecord) => {
    return SoundRecord.id;
  };

  render(): React.ReactNode {
    return (
      <div id="displaySoundsContainer">
        <p>
          <em>Sounds on DB</em>
        </p>
        <Select
          isMulti={true}
          options={this.state.listOfSounds}
          getOptionLabel={this.getOptionId}
          getOptionValue={this.getOptionValue}
          onChange={this.setChosenSoundRecord}
        />
      </div>
    );
  }
}

export default DisplaySounds;
