import { AudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { EndPoints } from "./constants/PostRequests";
import DisplaySounds from "./components/DisplaySounds";

function App() {
  let audioUrl: Blob | undefined = undefined;
  const addAudioElement = (blob: Blob) => {
    audioUrl = blob;
  };

  const uploadSoundClip = () => {
    if (audioUrl == undefined) {
      alert("No audio defined");
      return;
    }
    axios
      .post(
        EndPoints.saveSoundToDb,
        {
          file: audioUrl,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header" id="header">
        <p>Sound Recording Demo</p>
        <AudioRecorder
          onRecordingComplete={(blob: Blob) => addAudioElement(blob)}
        ></AudioRecorder>
        <button onClick={uploadSoundClip}>Upload Sound Recording</button>
        <DisplaySounds />
      </header>
    </div>
  );
}

export default App;
