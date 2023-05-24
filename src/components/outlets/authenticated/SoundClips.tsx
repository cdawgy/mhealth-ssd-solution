import { useEffect, useState } from "react";
import NavigationBar from "../../navigation/Navbar";
import SoundClipItem from "../../soundClips/SoundClipItem";
import { fetchAllSoundClips } from "../../../utils/SoundClipUtils";
import { SoundClip } from "../../../types/SoundClip";
import { motion } from "framer-motion";

const SoundClips = () => {
  const emptyListOfSoundClips: SoundClip[] = [];
  const [soundClips, setSoundClips] = useState(emptyListOfSoundClips);
  useEffect(() => {
    (async () => {
      const fetchedSoundClips = await fetchAllSoundClips();
      setSoundClips(fetchedSoundClips);
    })();
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">Sound Clips</h1>
        {soundClips.map((soundClip) => {
          return (
            <SoundClipItem
              id={soundClip.id}
              word={soundClip.word}
              sound={soundClip.sound}
              date={soundClip.date}
            />
          );
        })}
      </div>
    </motion.div>
  );
};
export default SoundClips;
