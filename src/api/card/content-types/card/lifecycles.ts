export default {
    async beforeCreate(event: any) {
        const ctx = strapi.requestContext.get()
        if (ctx?.state?.user) {
            event.params.data.owner = ctx.state.user.id
        }
    }
}