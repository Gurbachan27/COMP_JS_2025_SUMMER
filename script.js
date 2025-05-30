// js code
const words = {
    noun: ['The turkey', 'The monkey', 'My teacher', 'The dog'],
    verb: ['sat on', 'danced with', 'saw', 'ate'],
    adjective: ['a funny', 'a scary', 'a slimy', 'a goofy'],
    object: ['fish', 'bug', 'chair', 'ball'],
    place: ['in the park', 'at school', 'on the chair', 'in the soup']
};

let selectedWords = {
    noun: '',
    verb: '',
    adjective: '',
    object: '',
    place: ''
};

const storyDisplay = document.getElementById('story-display');
const wordButtons = document.querySelectorAll('.word-button');

wordButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        if (category) {
            const randomWord = words[category][Math.floor(Math.random() * words[category].length)];
            selectedWords[category] = randomWord;

            // Speak the selected word 
            speakNow(randomWord);
            updateStory();
        }
    });
});

document.getElementById('generate-random-story').addEventListener('click', generateRandomStory);
document.getElementById('generate-custom-story').addEventListener('click', generateCustomStory);
document.getElementById('reset-button').addEventListener('click', resetStory);

function updateStory() {
    const { noun, verb, adjective, object, place } = selectedWords;
    storyDisplay.textContent = `${noun} ${verb} ${adjective} ${object} ${place}`.trim() || 'Your story will appear here...';
}

function generateRandomStory() {
    const randomNoun = words.noun[Math.floor(Math.random() * words.noun.length)];
    const randomVerb = words.verb[Math.floor(Math.random() * words.verb.length)];
    const randomAdjective = words.adjective[Math.floor(Math.random() * words.adjective.length)];
    const randomObject = words.object[Math.floor(Math.random() * words.object.length)];
    const randomPlace = words.place[Math.floor(Math.random() * words.place.length)];

    const randomStory = `${randomNoun} ${randomVerb} ${randomAdjective} ${randomObject} ${randomPlace}.`;
    storyDisplay.textContent = randomStory;

    // Speak the random story
    speakNow(randomStory);
}

function generateCustomStory() {
    const { noun, verb, adjective, object, place } = selectedWords;
    const customStory = `${noun} ${verb} ${adjective} ${object} ${place}`.trim();

    if (customStory) {
        storyDisplay.textContent = customStory;
        // Speak the custom story
        speakNow(customStory);
    } else {
        alert("Please select at least one word from each category.");
    }
}

function resetStory() {
    selectedWords = { noun: '', verb: '', adjective: '', object: '', place: '' };
    storyDisplay.textContent = 'Your story will appear here...';
}

// Speech synthesis
var synth = window.speechSynthesis;

function speakNow(string) {
    var utterThis = new SpeechSynthesisUtterance(string);
    synth.speak(utterThis);
}