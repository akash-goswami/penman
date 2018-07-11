import Word from './word';

export default class Chunk {
    constructor (text) {
        this.text = text;

        this.words = this.__createsWordsFrom(text);
        this.lineNo = null;
        this.col = null;
    }

    __createsWordsFrom (text) {
        text = text.replace(/\s+/g, ' ');
        const wordsArr = text.split(' ');
        const wordModel = [];

        for (let i = 0, l = wordsArr.length; i < l; i++) {
            wordModel.push(new Word(wordsArr[i]));
            if (i !== l - 1) {
                wordModel.push(new Word(''));
            }
        }

        return wordModel;
    }

    size () {
        return this.text.length;
    }
}
