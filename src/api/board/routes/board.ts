/**
 * board router
 */

import { factories } from '@strapi/strapi';

const uid = 'api::board.board'

export default factories.createCoreRouter(uid, {
    config: {
        findOne: {
            policies: [{ name: 'global::is_owner', config: { uid } }]
        },
        update: {
            policies: [{ name: 'global::is_owner', config: { uid } }]
        },
        delete: {
            policies: [{ name: 'global::is_owner', config: { uid } }]
        }
    }
});
