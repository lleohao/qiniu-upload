"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qiniu = require("qiniu");
var Upload = (function () {
    function Upload(ak, sk, scope) {
        this.expires = 3600;
        this.mac = new qiniu.auth.digest.Mac(ak, sk);
        this.putPolicy = new qiniu.rs.PutPolicy({
            scope: scope,
            expires: this.expires
        });
        this.config = new qiniu.conf.Config();
        this.config.zone = qiniu.zone.Zone_z2;
    }
    Upload.prototype.getUploadToken = function () {
        var now = Date.now();
        if (!this.tokenValidPeriod || (now + this.expires * 1000) < this.tokenValidPeriod) {
            this.token = this.putPolicy.uploadToken(this.mac);
        }
        return this.token;
    };
    Upload.prototype.uploadFile = function (path, filename, callback) {
        var formUploader = new qiniu.form_up.FormUploader(this.config);
        var putExtra = new qiniu.form_up.PutExtra();
        var uploadToken = this.getUploadToken();
        formUploader.putFile(uploadToken, filename, path, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                callback(respErr);
            }
            if (respInfo.statusCode == 200) {
                callback(null, respBody);
            }
            else {
                callback(null, respBody, respInfo.statusCode);
            }
        });
    };
    return Upload;
}());
exports.Upload = Upload;
//# sourceMappingURL=qiniu.js.map