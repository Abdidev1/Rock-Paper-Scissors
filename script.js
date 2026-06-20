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
})