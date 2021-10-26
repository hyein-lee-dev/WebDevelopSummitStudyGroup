class MemberList {
    _list = [];

    add(input){
        let person = new Member({
            id : input.id.value,
            pw : input.pw.value,
            nick: input.nick.value
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