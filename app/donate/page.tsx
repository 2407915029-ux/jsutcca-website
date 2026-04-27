import { Banknote, HeartHandshake, QrCode } from "lucide-react";

const uses = ["绝育费用", "就医费用", "猫粮猫砂", "救助用品"];

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-salmon">一起支持</p>
      <h1 className="mt-2 text-3xl font-bold">捐款途径</h1>
      <p className="mt-4 max-w-3xl leading-8 text-stone-700">捐款将用于猫咪绝育、医疗、猫粮、猫砂、救助用品等。每一份支持都会帮助校园猫得到更稳定的照护。</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 font-bold">
            <QrCode className="text-salmon" />
            PayPal 二维码
          </div>
          <div className="mt-5 flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-orange-200 bg-cream text-center text-stone-500">
            PayPal 二维码稍后更新
          </div>
        </section>
        <section className="grid gap-4">
          {["微信支付", "支付宝", "银行转账"].map((item) => (
            <div key={item} className="rounded-lg bg-white p-5 shadow-soft">
              <div className="flex items-center gap-2 font-bold">
                <Banknote className="text-leaf" size={20} />
                {item}
              </div>
              <p className="mt-2 text-sm text-stone-600">捐款方式稍后更新。</p>
            </div>
          ))}
        </section>
      </div>
      <section className="mt-8 rounded-lg bg-white p-6 shadow-soft">
        <div className="flex items-center gap-2 font-bold">
          <HeartHandshake className="text-salmon" />
          捐款用途说明
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {uses.map((item) => <div key={item} className="rounded-lg bg-orange-50 p-4 text-center font-semibold">{item}</div>)}
        </div>
      </section>
      <section className="mt-8 rounded-lg border border-dashed border-orange-200 bg-white/70 p-6">
        <h2 className="font-bold">捐款公示</h2>
        <p className="mt-2 text-sm text-stone-600">账目明细正在整理中，后续会在这里公开展示。</p>
      </section>
    </div>
  );
}
