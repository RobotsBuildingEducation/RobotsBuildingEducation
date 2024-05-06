/**
 * Defines the original education transcript for web5 users that gets written to a users DWN.
 * Current centralized to the user document's "profile" data.
 */
export const decentralizedEducationTranscript = {
  "Philosophy of Critical Theory & Technology": false,
  "Human-Computer Interaction": false,
  "Psychology of Self-esteem": false,
  "Introduction to Engineering": false,
  "Programming Fundamentals": false,
  "Frontend Software Engineering": false,
  "Backend Software Engineering": false,
  "Full-stack Software Engineering": false,
  "Data Structures & Algorithms": false,
  "Business Writing": false,
  "Introduction to Finance": false,
};

// handles when user's complete practice prompts
export const userProgression = {
  "Learning Mindset & Perspective": false,
  "Lesson 1 Coding Fundamentals": false,
  "Lesson 2 Frontend Programming": false,
  "Lesson 3 Backend Engineering": false,
  "Lesson 4 Building Apps & Startups": false,
  "Lesson 5 Computer Science": false,
  Philosophy: true,
  "Interactions & Design": true,
  "The Psychology Of Self-esteem": true,
  "Resume Writing": true,
  "Focus Investing": true,
};

// Handles when a user completes both the practice prompt and the discover prompt
export const userUnlocks = {
  "Learning Mindset & Perspective": true,
  "Lesson 1 Coding Fundamentals": false,
  "Lesson 2 Frontend Programming": false,
  "Lesson 3 Backend Engineering": false,
  "Lesson 4 Building Apps & Startups": false,
  "Lesson 5 Computer Science": false,
  Philosophy: false,
  "Interactions & Design": false,
  "The Psychology Of Self-esteem": false,
  "Resume Writing": false,
  "Focus Investing": false,
};

// handles when a user completes the discover prompt
export const userWatches = {
  "Learning Mindset & Perspective": false,
  "Lesson 1 Coding Fundamentals": false,
  "Lesson 2 Frontend Programming": false,
  "Lesson 3 Backend Engineering": false,
  "Lesson 4 Building Apps & Startups": false,
  "Lesson 5 Computer Science": false,
  Philosophy: false,
  "Interactions & Design": false,
  "The Psychology Of Self-esteem": false,
  "Resume Writing": false,
  "Focus Investing": false,
};

// Used to iterate the maps above during unlocking events.
export const setOfLectures = [
  "Learning Mindset & Perspective",
  "Lesson 1 Coding Fundamentals",
  "Lesson 2 Frontend Programming",
  "Lesson 3 Backend Engineering",
  "Lesson 4 Building Apps & Startups",
  "Lesson 5 Computer Science",
  "Philosophy",
  "Interactions & Design",
  "The Psychology Of Self-esteem",
  "Resume Writing",
  "Focus Investing",
];

export const modalConfig = {
  defaultMessage: "This is the default modal message.",
  messages: {
    creator:
      "You need to complete Lesson 2: Frontend Programming in Engineering to unlock this path.",
    dealer:
      "You need to complete Lesson 4: Building Apps in Engineering to unlock this path.",
    "Learning Mindset & Perspective-video":
      "Watching 90% of the discover video completes one of two parts needed to unlock the next lecture! Complete the exercise in the practice prompt to unlock the next stage.",
    "Learning Mindset & Perspective-practice":
      "Finishing 100% of the practice exercise completes one of two parts needed to unlock the next lecture! Watch 90% of the video found in the discover prompt to unlock the next stage.",
    "Learning Mindset & Perspective-complete": (
      <div>
        Good job! You've unlocked the next lecture and earned the following
        transcript award in your identity wallet 🏦 🥹
        <div
          id={`Introduction to Engineering`}
          label={`Introduction to Engineering`}
          style={{
            width: 125,
            height: 125,
            backgroundColor: "rgba(13,41,179, 1)",
            margin: 2,
            border: "5px solid rgba(0,0,255, 1)",

            borderRadius: "20%",
            padding: 5,
          }}
        >
          Learning Mindset & Perspective
        </div>
      </div>
    ),
    disabledModule:
      "This lecture hasn't been unlocked yet. Complete the video and practice tasks in the lesson before it in order to access.",
  },
};

export let engineerHeaders = [
  "Learning Mindset & Perspective",
  "Lesson 1 Coding Fundamentals",
  "Lesson 2 Frontend Programming",
  "Lesson 3 Backend Engineering",
  "Lesson 4 Building Apps & Startups",
  "Lesson 5 Computer Science",
];
