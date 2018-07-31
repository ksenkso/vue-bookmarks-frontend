export default {
  all: {
    url: '/bookmarks',
    defaults: {
      method: 'GET'
    }
  },
  create: {
    url: '/bookmarks/create',
    defaults: {
      method: 'POST'
    }
  },
  delete(id) {
    return {
      url: '/bookmarks/delete/' + id,
      defaults: {
        method: 'DELETE'
      }
    };
  },
  view(id) {
    return {
      url: '/bookmarks/' + id,
      defaults: {
        method: 'GET'
      }
    };
  }
};
