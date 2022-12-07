import { FastifyRequest } from 'fastify'

export type MultipartFormFiles = {
  data: BufferEncoding,
  filename: string,
  mimetype: string,
  limit: boolean
}

export type GetByPk = FastifyRequest<{
  Params: { id: string }
}>

export type DeleteByPk = FastifyRequest<{
  Params: { id: string }
}>

export type GetFamilies = FastifyRequest<{
  Querystring: { withcharacters?: true }
}>

export type PostFamily = FastifyRequest<{
  Params: { id: string },
  Body: { name: string }
}>

export type PatchFamily = FastifyRequest<{
  Params: { id: string },
  Body: { id: number, name: string }
}>

export type PostCharacter = FastifyRequest<{
  Params: { id: string },
  Body: { name: string, file: MultipartFormFiles[] }
}>

export type PatchCharacter = FastifyRequest<{
  Params: { id: string },
  Body: { name: string, family_id: number, file: MultipartFormFiles[] }
}>

export type PostCapacity = FastifyRequest<{
  Body: { name: string, description?: string }
}>

export type PatchCapacity = FastifyRequest<{
  Params: { id: string },
  Body: { name: string, description?: string }
}>

export type AssociateCapacityToCharacter = FastifyRequest<{
  Params: { id: string },
  Body: { name: string, description?: string, level: number }
}>

export type DissociateCapacityFromCharacter = FastifyRequest<{
  Params: { id: string, capacityId: string },
}>