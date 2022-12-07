export const createSchema = {
  consumes: ["multipart/form-data"],
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1
      },
      file: {
        type: 'object',
      }
    },
    required: ['name', 'file'],
  } as const
}

export const updateSchema = {
  consumes: ["multipart/form-data"],
  body: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        minimum: 1
      },
      name: {
        type: 'string',
        minLength: 1
      },
      family_id: {
        type: 'number',
        minimum: 1
      },
      file: {
        type: 'object',
      }
    },
    required: ['id', 'name', 'family_id', 'file'],
  } as const
}
