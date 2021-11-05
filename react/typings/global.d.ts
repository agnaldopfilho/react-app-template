import { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    schema?: object
    getSchema?(props?: P): object
  }
}

export interface TimeSplit {
  hours: string
  minutes: string
  seconds: string
}

type GenericObject = Record<string, any>