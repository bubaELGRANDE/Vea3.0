export const routes = {
    // Auth
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    refreshToken: '/auth/refresh-token',
    logout: '/auth/logout',
    revokeAllTokens: '/auth/revoke-all-tokens',

    // User
    getUser: '/users',
    updateUser: '/users/:id',
    deleteUser: '/users',

    // Publicacion
    getPublications: '/products',
    createPublication: '/products',
    getPublishingById: '/products/:id',
    updatePublication: '/products/:id',
    deletePublication: '/products/:id',


    // ventas
    getSales: '/sales',
    createSale: '/sales',
    updateSale: '/sales/:id',

    // Reviews
    getReviews: '/reviews',
    getReviewById: '/reviews/:id',
    getReviewAverage: '/reviews/product/:id/average-rating',
    createReview: '/reviews',
    updateReview: '/reviews',

    // chat
    getChat: '/chat',
    createChat: '/chat',
    getchatByBuyer: '/chat/buyer/:id',
    getchatBySeller: '/chat/seller/:id',
    updateChat: '/chat/:id',
    enableChat: '/chat/:id/enable',
    disableChat: '/chat/:id/disable',

    // Sellers
    getSellers: '/sellers',
    getSellerById: '/sellers/:id',
    updateSeller: '/sellers/:id',
    deleteSeller: '/sellers/:id',
    createSeller: '/sellers',

    // Buyers
    getBuyers: '/buyers',
    getBuyerById: '/buyers/:id',
    updateBuyer: '/buyers/:id',
    deleteBuyer: '/buyers/:id',
    createBuyer: '/buyers',

    // Catalogos
    getCategories: '/catalogos/categories',
    getPublishingStatus: '/catalogos/publishingstatus',
    getSaleStatus: '/catalogos/salestatus',
    getArticleStatus: '/catalogos/articlestatus',


    // Departments
    getDepartments: '/departments',
    getDepartmentById: '/departments/:id',
    getMunicipalities: '/municipalities',
    getMunicipalityById: '/municipalities/:id',
    getMunicipalitiesByDepartment: '/municipalities/department/:departmentId',

}