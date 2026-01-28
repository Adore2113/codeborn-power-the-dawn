# Codeborn: Power the Dawn
#### Play on itch.io:  <(https://adore2113.itch.io/codeborn-power-the-dawn)>
#### Description:

Codeborn: Power the Dawn is a point-and-click narrative game featuring multiple endings, achievements, humor, references, original background art, and hidden mechanics designed to encourage replayability.

Players take on the role of an Engineer awakened from cryogenic suspension and tasked with powering up OptiDawn, a dormant cognitive system on a Mars bound starship. Through a series of question phases, players influence the outcome of the mission and uncover different story paths.

Across five question phases, players can unlock three main endings, a failure state, and a secret achievement path. Certain options are limited per playthrough and require a full reset to access again, reinforcing game replay.

After each ending, a summary screen displays unlocked achievements and total playthrough count. Replay intros adapt based on previous outcomes, allowing faster progression on subsequent runs.

The name input phase includes special responses for specific inputs, serving as humorous, referential easter eggs. Player names persist across sessions until a full reset is performed.


#### FILE BREAKDOWN

## GAME.JS
This file is the main file for this game that holds the logic, game states, progression, player input, endings, variables, functions, random bad feedback generation, state transitions and other things that make the game run. This is the core of the game. I tried to keep it organized and easy to read with notes, just like my other files.

## STYLE.CSS
This file controls visual presentation and the styling of the game, including a hidden scrollbar, text that times out after resetting the game before bringing you to the title screen, hover effects, the glow around the game screen and all the other cool cyber sci-fi themed visuals you'll see in the game. I used the game colors that I chose when I drew the game background in Procreate.

## INDEX.HTML
This file is where I imported the fonts for the game, where the text for the title screen is, and where I tell the game to refer to style.css for visuals. The HTML is intentionally short because I wanted to really control the game using JavaScript and I found it easier and neater to keep the files more straightforward with what they are doing.

## DEV NOTES
This project evolved from an earlier pygame prototype into a browser-based interactive playable game. Development first focused on core gameplay and state logic before expanding into UI design, replay mechanics, and hidden features.

## STATUS
Playable and complete! Future improvements may include expanded story paths, additional visual effects, audio, and further interactive elements.

#### PERSONAL NOTE
Built as part of an ongoing journey into software, systems, and machine learning.
