const urls = {
  // ========== AUTH ==========
  registerUser:"/auth/register/initiate",
  verifyUser:"/auth/register/verify",
  loginUser: "/auth/login",
  logoutUser:"/auth/logout",
  refreshAccess: "/auth/refresh",
  getCurrentUser:"/auth/me",
  changePassword:"/auth/change-password",
  forgotPassword:"/auth/forgot-password",
  resetPassword:"/auth/reset-password",

  // ========== BRANDS ==========
  getBrandBySlug: "/brands",
  getBrands: "/brands",

  // ========== CATEGORIES ==========
  getCategoryBySlug: "/categories",
  getCategories: "/categories",
  // ========== PRODUCTS ==========
  getProductBySlug: "/products",
  getNewProducts:"/products/new",
  getProducts: "/products",

  // ========== OFFERS ==========
  getOffers: "/offers",
  getOfferById: "/offers/admin",

  // ========== COMPANY INFO ==========
  getCompanyInfo: "/company-info",

  // ========== ABOUT US ==========
  getAboutUsPage: "/about-us",

  // ========== HERO SECTIONS ==========
  getHeroSections: "/hero-sections",
  getHeroSectionById: "/hero-sections/admin",
};

export default urls;