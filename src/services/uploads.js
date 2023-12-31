require('dotenv').config()
const aws = require('aws-sdk')


const endpoint = new aws.Endpoint(process.env.ENDPOINT_BACKBLAZE);

const s3 = new aws.S3({
	endpoint,
	credentials: {
		accessKeyId: process.env.KEY_ID,
		secretAccessKey: process.env.APP_KEY
	}
});

const uploadImagem = async (originalname, buffer, mimetype) => {
	const imagem = await s3.upload({
		Bucket: process.env.BACKBLAZE_BUCKET,
		Key: originalname,
		Body: buffer,
		ContentType: mimetype
	}).promise()

	return {
		url: imagem.Location
	}
};

const excluirImagem = async (path) => {
	await s3.deleteObject({
		Bucket: process.env.BACKBLAZE_BUCKET,
		Key: path
	}).promise()
};

module.exports = {
	uploadImagem,
	excluirImagem
}