import Image from "next/image";
import { ShoppingBag } from "lucide-react";

type Product = {
  name: string;
  description: string;
  price: string;
  stockStatus: string;
  purchaseChannel: string;
  image: string;
  note?: string;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-soft">
      <div className="relative aspect-[4/3] bg-yellow-50">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">{product.stockStatus}</span>
        </div>
        <p className="text-2xl font-bold text-salmon">{product.price}</p>
        <p className="text-sm leading-7 text-stone-700">{product.description}</p>
        {product.note ? <p className="text-xs text-stone-500">{product.note}</p> : null}
        <div className="flex items-center gap-2 rounded-lg bg-orange-50 p-3 text-sm text-stone-700">
          <ShoppingBag size={17} />
          {product.purchaseChannel}
        </div>
      </div>
    </article>
  );
}
