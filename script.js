document.addEventListener("DOMContentLoaded", function(){

    console.log("Rock Paper Scissors game is ready.");

    let currentScorePlayer = 0;
    let currentScoreRobot = 0;
    let maximumTargetPoints = null;
    let isTheGameLockedOut = false;

    const visualWeaponDictionary = {
        "rock": "✊🏼",
        "paper": "🖐🏼",
        "scissors": "✌🏼"
    };

    const currentModeDisplayElement = document.getElementById('currentModeDisplay');
    const statusAnnouncementElement = document.getElementById('roundOutcomeMessage');
    const targetScoreInputElement = document.getElementById('targetScoreInput');

    const enterScoreLimitButton = document.getElementById('confirmScoreButton');
    const masterResetButton = document.getElementById('masterResetButton');
    const allWeaponButtons = document.querySelectorAll(".player-weapon-button");

    const numericScoreDisplayPlayer = document.getElementById('playerScoreCounter');
    const numericScoreDisplayRobot = document.getElementById('robotScoreCounter');

    const animationBattleStageElement = document.getElementById('animationBattleStage');
    const playerAnimatedHandElement = document.getElementById('playerAnimatedHand');
    const robotAnimatedHandElement = document.getElementById('robotAnimatedHand');

    enterScoreLimitButton.addEventListener('click', handleScoreTargetSubmission);

    masterResetButton.addEventListener('click', handleCompleteGameReset);

    allWeaponButtons.forEach(function(singleButton) {
        singleButton.addEventListener('click', function() {
            if (isTheGameLockedOut === true) {
                console.log("Click Ignored. Game is currently locked.");
                return;
            }

            let chosenWeaponStr = singleButton.getAttribute('data-weapon-type');
            console.log("Player clicked the weapon: " + chosenWeaponStr);

            beginBattleSequence(chosenWeaponStr);
        });
    });

    function handleScoreTargetSubmission() {

        let parsedValue =  parseInt(targetScoreInputElement.value, 10);

        if (isNaN(parsedValue) === false && parsedValue > 0) {
            maximumTargetPoints = parsedValue;
            currentModeDisplayElement.textContent = "First to " + maximumTargetPoints + " wins!";
            console.log("Target score successfully set to: " + maximumTargetPoints);

            resetInternalScoresAndUI();
        } else {

            maximumTargetPoints = null;
            currentModeDisplayElement.textContent = "or Play Infinitely!";
            console.log("Taget score cleared. Mode set to infinite.");
        }
    }

    function beginBattleSequence(playerWeaponChoice) {

        isTheGameLockedOut = true;

        let possibleWeaponsArray = ['rock', 'paper', 'scissors'];
        let randomDecimal = Math.random();
        let randomIndex = Math.floor(randomDecimal * possibleWeaponsArray.length);
        let robotWeaponChoice = possibleWeaponsArray[randomIndex];

        console.log("Robot has chosen: " + robotWeaponChoice);

        triggerShakingAnimation();
        
        setTimeout(function() {

            stopShakingAnimation();

            playerAnimatedHandElement.textContent = visualWeaponDictionary[playerWeaponChoice];
            robotAnimatedHandElement.textContent = visualWeaponDictionary[robotWeaponChoice];

            setTimeout(function() {
                
                animationBattleStageElement.classList.add('hidden-element');
                statusAnnouncementElement.classList.remove('hidden-element');

                calculatedRoundWinner(playerWeaponChoice, robotWeaponChoice);
            }, 1200);

        }, 800);
    }

    function calculatedRoundWinner(playerString, robotString) {

        if (playerString === robotString) {
            statusAnnouncementElement.textContent = "Tie Round! Both Choosed " + playerString.toUpperCase() + ".";
            isTheGameLockedOut = false;
            console.log("Result: TIE");
            return;
        }

        const rulesOfVictory = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        };

        if (rulesOfVictory[playerString] === robotString) {
            currentScorePlayer = currentScorePlayer + 1;
            numericScoreDisplayPlayer.textContent = currentScorePlayer;
            statusAnnouncementElement.textContent = "You Win! " + playerString.toUpperCase() + " beats " + robotString.toUpperCase() + ".";
            console.log("Result: Player Wins Round");
        }

        else {
            currentScoreRobot = currentScoreRobot + 1;
            numericScoreDisplayRobot.textContent = currentScoreRobot;
            statusAnnouncementElement.textContent = "Robot Win! " + robotString.toUpperCase() + " beats " + playerString.toUpperCase() + ".";
            console.log("Result: Robot Wins Round");
        }

        checkIfMatchIsOver();
    }

    function checkIfMatchIsOver() {
        if (maximumTargetPoints === null) {
            isTheGameLockedOut = false;
            return;
        }

        if (currentScorePlayer === maximumTargetPoints) {
            isTheGameLockedOut = true;
            statusAnnouncementElement.textContent = "VICTORY! You won the match!";
            console.log("Match over: player reached target.");
        }
        
        else if (currentScoreRobot === maximumTargetPoints) {
            isTheGameLockedOut = true;
            statusAnnouncementElement.textContent = "Defeat! robot wins the match.";
            console.log("Match Over: Robot reached target.");
        }

        else {
            isTheGameLockedOut = false;
        }
    }

    function triggerShakingAnimation() {

        statusAnnouncementElement.classList.add('hidden-element');

        animationBattleStageElement.classList.remove('hidden-element');

        playerAnimatedHandElement.textContent = "✊🏼";
        robotAnimatedHandElement.textContent = "✊🏼";

        playerAnimatedHandElement.classList.add('animate-shaking');
        robotAnimatedHandElement.classList.add('animate-shaking');
    }

    function stopShakingAnimation() {

        playerAnimatedHandElement.classList.remove('animate-shaking');
        robotAnimatedHandElement.classList.remove('animate-shaking');
    }

    function resetInternalScoresAndUI() {
        console.log("Resetting internal engine state...");

        currentScorePlayer = 0;
        currentScoreRobot = 0;
        isTheGameLockedOut = false;

        numericScoreDisplayPlayer.textContent = "0";
        numericScoreDisplayRobot.textContent = "0";

        statusAnnouncementElement.textContent = "Select among rock,paper and scissors";
        animationBattleStageElement.classList.add('hidden-element');
        statusAnnouncementElement.classList.remove('hidden-element');
    }

    function handleCompleteGameReset() {
        console.log("Reset triggered by user.");
        targetScoreInputElement.value = "";
        maximumTargetPoints = null;
        currentModeDisplayElement.textContent = "or play infinitely";

        resetInternalScoresAndUI();
    }
});