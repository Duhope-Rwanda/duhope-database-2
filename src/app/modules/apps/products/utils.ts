import {
	S3Client,
	DeleteObjectCommand,
	PutObjectCommand,
	type PutObjectCommandInput,
	type DeleteObjectCommandInput
} from '@aws-sdk/client-s3';

const {
	REACT_APP_DIGITAL_OCEAN_KEY,
	REACT_APP_DIGITAL_OCEAN_SECRET,
	REACT_APP_BUCKET_NAME,
	REACT_APP_BUCKET_REGION
} = process.env;

if (
	!REACT_APP_DIGITAL_OCEAN_KEY ||
	!REACT_APP_DIGITAL_OCEAN_SECRET ||
	!REACT_APP_BUCKET_NAME ||
	!REACT_APP_BUCKET_REGION
) {
	throw new Error('Missing Digital Ocean Credentials');
}

const BUCKET_BASE_URL = `https://${REACT_APP_BUCKET_REGION}.digitaloceanspaces.com/`;
const BUCKET_URL = `https://${REACT_APP_BUCKET_NAME}.${REACT_APP_BUCKET_REGION}.digitaloceanspaces.com/`;

const client = new S3Client({
	region: REACT_APP_BUCKET_REGION,
	forcePathStyle: false, // Configures to use subdomain/virtual calling format.
	endpoint: BUCKET_BASE_URL,
	credentials: {
		accessKeyId: REACT_APP_DIGITAL_OCEAN_KEY,
		secretAccessKey: REACT_APP_DIGITAL_OCEAN_SECRET
	}
});

type Params = { files: File[]; folder_name: string };

export const upload_images = async ({ files, folder_name }: Params) => {
	try {
		const upload_promises = files.map(async (file) => {
			const upload_params: PutObjectCommandInput = {
				Bucket: REACT_APP_BUCKET_NAME,
				Key: `${folder_name}/${crypto.randomUUID()}`,
				Body: file,
				ContentType: file.type,
				ACL: 'public-read'
			};

			await client.send(new PutObjectCommand(upload_params));

			// will return a url in the format of `url/${image_id}`
			return BUCKET_URL + upload_params.Key;
		});

		// return all the urls
		return await Promise.all(upload_promises);
	} catch (error) {
		console.error(error);
	}
};

export async function delete_images(urls: string[]) {
	const delete_promises = urls.map(async (image_id) => {
		const image_key = image_id.replace(BUCKET_URL, '');
		const delete_params: DeleteObjectCommandInput = {
			Bucket: REACT_APP_BUCKET_NAME,
			Key: image_key
		};
		try {
			return await client.send(new DeleteObjectCommand(delete_params));
		} catch (error) {
			console.error('Deletion failed: ', error);
			return null;
		}
	});
	return await Promise.all(delete_promises);
}
