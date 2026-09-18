const urls = {
  // ========== AUTH ==========
  loginUser: "/auth/login",
  refreshAccess: "/auth/refresh",

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
  getProductById: "/products/admin",

  // ========== OFFERS ==========
  getOffers: "/offers",
  getOfferById: "/offers/admin",

  // ========== COMPANY INFO ==========
  getCompanyInfo: "/company-info",

  // ========== ABOUT US ==========
  getAboutUsStory: "/about-us/story",
  getAboutUsPromises: "/about-us/promises",
  getAboutUsFAQs: "/about-us/faqs",

  // ========== HERO SECTIONS ==========
  getHeroSections: "/hero-sections",
  getHeroSectionById: "/hero-sections/admin",
};

export default urls;