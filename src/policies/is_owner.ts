import { errors } from '@strapi/utils'
const { ForbiddenError, NotFoundError, UnauthorizedError } = errors

export default async (ctx: any, config: any, { strapi }: any) => {
    const user = ctx.state?.user
    if (!user) throw new UnauthorizedError("Vous êtes vous connecté?")

    const { id } = ctx.params
    if (!id) throw new NotFoundError("Auriez vous oublié de préciser un ID?")

    const uid = config?.uid
    if (!uid) throw new ForbiddenError("Vous n'avez pas accès ici!")

    const entry = await strapi.db.query(uid).findOne({ where: { documentId: id }, populate: { owner: true } })
    if (!entry) throw new NotFoundError("Aucun résultat ne correspond à cette recherche!")
    if (entry.owner?.id !== user.id) throw new ForbiddenError("L'accès à cette ressource vous est refusé!")

    return true
}