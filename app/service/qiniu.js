"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qiniu = require("qiniu");
var Upload = (function () {
    function Upload(ak, sk, scope) {
        this.ak = ak;
        this.sk = sk;
        this.scope = scope;
        this.mac = new qiniu.auth.digest.Mac(this.ak, this.sk);
        this.putPolicy = new qiniu.rs.PutPolicy({
            scope: this.scope,
            expires: 3600
        });
    }
    Upload.prototype.getUploadToken = function () {
        return this.putPolicy.uploadToken(this.mac);
    };
    return Upload;
}());
exports.Upload = Upload;
//# sourceMappingURL=qiniu.js.map