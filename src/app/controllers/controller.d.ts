import { FastifyRequest } from 'fastify'

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
  Body: { name: string, family_id: number, file: {} }
  File: { file: string }
}>

export type PostCharacter = FastifyRequest<{
  Params: { id: string },
  Body: { name: string, family_id: number, file: {} }
  File: { file: string }
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