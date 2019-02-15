This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Introduction

"Onionshooting" is a coined term which loosely describes the methodical method for troubleshooting a downed/broken website or webpage. If you visited a webpage and was met with a completely blank response in your browser, this tool would help you figure out what is going wrong.

## Setup

As this is a Create React App project, you should be able to simply clone it to your local environment and run `npm install` to install dependencies. Run `npm start` to run the app; the app should open automatically. If not, open `http://localhost:3000` in your browser afterward. Run `npm run build` to compile the production build of the app. Publish to something like Netlify(free) if you'd like.

### Domain lookups

The outermost layer of the onion is the domain itself. This tool will parse the domain from the text input field and perform a WHOIS lookup to make sure the domain is 1) actually registered and 2) not expired.

### DNS lookup

After checking that the domain is actually registered, we should check that the domain resolves to a server. This is done using a free API DNS lookup and checking that an A record is returned(IP Address).

### Page lookup

The URL specified in the input field will be loaded via an async GET request and the results will be returned. A good response is "200 -OK". The app will dynamically show a tailored error message if a 500(Internal Server Error) response is returned.

### BuiltWith

The app will check if the domain utilizes WordPress or WooCommerce and show a visual indicator. Note: This may not be 100% accurate as it can be based on historical data, not up-to-date data. Use with caution.

### Missing information

This app uses the BuiltWith API to determine the technologies associated with the inputted domain name, however, the API Key has been omitted from this repository for obvious reasons. The app is designed to load the key from a json file at /src/keys.json, so, recreate that file with your Builtwith key like so:

```
{
  "builtWith": "key goes here"
}
```
