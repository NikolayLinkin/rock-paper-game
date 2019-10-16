const PAPER = "paper";
const SCISSORS = "scissors";
const ROCKS = "rocks";

const rates = [PAPER, SCISSORS, ROCKS];
const getAiRate = () => rates[Math.floor(Math.random() * 3)];

export const playWithAi = (playerRate) => {
    const aiRate = getAiRate();

    if(playerRate === aiRate) {
        return 'draw';
    }

    if(
        (playerRate === PAPER && aiRate === ROCKS) ||
        (playerRate === SCISSORS && aiRate === PAPER) ||
        (playerRate === ROCKS && aiRate === SCISSORS)
    ) {
        return 'win';
    }

    return 'lose';
};