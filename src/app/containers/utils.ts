import moment from "moment";
import history from "../../app/containers/history";


/**
 * OS Check
 * ---------------------------------------------------------------------------------------------------------------------
 */
export function osCheck() {
    let os = 'android';
    try {

        let ua = navigator.userAgent;

        let checker = {
            iphone: ua.match(/(iPhone|iPod|iPad)/),
            android: ua.match(/Android/)
        };

        if (!ua.includes("connectionType/webview")) {
            os = 'web';
        } else if (checker.android) {
            os = 'android';
        } else if (checker.iphone) {
            os = 'ios';
        }
    } catch (e) {
        os = 'error';
    }
    return os;
}

/**
 * Apple Login Enable Check
 * ---------------------------------------------------------------------------------------------------------------------
 */
export function appleLoginEnable() {
    let flag = false;
    try {
        let ua = navigator.userAgent;

        let regexResult = null;
        if (ua.match(/iPhone/)) {
            let regex = /(iPhone) OS (\d+)_(\d+)(?:_(\d+))?/g;
            regexResult = regex.exec(ua);

        } else if (ua.match(/iPad/)) {
            let regex = /(iPad).+ OS (\d+)_(\d+)(?:_(\d+))?/g;
            regexResult = regex.exec(ua);
        }

        if (regexResult != null) {
            flag = Number(regexResult[2]) >= 13;
        }
    } catch (e) {
        flag = false;
    }
    return flag;
}

/**
 * Android Device Check
 * ---------------------------------------------------------------------------------------------------------------------
 */
export function androidDevice() {
    const messageHandler = (window as any).AndroidApp;
    return messageHandler;
}

/**
 * IOS Device Check
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param functionName : Function Name
 */
export function iosDevice(functionName: string) {
    const messageHandler =
        (window as any).webkit &&
        (window as any).webkit.messageHandlers &&
        (window as any).webkit.messageHandlers[functionName];
    return messageHandler;
}

/**
 * SmallLetter & Number Pattern Regex
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param value : Object Value
 */
export function englishNumberCheck(value: string) {
    let regExp = /^[a-z0-9+]*$/;
    return regExp.test(value);
}

/**
 * Name Pattern Regex
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param value : Object Value
 */
export function nameCheck(value: string) {
    let regExp = /([^가-힣\x20^a-z^A-Z])/i;
    return regExp.test(value);
}

/**
 * Not Hangul Pattern Regex
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param value : Object Value
 */
export function notHangulCheck(value: string) {
    let regExp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]/g;
    return regExp.test(value);
}

/**
 * Hangul Regex
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param value : Object Value
 */
export function hangulCheck(value: string) {
    let regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return regExp.test(value);
}

/**
 * Password Pattern(영문으로 시작하며, 영문소문자와 숫자로 이루어져 있고, 6~20자리) Regex
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param value : Object Value
 */
export function passwordCheck(value: string) {
    let regExp = /^[a-z]+[a-z0-9]{5,20}$/;
    return regExp.test(value);
}

/**
 * Phone Number Regex
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param value : Object Value
 */
export function phoneCheck(value: string) {
    let regExp = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
    return regExp.test(value);
}

/**
 * Number Regex
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param value : Object Value
 */
export function isNumber(value: string) {
    let flag = false;
    let regExp = /^[0-9,]*$/;
    flag = regExp.test(value);
    if (regExp.test(value)) {
        flag = !value.includes(",")
    }

    return flag;
}

/**
 * Number Regex
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param value : Object Value
 */
export function isAmount(value: string) {
    let regExp = /^[0-9,]*$/;
    return regExp.test(value);
}

/**
 * Empty Check
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param value : Object Value
 */
export function isEmpty(value: any) {
    return typeof value === "undefined" || value === null || value === "";
}

/**
 * Date Converting
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param momentDate : Date Value
 */
export function convertDateToString(momentDate: any) {
    return moment(momentDate).format('YYYY-MM-DD');
}

/**
 * Date Converting
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param momentDate : Object Value
 */
export function convertDateMonthToString(momentDate: any) {
    return moment(momentDate).format('YYYY-MM');
}

/**
 * DateTime Converting
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param momentDate : Date Value
 */
export function convertDateTimeToString(momentDate: any) {
    return moment(momentDate).format('YYYY-MM-DD HH:mm');
}

/**
 * 콤마찍기
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param number : Object Value
 */
export function numberWithCommas(number: number) {
    try {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (e) {
        return "0";
    }
}

/**
 * 생년월일 형식으로 바꾸기
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param birthdate : 생년월일
 */
export function birthDateFormat(birthdate: string) {
    try {
        return birthdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    } catch (e) {
        return birthdate;
    }
}

/**
 * 핸드폰 번호 형식으로 바꾸기
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param phone : PhoneNumber
 */
export function phoneFormat(phone: string) {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}

export function splitSpaceOrNewLine(text: string) {
    return String(text).split(/[\0\s]+/g).filter(Boolean);
}

/**
 * Default Popup Control
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param i    : this
 * @param data : Object Data
 */
export function handlePopup(i: any, data: any) {
    i.setState({
        popup: {
            ...data
        }
    });
    if (data.classActive !== 'active') {
        if (data.type.includes('hospitalDelete')) { //# 병원 정보 삭제
            i.handleHospitalDelete(data.type.replace('hospitalDelete', ''));
        }
        if (data.type.includes('addressDelete')) { //# 지역 정보 삭제
            i.handleAddressDelete(data.type.replace('addressDelete', ''));
        }
        if (data.type === 'editPassword') { //# 비밀번호 변경
            i.handleEditPasswordData();
        }
        if (data.type === 'complete') { //# Result Success
            window.history.back();
        }
        if (data.type === 'registerHospital') {
            history.push('/hospital/register');
        }
        if (data.type === 'bid') { //## 입찰 전 유의사항 팝업 결과 체크
            i.handleBidPopupShow();
        }
        if (data.type.includes('bidCancel')) { //# 환자 입찰 취소하기
            i.applicantCancelApi(data.type.replace('bidCancel', ''));
        }
        if (data.type === 'applicantComplete') { //# 환자 지원하기
            history.push('/patient/list');
        }
        if (data.type.includes('careStart')) { //# 간병 시작
            i.handleCareStart(data.type.replace('careStart', ''));
        }
        if (data.type === 'accountCheck') { //# 계좌 등록
            i.handleAccountRegister();
        }
        if (data.type.includes('accountDelete')) { //# 계좌 삭제
            i.accountDeleteApi(data.type.replace('accountDelete', ''));
        }
        if (data.type === 'transferCheck') { //# 계좌 확인
            history.push('/bankbook/transfer/info', {
                bank_code: i.state.bankList.code,
                bank_name: i.state.bankList.name,
                bank_number: i.state.accountNumber,
                amount: i.state.transferAmount.replace(/,/g, ""),
                receiver: i.state.transferName
            });
        }
        if (data.type === 'initPin') { //# 이체비밀번호 등록
            history.push('/user/pin');
        }
        if (data.type === 'pinInit') { //# 이체비밀번호 초기화
            i.pinRef.current?.clear();
        }
        if (data.type === 'login') { //# 로그인 페이지 이동
            history.push('/login');
        }
        if (data.type === 'logout') { //# 로그아웃
            i.logoutApi();
        }
        if (data.type === 'historyBack') {
            handleHistoryBack();
        }
    }
}

/**
 * Data Set State
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param i : this
 * @param e : Object Data
 */
export function handleData(i: any, e: any) {
    if (isEmpty(e.target)) {
        return;
    }
    if (e.target.name == null) {
        return;
    }
    let value = e.target.value;
    i.setState({
        [e.target.name]: value,
        ...e
    });
}

/**
 * Data Set State
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param i : this
 * @param e : Object Data
 */
export function handleAmount(i: any, e?: any) {
    if (isEmpty(e.target)) {
        return
    }
    if (e.target.name == null) {
        return;
    }
    let value = e.target.value;
    let subStr = value.substr(value.length - 1);

    if (!isEmpty(subStr) && !isAmount(subStr)) {
        value = value.substr(0, value.length - 1); //## 마지막 문자 제거
        i.setState({
            [e.target.name]: value,
            ...e
        });
    } else {
        i.setState({
            [e.target.name]: value,
            ...e
        });
    }
}


/**
 * Data Set State
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param i    : this
 * @param data : Object Data
 */
export function handleDeleteData(i: any, data: any) {
    i.setState({
        ...i.state,
        ...data
    });
}

/**
 * 공고 상태 색상
 * ---------------------------------------------------------------------------------------------------------------------
 *
 * @param history : job Detail
 */
export function jobStatusColor(history: any) {
    /*
        1. 신청대기 / 간병 대기 : 노랑색
        2. 간병 중 : 파랑색
        3. 간병 완료 : 회색
        4. 취소요청 / 취소완료 : 빨간색
     */
    let colorName;
    if (history.status === 3 || history.status === 1 || history.status === 2) {
        colorName = 'yw_ver';
    } else if (history.status === 4) {
        colorName = 'blue_ver';
    } else if (history.status === 5) {
        colorName = 'gray_ver';
    } else if (history.status === 9) {
        colorName = 'red_ver';
    }
    if (history.cancel_status === 'R' || history.cancel_status === 'Y') {
        colorName = 'red_ver';
    }
    return colorName;
}

/**
 * 뒤로가기
 * ---------------------------------------------------------------------------------------------------------------------
 */
export function handleHistoryBack() {
    console.log(history)
    if (history.length === 1) {
        history.push('/main');
    } else {
        history.goBack()
    }
}

/**
 * Calendar How Many Weeks
 * Weeks start on Another
 * ---------------------------------------------------------------------------------------------------------------------
 */
export function weeks(year: number, month: number) {
    let firstDay = new Date(year, month, 1).getDay(); //## 1일의 요일
    let lastDay = new Date(year, month + 1, 0).getDate(); //## 마지막 날짜

    return Math.ceil((firstDay + lastDay) / 7);
}

/**
 * Calendar Weeks length
 * ---------------------------------------------------------------------------------------------------------------------
 */
export function lastWeek(date: any) {
    let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return Math.ceil(lastDate.getDate() / 7);
}

/**
 * Adjust Action Check
 * ---------------------------------------------------------------------------------------------------------------------
 */
export function adjustType(value: string) {
    if (osCheck() === 'android') {
        const androidHandler = androidDevice();
        androidHandler.adjustType(value);
    } else if (osCheck() === 'ios') {
        let iosData = {
            value: value
        };
        const iosHandler = iosDevice('adjustType');
        iosHandler.postMessage(iosData);
    }
}

/**
 * 주민등록번호, 외국인등록번호 유효성 검사
 * ---------------------------------------------------------------------------------------------------------------------
 */
export function rrnValidationCheck(rrn: string, foreigner: number) {
    //### 주민등록증 검증 조건
    //# 주민/외국인 등록번호는 13자리의 숫자로 이루어져 있음
    //# 앞의 6자리는 생년월일을 의미하고 뒤의 7자리는 구글에 검색
    //# 주민/외국인 등록번호의 앞 12자리 숫자를 앞에서부터 2,3,4,5,6,7,8,9,2,3,4,5를 곱하고
    //# 주민등록번호는 11에서 검증값합계의 11의 나머지수를 뺀 값의 1의 자리 수가 12번째 숫자랑 일치해야함
    //# 외국인등록번호는 13에서 검증값합계의 11의 나머지수를 뺀 값의 1의 자리수가 12번째 숫자랑 일치해야함

    if (rrn === '000000-0000000') {
        return true;
    }

    let rrnRegex = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
    let frnRegex = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[5-6][0-9]{6}$/;
    if (rrnRegex.test(rrn) || frnRegex.test(rrn)) {
        let rrnStr: string = rrn.split("-").join('');
        if (rrnStr.length !== 13) return false;

        let checkSum = 0;
        for (let i = 0; i < 12; i++) {
            checkSum += ((Number(rrnStr.substr(i, 1)) >> 0) * ((i % 8) + 2));
        }

        if (foreigner === 0 && rrnRegex.test(rrn)) {//# 내국인
            if ((11 - (checkSum % 11)) % 10 === Number(rrnStr.substr(12, 1))) {
                return true;
            } else {
                return false;
            }
        } else if (foreigner === 1 && frnRegex.test(rrn)) {//# 외국인
            if ((13 - (checkSum % 11)) % 10 === Number(rrnStr.substr(12, 1))) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}