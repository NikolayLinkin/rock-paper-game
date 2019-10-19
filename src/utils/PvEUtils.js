const PAPER = "paper";
const SCISSORS = "scissors";
const ROCK = "rock";

const rates = [PAPER, SCISSORS, ROCK];
const getAiRate = () => rates[Math.floor(Math.random() * 3)];

export const playWithAi = (playerRate) => {
    const aiRate = getAiRate();

    if(playerRate === aiRate) {
        return {gameResult: 'draw', aiRate};
    }

    if(
        (playerRate === PAPER && aiRate === ROCK) ||
        (playerRate === SCISSORS && aiRate === PAPER) ||
        (playerRate === ROCK && aiRate === SCISSORS)
    ) {
        return {gameResult: 'win', aiRate};
    }

    return {gameResult: 'lose', aiRate};
};