'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    const extension = () => ({
      typeDefs: `
        type Query {
          post(slug: String!): PostEntityResponse
        }
      `,
      resolvers: {
        Query: {
          post: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                'plugin::graphql.format'
              ).returnTypes;
              const data = await strapi.services['api::post.post'].find({
                filters: { slug: args.slug },
              });
              const response = toEntityResponse(data.results[0]);
              return response;
            },
          },
        },
      },
    });
    extensionService.use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
