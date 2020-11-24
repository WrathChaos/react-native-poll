<img alt="React Native Poll" src="assets/logo.png" width="1050"/>

[![Voting and poll library for React Native with fully customizable options](https://img.shields.io/badge/-Voting%20and%20poll%20library%20for%20React%20Native%20with%20fully%20customizable%20options-orange?style=for-the-badge)](https://github.com/WrathChaos/react-native-poll)

[![npm version](https://img.shields.io/npm/v/react-native-poll.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-poll)
[![npm](https://img.shields.io/npm/dt/react-native-poll.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-poll)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

<p align="center">
  <img alt="React Native Poll"
        src="assets/Screenshots/react-native-poll.gif" />
</p>

<table>
  <tr>
    <td>
      <b>React Native Poll</b>
    </td>
    <td>
      <b>React Native Poll Choice Selected</b>
    </td>
  </tr>
 <tr>
    <td align="center"> 
      <img alt="React Native Poll" src="assets/Screenshots/react-native-poll.png"  />
    </td>
    <td align="center">
      <img alt="React Native Poll" src="assets/Screenshots/react-native-poll-selected.png"  />
    </td>
   </tr>
</table>

# Installation

Add the dependency:

```bash
npm i react-native-poll
```

## Peer Dependencies

<h5><i>IMPORTANT! You need install them</i></h5>

```js
"@freakycoder/react-native-bounceable": ">= 0.2.4",
```

# Usage

## Import

```jsx
import RNPoll, { IChoice } from "react-native-poll";
```

## Fundamental Usage

```jsx
<RNPoll
  totalVotes={30}
  choices={choices}
  onChoicePress={(selectedChoice: IChoice) =>
    console.log("SelectedChoice: ", selectedChoice)
  }
/>
```

## Advanced Usage

```jsx
import RNAnimated from "react-native-animated-component";

<RNPoll
  appearFrom="left"
  animationDuration={750}
  totalVotes={30}
  choices={choices}
  PollContainer={RNAnimated}
  PollItemContainer={RNAnimated}
  onChoicePress={(selectedChoice: IChoice) =>
    console.log("SelectedChoice: ", selectedChoice)
  }
/>;
```

## Data Format (IChoice)

You must use this data format for generating the poll choices

```js
const choices: Array<IChoice> = [
  { id: 1, choice: "Nike", votes: 12 },
  { id: 2, choice: "Adidas", votes: 1 },
  { id: 3, choice: "Puma", votes: 3 },
  { id: 4, choice: "Reebok", votes: 5 },
  { id: 5, choice: "Under Armour", votes: 9 },
];
```

## Example Project 😍

You can checkout the example project 🥰

Simply run

- `npm i`
- `react-native run-ios/android`

should work of the example project.

# Configuration - Props

## Fundamentals

| Property      |      Type      |  Default  | Description                                          |
| ------------- | :------------: | :-------: | ---------------------------------------------------- |
| totalVotes    |     number     | undefined | set the total votes of the poll                      |
| choices       | Array<IChoice> | undefined | set the choices array for the generating them        |
| onChoicePress |    function    |  default  | set your own logic when a choice is pressed/selected |

## Customization (Optionals)

| Property                   |    Type    |  Default  | Description                                                                                                                                                                    |
| -------------------------- | :--------: | :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hasBeenVoted               |  boolean   |   false   | let you to enable if the poll is already voted                                                                                                                                 |
| votedChoiceByID            | number(id) | undefined | let you to select the already voted poll choice                                                                                                                                |
| disableBuiltInIncreaseVote |  boolean   |   false   | enable/disable the built-in automatically increase the vote system when a choice is selected                                                                                   |
| style                      | ViewStyle  |  default  | set or override the style object for the main container                                                                                                                        |
| pollContainerStyle         | ViewStyle  |  default  | set or override the style object for the poll inner container                                                                                                                  |
| choiceTextStyle            | TextStyle  |  default  | set or override the style object for the choice text style                                                                                                                     |
| percentageTextStyle        | TextStyle  |  default  | set or override the style object for the percentage text style                                                                                                                 |
| checkMarkImageStyle        | ImageStyle |  default  | set or override the style object for the checkmark image style                                                                                                                 |
| borderColor                |   color    |  #aabee3  | change the border color                                                                                                                                                        |
| fillBackgroundColor        |   color    |  #aabee3  | change the filling background color                                                                                                                                            |
| checkMarkIconImageSource   |  ISource   |  default  | change the check mark image source                                                                                                                                             |
| PollContainer              | component  |  default  | set your own component instead of default react-native View component such as [react-native-animated-component](https://github.com/WrathChaos/react-native-animated-component) |
| PollItemContainer          | component  |  default  | set your own component instead of default react-native View component such as [react-native-animated-component](https://github.com/WrathChaos/react-native-animated-component) |
| ImageComponent             | component  |  default  | set your own component instead of default react-native Image component such as `FastImage`                                                                                     |

## Future Plans

- [x] ~~LICENSE~~
- [ ] More animation options
- [ ] Other poll design options
- [ ] Write an article about the lib on Medium

## Credits

Inspired on [aarkalyk](https://github.com/aarkalyk/react-native-polls-api-example)

## Author

FreakyCoder, kurayogun@gmail.com

## License

React Native Poll is available under the MIT license. See the LICENSE file for more info.
