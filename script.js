const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const searchInp = document.querySelector('.search-input');
const result = document.querySelector('.result');
const sound = document.querySelector('.sound');
const btn = document.querySelector('.search-btn');
const soundBtn = document.querySelector('.sound-btn');

const searchWord = btn.addEventListener('click', async function () {
  try {
    const word = searchInp.value;
    const [storeMeaning] = await getJSON(word);
    console.log(storeMeaning);
    result.innerHTML = `<div class="word">
        <h3>${storeMeaning.word}</h3>
        <button class="sound-btn" onclick="playSound()" style=${
          storeMeaning.phonetics.length === 0 ||
          storeMeaning.phonetics[0].audio === ''
            ? 'display:none'
            : ''
        }>
            <i class="fa-solid fa-volume-high"></i>
        </button>
    </div>
    <div class="details">
        <p>${storeMeaning.meanings[0].partOfSpeech || ''}</p>
        <p>${storeMeaning.phonetic || ''}</p>
    </div>
    <p class="word-meaning">
    ${storeMeaning.meanings[0].definitions[0].definition || ''}
    </p>
    <p class="word-example">
    ${storeMeaning.meanings[0].definitions[0].example || ''}
    </p>
    </div>`;

    if (
      storeMeaning.phonetics.length === 0 ||
      storeMeaning.phonetics[0].audio === ''
    ) {
      return;
    } else {
      sound.setAttribute('src', `${storeMeaning.phonetics[0].audio}`);
    }
  } catch (err) {
    console.error(err);
    searchInp.value = '';
    result.innerHTML = `<h3 class="error"> Could not find your word. Please try again <h3>`;
  }
});

searchInp.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    btn.click();
  }
});

const getJSON = async function (word) {
  try {
    const res = await fetch(`${URL}${word}`);

    if (!res.ok) throw new Error('Could not find word');

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

const playSound = function () {
  sound.play();
};
