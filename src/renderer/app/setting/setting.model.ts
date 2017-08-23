export interface Settings {
    ak: string;
    sk: string;
    scope: string;
    domain: string;
}

export class Setting {
    public ak: string;
    public sk: string;
    public scope: string;
    public domain: string;

    constructor() {
        this.ak = '';
        this.sk = '';
        this.scope = '';
        this.domain = '';
    }

    update({ ak, sk, scope, domain }: Settings) {
        this.ak = ak;
        this.sk = sk;
        this.scope = scope;
        this.domain = domain;
    }

    getSetting(): Settings {
        return {
            ak: this.ak,
            sk: this.sk,
            scope: this.scope,
            domain: this.domain
        };
    }
}
