export class User {
    /*constructor() {
        this.set('isLoggedIn', '0');
    }*/

    isLoggedIn = () => {
        if(this.get('isLoggedIn') == '1'){
            //console.log('isLoggedIn is true');
            return true;
        }
        else{
            //console.log('isLoggedIn is false');
            return false;
        }
    }

    set = (key: string, value: string) => localStorage.setItem(key, value);

    get = (key: string) => this.getLocalStorage(key);

    getLocalStorage = (key: string) => {
        const ret = localStorage.getItem(key);
        if (ret) {
            return ret;
        }
        return null;
    };

    login = async(number: string, password: string) => {
        if (number == "0000" && password == "ginga") {
            this.set('isLoggedIn', '1');
            this.isLoggedIn();
            //console.log("Login success")
            return true;
        }
        else {
            this.set('isLoggedIn', '0');
            //console.log("Login false")
            return false;
        }

    };

    logout = async () => {
        if (this.isLoggedIn()) {
            this.set('isLoggedIn', '1');

            // ログアウト処理
            //他に必要な処理があるのならこちら
        }
    };
}

export default new User();