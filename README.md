# sucss.org
Aims:
- Make events dynamic
- Update events without requiring redeployment
- Open to any more suggestions

## 👾 Technologies used
- React
- Tailwind
- Flask

## 💻 Usage 

Clone the project and install depedencies (flask-cors only for development)
```bash
git clone https://github.com/danhoangg/sucss-website.git
cd frontend/sucss
npm install
cd ../../backend
pip install flask, flask-cors, waitress, flask_jwt_extended, dotenv
```
### Development
Start the flask server (run app with debug=True with flask)
```bash
cd backend
python app.py
```
Start the react development server
```bash
cd frontend/sucss
npm run start
```
### Production
Build the react app
```bash
cd frontend/sucss
npm run build
```
Start the flask server served with waitress
```bash
cd backend
python app.py
```

## ✏️ Adding, modifying and deleting events

### User interface
We have a new and improved /admin route 😮\
Login with the username and password to get a table of all the events
![image](https://github.com/danhoangg/sucss-website/assets/107479212/7a13fd0d-474a-4339-ab11-7a36627c1e0f)
Edit and create events
![image](https://github.com/danhoangg/sucss-website/assets/107479212/f7f43a9c-4df6-4b8a-bbfe-2d53b43dc982)

### Behind the scenes
**Liable to change**\
Stored in json file in `backend/events.json`\
Currently the objects inside are stored in this format:
```
[
  {
    id - int,
    name - string,
    isLink - boolean,
    date - string: format yyyy-mm-dd,
    year - string: format yy-yy,
    path - string,
    html - string
  },
  ...
]
```
For events that **don't** have pages linked to them:
```
---
id     # Unique auto incremental identifier
name   # Title of the event e.g. "Christmas Challenge"
isLink # Boolean indicating whether event links to a page or not
date   # The date of the event e.g. "2024-05-15"
year   # The academic year this event takes/took place e.g. "23-24"
---
```
For events that **do** have pages linked to them
```
---
path # The website path that the event should link to e.g. "christmas" links to /events/year/christmas
html # The html that should be displayed on the page that is linked to that path e.g. The challenge title, description, etc.
---
```
**Example events.json:**
```json
[
    {
        "id": 1,
        "name": "Lock Picking - Cancelled",
        "isLink": false,
        "date": "2024-05-22",
        "year": "23-24"
    },
    {
        "id": 2,
        "name":"WithSecure Guest Talk, Part 2",
        "isLink": true,
        "date": "2024-05-15",
        "year": "23-24",
        "path": "howtotalkpt2",
        "html": "23-24-howtotalkpt2.html"
    }
]
```

All html files that contain descriptions of the events should be kept in `backend/html/`

**Example html file**
```html
<!-- 23-24-howtotalkpt2.html -->
<main><section><h1>WithSecure Guest Talk, Part 2</h1>
    <p><strong>Date</strong>: 2024-05-15</p>
    <p><strong>Difficulty</strong>: Beginner to Advanced</p>
    <p><strong>Delivered By</strong>: WithSecure</p>
    <h2>Overview</h2>
    <p>This week we have a continuation of the talk two weeks ago from our sponsor, WithSecure!</p>
    <p>This talk will be a short session on how to deliver talks, and brainstorming ideas for talks.</p>
    <p>This is part of a collaboration with WithSecure, where you will receive expert training and coaching in conference-speaking, with the aim of submitting talks to the renowned cyber security conference BSides London!</p>
    <p>BSides London has speakers of all levels of experience, and we have already seen conference-worthy talks at our Member Talks session in December, so we highly encourage you to get involved with this opportunity. There is, however, no obligation to submit any conference talks - please just come along if you're interested!</p>
    <p>If you have talk ideas (no matter if they're in larval stages or already well developed) WithSecure is more than happy to help you workshop them.
    If you did a member talk early in the year, it's probably a conference talk waiting to happen!</p>
    <p><a href="https://go.sucss.org/talks24">Sign up for the mentorship!</a></p>
    </section>
</main>
```

Website will dynamically reflect what is written in the json and html files, as soon as json files are changed, website changes\
Currently the only way of modifying/adding/deleting events is through the json, will make it more user friendly in the near future

## 📁 Current file structure

```
backend/
├── html  # Holds all the html files
│   ├── events  # All event htmls
│   │   ├── event-description.html
│   │   └── event-description2.html
│   └── docs  # all docs htmls
│       ├── docs1.html
│       └── docs2.html
├── app.py
└── events.json

frontend/sucss/
├── public # Folder with resources that can be seen by public
│   ├── images 
│   │   ├── sucss-logo.png
│   │   └── with-secure-white.png
│   ├── index.html
│   └── robots.txt
├── src
│   ├── components  # Reusable sections of the website e.g.
│   │   ├── Copyright.js
│   │   └── Navbar.js
│   ├── functions  # Useful functions                            
│   │   └── convertDateToAcademicYear.js
│   ├── pages  # The website pages e.g.
│   │   ├── Events.js
│   │   ├── EventPage.js
│   │   └── HomePage.js 
│   ├── svgs  # Svgs used, e.g.
│   │   ├── twitter.svg
│   │   └── discord.svg
│   ├── App.js  # Main react js file, contains routing
│   ├── custom-style.css  # Styling to keep event description pages consistent
│   ├── index.css  # General styles, only contains tailwind as of now
│   └── index.js
├── package-lock.json
├── package.json
├── postcss.config.json
└── tailwind.config.js  # Tailwind's config file
```

## 🗒️ TODO list
🎉🎉🎉🎉 NOTHING 🎉🎉🎉🎉

## 😎 Completed
- Home page
- Events page
- Event description pages
- Events and event descriptions are dynamically generated without need for redeployment
- About page
- Docs page
- Scraped all the events from the other website onto this one
- Make adding, removing and editing events more user friendly
