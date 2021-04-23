const SMOOTHING = .9;
const CALIBRATION_PERIOD_MILLISECONDS = 5000;

function getMaxVolume(analyser, fftBins) {
  let maxVolume = -Infinity;
  analyser.getFloatFrequencyData(fftBins);

  for (let i = 4, ii = fftBins.length; i < ii; i++) {
    if (fftBins[i] > maxVolume && fftBins[i] < 0) {
      maxVolume = fftBins[i];
    }
  }

  return maxVolume;
}

let audioContextType;
if (typeof window !== "undefined") {
  audioContextType = window.AudioContext || window.webkitAudioContext;
}


let audioContext = null;

export function thresholdVoice(stream, options = {}) {
  const subscribers = {};
  const emitter = {
    emit: (event, value) => {
      (subscribers[event] || []).map((cb) => {
        cb(value);
      });
    },
    on: (event, callBack) => {
      // subscribe to event
      if (subscribers[event]) {
        subscribers[event].push(callBack);
      } else {
        subscribers[event] = [callBack];
      }
    },
  };
  // make it not break in non-supported browsers
  if (!audioContextType) return emitter;

  //Config
  let smoothing = SMOOTHING,
    interval = options.interval || 50,
    threshold = options.threshold || -50,
    play = options.play,
    history = options.history || 10,
    running = true;

  // Ensure that just a single AudioContext is internally created
  audioContext = options.audioContext || audioContext || new audioContextType();

  const low = 300;
  const high = 2000;
  const geometricMean = Math.sqrt(low * high);

  const filter = new BiquadFilterNode(audioContext, {
    type: "bandpass",
    frequency: geometricMean,
    Q: geometricMean / (high - low),
  });

  let sourceNode, fftBins, analyser;

  analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = smoothing;
  fftBins = new Float32Array(analyser.frequencyBinCount);

  //WebRTC Stream
  sourceNode = audioContext.createMediaStreamSource(stream);
  threshold = threshold || -50;

  sourceNode.connect(filter);
  filter.connect(analyser);

  emitter.nodeChain = analyser;

  emitter.speaking = false;

  emitter.suspend = function () {
    return audioContext.suspend();
  };
  emitter.resume = function () {
    return audioContext.resume();
  };
  Object.defineProperty(emitter, "state", {
    get: function () {
      return audioContext.state;
    },
  });
  audioContext.onstatechange = function () {
    emitter.emit("state_change", audioContext.state);
  };

  emitter.setThreshold = function (t) {
    threshold = t;
  };

  emitter.setInterval = function (i) {
    interval = i;
  };

  emitter.stop = function () {
    running = false;
    emitter.emit("volume_change", -100, threshold);
    if (emitter.speaking) {
      emitter.speaking = false;
      emitter.emit("stopped_speaking");
    }
    analyser.disconnect();
    sourceNode.disconnect();
  };

  emitter.speakingHistory = [];
  for (let i = 0; i < history; i++) {
    emitter.speakingHistory.push(0);
  }

  // Poll the analyser node to determine if speaking
  // and emit events if changed
  let looper = function () {
    setTimeout(function () {
      //check if stop has been called
      if (!running) {
        return;
      }

      let currentVolume = getMaxVolume(analyser, fftBins);

      emitter.emit("volume_change", currentVolume, threshold);

      let history = 0;
      if (currentVolume > threshold && !emitter.speaking) {
        // trigger quickly, short history
        for (
          let i = emitter.speakingHistory.length - 3;
          i < emitter.speakingHistory.length;
          i++
        ) {
          history += emitter.speakingHistory[i];
        }
        if (history >= 2) {
          emitter.speaking = true;
          emitter.emit("speaking");
        }
      } else if (currentVolume < threshold && emitter.speaking) {
        for (let i = 0; i < emitter.speakingHistory.length; i++) {
          history += emitter.speakingHistory[i];
        }
        if (history == 0) {
          emitter.speaking = false;
          emitter.emit("stopped_speaking");
        }
      }
      emitter.speakingHistory.shift();
      emitter.speakingHistory.push(0 + (currentVolume > threshold));

      looper();
    }, interval);
  };
  looper();

  return emitter;
}

export function getAudioThumbprint(stream) {
  const aC = new audioContextType();
  const analyser = aC.createAnalyser();
  //WebRTC Stream
  const sourceNode = aC.createMediaStreamSource(stream);

  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = SMOOTHING;

  const processor = aC.createScriptProcessor(2048, 1, 1); // NOTE - this is a deprecated API, but still universally supported ( except by ie )

  sourceNode.connect(analyser);
  analyser.connect(processor);
  processor.connect(aC.destination);

  const readings = [];
  processor.onaudioprocess = function(evt) {
      let total = 0;
      let i = 0;
      var input = evt.inputBuffer.getChannelData(0)
        , len = input.length   
        , rms
      while ( i < len ) total += Math.pow( input[i++], 2)
      rms = Math.sqrt( total / ( len / 2  )) // root mean squared
      var dB = 20 * (Math.log10(rms));
    if (dB > -Infinity) {
      readings.push(dB);
    }
  }

  // sourceNode.start();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // TODO find some way to stop onaudioprocess
      const averageDB = readings.reduce((sum, n) => {
        return sum + (n || 0) }, 0) / readings.length;
      resolve(averageDB);
      sourceNode.disconnect(analyser);
      analyser.disconnect(processor);
      processor.onaudioprocess = null;
    },
    CALIBRATION_PERIOD_MILLISECONDS)
  });
}
