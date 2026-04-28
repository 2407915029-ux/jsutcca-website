import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { T } from "@/components/LanguageProvider";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-salmon"><T k="shop.eyebrow" /></p>
      <h1 className="mt-2 text-3xl font-bold"><T k="shop.title" /></h1>
      <p className="mt-4 max-w-3xl leading-8 text-stone-700"><T k="shop.description" /></p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product.nameKey} product={product} />)}
      </div>
    </div>
  );
}
