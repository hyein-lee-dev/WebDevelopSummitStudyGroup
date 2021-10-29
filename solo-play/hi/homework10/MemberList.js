const Member = require(`./Member`);

class MemberList {
    _list = [];

    add(input){
        console.log(`${JSON.stringify(input)}, ${typeof(input)}`)
        let person = new Member({
            id : input.id,
            pw : input.pw,
            nick: input.nick
        });
        this._list.push(person);
    }

    modify() {

    }

    delete(){

    }

    search() {

    }
}

module.exports = MemberList;