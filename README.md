# Codeborn: Power the Dawn
#### Video Demo:  <(https://www.youtube.com/watch?v=6IY6gAV8rX0&list=PLfCSy4JLMKLGDec3a7y2RFNyME16OaP2z&index=1)>
#### Description:

Codeborn: Power the Dawn is point and click narrative story game with multiple endings, achievements, humor, plenty of references, original artwork as the background and a hidden sprite that shows up only 15% of the time during question phases of an 8-bit Elon Musk and other hidden features. This game is designed to be replayed mutliple times.

The player is an Engineer woken from cryogenic suspension who has been specifically chosen to power up OptiDawn, a dormant cognitive system in the starship refered to as an "egg", to wake the other 999,999 cryogenically frozen crew members to continue the mission to colonize Mars.

Through playing through the five question phases, the player can unlock three different story endings, a game over ending for a loss, and activate a self-termination option that the player can choose if they want to get the secret achievement. This game can be played as many times as you want but the self-termination option can only be chosen one time per playthrough and can only be reactivated after a full game reset.

After each ending, there is a final summary screen that shows how many achievements have been unlocked and how many total playthroughs you've completed. Each ending gets you an achievement as well as playing the game a second time to try to encourage the user to replay the game.

The name input phase has a special feature where you get different feedback if you specifically enter the names Elon, David Malan or David J Malan, Marvin or Jeff. These responses are funny and referential and don't actually have any other differences in the game. Your name is remembered for future reference and playthrough so you only have to input your name one time between resets even if you refresh your page.

 Depending on the ending the player gets, the replay intro is different, shorter and goes into the question phases faster than the original playthrough. The game includes options to replay, restart or exit. Replay preserves your outcomes on the final summary page. Reset fully resets the name, achievements and progress, and terminate button are all reset, after the player confirms this is what they want to do and the game returns the player to the title screen.


#### FILE BREAKDOWN

## GAME.JS
This file is the main file for this game that holds the logic, game states, progression, player input, endings, variables, functions, random bad feedback generation, state transitions and other things that make the game run. This is the core of the game. I tried to keep it organized and easy to read with notes, just like my other files.

## STYLE.CSS
This file controls visual presentation and the styling of the game, including a hidden scrollbar, text that times out after resetting the game before bringing you to the title screen, hover effects, the glow around the game screen and all the other cool cyber sci-fi themed visuals you'll see in the game. I kept using the game colors that I used when I drew the background in Procreate so getting hex codes with that was very simple.

## INDEX.HTML
This file is where I imported the fonts for the game, where the text for the title screen is, and where I tell the game to refer to style.css for visuals. The HTML is intentionally short because I wanted to really control the game using JavaScript and I found it easier and neater to keep the files more straightforward with what they are doing.


#### MY PROCESS
This project went through quite a few changes during the process of making and designing it. On December 19, 2025 I decided to use my previous game (Codeborn: Meet OptiDawn, made with pygame for my previous CS50P final project) as inspiration to make a JavaScript/HTML/CSS game that could be fully interactive and actually playable on a browser.

One of my first challenges was underestimating how going from one Python file, to managing three separate files was going to go. I ended up trying to handle too many things at once before slowing myself down, and realizing I'm going to need to go at this in a more organized way. I decided to focus on just making the game work, before trying to style any of it. I should have done this in the first place, but now I know better.

I added different features as I went, because as I was writing the code, I kept coming up with more and more ideas, and I know how important it is to stay organized when I get passionate and very interested in what I'm doing because all of my ideas need to come together and make sense. Originally I made the game with three separate outcomes and figured that if someone were to play again, they shouldn't have to go through the intro all over again, and that for each gameplay they should be able to unlock things like achievements then it just slowly snowballed into what the game is now. I'm very happy with even the features that seem small like the hidden engineer input name responses. I learned a great deal while using JavaScript about syntax details during this part of my process.

When my game ran and was changed with updated dialogue, additional small features and debugged, I focused on the layout. This is when I encountered my second challenge, which was resolving conflicts between my title screen and intro logic because of my different starting conditions, and because of the specific conditions that the title screen was even supposed to show up. Here is where and why I ended up putting my title screen text in the HTML stlye. After this and after getting the text set up how I wanted it, I wanted to make sure the length of the buttons were consistant on the page, at least for the quesion phases. To do this I decided to make them all very long during those phases to make them look stacked and neat.

One of the most time consuming challenges I had making this was so simple that I could only smile after figuring it out. When I used backticks for text instead of quotes, I couldn't figure out why I was seeing an indentation after the first line of text. I actually asked AI for some advice and suggestions and that's where I added I added the ".trim()" at the end of every closing backtick, like it suggested and that didn't even end up working. It turns out, I wasn't being literal enough and was focused on making my code look neat by using proper indentation, that I didn't even consider that those indentations were taking the white space literally indenting the text under the first line of text. When I was staring at my code it just clicked and I got it, thankfully. Lesson learned.

So, AI tools were used to help debug and understand issues.

Time went by really fast while I was designing the layout and I really enjoyed getting to see my game really come together. When I was finally satisfied with how it all looked I went back and changed a bit of text just to make sure it was all cohsive and made sense. I also added some random bad feedback responses with more references.


#### CONCLUSION

Codeborn: Power the Dawn represents both a technical and creative milestone for me as my very second program that I've ever made. Although I'm happy with the outcome there can alwasy be improvements such as expanding and creating more paths, adding audio, moe advanced visual effects, making questions more interactive, adding more sprites for references of retro games, code, CS50, The Hitchhiker's Guide to the Galaxy, Elon Musk and his plans for life on Mars and perhaps other references that could make the game more fun, without over-doing it. I learned a lot while making this game and I'm grateful for this course.

#### PERSONAL NOTE
My name is Jade, I'm 29 years old and still building every single day. I am ready to dedicate the rest of my life learning and getting to help build the future of tech, hopefully someday at an Elon-based company because I believe that these companies are making the most exciting advancements and impacts.

I have big goals, that I won't even call dreams because they are going to happen, I hope you like my game.
