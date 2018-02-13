## React server side render and client side render for Meteor with react-loadable and Meteor.subscriptions in mind
As discussed [on StackOverflow](https://stackoverflow.com/questions/48567599/meteor-server-render-withtracker-postponing-client-rendering?noredirect=1#comment84511111_48567599), [Meteor forums](https://forums.meteor.com/t/react-ssr-data-hydration-help/35342), [rest](https://www.google.com/search?q=meteor+subscribe+ssr).

Alternatives [first](https://github.com/ssrwpo/ssr), [second](https://github.com/thereactivestack-legacy/meteor-react-router-ssr).

## Usage

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
