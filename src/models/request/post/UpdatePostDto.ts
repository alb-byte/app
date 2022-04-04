import Ajv from 'ajv';
const ajv = new Ajv();

export default interface UpdatePostDto {
  _id: string;
  title: string;
  body: string;
  image: string;
}

const schema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    title: { type: 'string' },
    body: { type: 'string' },
    image: { type: 'string' },
  },
  required: ['_id', 'title', 'body'],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
