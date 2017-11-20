/**
 * Created by wb-zxs269841 on 2017/11/3.
 */
class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        return `Wah wah, I am ${this.name}`;
    }
}

module.exports = Dog;