type RelationAttribute = {
    type?: string
    relation?: string
    target?: string
    mappedBy?: string
    inversedBy?: string
}

export async function cascadeDelete(uid: string, id: number, visited = new Set()) {
    if (visited.has(`${uid}:${id}`)) return
    visited.add(`${uid}:${id}`)

    const model = strapi.getModel(uid as any)

    for (const [_, attribute] of Object.entries(model.attributes)) {
        const attr = attribute as RelationAttribute

        if (!attr.mappedBy && !attr.inversedBy) continue
        if (attr.type !== 'relation') continue
        if (!attr.target) continue

        const targetUID = attr.target
        const foreignKey = attr.mappedBy || attr.inversedBy
        const relationEntries = await strapi.db.query(targetUID).findMany({ where: { [foreignKey]: id } })

        for (const entry of relationEntries) {
            await cascadeDelete(targetUID, entry.id, visited)
            await strapi.db.query(targetUID).delete({ where: { id: entry.id } })
        }
    }
}