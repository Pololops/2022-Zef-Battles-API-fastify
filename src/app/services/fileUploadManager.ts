import Fastify from'fastify'
import { writeFile, access, unlink } from 'fs';

const fastify = Fastify({ logger: true })

export const checkFile = (file: { data?: BufferEncoding; filename: string; mimetype: string; limit: boolean; }) => {
		if (file.limit) {
			throw new Error('This image file is too large. 2MB max.', /* { statusCode: 415 } */)
		}

		if (
			file.mimetype !== 'image/png' && 
			file.mimetype !== 'image/jpg' && 
			file.mimetype !== 'image/jpeg' && 
			file.mimetype !== 'image/webp'
		) {
			throw new Error('Only .png, .jpg and .jpeg format allowed!', /* { statusCode: 415 } */)
		}
};

export const saveFile = (filename: string, fileInBuffer: string | NodeJS.ArrayBufferView) => {
	const savedFilePath = `${process.env.UPLOADS_PATH}/${filename}`;

	writeFile(savedFilePath, fileInBuffer, (error) => {
		if (!error) {
			fastify.log.info(`file ${filename} saved`);
		} else {
			fastify.log.info(`file ${filename} not saved: `, error);
		}
	});
};

export const deleteFile = (filename: string) => {
	const deletedFilePath = `${process.env.UPLOADS_PATH}/${filename}`;

	access(deletedFilePath, (error) => {
		if (!error) {
			unlink(deletedFilePath, () => fastify.log.info(`file ${filename} deleted`));
		} else {
			fastify.log.info(`file ${filename} not found`);
		}
	});
};

