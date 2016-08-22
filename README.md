# ionic2-code-push-example
Example of how to use Microsoft CodePush with ionic2

# Setup

## Global tools to be installed
```
npm install -g typings
npm install -g tslint
npm install -g code-push-cli
```

## In this directory issue following commands
```
npm install
typings install

ionic hooks add
ionic state restore
```

## ------TEMP Instructions until pull request is accepted by ionic-native ---- ##
ionic-native does not have support for code-push yet. The pull request that adds this support is 
still under review and will become part of next release of ionic-native.

If you want to try this example then please read the discussion in this issue thread on how to get
yourself setup :
https://github.com/ksachdeva/ionic2-code-push-example/issues/1

## Setup code-push account if you have not already

```
code-push login
```

Above command will open the browser and you will have the option
to sign using various providers. I used Microsoft (Personal) account for
this example.

On successful authentication the browser will display the token. Paste this
token on the prompt in your console.

You are now logged in

## Register a new application

It is recommended to register one app per platform so for this project I am
doing

```
code-push app add ionic2-sample-ios
and
code-push app add ionic2-sample-android
```

## Install the cordova plugin in your application
```
ionic plugin add cordova-plugin-code-push@latest
```

## Looking up the keys for your application

```
code-push deployment ls ionic2-sample-ios -k
```

You will see two environments (Staging and Production)

## Add the deployment keys to your config.xml
```
<platform name="android">
    <preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" />
</platform>
<platform name="ios">
    <preference name="CodePushDeploymentKey" value="YOUR-IOS-DEPLOYMENT-KEY" />
</platform>
```

The code base currently has my key in the config.xml so make sure to replace it
with yours.

## Run the app
```
ionic emulate ios
```

You will some progress text with activity indicator and then you will switch to TabsPage

## Generate an update for the app

Modify home.html or anything of your assets (scss/ts/html) and issue following command

```
code-push release-cordova ionic2-sample-ios ios
```

You can see the update by issuing following command :

```
code-push deployment ls ionic2-sample-ios
```

## Test the update

Restart the app ( note - don't do -> ionic emulate ios as this will load the current compiled version in your emulator :) )

You can also see how many of the devices got the update by issuing following command

```
code-push deployment ls ionic2-sample-ios
```
