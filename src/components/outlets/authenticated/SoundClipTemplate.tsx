import { useParams } from "react-router-dom";
import NavigationBar from "../../navigation/Navbar";
import { useEffect, useState } from "react";
import { SoundClip } from "../../../types/SoundClip";
import { fetchSoundClip } from "../../../utils/SoundClipUtils";

const SoundClipTemplate = () => {
  const emptySoundClip: SoundClip = {
    id: 0,
    word: "",
    sound: "",
    date: new Date(),
  };
  const [soundClip, setResource] = useState(emptySoundClip);
  let { soundClipId } = useParams();
  useEffect(() => {
    (async () => {
      soundClipId = soundClipId === undefined ? "0" : soundClipId;
      const fetchedSoundClip: SoundClip = await fetchSoundClip(soundClipId);
      setResource(fetchedSoundClip);
    })();
  });

  return (
    <div>
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">{soundClip.word}</h1>
      </div>
    </div>
  );
};

export default SoundClipTemplate;
