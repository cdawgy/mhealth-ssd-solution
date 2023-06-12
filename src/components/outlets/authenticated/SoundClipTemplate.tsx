import { useParams } from "react-router-dom";
import NavigationBar from "../../navigation/Navbar";
import { useEffect, useState } from "react";
import { SoundClip } from "../../../types/SoundClip";
import { fetchSoundClip } from "../../../utils/SoundClipUtils";
import earIconYellow from "../../../assets/ear-icon-y.png";
import "../../../css/components/outlets/authenticated/SoundClipTemplate.css";
import { motion } from "framer-motion";

const SoundClipTemplate = () => {
  const emptySoundClip: SoundClip = {
    id: 0,
    word: "",
    sound: "",
    dateCreated: new Date(),
    childId: 0,
    locationUrl: ""
  };
  const [soundClip, setResource] = useState(emptySoundClip);
  let { soundClipId } = useParams();
  useEffect(() => {
    (async () => {
      const renderSafeSoundClipId =
        soundClipId === undefined ? "0" : soundClipId;
      const fetchedSoundClip: SoundClip = await fetchSoundClip(
        renderSafeSoundClipId
      );
      setResource(fetchedSoundClip);
    })();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering sound-template-container">
        <h1 className="screen-title">Sound Clip</h1>
        <div className="text-center sound-controls">
          <img src={earIconYellow} alt="ear icon" />
          <audio controls>
            <source src="https://mhealthstorageaccount.blob.core.windows.net/sound-store/d720ca41-d80c-4afa-8414-5a46ec234590" type="audio/mpeg" />
          </audio>
        </div>
        <p>
          <b>Word: </b>
          {soundClip.word}
        </p>
        <p>
          <b>Sound: </b>
          {soundClip.sound}
        </p>
        <p>
          <b>Date: </b>
          {new Date(soundClip.dateCreated.toString()).toLocaleDateString("en-GB", {
            day: "numeric",
            year: "numeric",
            month: "numeric",
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default SoundClipTemplate;
