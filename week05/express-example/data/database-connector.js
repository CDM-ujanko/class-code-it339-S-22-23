import fs from 'fs';

class DB {
    data;
    #location = "./data/data.json";

    constructor() {
        this.data = this.readFile();
    }

    parse(str) {
        return JSON.parse(str);
    }

    stringify(data) {
        return JSON.stringify(data, null, 2);
    }

    readFile() {
        let data = fs.readFileSync(this.#location).toString();
        return this.parse(data);
    }

    writeFile(data) {
        fs.writeFileSync(this.#location, this.stringify(data));
    }

    list() {
        return this.data;
    }

    find(index) {
        let user = this.data.find(u => u.index === index);
        if (user) {
            return user;
        }

        return false;
    }

    create(user) {
        user.index = this.data.length;
        this.data.push(user);
        this.writeFile(this.data);
        return user;
    }

    update(user) {
        let index = this.data.findIndex((u) => u.index === parseInt(user.index));
        console.log(user.index, index);
        if (index !== -1) {
            this.data[index] = user;
            this.writeFile(this.data);
            return user;
        } 

        return this.create(user);
    }

    delete(i) {
        let index = this.data.findIndex((u) => u.index === i);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.writeFile(this.data);
            return true
        } 

        return false;
    }
}

const db = new DB();
export default db;
