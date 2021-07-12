import { ITextMatch } from './generated-interfaces'

export class TextMatch implements ITextMatch {
  constructor(public property: string, public fragment: string) {}
}
