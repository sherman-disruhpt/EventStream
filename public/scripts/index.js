import Exercise from './exercise.js';

(() => {
  const streamBtn = document.getElementById('stream');
  const oneStepBtn = document.getElementById('step-by-step');
  const exercise = new Exercise(window.io());

  streamBtn.addEventListener('click', () => {
    exercise.isPaused ? exercise.resume() : exercise.pause();
    _updateUi();
  });

  oneStepBtn.addEventListener('click', () => {
    // Make sure we pause the streaming
    exercise.pause();
    exercise.resume();
    exercise.pause();
    _updateUi();
  });

  function _updateUi() {
    streamBtn.value = exercise.isPaused ? 'Resume' : 'Pause';
    oneStepBtn.disabled = !exercise.isPaused;
  }
})();
