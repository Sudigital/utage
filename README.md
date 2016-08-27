# Utage

### What is this app?

Event / Party Planning app that is installable and accesible, with offline usability.

![Screenshot](/scrn.png)

### Key Features
- facebok login
- Responsive design / Cross platform
- Installable on Mobile Devices
- Offline first. App works in bad internet connection or offline
- Accessibility (Visuality impaired, Screen reader, Keyboard only navigation, Color blindness friendly)
- Using Geolocation API to calculate the distance to the event location
- Account / Setting Page (Notification enable/disable, Userinfo, etc)
- Push Notification / Web Notification API on newly available event
### In Future
- Conversation / Comments section in Single Event Page
- Testing
- Better icons, photos, etc

### How to run locally
```
git clone git@github.com:yhagio/utage.git
cd utage
npm install
npm run prod
npm run prod:run
```
Go to `http://localhost:8080/`

### For development (No support for service worker/offline)
```
npm run start
```

### Tech Stack & Tools
- Firebase (database, deployment)
- Facebook login
- React.js + React-Router + Immutable.js (UI)
- Redux (state management)
- SW-Precache + SW-Toolbox (Offline feature)
- Webpack (Module bundling, development)

### Checklist
- [X] Google Map
- [X] Responsive design
- [X] Facebook login
- [X] Keyboard only navigation
- [X] Color blindness friendly
- [X] Screen reader friendly
- [X] Offline capability in production
- [X] Optimize images (Minimize, Resize, Compress, Responsieve)
- [X] Production ready
- [X] Deployment on Firebase
- [X] Use Immutable.js for states
- [X] Experimental Web Notifications on new event creation

## Resources

**GoogleMap**
- [react-google-maps library](https://github.com/tomchentw/react-google-maps)

**Offline**
- [Google: Service Worker Libraries SW-Precache/Toolbox](https://developers.google.com/web/tools/service-worker-libraries/?hl=en)
- [Blog: Improve (offline) user experience with Service Worker Toolbox](https://duske.me/improve-user-experience-with-service-worker-toolbox/)

**Accessibility**
- [Accessibility Developer Tools for Chrome](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en)

**Geolocation API**
- [MDN Using geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)

**Image Optimization**
- [Image Source (Unsplash)](https://unsplash.com/photos/icyZmdkCGZ0)
- [Optimizilla](http://optimizilla.com/)
- [Image Optim](https://imageoptim.com/mac)

#### For Deployment
- https://firebase.google.com/docs/cli/
```
npm i -g firebase-tools
firebase login
firebase init
firebase deploy
```

#### Testing
- [Mocha for test runner](https://mochajs.org/)
- [Chai for assertion](http://chaijs.com/)
- [Sinon for spy](http://sinonjs.org/)
- [Enzyme for component testing](https://github.com/airbnb/enzyme)
- [Istanbul for the coverage](https://github.com/gotwarlost/istanbul)

Testing files are in `./test` directory. To run testing,
```
npm run test
```
To see the report in browser,
```
npm run cover
open coverage/lcov-report/*.html
```