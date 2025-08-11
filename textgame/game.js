const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(node => node.id === textNodeIndex);
    textElement.innerText = textNode.text;

    // Clear previous buttons
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    // Show new buttons
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    state = Object.assign(state, option.setState || {});
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    showTextNode(nextTextNodeId);
}


const textNodes = [
    {
        id: 1,
        text: "What is the orange part of an egg called?",
        options: [
            {
                text: 'Yolk',
                setState: { yellow: true },
                nextText: 2
            },
            {
                text: 'Blue',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "How many legs do insects have?",
        options: [
            {
                text: 'Six',
                requiredState: (currentState) => currentState.yellow,
                setState: { six: true, seven: false },
                nextText: 3
            },
            {
                text: 'Seven',
                requiredState: (currentState) => currentState.yellow,
                setState: { six: false, seven: true },
                nextText: 3
            },
            {
                text: 'None',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "What is a baby kangaroo called?",
        options: [
            {
                text: 'Joey',
                requiredState: (currentState) => currentState.yellow,
                setState: { joey: true },
                nextText: 4
            },
            {
                text: 'Jercy',
                requiredState: (currentState) => currentState.yellow,
                setState: { joey: false },
                nextText: 4
            },
            {
                text: 'None',
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: "You are tired so many times.",
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
];

// Start the game
startGame();
