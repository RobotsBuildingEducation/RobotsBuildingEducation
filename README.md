## Introduction

This document helps people set up this application on their device. It also servces as educational material for Patreon members learning how to code.

## Contact

- Please join this Discord community for more casual & information conversation about this app: [Discord](https://discord.com/invite/robotsbuildingeducation)

- Subscribe or support more content on Patreon: [Robots Building Education](https://patreon.com/robotsbuildingeducation)

- Use thew app @ https://robotsbuildingeducation.com

## RO.B.E

Robots Building Education is a research project centered around decentralized finance and education.

In 2023, it takes the form of an AI cofounder that generates scholarships through "work" created by users interacting with AI. It is strongly recommended to be subscribed to GPT-4 while working with the codebase.

## Forking RO.B.E

#### Firestore

You will need to set up a firebase project. A tutorial [can be found on Patreon](https://www.patreon.com/posts/93082226). Thi project includes the following services:

1. Authentication
2. Firestore
3. Hosting
4. Functions
5. Analytics

### API Keys

.env files are like secret files that are kept on your computer. [If you take a look at this file](https://github.com/RobotsBuildingEducation/RobotsBuildingEducation/blob/refactor-sessions/app/.gitignore#L26-L27), you'll see that Github ignores sending this file to the shared codebase. This is a security practice to keep keys safely hidden from the public since keys grant access to paid services.

<img width="577" alt="image" src="https://github.com/RobotsBuildingEducation/Educate/assets/65219666/e73253eb-623d-467e-80dd-e4eac02ddeec">

1. You'll need to create an account with OpenAI's API. The key definition can be found as `OPENAI_API_KEY` in a `.env` file that you have to create under `/app/functions` - [Example](https://github.com/RobotsBuildingEducation/RobotsBuildingEducation/blob/refactor-sessions/app/functions/index.js#L9-L13)

2. You'll need to create an account with Firebase's API. The definition can be found as `VITE_FIREBASE_API_KEY` under `/app`. The `VITE_` is specific to the application's Vite build and requires the `VITE_` header. - [Example](https://github.com/RobotsBuildingEducation/RobotsBuildingEducation/blob/refactor-sessions/app/src/database/firebaseResources.tsx#L12-L22)

3. There is a `VITE_PATREON_PASSCODE` definition in the codebase. They're mostly feature passcodes that get stored to local storage. Use whatever passcode you want or remove it. - [Example](https://github.com/RobotsBuildingEducation/RobotsBuildingEducation/blob/refactor-sessions/app/src/App.tsx#L132)
