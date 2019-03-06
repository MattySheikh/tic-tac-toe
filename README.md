## Setup
* [Install yarn](https://yarnpkg.com/lang/en/docs/install)
* Run `yarn`
* Run `yarn watch`
* Navigate to `http://localhost:8081/` (it should open for you but just in case it doesn't)

## Things you can do
* You can undo/redo actions
* If you choose to `Make It Weird`, you'll get your Sean Connery and square icons
* It's *mostly* responsive so resize your browser and see how it looks

## To Make Real Production
* Unit tests
* Add in build (there used to be a webpack.prod.js file but I removed it for brevity)
* More manual testing around redo/undo
* Clean up undo/redo to potentially just call `makeMove`
* Test in IE 11