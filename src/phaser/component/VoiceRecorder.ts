import axios from "axios";
import { getBaseUrl } from "../../utils/BaseUrlUtils";

class VoiceRecorder {
  private mediaRecorder: MediaRecorder;
  recordedChunks: BlobPart[];
  constructor() {
    this.mediaRecorder = {} as MediaRecorder;
    this.recordedChunks = [];
  }

  public async threadSafeInit(): Promise<void> {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    this.createMediaRecorder(stream);
  }

  public startRecording(): void {
    this.mediaRecorder.start();
  }

  public stopRecording(): void {
    this.mediaRecorder.stop();
  }

  private createMediaRecorder(stream: MediaStream): void {
    this.mediaRecorder = new MediaRecorder(stream);
    this.assignChunkUpdateListener();
    this.assignMediaRecorderStopListener();
  }

  private assignChunkUpdateListener(): void {
    this.mediaRecorder.addEventListener("dataavailable", (e: any) => {
      if (e.data.size > 0) this.recordedChunks.push(e.data);
    });
  }

  private assignMediaRecorderStopListener(): void {
    this.mediaRecorder.addEventListener("stop", async () => {
      const blob = new Blob(this.recordedChunks, { type: "audio/webm" });
      await this.sendFileToServer(blob);
    });
  }

  private async sendFileToServer(blob: Blob) {
    const formData = new FormData();
    formData.append("file", blob);
    const resp = await axios.post(
      `${getBaseUrl()}/soundClips/upload`,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(resp);
  }
}

export default VoiceRecorder;

// get voice recording media instance
// add chunk updater method
// add start function + listener
// add stop function + listener
// post
