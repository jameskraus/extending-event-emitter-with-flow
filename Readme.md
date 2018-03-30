# Extending Event Emitter with Flow Types

This repo serves as an answer to a stackoverflow question on how to extend
EventEmitter and still let Flow know what kind of arguments were passed
to the event emitter.

Original question:

>As an example, let's say I have a class that only emits three possible events – `'pending'` or `'success'` or `'failure'`. Additionally, the type of the argument received in the `eventHandler` depends on which event was emitted –
>
>* if `'pending'`, the `eventHandler` receives no argument
>* if `'success'`, the `eventHandler` receives a `number`
>* if `'failure'`, the `eventHandler` receives an `Error`
>
>Here is how I tried to model that:
>
>    // @flow
>
>    import EventEmitter from 'events'
>
>    type CustomEventObj = {|
>      pending: void,
>      success: number,
>      error: Error
>    |}
>
>    declare class MyEventEmitter extends EventEmitter {
>      on<K: $Keys<CustomEventObj>>(
>        eventName: K,
>        eventHandler: (
>          e: $ElementType<CustomEventObj, K>,
>          ...args: Array<any>
>        ) => void
>      ): this
>    }
>
>However, this results in an error like so:
>
>    Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ test.js:12:3
>
>    Cannot extend EventEmitter [1] with MyEventEmitter because an indexer property is missing in CustomEventObj [2] in the
>    first argument of property on.
>
>     [1]  3│ import EventEmitter from 'events'
>           :
>          8│   error: Error
>          9│ |}
>         10│
>         11│ declare class MyEventEmitter extends EventEmitter {
>     [2] 12│   on<K: $Keys<CustomEventObj>>(
>         13│     eventName: K,
>         14│     eventHandler: (
>         15│       e: $ElementType<CustomEventObj, K>,
>         16│       ...args: Array<any>
>         17│     ) => void
>         18│   ): this
>         19│ }
>         20│
>
>I don't want to have an indexer property on `CustomEventObj` because wouldn't that kill the point of only having 3 possible events?
>
>Any help would be appreciated.
