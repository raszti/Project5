# Matching Game
-------------
This project is **a web-based application which works like a mermory cardgame**.
The program is testing the following functionalities:

## Install
----------
Download or clone project folder.
Open index.html in the main project directory by using a web browser that supports html5 and css3.
To successfully run the application you will need an active internet connection.

## The gameplay
---------------

### The cards
There are 8 different pairs of cards with simple images.

### The goal
Try to find the pair of all symbol with turning 2 cards at a time. The game ends when all 16 cards are matched.

### The rules
You turn 2 cards at a time. If the symbols of the cards are the same you have a match, and the cards remain open.
If your cards' symbols do not match, than you have tur fold back the cards and try again.

### The moves
The app counts how many moves the player makes. Adds one every time the first card is flipped.

### The stars
The less moves you need to complete the puzzle the more stars you get.
The player starts the game with the max. 3 stars, losing one star after 15 turn, and another after 20.

### The timer
The timer starts to count at the moment the first card is turned. It counts seconds and minutes in a xx:xx format.

### The results
The players wons if all the cards are matched. When the game is over a modal appears displaying the results
of the game including the number of turns, the time and the star rates.

### The reset button
When the reset button is pressed all the counters are reset to zero.
The open cards symbols will be hidden and the cards will be shuffled and placed back in a different order.

## The application uses the following external libraries and frameworks
-----------------------------------------------------------------------
[jQuery 3.2.1 JavaScript library](https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js)
[Special fonts for the symbols](https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css)
[Fonts used](https://fonts.googleapis.com/css?family=Coda)

## Contributing
---------------

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## License
----------
Copyright [2017] [Gabor Furesz]

Licensed under the [Apache License, Version 2.0 (the "License")](http://www.apache.org/licenses/LICENSE-2.0);
you may not use this file except in compliance with the License.
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
