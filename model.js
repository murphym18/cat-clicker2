class Cat {
    constructor(name, image) {
        this._data = {
            "name": name,
            "image": image,
            "count": 0
        }
    }

    get image() {
        return this._data.image;
    }

    get name() {
        return this._data.name;
    }

    get count() {
        return this._data.count;
    }

    click() {
        this._data.count = this._data.count + 1;
    }

    toString() {
        return `Cat(${this.name}, ${this.count})`;
    }
}

class CatDatabase {
    constructor() {
        this._db = new Array();
        this._isLoaded = false;
        this._dataLoader = () => {
            return new Promise((ok, err) => {
                try {
                    let scriptElms = Array.from(document.getElementsByTagName("script"));
                    let dataChunks = scriptElms.filter(elm => {
                        return elm.hasAttribute("type") && elm.getAttribute("type") === "app/cat-data";
                    }).map(elm => {
                        return elm.innerHTML.trim();
                    });
                    let data = dataChunks.join("\n");
                    ok(data)
                } catch (e) {
                    err(e);
                }
            });
        };
    }

    load() {
        return new Promise((ok, err) => {this._dataLoader().then(str => {
                let lines = str.split("\n");
                this._db = lines.map(line => line.split(";")).map(catArr => {
                    let [name, imgName] = catArr;
                    return new Cat(name, imgName);
                })
                this._isLoaded = true;
                ok(this);
            });
        });
    }

    get data() {
        return this._db;
    }

    get isLoaded() {
        return this._isLoaded;
    }

    lookup(name) {
        let results = this._db.filter(cat => cat.name === name)
        if (results.length) {
            return results[0];
        }
    }
}

const db = new CatDatabase();

export default db;