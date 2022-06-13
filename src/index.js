import { Buffer } from "buffer";
import { HEADER_INFO, AUDIO_FORMAT } from "./header";

export default function validateWavFromBuffer(arraybuffer, callback) {
  const buf = Buffer.from(arraybuffer);

  const read = () => {
    let info = {};
    let pointer = 0;

    for (let i = 0; i < HEADER_INFO.length; i++) {
      const chunk = HEADER_INFO[i];

      //console.log(pointer, chunk[2], chunk[0]);

      let result;

      switch (chunk[1]) {
        case "string":
          result = buf.toString("ascii", pointer, pointer + chunk[2]);
          break;
        case "little":
          result = buf.readInt8(pointer, chunk[2]); // 127
          break;
        case "big":
          result = buf.readUInt32LE(pointer, chunk[2]);
          break;
        default:
          break;
      }

      pointer += chunk[2];
      info = { ...info, [chunk[0]]: result };
    }

    return info;
  };

  const validate = (header = []) => {
    const byteLength = buf.byteLength;

    var error = false;
    var errors = [];

    if (header.ChunkID !== "RIFF") errors.push('Expected "RIFF" string at 0');
    if (header.Format !== "WAVE") errors.push('Expected "WAVE" string at 4');
    if (header.Subchunk1ID !== "fmt ") errors.push('Expected "fmt " string at 8');
    if (!AUDIO_FORMAT.contains(header.AudioFormat)) errors.push("Unknown format: " + header.AudioFormat);

    if (header.ChunkSize + 8 !== byteLength)
      errors.push(
        `Expected that ChunkSize + 8 bytes match final file size. Expected: ${byteLength} bytes, current: ${
          header.ChunkSize + 8
        } bytes`,
      );

    if (header.Subchunk2ID !== "data") errors.push("Expected data identifier at the end of the header");

    //raw sound data
    if (header.Subchunk2Size !== buf.slice(44, buf.length).byteLength)
      errors.push("Expected that Subchunk2Size matches the size of the raw sound data");

    if (errors.length > 0) error = true;

    if (error) {
      return callback({ error, errors, header, byteLength });
    }

    const duration = header.Subchunk2Size / (header.SampleRate * header.NumChannels * (header.BitsPerSample / 8));
    callback(null, { error, header, byteLength, duration: formatTime(duration) });
  };

  return validate(read());
}

const formatTime = (seconds = 0) => {
  const floored = Math.floor(seconds);
  const time = new Date(floored * 1000).toISOString();
  let start = time.indexOf(floored >= 3600 ? "T" : ":") + 1;
  let end = time.indexOf(".");
  return time.substring(start, end);
};
