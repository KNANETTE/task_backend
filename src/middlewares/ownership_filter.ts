export default (config: any, { strapi }) => {
    return async (ctx: any, next: () => Promise<unknown>) => {
        const user = ctx.state?.user

        if (user && ctx.method === 'GET' && !ctx.params.id) {
            const rawFilters = ctx.query.filters
            const filters = rawFilters &&
                typeof rawFilters === 'object' &&
                !Array.isArray(rawFilters)
                ? rawFilters : {}

            ctx.query.filters = { ...filters, owner: user.id }
        }

        return next()
    }
}