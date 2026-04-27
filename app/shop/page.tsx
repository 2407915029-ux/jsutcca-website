import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-salmon">公益周边</p>
      <h1 className="mt-2 text-3xl font-bold">周边商品</h1>
      <p className="mt-4 max-w-3xl leading-8 text-stone-700">周边收益将用于校园猫咪救助。第一版先展示商品信息，购买渠道后续更新。</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product.name} product={product} />)}
      </div>
    </div>
  );
}
