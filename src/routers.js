const resources = (prefix, { router, controller }) => {
  router.get(`${prefix}/`, controller.list);
  router.post(`${prefix}/`, controller.create);
  router.get(`${prefix}/:id`, controller.get);
  router.delete(`${prefix}/:id`, controller.destroy);
  router.put(`${prefix}/:id`, controller.update);
};

const resourcesAuth = (prefix, { router, middleware, controller }) => {
  router.get(`${prefix}/`, middleware, controller.list);
  router.post(`${prefix}/`, middleware, controller.create);
  router.get(`${prefix}/:id`, middleware, controller.get);
  router.delete(`${prefix}/:id`, middleware, controller.destroy);
  router.put(`${prefix}/:id`, middleware, controller.update);
};

const namespaceCreator = (namespace = '/') => (url = '') => `${namespace}${url}`;


const namespaceIndexCreator = namespace => urls => namespace()
  .split('/')
  .filter(word => !!word)
  .reduceRight((pre, cur) => ({
    [cur]: pre,
  }), urls);

const defaultNamespace = url => `/${url}`;

const resourceWithAuth = (url, controller, {
  router,
  middleware,
  namespace = defaultNamespace,
}) => (
  resourcesAuth(namespace(url), {
    controller,
    router,
    middleware,
  })
);

const resourceList = (url, { custom = [], namespace = defaultNamespace } = {}) => ([
  ...[
    controller => (`[get] ${controller}`),
    controller => (`[post] ${controller}`),
    controller => (`[get] ${controller}/:id`),
    controller => (`[delete] ${controller}/:id`),
    controller => (`[put] ${controller}/:id`),
  ].map(method => method(namespace(url))),
  ...custom,
]);


module.exports = {
  resources,
  resourcesAuth,
  namespaceCreator,
  namespaceIndexCreator,
  resourceWithAuth,
  resourceList,
};
