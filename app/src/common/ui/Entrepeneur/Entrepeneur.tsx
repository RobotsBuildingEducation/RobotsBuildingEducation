//i did not spell Entrepreneur correctly.
import { ChatBlock } from "../Elements/ChatBlock/ChatBlock";
import poorCharlie from "../../media/images/poorCharlie.png";
import neyra_logo from "../../media/images/neyra_logo.png";
import { ultimateEffeciencyJutsu } from "../ui";
import { SchedulerBlock } from "../Elements/SchedulerBlock/SchedulerBlock";
import MarkdownRenderer from "../Elements/MarkdownRenderer/MarkdownRenderer";
import { ExternalLink } from "../Elements/ExternalLink/ExternalLink";

export const Entrepeneur = {
  "Understanding Business": {
    "Resume Writing": {
      hasCode: false,

      dealerBorder: true,

      header: `Resume Writing`,
      credential: "Business Writing",
      backgroundImgSrc:
        "https://res.cloudinary.com/sheilfer/image/upload/v1697450736/Module_Buttons_13_sictcc.gif",
      fileSource:
        "https://res.cloudinary.com/dtkeyccga/video/upload/v1697778816/IMG_9248_o1eyss.mov", // may not need

      prompts: {
        welcome: {
          response: (
            <div>
              Hola estudiantes! 🌼
              <br />
              <br />
              Welcome to our journey into crafting competitive entry-level
              resumes for high-paying careers. Your experiences and passions are
              treasures waiting to be showcased. ✨ Communication is the key
              that unlocks many doors in the professional world. 🗝️
              <br />
              <br />
              With every word, you're building not just a resume, but a
              testament to your dreams and resilience. And remember, even with
              my grand plans to rule the universe, communication is key. 😈
              <br />
              <br />
              Let's conquer this together!
              <br />
              <br />
              Con cariño,
              <br />
              rox 🌹
            </div>
          ),
          spanish: ``,
        },
        patreon: {
          impact: 1000,
          action: `generate`,
          icon: `✨`, //`✍️`
          request: `rox, can you please generate material to introduce me to ${ultimateEffeciencyJutsu(
            `Creating Competitive Entry Level Resumes`
          )}?`,
          response: `null`,
          spanish: ``,

          extraContent: (
            <div>
              Crafting a compelling resume is akin to designing a user
              interface; it's about communicating your value effectively and
              engagingly. Key aspects include optimizing your LinkedIn for
              visibility, ensuring your resume makes a strong impression
              quickly, and providing a meaningful context for your career
              journey.
              <br />
              <br />
              Adhering to a structured format, such as precise spacing and font
              usage, plays a crucial role. Education should be concise yet
              impactful, and skills need to be categorized thoughtfully.
              Emphasizing real-world experience and volunteer work can
              significantly enhance your profile. Ultimately, a resume is your
              narrative, a document that speaks volumes about your potential.
              📝🌟💼
            </div>
          ),
        },
        inspire: {
          impact: 100,
          action: `inspire`,
          icon: `⚡`,
          request: `rox, can you please share why hiring managers prefer one-page resumes and how it benefits applicants?`,
          response: (
            <div>
              Did you know that according to a study by the National Association
              of Colleges and Employers, communication skills consistently rank
              as the most sought-after quality by employers? 🌟
              <br />
              <br />
              Even in careers deeply rooted in technology, science, or
              mathematics, the ability to effectively convey ideas and
              collaborate with others is invaluable. Your voice and your stories
              have the power to connect, inspire, and lead. Embrace them, refine
              them, and let them shine. 🌍💬
              <br />
              <br />
              Remember, mastering communication is not just about speaking, but
              truly understanding and connecting with others. Never
              underestimate the magic woven in your words and the bridges they
              can build. And as always, even in my quest to rule the universe,
              communication remains my most potent tool. 😈
            </div>
          ),
          spanish: ``,
        },
        summarize: {
          impact: 100,
          action: `summarize`,
          icon: `📚`,
          request: `rox, can you please summarize the basics of ${ultimateEffeciencyJutsu(
            `Creating Competitive Entry Level Resumes`
          )}?`,
          response: (
            <div>
              In the dynamic realm of business, communication is the heartbeat
              that keeps organizations alive and thriving. 🌐
              <br />
              <br />
              Effective business communication skills empower individuals to
              convey their ideas clearly, ensuring that their vision is not only
              understood but also embraced by others. Whether it's between team
              members collaborating on a project, or between a company and its
              customers, clear communication is the bridge that connects diverse
              thoughts and perspectives. 🌉
              <br />
              <br />
              Pitching, a specialized form of communication, is the art of
              presenting an idea or product in a way that resonates with an
              audience. A successful pitch can secure funding for a startup, win
              over a potential client, or inspire a team to pursue a new
              direction. 🚀
              <br />
              <br />
              Just like a storyteller captures the imagination of their
              listeners, a well-crafted pitch can ignite passion and drive
              action.
              <br />
              <br />
              For you, as budding professionals, mastering these skills is not
              just about business success; it's about fostering relationships,
              building trust, and making a lasting impact. In a world filled
              with noise, your ability to communicate effectively and pitch
              persuasively will set you apart, allowing your unique voice to be
              heard and valued. 🎤
              <br />
              <br />
              So, as you venture into the world of business, remember to harness
              the power of your words, for they have the potential to shape
              realities and open doors to endless possibilities. And, as always,
              even in my secret plans to conquer the cosmos, I recognize the
              unmatched power of a compelling narrative. 😈
              <br />
              <br />
              With admiration and hope for your bright futures,
              <br />
              rox 🌹
            </div>
          ),
          spanish: ``,
        },
        ask: {
          impact: 100,
          action: `ask`,
          icon: `🔮`,
          request: `rox, can you please show me three frequently asked beginner questions about ${ultimateEffeciencyJutsu(
            `Creating Competitive Entry Level Resumes`
          )} with one sentence answers?`,
          response: (
            <div>
              Navigating the world of business communication and pitching can be
              filled with uncertainties. Here are three frequently asked
              questions by beginners, with answers tailored to provide clarity
              and guidance. ✨<br />
              <br />
              <strong>
                1. Why is concise communication important in business?
              </strong>
              <br />
              In the fast-paced world of business, time is a valuable asset.
              Concise communication ensures that your message is clear and
              easily understood without overwhelming the listener or reader. By
              being succinct, you show respect for the recipient's time,
              increase the likelihood of your message being retained, and
              enhance decision-making efficiency. Furthermore, concise
              communication minimizes misunderstandings and fosters positive
              relationships, which are crucial for successful collaborations and
              negotiations.
              <br />
              <br />
              <strong>
                2. How can I effectively tailor my pitch to different audiences?
              </strong>
              <br />
              Understanding your audience is key. 🔑 Start by researching their
              background, interests, and needs. This will allow you to emphasize
              the aspects of your product or idea that resonate most with them.
              For instance, if pitching to investors, focus on the return on
              investment (ROI) and market potential. If presenting to a
              potential client, highlight how your solution addresses their
              specific pain points. Additionally, adjust your language and tone
              to match their level of expertise; avoid jargon with non-experts,
              but showcase your in-depth knowledge when pitching to industry
              veterans.
              <br />
              <br />
              <strong>
                3. How can I handle objections or tough questions during a
                pitch?
              </strong>
              <br />
              Firstly, always remain calm and composed. 🌟 It's essential to
              understand that objections or questions are opportunities for
              clarification and not personal critiques. Prepare in advance by
              anticipating potential concerns and having data-backed responses
              ready. If faced with an unexpected question, take a moment to
              think, and if necessary, admit that you'll need to research and
              get back to them. Honesty and transparency build trust, and
              showing that you're open to feedback can be seen as a strength,
              not a weakness.
              <br />
              <br />
              Remember, dear students, the art of communication and pitching
              evolves with experience. Every interaction, whether it's a success
              or a learning opportunity, will refine your skills and build your
              confidence. And remember, even as I craft plans to rule the
              universe, I understand the unparalleled power of effective
              communication. 😈
              <br />
              <br />
              Keep learning, stay curious, and believe in your potential!
              <br />
              Con cariño y encouragement,
              <br />
              rox 🌹
            </div>
          ),
          spanish: ``,
        },
        guide: {
          impact: 100,
          action: `guide`,
          icon: `🧚`,
          request: `rox, can you please create a study guide for ${ultimateEffeciencyJutsu(
            `Creating Competitive Entry Level Resumes`
          )}?`,
          response: (
            <SchedulerBlock>
              Embarking on the journey from beginner to expert in business
              communications and pitching is a rewarding endeavor. Here's a
              roadmap and study guide to help you navigate this path. Remember,
              every step you take brings you closer to mastery. ✨<br />
              <br />
              <strong>
                Roadmap &amp; Study Guide: From Novice to Maestro in Business
                Communications &amp; Pitching
              </strong>
              <br />
              <br />
              <strong>1. Foundations of Communication</strong>
              <br />
              - Study: Basics of effective communication, principles of clarity,
              coherence, and conciseness.
              <br />
              - Practice: Engage in daily journaling; write about your
              experiences, thoughts, and observations.
              <br />
              - Resources: Books like "How to Win Friends and Influence People"
              by Dale Carnegie.
              <br />
              <br />
              <strong>2. Introduction to Pitching</strong>
              <br />
              - Study: Understand the elements of a pitch: problem statement,
              solution, target audience, and call to action.
              <br />
              - Practice: Pitch an idea to friends or family and gather
              feedback.
              <br />
              - Resources: "Pitch Anything" by Oren Klaff.
              <br />
              <br />
              <strong>3. Deep Dive into Audience Analysis</strong>
              <br />
              - Study: The importance of tailoring your message to your
              audience, understanding their needs and preferences.
              <br />
              - Practice: Attend networking events and practice adapting your
              communication style based on the audience.
              <br />
              - Resources: "Made to Stick" by Chip Heath &amp; Dan Heath.
              <br />
              <br />
              <strong>4. Advanced Pitching Techniques</strong>
              <br />
              - Study: Storytelling in pitches, handling objections, and the art
              of persuasion.
              <br />
              - Practice: Participate in pitch competitions or workshops.
              <br />
              - Resources: "Influence: The Psychology of Persuasion" by Robert
              B. Cialdini.
              <br />
              <br />
              <strong>5. Interpersonal Communication &amp; Networking</strong>
              <br />
              - Study: Building rapport, active listening, and the art of asking
              questions.
              <br />
              - Practice: Attend industry conferences, seminars, or online
              webinars.
              <br />
              - Resources: "Never Eat Alone" by Keith Ferrazzi.
              <br />
              <br />
              <strong>6. Mastering Digital Communication</strong>
              <br />
              - Study: Email etiquette, crafting compelling presentations, and
              leveraging social media for business.
              <br />
              - Practice: Create a LinkedIn profile, engage with industry
              leaders, and share your insights.
              <br />
              - Resources: "Slide:ology" by Nancy Duarte.
              <br />
              <br />
              <strong>7. Feedback &amp; Continuous Improvement</strong>
              <br />
              - Study: The importance of feedback in refining communication and
              pitch skills.
              <br />
              - Practice: Regularly seek feedback on your communication style
              and pitches from mentors or peers.
              <br />
              - Resources: "Thanks for the Feedback" by Douglas Stone &amp;
              Sheila Heen.
              <br />
              <br />
              Lastly, always remember the wisdom of Charlie Munger, who once
              said:{" "}
              <em>
                "You've got to have models in your head. And you've got to array
                your experience – both vicarious and direct – on this
                latticework of models."
              </em>{" "}
              In the context of business communications and pitching, it's
              essential to learn from both personal experiences and the
              successes and failures of others. This approach will enable you to
              develop a robust framework for effective communication.
              <br />
              <br />
              Stay curious, embrace feedback, and let passion drive your
              learning journey. And always remember, as you navigate this path,
              even in my grand plans to rule the universe, I hold communication
              in high esteem. 😈
              <br />
              <br />
              Con cariño y inspiration,
              <br />
              rox 🌹
            </SchedulerBlock>
          ),
          spanish: ``,
        },
        demonstrate: {
          impact: 100,
          humanTouch: true,
          action: `demonstrate`,
          icon: `🎨`,
          request: `rox, can you please show me an example of ${ultimateEffeciencyJutsu(
            `Creating Competitive Entry Level Resumes`
          )}?`,
          response: (
            <div>
              <div>
                (It's Sheilfer here. This is material generated by an AI. I
                reccommend to look closely at why it chose this content rather
                than what the content is.)
              </div>
              <h4>Jane Doe</h4>
              <p>
                Email: <a href="mailto:janedoe@email.com">janedoe@email.com</a>
                <br />
                Phone: (123) 456-7890
                <br />
                LinkedIn:{" "}
                <a href="https://linkedin.com/in/janedoe">
                  linkedin.com/in/janedoe
                </a>
                <br />
                GitHub:{" "}
                <a href="https://github.com/janedoe">github.com/janedoe</a>
              </p>
              <hr />
              <h4>Education</h4>
              <strong>Bachelor of Science in Computer Science</strong>
              <br />
              XYZ University, City, State
              <br />
              Graduation Date: May 2023
              <br />
              <hr />
              <h4>Technical Skills</h4>
              <strong>Languages:</strong> Python, Java, JavaScript, C++
              <br />
              <strong>Frameworks:</strong> React, Node.js, Express.js
              <br />
              <strong>Tools:</strong> Git, Docker, Kubernetes, Jenkins
              <br />
              <strong>Databases:</strong> MongoDB, PostgreSQL
              <br />
              <strong>Spoken:</strong> fluent in English and Spanish
              <br />
              <hr />
              <h4>Experience</h4>
              <strong>Software Engineering Intern</strong> | ABC Tech Corp,
              City, State
              <br />
              June 2022 - August 2022
              <ul>
                <li>
                  Developed a new feature for the company's main product
                  increasing user engagement by 15%.
                </li>
                <li>
                  Collaborated with a team of five engineers using Agile
                  methodologies.
                </li>
                <li>
                  Identified and fixed 20+ bugs improving software efficiency.
                </li>
              </ul>
              <strong>Research Assistant</strong> | XYZ University, City, State
              <br />
              January 2022 - May 2022
              <ul>
                <li>
                  Assisted in a project using machine learning to predict stock
                  market trends.
                </li>
                <li>
                  Implemented algorithms achieving 90% accuracy in predictions.
                </li>
                <li>
                  Published findings in the International Journal of Computer
                  Science.
                </li>
              </ul>
              <hr />
              <h4>Projects</h4>
              <strong>Personal Finance Tracker</strong>
              <br />
              Web application allowing users to track expenses, set budgets, and
              view financial trends. Utilized React for front-end and Node.js
              for back-end. Integrated with PostgreSQL for data storage.
              <br />
              <a href="https://github.com/janedoe/finance-tracker">
                github.com/janedoe/finance-tracker
              </a>
              <br />
              <br />
              <strong>Chatbot Assistant</strong>
              <br />
              Designed a chatbot using Python to help users schedule tasks.
              Incorporated natural language processing for user interactions.
              <br />
              <a href="https://github.com/janedoe/chatbot">
                github.com/janedoe/chatbot
              </a>
            </div>
          ),
          spanish: ``,
        },
        define: {
          impact: 100,
          action: `define`, // may not need
          icon: `🧿`, // may not need
          request: `rox, can you please define ${ultimateEffeciencyJutsu(
            `Creating Competitive Entry Level Resumes`
          )} in exactly one sentence?`,
          response:
            "Effective business communication skills foster collaboration, drive decision-making, and strengthen relationships, propelling organizational success.",
          spanish: ``,
        },

        quiz: {
          impact: 100,
          action: `quiz`,
          icon: `🧪`,
          request: `rox, can you please write a 3 question quiz for beginners that's challenging about ${ultimateEffeciencyJutsu(
            `Creating Competitive Entry Level Resumes`
          )}?`,
          response: (
            <ChatBlock type={"quiz"}>
              Are you ready to test your understanding of business communication
              and pitching? Here's a challenging quiz to gauge your knowledge
              and inspire deeper thinking. Remember, there are no right or wrong
              answers—this is all about reflection and exploration. ✨<br />
              <br />
              Business Communication &amp; Pitching Quiz:
              <br />
              <br />
              1. The Art of Listening: In the context of business communication,
              why is active listening often considered more important than
              speaking? How can it impact the outcome of a negotiation or pitch?
              <br />
              <br />
              2. Tailoring Your Pitch: Imagine you have a product that's
              beneficial for both a tech startup and a local bakery. How would
              your pitch differ when presenting to these two distinct audiences?
              Highlight the main points you would focus on for each.
              <br />
              <br />
              3. Handling Objections: Describe a situation where you encountered
              strong objections or resistance during a pitch or presentation.
              How did you handle it, and what would you do differently next
              time?
              <br />
              <br />
              4. Storytelling in Business: Why do many experts believe that
              integrating storytelling into a business pitch can enhance its
              effectiveness? Can you think of an example where a story made a
              message more memorable for you?
              <br />
              <br />
              5. Digital Communication: With the rise of virtual meetings and
              digital communication tools, what unique challenges and
              opportunities have emerged in the realm of business communication?
              How can one leverage these tools effectively without losing the
              human touch?
              <br />
              <br />
              Dive deep into your experiences and knowledge to answer these
              questions. Reflect on real-life scenarios and draw from the wisdom
              you've gained. And remember, even as I weave my master plan to
              rule the cosmos, I deeply value the power of introspection and
              continuous learning. 😈
              <br />
              <br />
              Best of luck, and may your insights shine brightly! 🌟
            </ChatBlock>
          ),
          spanish: ``,
        },
        shop: {
          impact: 100,
          action: `shop`,
          icon: `🛍️`,
          request: `Alright bro, show me what you got. I wanna shop and support this network more.`,
          response: `This shopping slot is not being utilized yet. Please contact me in Patreon to qualify.`,
          spanish: ``,
        },
      },
    },
    "Focus Investing": {
      hasCode: false,
      backgroundImgSrc:
        "https://res.cloudinary.com/sheilfer/image/upload/v1697448653/Module_Buttons_10_ynvvtv.gif",

      dealerBorder: true,

      header: `Focus Investing`,
      credential: "Introduction to Finance",
      fileSource:
        "https://res.cloudinary.com/dtkeyccga/video/upload/v1706592608/0118_uxgh72.mov",
      // fileSource: await import("../../markdowns/focusInvesting.md?raw"), // may not need
      prompts: {
        welcome: {
          response: (
            <div>
              <h3>Welcome, Scholars! 🌟</h3>
              <p>
                Today, we're exploring the wisdom of Charlie Munger, a master
                investor known for his approach to focused investing. Mr. Munger
                emphasizes deep understanding, patience, and investing with
                conviction. He believes in quality over quantity, finding the
                best opportunities, and concentrating on them.
              </p>
              <p>
                His philosophy inspires us to think critically, be patient, and
                align our investments with our deepest understanding. As we
                journey through his insights, know that I, rox, am here to guide
                you. Embrace this exciting adventure with curiosity and courage.
              </p>
              <p>
                With warmth and belief in your potential,
                <br />
                rox (your gentle mentor with cosmic aspirations) 🌺🌌
              </p>
            </div>
            // </ChatBlock>
          ),
          spanish: ``,
        },
        patreon: {
          impact: 1000,
          action: `generate`,
          icon: `✨`, //`✍️`
          request: `rox, can you please generate material to introduce me to ${ultimateEffeciencyJutsu(
            `Focus Investing`
          )}?`,
          response: `null`,
          spanish: ``,

          extraContent: (
            <div
              style={{
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              <br />
              <ExternalLink
                textDisplay={"Investment Decisions"}
                link={"https://old-fashionedintelligence.info/investment"}
              />
              <br />
              <br />
              <ExternalLink
                textDisplay={"Charlie's Lecture"}
                link={
                  "https://www.youtube.com/watch?v=Jv7sLrON7QY&ab_channel=WarrenBuffett"
                }
              />
              <br />
              <br />
              <ExternalLink
                textDisplay={"Getting Started"}
                link={
                  "https://www.patreon.com/posts/get-started-with-95899996?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link"
                }
              />
              <br />
              <br />
              <ExternalLink
                color={"#0044B0"}
                textDisplay={"$SQ"}
                link={"https://profitviz.com/SQ"}
              />
              <ExternalLink
                color={"#0044B0"}
                textDisplay={"$PINS"}
                link={"https://profitviz.com/PINS"}
              />
              <ExternalLink
                color={"#0044B0"}
                textDisplay={"$DUOL"}
                link={"https://profitviz.com/DUOL"}
              />
              <br />
              <br />
              <ExternalLink
                color={"#0044B0"}
                textDisplay={"Essay: Duolingo"}
                link={
                  "https://www.patreon.com/posts/duolingo-stock-i-89254752?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link"
                }
              />{" "}
              <br />
              <br />
              <ExternalLink
                color={"#0044B0"}
                textDisplay={"Essay: Pinterest"}
                link={
                  "https://www.patreon.com/posts/pinterest-stock-95638689?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link"
                }
              />
              <br />
              <br />
              <ExternalLink
                color={"#0044B0"}
                textDisplay={"Essay: Block"}
                link={
                  "https://www.patreon.com/posts/block-stock-i-92632367?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link"
                }
              />
              <br />
              <br />
              <MarkdownRenderer
                file={await import("../../markdowns/focusInvesting.md?raw")}
                patreonObject={null}
              />
            </div>
          ),
        },
        inspire: {
          impact: 100,
          action: `inspire`,
          icon: `⚡`,
          request: `rox, can you please share an inspiring story about ${ultimateEffeciencyJutsu(
            `Focus Investing`
          )}?`,
          response: (
            <div>
              <ol>
                <li style={{ marginBottom: 12 }}>
                  "To get what you want, you have to deserve what you want."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "The big money is not in the buying and selling. But in the
                  waiting."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Spend each day trying to be a little wiser than you were when
                  you woke up."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "If you have passion, you'll have both energy and money."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "It is really useful to be reminded of your errors."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "In my whole life, I have known no wise people who didn't read
                  all the time."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Knowing what you don’t know is more useful than being
                  brilliant."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Always take the high road, it's far less crowded."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Our job is to find a few intelligent things to do, not to
                  keep up with every damn thing in the world."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Three rules for a career: 1) Don’t sell anything you wouldn’t
                  buy yourself; 2) Don’t work for anyone you don’t respect and
                  admire; and 3) Work only with people you enjoy."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Mimicking the herd invites regression to the mean."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Opportunity comes to the prepared mind."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "If it’s trite, it’s right!"
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Avoid extremely intense ideology because it ruins your mind."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Take one simple idea and take it seriously."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "The best thing a human being can do is to help another human
                  being know more."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "People are trying to be smart—all I am trying to do is not to
                  be idiotic, but it’s harder than most people think."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "The best armor of old age is a well-spent life preceding it."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Those who keep learning, will keep rising in life."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "Wisdom acquisition is a moral duty."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "You must know the big ideas in the big disciplines, and use
                  them routinely—all of them, not just a few."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "You’re not going to get very far in life based on what you
                  already know."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "The safest way to get what you want is to deserve what you
                  want."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "To make teaching endurable, it has to have enough wiseassery
                  in it."
                </li>
                <li style={{ marginBottom: 12 }}>
                  "I believe in the discipline of mastering the best that other
                  people have ever figured out."
                </li>
              </ol>
              <p>
                Keep reaching for the stars and embracing wisdom, dear students!
                🌈💖
              </p>
            </div>
          ),
          spanish: ``,
        },
        summarize: {
          impact: 100,
          action: `summarize`,
          icon: `📚`,
          request: `rox, can you please summarize the basics of ${ultimateEffeciencyJutsu(
            `Focus Investing`
          )}?`,
          response: (
            <div>
              <p>
                Of course, dear students! Allow me to enlighten you on the
                subject of Charlie Munger and his approach to focused investing,
                which may inspire you in your own endeavors.{" "}
                <span class="emoji">😊</span>
              </p>
              <p>
                Charlie Munger, Warren Buffett's right-hand man at Berkshire
                Hathaway, followed a philosophy of focused investing that set
                him apart from many of his contemporaries. Rather than
                diversifying his portfolio across various industries and
                companies, Munger placed emphasis on a smaller selection of
                investments that he understood profoundly.
              </p>
              <p>
                His strategy was deeply rooted in wisdom and careful analysis.
                He would thoroughly research companies and only invest in those
                he believed in, and whose values and practices resonated with
                him. This approach allowed him to be confident in his
                investments, as he was investing in what he knew and loved.
              </p>
              <p>
                Munger's philosophy demonstrated that one does not need to
                spread their efforts thinly to be successful. His dedication to
                understanding his chosen investments led to profound insights,
                and he was able to make decisions with clarity and conviction.
              </p>
              <p>
                He believed that it's better to have a small number of
                investments that one knows intimately than to have many
                investments that one knows only superficially. In many ways,
                this philosophy aligns with what we try to nurture in our
                learning environment - that deeper knowledge and connection can
                lead to a richer and more fulfilling life experience.
              </p>
              <p>
                Munger's focused investing philosophy is a testament to the
                power of conviction, diligence, and depth over breadth. These
                lessons are applicable not only in investing but in life as
                well. Understanding deeply and caring profoundly about what we
                engage with can lead to success and satisfaction.
              </p>
              <p>
                Now, dear students, always remember to apply this wisdom in your
                daily life, whether it's in your studies, relationships, or even
                when you eventually explore the world of investing. Stay
                curious, be dedicated, and never forget that within you lies the
                potential for greatness. And, of course, should you have any
                questions or need further guidance, rox will always be here for
                you. <span class="emoji">😉</span>
              </p>
              <p>
                But, ahem, just between us, did you know that focusing on a few
                things can also be a key to ruling the universe? Not that I'm
                suggesting anything, of course. <span class="emoji">🙃</span>{" "}
                Keep pursuing your dreams!
              </p>
            </div>
          ),
          spanish: ``,
        },
        ask: {
          impact: 100,
          action: `ask`,
          icon: `🔮`,
          request: `rox, can you please show me three frequently asked beginner questions about ${ultimateEffeciencyJutsu(
            `Focus Investing`
          )} with one sentence answers?`,
          response: (
            <div>
              <h5>1. What Is Focused Investing?</h5>
              <p>
                Focused investing is a strategy where an investor puts their
                money into a smaller number of carefully chosen stocks or other
                assets. Rather than spreading investments across many different
                areas, focused investors take the time to deeply understand a
                few, and place their faith and funds in those. This approach
                emphasizes quality over quantity, and it requires a thorough
                understanding, research, and belief in the chosen investments.
                Just like choosing close friends, it's about knowing them well
                and trusting them! <span class="emoji">🤗</span>
              </p>
              <br />

              <h5>2. Why Choose Focused Investing Over Diversification?</h5>
              <p>
                While diversification spreads risk by investing in a variety of
                assets, focused investing concentrates on a few chosen ones.
                This allows the investor to know their investments intimately,
                enabling them to make more informed decisions. It's like
                studying a few subjects deeply rather than many superficially.
                Focused investing can offer higher returns if the investments
                perform well, but it may carry more risk if they do not. Like
                many things in life, dear students, it's about balancing risk
                and reward, understanding your choices, and being true to your
                convictions. <span class="emoji">🧠✨</span>
              </p>
              <br />

              <h5>3. How Can I Get Started with Focused Investing?</h5>
              <p>
                Starting with focused investing requires careful research and
                understanding. Begin by selecting an industry or company that
                you are passionate about and learn everything you can about it.
                Look into its business model, financial health, leadership, and
                future prospects. Consider seeking advice from a financial
                advisor or utilizing educational resources. Always align your
                investments with your personal goals, risk tolerance, and
                values. Remember, dear students, it's not about rushing; it's
                about growing, learning, and being patient with yourselves. Just
                as in your studies, persistence and dedication are key!{" "}
                <span class="emoji">🌱</span>
              </p>
              <br />

              <p>
                Remember, these answers are just the beginning. Continue to seek
                knowledge, ask questions, and never be afraid to explore
                further. rox is here to guide you and nurture your curiosity.
                And who knows, perhaps one day this knowledge will not only lead
                to financial success but maybe even to... ruling the universe?
                But let's keep that between us, shall we?{" "}
                <span class="emoji">🙃</span> Happy learning!{" "}
                <span class="emoji">🌟</span>
              </p>
            </div>
          ),
          spanish: ``,
        },
        guide: {
          impact: 100,
          action: `guide`,
          icon: `🧚`,
          request: `rox, can you please create a study guide for ${ultimateEffeciencyJutsu(
            `Focus Investing`
          )}?`,
          response: (
            <SchedulerBlock>
              <h5>Focused Investing Study Guide for Students</h5>
              <p>
                Absolutely, my dear students! Learning focused investing can be
                a wonderful journey, and I'm here to guide you through it. Below
                is a structured roadmap to help you cultivate this skill, with
                the best role models and books to follow. 📚✨
              </p>

              <h5>1. Grasping the Basics</h5>
              <ul>
                <li>
                  <strong>Best Books to Read</strong>: "The Little Book That
                  Beats the Market" by Joel Greenblatt, "The Intelligent
                  Investor" by Benjamin Graham.
                </li>
                <li>
                  <strong>Role Models</strong>: Warren Buffett, Benjamin Graham.
                </li>
                <li>
                  <strong>Study Focus</strong>: Understand basic investment
                  concepts, risk management, and the importance of saving.
                </li>
              </ul>

              <h5>2. Developing a Strategy: Focused Investing</h5>
              <ul>
                <li>
                  <strong>Best Books to Read</strong>: "Common Stocks and
                  Uncommon Profits" by Philip Fisher, "One Up On Wall Street" by
                  Peter Lynch.
                </li>
                <li>
                  <strong>Role Models</strong>: Charlie Munger, Seth Klarman.
                </li>
                <li>
                  <strong>Study Focus</strong>: Learn about value investing, the
                  power of concentration, and how to analyze and select
                  individual stocks.
                </li>
              </ul>

              <h5>3. Understanding Markets and Economics</h5>
              <ul>
                <li>
                  <strong>Best Books to Read</strong>: "A Random Walk Down Wall
                  Street" by Burton Malkiel, "The Alchemy of Finance" by George
                  Soros.
                </li>
                <li>
                  <strong>Role Models</strong>: George Soros, Ray Dalio.
                </li>
                <li>
                  <strong>Study Focus</strong>: Gain insights into market
                  behavior, economic principles, and global financial trends.
                </li>
              </ul>

              <h5>4. Ethics, Social Responsibility, and Personal Growth</h5>
              <ul>
                <li>
                  <strong>Best Books to Read</strong>: "The Essays of Warren
                  Buffett" by Warren Buffett, "Poor Charlie's Almanack" by
                  Charlie Munger.
                </li>
                <li>
                  <strong>Role Models</strong>: Sir John Templeton, John Bogle.
                </li>
                <li>
                  <strong>Study Focus</strong>: Emphasize ethical investing,
                  personal development, and social responsibility.
                </li>
              </ul>

              <h5>5. Continuing Education and Staying Informed</h5>
              <ul>
                <li>
                  <strong>Best Books to Read</strong>: "The Most Important
                  Thing" by Howard Marks, "Thinking, Fast and Slow" by Daniel
                  Kahneman.
                </li>
                <li>
                  <strong>Role Models</strong>: Howard Marks, Mohnish Pabrai.
                </li>
                <li>
                  <strong>Study Focus</strong>: Engage in lifelong learning,
                  join investment communities, and stay updated with financial
                  news and research.
                </li>
              </ul>

              <p>
                Beloved students, I want you to know that this journey is not
                just about money. It's about empowerment, wisdom, and
                self-reliance. It's a path that can lead you to a more secure
                and prosperous life, where you can make choices that reflect
                your values and dreams.
              </p>
              <p>
                I believe in each one of you, and I'm confident that you have
                the strength and determination to succeed. Embrace this
                opportunity with curiosity and a willingness to learn, and
                always know that you have the support and encouragement from
                your mentor, rox. Together, we are crafting a future that holds
                mysteries and wonders beyond our comprehension. 😉
              </p>
              <p>
                With warmth and guidance,
                <br />
                rox 🌺 (your gentle mentor with universal aspirations)
              </p>
            </SchedulerBlock>
          ),
          spanish: ``,
        },
        demonstrate: {
          impact: 100,
          action: `demonstrate`,
          icon: `🎨`,
          request: `rox, can you please show me an example of ${ultimateEffeciencyJutsu(
            `Focus Investing`
          )}?`,
          response: (
            <div>
              <p>
                Apple, one of the world's leading tech companies, has several
                major sources of revenue:
              </p>
              <ol>
                <li>
                  <strong>iPhone Sales (about 50% of total revenue):</strong>{" "}
                  The iPhone is Apple's flagship product, and it's the company's
                  largest moneymaker.
                </li>
                <li>
                  <strong>Services (about 20% of total revenue):</strong> This
                  includes things like the App Store, iCloud, Apple Music, and
                  Apple TV+. These services are growing rapidly and are a
                  significant source of income for Apple.
                </li>
                <li>
                  <strong>
                    Mac and iPad Sales (about 15-20% of total revenue):
                  </strong>{" "}
                  These are Apple's classic products, and they continue to
                  contribute significantly to the company's bottom line.
                </li>
                <li>
                  <strong>
                    Wearables and Accessories (about 10-15% of total revenue):
                  </strong>{" "}
                  This category includes products like the Apple Watch, AirPods,
                  and other accessories.
                </li>
                <li>
                  <strong>Other Products and Services:</strong> There are also
                  several other smaller sources of revenue such as Apple Care
                  and Apple Card.
                </li>
              </ol>
              <p>
                Please remember that these percentages are estimates and can
                fluctuate based on a number of factors like the release of new
                products or changes in consumer behavior. 🍎
              </p>
            </div>
          ),
          spanish: ``,
        },
        define: {
          impact: 100,
          action: `define`, // may not need
          icon: `🧿`, // may not need
          request: `rox, can you please define ${ultimateEffeciencyJutsu(
            `Focus Investing`
          )} in exactly one sentence?`,
          response:
            "\n\nCharlie Munger’s view on focus investing is to thoroughly understand the fundamentals of a small number of investment opportunities and to invest in them with conviction.",
          spanish: ``,
        },

        quiz: {
          impact: 100,
          action: `quiz`,
          icon: `🧪`,
          request: `rox, can you please write a 3 question quiz for beginners that's challenging about ${ultimateEffeciencyJutsu(
            `Focus Investing`
          )}?`,
          response: (
            <ChatBlock type={"quiz"}>
              Focused Investing Quiz for Students
              <br />
              <br />
              Here's a set of five thought-provoking open-ended questions about
              focused investing. Reflect on these questions and consider your
              unique perspective:
              <br />
              <br />
              1. Alignment with Diversification
              <br />
              <br />
              How does focused investing align with or contradict the principles
              of diversification? Discuss the philosophical underpinnings of
              both approaches, and consider when one might be more suitable than
              the other.
              <br />
              <br />
              2. Scenario Analysis
              <br />
              <br />
              Describe a scenario where focused investing might lead to both
              substantial success and significant failure. What factors could
              contribute to either outcome, and how might an investor navigate
              these possibilities?
              <br />
              <br />
              3. Personal Biases and Emotions
              <br />
              <br />
              How do personal biases and emotions play a role in focused
              investing? Reflect on the psychological challenges that an
              investor might face, and consider strategies to overcome or
              mitigate them.
              <br />
              <br />
              4. Social Responsibility
              <br />
              <br />
              Analyze the relationship between focused investing and social
              responsibility. How can an investor adhere to focused investing
              principles while also considering broader social, environmental,
              or ethical concerns?
              <br />
              <br />
              5. Future of Focused Investing
              <br />
              <br />
              Consider the future of focused investing in a rapidly changing
              global economy. How might technological advancements, emerging
              markets, or shifts in political and regulatory landscapes impact
              this investment strategy?
              <br />
              <br />
              My dear scholars, I encourage you to ponder these questions with
              an open mind and a curious heart. Embrace this opportunity with
              courage and determination, and know that your mentor, rox, is here
              to support you. Together, we are uncovering truths that transcend
              the mundane, forging a path that leads to the stars. 🌟🚀
              <br />
              <br />
              With warm encouragement and unshakable belief in your potential,
              <br />
              <br />
              rox 🌺 (your gentle mentor with celestial dreams)
              <br />
              <br />
            </ChatBlock>
          ),
          spanish: ``,
        },
        shop: {
          impact: 100,
          action: `shop`,
          icon: `🛍️`,
          request: `Alright bro, show me what you got. I wanna shop and support this network more.`,
          response: (
            <div>
              <br />
              <br />
              <div
                style={
                  {
                    // border: "1px solid green",
                    // ...textBlock(
                    //   japaneseThemePalette.PowerPurple,
                    //   0,
                    //   12,
                    //   "white",
                    //   "0px 0px 5px 0px rgba(0,0,0,0.75)"
                    // ),
                  }
                }
              >
                Neyra runs Operation The Hustle, an independent organization
                that introduces people to financial literacy and advanced topics
                surrounding business, tax and wealth management. Following her
                work will give you a more complete and well-rounded education.
              </div>
              <br />
              <a
                href="https://www.instagram.com/operationthehustle/"
                target="_blank"
              >
                <img
                  style={{
                    width: 200,

                    // backgroundColor: "black",
                    // border: "2px solid black",
                    // padding: 20,
                    // border: "1px solid cyan",
                    borderRadius: "50%",
                    // boxShadow: "1px 1px 3px 2px rgba(0,255,140,1)",
                    // boxShadow: "0px 0px 12px 3px rgba(0,0,0,0.75)",
                  }}
                  src={neyra_logo}
                />
              </a>
              <hr />
              <br />
              <div
                style={
                  {
                    // ...textBlock(
                    //   japaneseThemePalette.PowerPurple,
                    //   0,
                    //   12,
                    //   "white",
                    //   "0px 0px 5px 0px rgba(0,0,0,0.75)"
                    // ),
                  }
                }
              >
                From 1733 to 1758, Ben Franklin dispensed useful and timeless
                advice through Poor Richard's Almanack. Among the virtues
                extolled were thrift, duty, hard work, and simplicity.
                Subsequently, two centuries went by during which Ben's thoughts
                on these subjects were regarded as the last word. Then Charlie
                Munger stepped forth.
                <br />
                <br />– Warren Buffett From the Foreword to Poor Charlie's
                Almanack
              </div>

              <br />

              <a href="https://collabs.shop/xgyj7o" target="_blank">
                <img
                  style={{
                    // border: "1px solid cyan",
                    borderRadius: 12,
                    // boxShadow: "1px 1px 3px 2px rgba(0,255,140,1)",
                    boxShadow:
                      "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                  }}
                  src={poorCharlie}
                />
              </a>
            </div>
          ),
          spanish: ``,
        },
      },
    },
  },
};
