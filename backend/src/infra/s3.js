const AWS = require('aws-sdk');

module.exports = class S3 {
	constructor() {
		this.s3 = new AWS.S3({ regions: process.env.AWS_REGION });
	}

	async putObject(params) {
		return this.s3.putObject(params).promise();
	}

	async getObject(params) {
		return this.s3.getObject(params).promise();
	}

	async getSignedUrl(params) {
		return this.s3.getSignedUrl('getObject', params);
	}
};
