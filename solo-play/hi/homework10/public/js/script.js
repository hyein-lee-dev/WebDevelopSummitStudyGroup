// 공통사항 : 파라메터 유효성 여부는 필수로 합니다. (특히 객체 내 프로퍼티들을 접근할 때)

let UserList = null;

window.onload = function() {
    UserList = [new Member(`test`,`1234!qwer`,`테스트다`)];
    document.getElementById(`create_account`).onclick = function() {
        let forms = getJoinForms();
        initInputErrorforForm(forms)
        
        try {
            // 여러 파라메터가 있는 경우에는 객체 하나로 묶어서 넣도록 구현하는게 가독성/확장성에서 유리합니다.
            // (Member 객체 생성 및 아래 setGuideText 등 다른 함수들에도 공통 적용)
            /*
            let person = new Member({
                id : forms.id.value,
                pw : forms.pw.value,
                nickname: form.nick.value
            });
             */
            let person = new Member(forms.id.value, forms.pw.value, forms.nick.value)
            UserList.push(person)
            alert(`${person.getId()} 계정이 생성되었습니다`)
        } catch(e) {
            handleInputErrorforForm(e, forms)
        }
        console.log(UserList)
    }

    document.getElementById(`search_account`).onclick = function() {
        let forms = getManageForms()
        initInputErrorforForm(forms)
        let inputId = forms.id.value
        if(inputId === ``) {
            setGuideText(forms.id, `검색할 아이디를 입력해주세요`, true)
            return;
        }

        let user = findUser(forms.id.value)
        if (user.idx === -1) {
            forms.pw.value = ``
            forms.nick.value = ``
            alert(`존재하지 않는 유저입니다. 아이디를 확인해주세요`)
            return;
        }

        forms.id.value = user.user.id
        forms.pw.value = user.user.pw;
        forms.nick.value = user.user.nick;
    }

    document.getElementById(`update_account`).onclick = function() {
        let forms = getManageForms()
        initInputErrorforForm(forms)
        let user = findUser(forms.id.value)
        if(user.idx === -1) {
            alert(`존재하지 않는 유저입니다. 아이디를 확인해주세요`)
            return;
        }
        try {
            user.user.setInfo(forms.pw.value, forms.nick.value)
            alert(`${user.user.getId()}의 정보가 변경되었습니다\n`)
        } catch (e) {
            console.log(e)
            handleInputErrorforForm(e, forms)
        }
    }

    document.getElementById(`delete_account`).onclick = function() {
        let forms = getManageForms()
        initInputErrorforForm(forms)
        let user = findUser(forms.id.value)
        if(user.idx === -1) {
            alert(`존재하지 않는 유저입니다. 아이디를 확인해주세요`)
            return;
        }

        if(true === confirm(`${forms.id.value}를 정말 삭제하시겠습니까?`)){
            UserList.splice(user.idx, 1)
            initInputForm(forms);
            alert(`${forms.id.value} 빠염!T^T`)
        } else {
            alert(`${forms.id.value} 가즈아!>ㅇ<`)
        }
        console.log(UserList)
    }

    function findUser(targetId){
        for (let i in UserList) {
            if(UserList[i].getId() === targetId) {
                return {idx: i, user: UserList[i]}
            }
        }
        return {idx: -1, user: null}
    }


    // 아래와 같은 함수는 하나의 함수로 가능합니다. (향후 Join, Manage 외에 다른 값 필요 시에도 추가 함수구현 없이 활용 가능)
    // 이렇게 거의 동일한 기능을 가진 함수들은 여러 개로 나누지 않는 게 더 유리할 수 있습니다.
    /*
    function getForms(type) {
        return {id: document.getElementById(`id_${type}`),
                pw:  document.getElementById(`pw_${type}`), 
                nick : document.getElementById(`nick_${type}`)};
    }
     */

    function getJoinForms(){
        return {id: document.getElementById(`id_join`),
                pw:  document.getElementById(`pw_join`), 
                nick : document.getElementById(`nick_join`)};
    }

    function getManageForms(){
        return {id: document.getElementById(`id_manage`),
                pw:  document.getElementById(`pw_manage`), 
                nick : document.getElementById(`nick_manage`)};
    }

    function initInputForm(form) {
        for (let key of Object.keys(form)){
            form[key].value = ""
        }
    }

    function initInputErrorforForm(form) {
        for (let key of Object.keys(form)){
            setGuideText(form[key], null, false)
        }
    }

    function handleInputErrorforForm(e, form){
        let errors = JSON.parse(e.message)
        for (let key in errors) {
            setGuideText(form[key], errors[key], true)
        }
    }

    function setGuideText(elem, description, visible) {
        if(visible){
            elem.nextElementSibling.innerText=description
            elem.nextElementSibling.style.visibility="visible"
        } else {
            elem.nextElementSibling.innerText="ok"
            elem.nextElementSibling.style.visibility="hidden"
        }
    }
}

