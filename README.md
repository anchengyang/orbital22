# CoinValet

## How to run application:

Ensure you have `node`, `npm` and `expo-cli` installed

Pick a local directory and clone this repository with:

`git clone https://github.com/adityajirafe/orbital22.git`

Once that is done, run `npm i` which will install the relevant dependencies necessary to run the application

Following which, firebase setup is required. You can either choose to:

a) Email us at `adityajirafe@u.nus.edu` or `e0725272@u.nus.edu` to obtain the Firebase API Key or

b) Set up Firebase yourself

After setting up Firebase, navigate to the directory containing App.js and run `expo-start`

## Firebase Setup

Create a `.env` file in the main directory and insert your Firebase configuration in the format below:

```{r}
apiKey=""
authDomain=""
projectId=""
storageBucket=""
messagingSenderId=""
appId=""
measurementId=""
```

## Unsure how to obtain firebase configuration?

Go to `https://console.firebase.google.com/`. create an account if you do not have one already

Click on `Add Project`

Give your project any name and click next

Enable Google Analytics and click next

Choose `Default Account for Firebase` and click next

Under Authentication, click get started on sign-in methods and enable Email/Password. There is no need to enable 'Email link (passwordless sign-in)'

Under Firebase Database, click create database and start `in test mode`

Select the default Cloud Firestore location and click enable

On the home page, add a web app to get started and give it a name. Click register.

Copy the values under `const firebaseConfig` into your .env file as stated above

## Running the Telebot

Disclaimer: Since the bot is in constant development, we will not be hosting the
bot on any server for visitors to try, as it limits our ability to improve the
bot.

As such, to those who wish to test the bot, the solution is to clone the
repository and create your own bot. A brief description is showed below:

Run `cd orbital22/telebot`

Run `code .` to open up the files in VSCode

### For Windows:

Run `python -m venv venv` in the terminal to create a virtual environment

Run `venv\Scripts\Activate.ps1` in the terminal to navigate to the working environment

### For Mac:

Run `pip install virtualenv`

Run `source venv/bin/activate`

### General:

All dependencies used for the python telegram bot are stored in `requirements.txt`

Run `pip install -r requirements.txt` in the venv in order to download the dependencies into the working environment

Using @BotFather on telegram, create a new bot and receive the bot token. input
it inside `telebot/main.py`

Input your `FTX api_key` and `api_secret` inside `telebot/main.py`

Run `python main.py`
