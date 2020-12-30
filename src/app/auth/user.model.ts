
export class User {
    constructor(public access_token: string,  public token_type: string, public refresh_token: string, public _tokenExpirationDate: Date) { }

    get token() {
        if(!this._tokenExpirationDate || new Date() >this._tokenExpirationDate){
            return null;
        }
        return this.access_token;
    }
}
