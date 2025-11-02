// app/data/product.js

import { getProductBySlug } from "../products/[slug]/data/product"; // adjust if your getProductBySlug file is elsewhere

// If each product has its own slug file, import them individually here
export const featuredProducts = [
  getProductBySlug("hoodie-1"),
  getProductBySlug("shirt-1"),
  getProductBySlug("cap-1"),
];

export const carouselProducts = [
  getProductBySlug("hoodie-2"),
  getProductBySlug("shirt-2"),
  getProductBySlug("jacket-1"),
  getProductBySlug("cap-2"),
];
