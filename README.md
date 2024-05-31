# Ear Training App
![icon](https://github.com/miselve/EarTrainingApp/assets/94703285/db3a7bf7-3f09-4092-89df-2c2929236ce0)

This app was crafted using React Native by Michail Selvesakis & Gerasimos Harizanis as a project for 'Educational Innovation and Application Development', a component of Democritus University of Thrace's curriculum.

## App Features
* Home Screen
* Interactive Interval Theory lessons (Ascending - Descending Intervals)
* Intuitive Musical Examples for each Interval
* Multiple Quizzes (3 Different difficulty levels)
* Score Tab to see User's Performance

## Build Instructions (Linux Enviroment)

To build this app locally you need to follow theese steps: (This example is for Debian-based Systems. Logged-in as root user)

1. Install Dependencies:
```
apt install nodejs>=14.0.0 npm default-jre default-jdk android-sdk sdkmanager
```

2. Setup Enviroment Variables: (check if the Android SDK is actually installed there)
```
export ANDROID_HOME="/lib/android-sdk/"
```
3. Accept liscenses: (If the Build fails you may need to run it again)
```
cd /lib/android-sdk/
yes | sdkmanager --licenses
```

4. Install Node dependencies & EAS, Expo:
```
cd EarTrainingApp-main/
npm install
npm install --global eas-cli expo
```

5. Login to EAS using your Expo account:
```
eas login
```
6. Build APK
```
eas build -p android --profile preview --local
```

If the Build succeded the APK will be placed inside the project folder.

## Troubleshooting
If the Build fails, check the following errors-solutions:

* ``` SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable ```<br>
Make sure the Enviromental Variable is set correctly. You can check with ```echo $ANDROID_HOME```
* ``` Failed to install the following Android SDK packages as some licences have not been accepted. ``` <br>
Re-Do the 3rd Step

* Failing to initialize git: <br>
Run
```
git rev-parse --git-dir
```
and then
```
git config --global --add safe.directory /home/michael/.local/share/Trash/files/EarTrainingApp-main
```
(Change the path according to the command's Output)
