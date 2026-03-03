/**
 * workspace router
 */

import { factories } from '@strapi/strapi';

const uid = 'api::workspace.workspace'

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
