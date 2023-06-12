import { useNavigate } from "react-router-dom";
import earIcon from "../../assets/ear-icon.png";
import "../../css/components/soundClips/SoundClipItem.css";
import { SoundClip } from "../../types/SoundClip";

const SoundClipItem = (props: SoundClip) => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/soundClips/clip/${props.id}`);
  };
  return (
    <div onClick={redirect} className="box-shadow sound-clip-container">
      <img src={earIcon} alt="Ear icon" />
      <div className="sound-clip-data">
        <p>
          <b>Word: </b>
          {props.word}
        </p>
        <p>
          <b>Sound: </b>
          {props.sound}
        </p>
        <p>
          <b>Date: </b>
          {new Date(props.dateCreated.toString()).toLocaleDateString("en-GB", {
            day: "numeric",
            year: "numeric",
            month: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default SoundClipItem;
