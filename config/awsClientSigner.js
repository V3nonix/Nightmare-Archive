const { getSignedUrl } = require('@aws-sdk/cloudfront-signer');

require('dotenv').config();

module.exports = function signCloudFrontUrl(url) {
    const signedUrl = getSignedUrl({
        url,
        keyPairId: process.env.AWS_KEY_PAIR_ID,
        dateLessThan: new Date(Date.now() + 60 * 60 * 1000),
        privateKey: Buffer.from(process.env.AWS_PRIVATE_KEY , 'base64').toString('ascii')
    });
    return signedUrl;
}