# validate-wav-from-buffer

Parses WAV information from an ArrayBuffer. Basically retrieves header information from a WAV file.

> DISCLAIMER:
> This code is an adaptation of an existing lib.
> https://github.com/rackfx/Node-WAV-File-Info

### Result

```
{
  byteLength: 186668,
  error: false,
  duration: "03:14",
  header: {
    AudioFormat: 1,
    BitsPerSample: 16,
    BlockAlign: 2,
    ByteRate: 88200,
    ChunkID: 'RIFF',
    ChunkSize: 186660,
    Format: 'WAVE',
    NumChannels: 2,
    SampleRate: 44100,
    Subchunk1ID: 'fmt ',
    Subchunk1Size: 16,
    Subchunk2ID: 'data',
    Subchunk2Size: 186624
  }
}
```

## References:

- http://soundfile.sapp.org/doc/WaveFormat/
- https://www.videoproc.com/resource/wav-file.htm
- https://github.com/rackfx/Node-WAV-File-Info

## License

MIT, see [LICENSE.md](http://github.com/thiagoalvesfoz/validate-wav-from-buffer/LICENSE.md) for details.
