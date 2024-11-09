"use client"; // Mark this as a client component

import Link from "next/link";

interface Product {
  slug: string;
  name: string;
  images: []; // Assuming you have images for products
  current_price: number;
}

const ProductList = ({ products }: { products: Product[] }) => {
  if (!products || products.length === 0)
    return <div>No products available.</div>;

  return (
    <section className="pb-10" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
        {products.results.map((product) => (
          <article
            key={product.slug}
            className="bg-white p-3 shadow hover:shadow-lg transition-shadow"
          >
            <Link href={`/products/${product.slug}`}>
              <div className="h-80  bg-gray-200  mb-4">
                {/* Product Image */}
                {product.images[0] ? (
                  <img
                    src={product.images[0].image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  ""
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-foreground">
                Price: {product.current_price}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
