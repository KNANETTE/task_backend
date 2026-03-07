type RelationAttribute = {
    type?: string
    relation?: string
    target?: string
    mappedBy?: string
    inversedBy?: string
}

export async function cascadeDelete(uid: string, id: number) {
    const model = strapi.getModel(uid as any)
    const attributes = Object.entries(model.attributes)

    for (const [_, attribute] of attributes) {
        const castedAttribute = attribute as RelationAttribute
        if (castedAttribute.type !== 'relation') continue
        if (castedAttribute.relation !== 'oneToMany') continue
        if (!castedAttribute.mappedBy && !castedAttribute.inversedBy) continue

        const targetUID = castedAttribute.target
        const foreignKey = castedAttribute.mappedBy || castedAttribute.inversedBy
        const children = await strapi.db.query(targetUID).findMany({ where: { [foreignKey]: id } })

        for (const child of children) {
            await cascadeDelete(targetUID, child.id)
            await strapi.db.query(targetUID).delete({ where: { id: child.id } })
        }
    }
}