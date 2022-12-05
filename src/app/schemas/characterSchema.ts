export const createSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1
      },
      family_id: {
        type: 'integer',
        minimum: 1
      },
      file: {
        type: 'object',
      }
    },
    required: ['name', 'file', 'family_id'],
  } as const
}

export const updateSchema = {
  body: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        minimum: 1
      },
      name: {
        type: 'string',
        minLength: 1
      },
      family_id: {
        type: 'integer',
        minimum: 1
      },
      file: {
        type: 'object',
      }
    },
    required: ['name', 'file', 'family_id'],
  } as const
}