export const routes = {
  dev: '/dev',
  admin: {
    root: '/admin',
    account: '/admin/account',
    preferences: '/admin/preferences',
    categories: '/admin/categories',
    options: '/admin/options',
    templates: '/admin/templates',
    blocks: {
      root: '/admin/blocks',
      update: '/admin/blocks/:id',
      create: '/admin/blocks/create'
    },
    products: {
      root: '/admin/products',
      update: '/admin/products/:id',
      create: '/admin/products/create'
    },
    users: '/admin/users'
  },
  public: {
    root: '/',
    auth: '/auth',
    products: {
      root: '/products',
      one: '/products/:id'
    },
    info: '/info/:page'
  }
}
