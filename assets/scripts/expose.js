// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  //change dropdown image and audio file
  
  const elem = document.getElementById('horn-select');
  const icon = document.querySelector('#expose img');
  const audio = document.querySelector('audio');

  const dropDownImg = {
    "air-horn": 'assets/images/air-horn.svg',
    "car-horn": 'assets/images/car-horn.svg',
    "party-horn": 'assets/images/party-horn.svg',
  };

  const dropDownAudio = {
    "air-horn": 'assets/audio/air-horn.mp3',
    "car-horn": 'assets/audio/car-horn.mp3',
    "party-horn": 'assets/audio/party-horn.mp3',
  };

  elem.addEventListener("change", function(event){
    const selected = event.target.value;

    if(dropDownImg[selected]){
      icon.src = dropDownImg[selected];
      icon.alt = selected.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
      audio.src = dropDownAudio[selected];
    }

    else{
      icon.src = 'assets/images/no-image.png';
      icon.alt = 'No image selected';
      audio.src = '';
    }
  });

  //volume settings 

  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');

  volumeSlider.addEventListener('input', function() {
    const value = volumeSlider.value;
    audio.volume = value / 100;

  //set mute icon
    if (value == 0) {
      volumeIcon.src = 'assets/icons/volume-level-0.svg';
      volumeIcon.alt = 'Volume level 0';
    } 
    
    //1<33 level one
    else if (value > 0 && value < 33) {
      volumeIcon.src = 'assets/icons/volume-level-1.svg';
      volumeIcon.alt = 'Volume level 1';
    } 
    
    //33<67 level two
    else if (value >= 33 && value < 67) {
      volumeIcon.src = 'assets/icons/volume-level-2.svg';
      volumeIcon.alt = 'Volume level 2';
    } 
    
    //67+ level three
    else {
      volumeIcon.src = 'assets/icons/volume-level-3.svg';
      volumeIcon.alt = 'Volume level 3';
    }
  });

  //play sound and confetti
  const playButton = document.querySelector('button');
  const jsConfetti = new JSConfetti();

  playButton.addEventListener('click', function() {
    if (audio.src) {
      audio.play();
      if (elem.value === 'party-horn') {
        jsConfetti.addConfetti();
      }
    }
  });
}
