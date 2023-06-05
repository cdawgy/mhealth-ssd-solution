import { AccountMenuItems } from "../types/AccountMenuItems";
import soundClipIcon from "../assets/menuItemIcons/sound-clips-icon.svg";
import resourcesIcon from "../assets/menuItemIcons/resources-icon.svg";
import gameIcon from "../assets/menuItemIcons/game-icon.svg";
import prescribeIcon from "../assets/menuItemIcons/prescribe-icon.svg";
import messageIcon from "../assets/menuItemIcons/message-icon.svg";
import awardIcon from "../assets/award-icon.svg";

export const MenuItems: AccountMenuItems = {
  parent: [
    { imageUrl: resourcesIcon, title: "Resources", path: "/resources" },
    { imageUrl: soundClipIcon, title: "Sound Clips", path: "/soundClips" },
    { imageUrl: awardIcon, title: "Awards", path: "/awards" },
  ],
  child: [{ imageUrl: gameIcon, title: "Game", path: "/game" }],
  therapist: [
    { imageUrl: resourcesIcon, title: "Resources", path: "/resources" },
    { imageUrl: soundClipIcon, title: "Sound Clips", path: "/soundClips" },
    { imageUrl: prescribeIcon, title: "Prescribe", path: "/prescribe" },
    { imageUrl: messageIcon, title: "Message", path: "/message" },
  ],
};
