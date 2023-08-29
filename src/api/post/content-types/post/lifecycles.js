async function incrementViews(event) {
    if (typeof event.params.where.slug === 'undefined') {
        return;
    }
  
    await strapi.db.query('api::post.post').update({
      where: {
        id: event.result[0].id,
      },
      data: {
        views: event.result[0].views+1,
      },
    });
  }
  
  module.exports = {
    afterFindMany: incrementViews,
  };