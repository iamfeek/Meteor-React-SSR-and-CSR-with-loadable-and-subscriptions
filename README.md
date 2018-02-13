## React server side render and client side render for Meteor with react-loadable and Meteor.subscriptions in mind

### Usage

Install:
```sh
npm i react react-dom react-loadable
meteor add pravdomil:react-render
```

Use:
```jsx
import { setRootComponent } from "meteor/pravdomil:react-render"

function App() {
  return "hello"
}

setRootComponent(App)
```

Donate:

[By buying a beer](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BCL2X3AFQBAP2&item_name=react-render%20Beer).
