import Ajv from 'ajv';
const ajv = new Ajv();

export default interface CreatePostDto {
  title: string;
  body: string;
  image: string;
}

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    body: { type: 'string' },
    image: { type: 'string' },
  },
  required: ['title', 'body', 'image'],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
