// references: http://soundfile.sapp.org/doc/WaveFormat/ | https://www.videoproc.com/resource/wav-file.htm
// this a list of sequenced bytes in the 40 byte header. This builds the read_result object.

export const HEADER_INFO = [
  // property name, data type, byte Length
  // CHUNK DESCRIPTOR
  ["ChunkID", "string", 4], // Contains the letters “RIFF”
  ["ChunkSize", "big", 4], //file - 8 bytes, in bytes (32-bit integer).
  ["Format", "string", 4], // Contains the letters “WAVE”

  //FMT SUBCHUNK
  ["Subchunk1ID", "string", 4], // Contains the letters “fmt "
  ["Subchunk1Size", "little", 4], // Length of format data as listed above
  ["AudioFormat", "little", 2], // Type of format (1 is PCM) - 2 byte integer
  ["NumChannels", "little", 2], // Number of Channels - 2 byte integer (1 = mono, 2 stereo)
  ["SampleRate", "big", 4], // Common values are 44100 (CD),
  ["ByteRate", "big", 4], // (Sample Rate * BitsPerSample * Channels) / 8.
  ["BlockAlign", "little", 2], // (BitsPerSample * Channels) / 8.1 - 8 bit mono2 - 8 bit stereo/16 bit mono4 - 16 bit stereo
  ["BitsPerSample", "little", 2], // Bits per sample

  // DATA SOUND SUBCHUNK
  ["Subchunk2ID", "string", 4], // Contains the letters "data"
  ["Subchunk2Size", "big", 4], // sound data size
  //["Data", "*", *], //data. 44 - *
];

const WAVE_FORMAT_PCM = 0x0001;
const WAVE_FORMAT_IEEE_FLOAT = 0x0003;
const WAVE_FORMAT_ALAW = 0x0006;
const WAVE_FORMAT_MULAW = 0x0007;
const WAVE_FORMAT_EXTENSIBLE = 0xfffe;

export const AUDIO_FORMAT = [
  WAVE_FORMAT_PCM,
  WAVE_FORMAT_IEEE_FLOAT,
  WAVE_FORMAT_ALAW,
  WAVE_FORMAT_MULAW,
  WAVE_FORMAT_EXTENSIBLE,
];
