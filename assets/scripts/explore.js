// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const voiceSelect = document.getElementById('voice-select');
  const textToSpeak = document.getElementById('text-to-speak');
  const talkButton = document.querySelector('button');
  const faceImage = document.querySelector('img');

  const synth = window.speechSynthesis;
  let voices = [];

  function populateVoices() {
    voices = synth.getVoices();
    if (voices.length > 0) {
      voiceSelect.innerHTML = '<option value="select" disabled selected>Select Voice:</option>';
      
      voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})${voice.default ? ' - DEFAULT' : ''}`;
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
      });
    }
  }
  
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.addEventListener('voiceschanged', populateVoices);
  }
  
  setTimeout(populateVoices, 0);  

  populateVoices();

// Speech handler
  function speakText() {
    if (textToSpeak.value && voiceSelect.selectedIndex > 0) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak.value);
        const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
        const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
        
        utterance.voice = selectedVoice;
        
        // Change face when speaking
        utterance.onstart = () => {
            faceImage.src = 'assets/images/smiling-open.png';
        };
        
        utterance.onend = () => {
            faceImage.src = 'assets/images/smiling.png';
        };
        
        synth.speak(utterance);
    }
  }

// Event listeners
talkButton.addEventListener('click', speakText);
}