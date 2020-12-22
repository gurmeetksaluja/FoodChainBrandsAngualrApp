
export class User {
    constructor(private access_token: string,  private token_type: string, private refresh_token: string, private _tokenExpirationDate: Date) { }

    get token() {
        if(!this._tokenExpirationDate || new Date() >this._tokenExpirationDate){
            return null;
        }
        return this.access_token;
    }
}
