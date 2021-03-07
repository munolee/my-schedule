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
