export const createSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1
      },
      description: {
        type: 'string',
      }
    },
    required: ['name'],
  } as const
}

export const updateSchema = {
  params: { type: 'object',
    properties: {
      id: {
        type: 'number',
        minimum: 1
      },
    }
  },
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
      description: {
        type: 'string',
      }
    },
    required: ['name'],
  } as const
}

export const associateCapacityToCharacterSchema = {
  params: { type: 'object',
    properties: {
      id: {
        type: 'number',
        minimum: 1
      },
    }
  },
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1
      },
      description: {
        type: 'string',
      },
      level: {
        type: 'integer', 
        minimum: 0, 
        maximum: 100
      }
    },
    required: ['name'],
  } as const
}

export const dissociateCapacityToCharacterSchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      capacityId: {
        type: 'string',
      },
    },
    required: ['id', 'capacityId'],
  } as const
}
