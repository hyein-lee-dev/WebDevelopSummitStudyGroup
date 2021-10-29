class Member {
    constructor(param){
        console.log("here");
        console.log(JSON.stringify(param));
        let errors = Member.checkValidation(param);
        if(errors) {
            console.log(`[Member.js] error occurs: ${errors}`);
            throw new Error(errors);
        }

        console.log(`let's make user!`);
        this.id = param.id;
        this.pw = param.pw;
        this.nick = param.nick;
    }

    getId(){
        return this.id;
    }
    
    getPw(){
        return this.pw;
    }

    getNick(){
        return this.nick;
    }

    setInfo(param) {
        let errors = Member.checkValidation(param)
        if(errors) {
            console.log(`validation error exists`)
            throw new Error(errors)
        }

        this.pw = param.pw
        this.nick = param.nick

        console.log(`For user ${this.id}, ${this.pw}, ${this.nick} successfully changed`)
    }

    static checkValidation(param){
        let errors = {}

        if(param.id !== null) {
            console.log(`id error check`)
            if (Member.isValidId(param.id) === false) {
                errors[`id`] = `아이디는 4글자이상 15글자 이하, 문자로 시작해야하며, 숫자와 .과 _를 포함할 수있습니다.`
            }
        }
        if(param.pw !== null) {
            console.log(`pw error check`)
            if (Member.isValidPw(param.pw) === false) {
                errors[`pw`] = `비밀번호는 8글자 이상 15글자 이하, 문자, 숫자, 특수문자를 하나씩 포함해야합니다.`
            }
        }
        if(param.nick !== null) {
            console.log(`nick error check`)
            if(Member.isValidNick(param.nick) === false) {
                errors[`nick`] = `닉네임은 3글자이상 15글자 이하, 문자와 숫자, .과 _를 포함할 수있습니다.`
            }
        }

        return Object.keys(errors).length === 0 ? null : JSON.stringify(errors)
    }

    static isValidId(id){
        let re_id = /^[A-Za-z]([\w.\d]{3,14}$)/
        return re_id.exec(id) ? true : false        
    }

    static isValidPw(pw){
        // alphebet, special character, digit
        let re_pw = /(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]){8,15}/
        return re_pw.exec(pw) ? true: false
    }

    static isValidNick(nick){
        //Available charcter: korean, alphanumeric, ., _
        let re_nick = /^[ㄱ-ㅎ가-힣a-zA-Z0-9_.]{2,15}$/
        return re_nick.exec(nick) ? true : false
    }
}

module.exports = Member;