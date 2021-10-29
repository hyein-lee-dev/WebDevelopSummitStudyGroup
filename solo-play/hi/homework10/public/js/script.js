// 공통사항 : 파라메터 유효성 여부는 필수로 합니다. (특히 객체 내 프로퍼티들을 접근할 때)
const backendURL = `http://127.0.0.1:12345`;

window.onload = function() {
    document.getElementById(`create_account`).onclick = function() {
        let forms = getForms(`join`);
        initInputErrorforForm(forms)
        
        console.log(forms.id.value, "/", forms.pw.value, "/", forms.nick.value);
        
        
        new HttpRequest().postData(
                `${backendURL}/member/add`, 
                {
                    id: forms.id.value,
                    pw: forms.pw.value,
                    nick: forms.nick.value
                }, 
                (res) => {
                    console.log(`successs callback ${JSON.stringify(res)}`)
                }, 
                (res) => {
                    console.log(`fail callback ${JSON.stringify(res)}`)
                    if(res.error !== undefined && res.error !== null){
                        handleInputErrorforForm(res.error, forms);
                    }
                }
        );
    }

    document.getElementById(`search_account`).onclick = function() {
        let forms = getForms(`manage`)
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
        let forms = getForms(`manage`)
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
        let forms = getForms(`manage`)
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

    function getForms(type){
        return {id: document.getElementById(`id_${type}`),
                pw:  document.getElementById(`pw_${type}`), 
                nick : document.getElementById(`nick_${type}`)};
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
        let errors = JSON.parse(e)
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

