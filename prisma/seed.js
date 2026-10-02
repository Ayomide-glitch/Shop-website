const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const INITIAL_PRODUCTS = [
  {
    title: "Small-Batch Smoked Pepper Relish",
    slug: "small-batch-smoked-pepper-relish",
    description: "Slow-roasted scotch bonnets, charred red bell peppers, smoked sweet onions, and virgin palm oil. Handcrafted in Auntie Kemi's iron pot according to a 40-year family recipe.",
    price: 14.50,
    category: "Pantry & Condiments",
    inventory: 45,
    image: "/images/products/pepper-relish.jfif",
    badge: "Bestseller",
    featured: true,
  },
  {
    title: "Stone-Roasted Crunchy Groundnuts",
    slug: "stone-roasted-crunchy-groundnuts",
    description: "Sun-dried heirloom groundnuts gently tossed in coarse mineral sea salt and slow-roasted over wood-fired river stones for an unmistakable, nostalgic deep crunch.",
    price: 9.00,
    category: "Artisan Snacks",
    inventory: 60,
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80",
    badge: "Heritage Roast",
    featured: true,
  },
  {
    title: "Raw Whipped Golden Shea Butter Balm",
    slug: "raw-whipped-shea-butter-balm",
    description: "Grade-A unrefined wild shea butter hand-whipped with cold-pressed baobab oil and calming sweet orange essential oil. Deep nourishment for hands, body, and dry skin.",
    price: 18.00,
    category: "Apothecary & Body",
    inventory: 35,
    image: "/images/products/shea-butter.jfif",
    badge: "Organic",
    featured: true,
  },
  {
    title: "Hibiscus, Ginger & Dried Clove Infusion",
    slug: "hibiscus-ginger-clove-infusion",
    description: "Whole crimson calyxes of dried hibiscus flowers, sun-cured fiery ginger roots, and aromatic cloves. Brew warm for comforting spice or steep iced with fresh citrus.",
    price: 12.00,
    category: "Botanicals & Teas",
    inventory: 50,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    badge: "Small Batch",
    featured: false,
  },
  {
    title: "Raw Wildflower Honey (Highland Harvest)",
    slug: "raw-wildflower-honey",
    description: "Pure, unfiltered honey harvested straight from wild woodland apiaries in the Oyo hills. Rich, floral amber notes with beneficial natural enzymes intact.",
    price: 16.50,
    category: "Pantry & Condiments",
    inventory: 28,
    image: "/images/products/honey.jfif",
    badge: "Unfiltered",
    featured: true,
  },
  {
    title: "Heritage Suya Spice Finishing Rub",
    slug: "heritage-suya-spice-rub",
    description: "Our authentic Yaji dry rub milled with toasted roasted groundnut flour, ginger, garlic, cayenne, and aromatic grains of selim. Perfect for grilled meats, roasted veggies, or eggs.",
    price: 10.50,
    category: "Pantry & Condiments",
    inventory: 70,
    image: "/images/products/suya-spices.jpg",
    badge: "Family Recipe",
    featured: false,
  },
  {
    title: "Caramelized Plantain Kettle Crisps",
    slug: "caramelized-plantain-kettle-crisps",
    description: "Naturally sweet yellow plantains sliced wafer-thin and flash-kettled in pure coconut oil with a dusting of fine Atlantic sea salt.",
    price: 7.50,
    category: "Artisan Snacks",
    inventory: 85,
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=800&q=80",
    badge: "Snack Favorite",
    featured: false,
  },
  {
    title: "Calming Lemongrass & Peppermint Herbal Leaves",
    slug: "lemongrass-peppermint-leaves",
    description: "Estate-grown lemongrass stalks and fragrant peppermint leaves harvested at dawn. Naturally caffeine-free infusion designed for evening peace and digestion.",
    price: 11.00,
    category: "Botanicals & Teas",
    inventory: 40,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    badge: "Caffeine Free",
    featured: false,
  },
];

async function main() {
  console.log("🌱 Updating Kemi's Artisan Pantry products in PostgreSQL database...");

  for (const product of INITIAL_PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
    console.log(`✓ Seeded product: ${product.title}`);
  }

  console.log("🎉 Seeding complete! Database is populated with artisan provisions.");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
