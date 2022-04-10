import { BlobServiceClient } from '@azure/storage-blob';
import sharp from 'sharp';
import { v4 as generateUuid } from 'uuid';
import config from '../libs/config';
import { InternalServerError, NotFoundError } from '../exception/httpError';
import { isStatusCodeSuccess } from '../utils/http';

const resize = async (buffer: Buffer, width = 500, height = 500): Promise<Buffer> => {
  return sharp(buffer).resize(width, height).jpeg().toBuffer();
};

async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Array<Uint8Array> = [];
    readableStream.on('data', (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
}
interface CreateFileResponse {
  fileName: string;
}
export const save = async (file: Express.Multer.File): Promise<CreateFileResponse> => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    config.azureBlobStorage.connectionString,
  );
  const containerClient = blobServiceClient.getContainerClient(
    config.azureBlobStorage.blobContainerName,
  );
  const blobName = generateUuid() + '.jpg';
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(file.buffer, file.buffer.byteLength);
  if (isStatusCodeSuccess(uploadBlobResponse._response.status)) return { fileName: blobName };
  else throw new InternalServerError('save file error');
};

export const get = async (
  dto: { fileName: string },
  width: number,
  height: number,
): Promise<Buffer> => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    config.azureBlobStorage.connectionString,
  );
  const containerClient = blobServiceClient.getContainerClient(
    config.azureBlobStorage.blobContainerName,
  );
  const blobName = dto.fileName;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const downloadBlockBlobResponse = await blockBlobClient.download(0);
  if (downloadBlockBlobResponse.readableStreamBody) {
    const fileBuffer: Buffer = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);

    const modifiedBuffer: Buffer = await resize(fileBuffer, width, height);
    return modifiedBuffer;
  } else throw new NotFoundError('file not found');
};
