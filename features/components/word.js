class Word{
    constructor(tango, yomi, boin, category){
        this.tango = tango;
        this.yomi = yomi;
        this.boin = boin;
        this.category = category;
    }

    toString(){
        return `{"単語" : "${this.tango}", "かな" : "${this.yomi}", "母音" : "${this.boin}", "品詞" : "${this.category}"}`
    }

}

export default Word;