// @flow

import EventEmitter from 'events'

type CustomEventObj = {|
  pending: void,
  success: number,
  error: Error
|}

declare class MyEventEmitter extends EventEmitter {
  on(
    'pending',
    (
      e: null,
      ...args: Array<any>
    ) => void
  ): this;

  on(
    'success',
    (
      e: number,
      ...args: Array<any>
    ) => void
  ): this;

  on(
    'error',
    (
      e: Error,
      ...args: Array<any>
    ) => void
  ): this;

  // Just to satisfy inheritance requirements, but this should throw at runtime.
  on(
    string,
    (
      e: mixed,
      ...args: Array<any>
    ) => void
  ): this;
}

let myInstance = new MyEventEmitter()

myInstance.on('pending', () => {}) // works
myInstance.on('success', (num: number) => {console.log(num * 2)}) // works
myInstance.on('success', (badStr: string) => {console.log(badStr.length)}) // Error
