import { cascadeDelete } from "../../../../utils/cascade_delete";

export default {
    async beforeCreate(event: any) {
        const ctx = strapi.requestContext.get()
        if (ctx?.state?.user) {
            event.params.data.owner = ctx.state.user.id
        }
    },

    async beforeDelete(event: any) {
        const id = event.params.where.id
        await cascadeDelete('api::board.board', id)
    },
}