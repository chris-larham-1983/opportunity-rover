# Opportunity Rover App

## Table of Contents

* [General Information](#general-information)
* [Component Design](#component-design)
* [Unit Tests](#unit-tests)
* [Audio Component Logical Algorithm Diagram](#audio-component-logical-algorithm-diagram)
* [Entity Relationship Diagram](#entity-relationship-diagram)
* [Technologies](#technologies)
* [Using the App](#using-the-app)
* [License](#license)

***

### General Information

This is my solution to the **Codecademy** portfolio project entitled *Final PERN App*, an open-ended project that had to be built 
using the PERN stack. 

The application had to satisfy the following requirements:

- have a front-end built using <em>React.js</em>
- have a server built using <em>Node.js</em> and <em>Express.js</em>
- use a <em>PostgreSQL</em> database to store data
- be written with the best security principles in mind
- include unit tests to ensure the integrity of the code
- use Git version control
- be developed locally 
- be published on Heroku

I decided to design an app that allows Users to view all the publicly-available images taken by the <em>Opportunity Rover</em> during its 
lifetime on Mars.  I wrote code that communicated with the open-source <em>NASA Mars Rover API</em> for several hours in order to extract 
all the necessary image data; I inserted the relevant data from each NASA API response to my local PostgreSQL database.

I wrote unit tests (340 in total) as I was building the app in order to ensure that the presentation and functionality of each component 
matched my specifications.  The components used in the app are explained in the images below.

***

### Component Design

![Component Design][Component Design]

[Component Design]: diagrams/Opportunity_App_Components.png

***

### Unit Tests

![Audio Unit Tests][Audio Unit Tests]

[Audio Unit Tests]: diagrams/Audio_Unit_Tests.PNG

![AppHeading Unit Tests][AppHeading Unit Tests]

[AppHeading Unit Tests]: diagrams/AppHeading_Unit_Tests.PNG

![MissionOverview Unit Tests][MissionOverview Unit Tests]

[MissionOverview Unit Tests]: diagrams/MissionOverview_Unit_Tests.PNG

![IntroSlideshow Unit Tests][IntroSlideshow Unit Tests]

[IntroSlideshow Unit Tests]: diagrams/IntroSlideshow_Unit_Tests.PNG

![PhotoAccess Unit Tests][PhotoAccess Unit Tests]

[PhotoAccess Unit Tests]: diagrams/PhotoAccess_Unit_Tests.PNG

![TextCredit Unit Tests][TextCredit Unit Tests]

[TextCredit Unit Tests]: diagrams/TextCredit_Unit_Tests.PNG

![PageTraversal Unit Tests][PageTraversal Unit Tests]

[PageTraversal Unit Tests]: diagrams/PageTraversal_Unit_Tests.PNG

![IntroPageReturn Unit Tests][IntroPageReturn Unit Tests]

[IntroPageReturn Unit Tests]: diagrams/IntroPageReturn_Unit_Tests.PNG

![CameraAbbreviations Unit Tests][CameraAbbreviations Unit Tests]

[CameraAbbreviations Unit Tests]: diagrams/CameraAbbreviations_Unit_Tests.PNG

![SolLink Unit Tests][SolLink Unit Tests]

[SolLink Unit Tests]: diagrams/SolLink_Unit_Tests.PNG

![SolOverview Unit Tests I][SolOverview Unit Tests I]

[SolOverview Unit Tests I]: diagrams/SolOverview_Unit_Tests_I.PNG

![SolOverview Unit Tests II][SolOverview Unit Tests II]

[SolOverview Unit Tests II]: diagrams/SolOverview_Unit_Tests_II.PNG

![SolOverview Unit Tests III][SolOverview Unit Tests III]

[SolOverview Unit Tests III]: diagrams/SolOverview_Unit_Tests_III.PNG

![SolHeading Unit Tests][SolHeading Unit Tests]

[SolHeading Unit Tests]: diagrams/SolHeading_Unit_Tests.PNG

![SolSlideshow Unit Tests I][SolSlideshow Unit Tests I]

[SolSlideshow Unit Tests I]: diagrams/SolSlideshow_Unit_Tests_I.PNG

![SolSlideshow Unit Tests II][SolSlideshow Unit Tests II]

[SolSlideshow Unit Tests II]: diagrams/SolSlideshow_Unit_Tests_II.PNG

![ImageEditing Unit Tests][ImageEditing Unit Tests]

[ImageEditing Unit Tests]: diagrams/ImageEditing_Unit_Tests.PNG

![CameraFilter Unit Tests I][CameraFilter Unit Tests I]

[CameraFilter Unit Tests I]: diagrams/CameraFilter_Unit_Tests_I.PNG

![CameraFilter Unit Tests II][CameraFilter Unit Tests II]

[CameraFilter Unit Tests II]: diagrams/CameraFilter_Unit_Tests_II.PNG

![SolSelection Unit Tests][SolSelection Unit Tests]

[SolSelection Unit Tests]: diagrams/SolSelection_Unit_Tests.PNG

***

### Audio Component Logical Algorithm Diagram

![audio component logical algorithm diagram][audio component logical algorithm diagram]

[audio component logical algorithm diagram]: diagrams/audio_component_logic.png
***

### Entity Relationship Diagram

![Entity Relationship Diagram][entity relationship diagram]

[entity relationship diagram]: diagrams/Opportunity_Rover_Database_Tables.png

***

### Technologies
  
I wrote this **Final PERN App** using the following technologies:

- *JavaScript*
- *React.js*
- *React Testing Library and Jest*
- *Express.js*
- *Node.js* 
- *PostgreSQL* 
- *Git and GitHub*
- *Command Line*
- *Entity Relationship Diagram (LucidChart)*
- *Algorithm Diagram (LucidSpark)*  
***

### Using the App

This **Final PERN App** can be viewed and interacted with:

- https://opportunity-rover.herokuapp.com

***

### License

MIT License

Copyright (c) 2023 Chris Larham

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

