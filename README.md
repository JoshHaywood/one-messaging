# 2005220_Comp260-A1-A2 - One Messaging

**Please note this project has been moved to this repo as its repo is inaccessible to users outside of the academic institution it was created under, therefore it will lack the relevant commit logs.**

This project is a distributed system artifact and poster as part of my comp260 module.
My choosen artifact is a one to one messaging app, mimicking a service known as 'live chat'.
Live chat is a modern version of communication that replaces previously used static contact forms.
The socket.io library is being utilized to achieve communication between two test clients across pre assigned ports as the minimum viable product.
Please refer to the project proposal found in 'documentation' for a more detailed outline.

A built version (socket functionality currently bugged therefore a local instance is recommended) can be found:
http://jh248828.kemeneth.net:7000/users

## Contents

- [One Messaging](#2005220_Comp260-A1-A2-One Messaging)
  - [Contents](#contents)
  - [Main Features](#main-features)
      - [Repository Layout](https://github.falmouth.ac.uk/JH248828/2005220_Comp260-A1-A2#repository-layout)
          - [Main](https://github.falmouth.ac.uk/JH248828/2005220_Comp260-A1-A2#main)
          - [Application](https://github.falmouth.ac.uk/JH248828/2005220_Comp260-A1-A2#application)
          - [Documentation](https://github.falmouth.ac.uk/JH248828/2005220_Comp260-A1-A2#documentation)
      - [Installation](https://github.falmouth.ac.uk/JH248828/2005220_Comp260-A1-A2#installation)
          - [Prerequisites](https://github.falmouth.ac.uk/JH248828/2005220_Comp260-A1-A2#prerequisites)
          - [User Guide](https://github.falmouth.ac.uk/JH248828/2005220_Comp260-A1-A2#user-guide)
      - [Commit Message Key](https://github.falmouth.ac.uk/JH248828/2005220_Comp260-A1-A2#commit-message-key)

## Main features

The main target features are: 
- Messaging interface
- Session management for multiple users
- Login / sign up authentication system

## Repository layout

### Main

This branch contains:

- Project builds.
- License.
- Readme file.

### Application

This branch contains:

- All application related source code both front-end and back-end.

### Documentation

This branch contains:

** Both the proposal and poster for assignment 2 as well as the essay and artifact for assignment 1 **

- project proposol
- project poster
- UML diagrams
- wireframes
- artifact essay

## Installation

### Prerequisites

- Node Package Manager (NPM) [Nodejs](https://nodejs.org/en/download/)
- Socket.io library (NPM will be used for this.)
- Express-session (NPM will be used for this.)
- File manager (File explorer recommended for windows users.)
- Web browser (Google Chrome is recommended.)
- Integrated Development Environment (IDE) (Visual Studio Code is recommended (<https://code.visualstudio.com/download>))
- Command Line Interface (CLI) (Git Bash is recommended (<https://git-scm.com/downloads>))

** Optional **

-   Repository Browser (Recommended GitHub desktop (<https://desktop.github.com/>))

### User Guide

1.  Firstly download the correct build if you haven't already from [GitHub](https://github.falmouth.ac.uk/JH248828/2005220_Comp260-A1-A2) Builds are found on the 'main' branch under the 'builds' folder with the highest number collectively in the format '0.0.0' being the latest build.

2.  If you have downloaded the optional repository browser clone the repository and pull. If you haven't downloaded the repository browser download a zip folder from the repository under 'code' tab then the 'code' dropdown button then click download zip. Then extract the folder somewhere in your files.

3.  If you are using an IDE open the entire project folder in the IDE. If you aren't skip to the next step.

4.  Within the project folder open your CLI by navigating to where you have stored the project folder.

5. Enter the following into your CLI to install Socket.io and Express-session. (This was done using GitBash and therefore commands might differ.)

`$ npm install socket.io`
`$ npm install express-session`

6.  Now enter the following into your CLI. (This was done using GitBash and therefore commands might differ.)

`$ npm install`

`$ npm start`

7.  Finally enter the local URL (http:localhost:8080/setup) into your web browser (the redirect to http:localhost:8080 will occur automatically).

** Note if when an additional user logs in and a new session isnt properly created use an ENTIRELY new browser, such as Microsoft Edge, rather than tab or instance. As browsers may cache sessions on thier own and conflict. **

### Controls

- Register with firstname, lastname, username and password on index page.
- Login in with an existing username and password in the same session as you used it previously (Dont entirely close the application in between.)
- Message using the chat interface on Chatbox page by typing to in the input below the chatbox and pressing enter on clicking send button.

## Commit Message Key

** If any words used in the commit log used before the content of the message are unfamiliar refer to this key **

- feat: A feature that has been added.
- fix: Bug fix.
- refactor: Rewrite/Restructure your code, however does not change any behavior
- docs: Changes relating to documentation.
- style: Formatting, missing code, white space. etc
- Build: Packages or project version related commits.
- chore: Miscellaneous commits.
