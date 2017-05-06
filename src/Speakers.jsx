import RingBuffer from "ringbufferjs";

export default class Speakers {
  constructor() {
    this.bufferSize = 8196;
    this.buffer = new RingBuffer(this.bufferSize * 2);
  }

  start() {
    this.audioCtx = new window.AudioContext();
    this.scriptNode = this.audioCtx.createScriptProcessor(0, 0, 2);
    this.scriptNode.onaudioprocess = this.onaudioprocess;
    this.scriptNode.connect(this.audioCtx.destination);
  }

  writeSample = (left, right) => {
    if (this.buffer.size() / 2 >= this.bufferSize) {
      console.log(`Buffer overrun`);
    }
    this.buffer.enq(left);
    this.buffer.enq(right);
  }

  onaudioprocess = (e) => {
    var left = e.outputBuffer.getChannelData(0);
    var right = e.outputBuffer.getChannelData(1);
    var size = left.length;
    try {
      var samples = this.buffer.deqN(size * 2);
    } catch (e) {
      // ignore empty buffers... assume audio has just stopped
      var bufferSize = this.buffer.size() / 2;
      if (bufferSize > 0) {
        console.log(`Buffer underrun (needed ${size}, got ${bufferSize})`);
      }
      return;
    }
    for (var i = 0; i < size; i++) {
      left[i] = samples[i * 2];
      right[i] = samples[i * 2 + 1];
    }
  };
}
