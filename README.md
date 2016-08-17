# PokeAuth

A helper library for developers using [PokeAuth](https://www.pokeauth.com).

## Installation

```
npm install pokeauth --save
```

## Getting Started

Make sure you have signed up for a [developer account](https://www.pokeauth.com/developer/register)
before following the steps below.

### User Permissions

Add this image as a button on your website:

![pokeauth button](https://github.com/thisbejim/poke/blob/master/pokeauth-button.png)

In your [dashboard](https://www.pokeauth.com/developer/dashboard) you will find a url that looks like this:

```
https://www.pokeauth/access/I5ulSrNsYgS034wtO1d0kSswSiu1
```

When users click the PokeAuth button you should send your users to this url.
Here the user can decide whether or not to give you permission to access
to their details.
If they approve your application they will be sent to your callback url
along with their user id:

```
https://www.yourdomain.com/callback?uid=8dH7JM15TRTR6MVPHU7RQLeSgqE2
```

You can use the ```uid``` in this url to request user tokens.

### login

The ```login``` method takes your developer email and password and returns a promise.

```
import pokeauth from 'pokeauth';

pokeauth.login(email, password)
```

### getUserToken

You can retrieve the access tokens of users who have approved your application by passing
their ```uid``` into the ```getUserToken``` method.

The ```getUserToken``` method returns an ```accessToken``` and a ```provider``` (either 'google' or 'ptc').

Promises:
```
pokeauth.login(email, password).then(() => {
  pokeauth.getUserToken(uid).then((user) => {
    console.log(user.accessToken, user.provider);
  });
});
```

Async/Await:
```
await pokeauth.login(email, password);
const user = await pokeauth.getUserToken(uid);
console.log(user.accessToken, user.provider);
```
