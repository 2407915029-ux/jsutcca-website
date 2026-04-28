import { Banknote, HeartHandshake, QrCode } from "lucide-react";
import { T } from "@/components/LanguageProvider";

const uses = ["donate.useSterilization", "donate.useMedical", "donate.useFood", "donate.useSupplies"];
const methods = ["donate.wechat", "donate.alipay", "donate.bank"];

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-salmon"><T k="donate.eyebrow" /></p>
      <h1 className="mt-2 text-3xl font-bold"><T k="donate.title" /></h1>
      <p className="mt-4 max-w-3xl leading-8 text-stone-700"><T k="donate.description" /></p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 font-bold">
            <QrCode className="text-salmon" />
            <T k="donate.paypalQr" />
          </div>
          <div className="mt-5 flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-orange-200 bg-cream text-center text-stone-500">
            <T k="donate.paypalPending" />
          </div>
        </section>
        <section className="grid gap-4">
          {methods.map((item) => (
            <div key={item} className="rounded-lg bg-white p-5 shadow-soft">
              <div className="flex items-center gap-2 font-bold">
                <Banknote className="text-leaf" size={20} />
                <T k={item} />
              </div>
              <p className="mt-2 text-sm text-stone-600"><T k="donate.methodPending" /></p>
            </div>
          ))}
        </section>
      </div>
      <section className="mt-8 rounded-lg bg-white p-6 shadow-soft">
        <div className="flex items-center gap-2 font-bold">
          <HeartHandshake className="text-salmon" />
          <T k="donate.usesTitle" />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {uses.map((item) => <div key={item} className="rounded-lg bg-orange-50 p-4 text-center font-semibold"><T k={item} /></div>)}
        </div>
      </section>
      <section className="mt-8 rounded-lg border border-dashed border-orange-200 bg-white/70 p-6">
        <h2 className="font-bold"><T k="donate.disclosureTitle" /></h2>
        <p className="mt-2 text-sm text-stone-600"><T k="donate.disclosureText" /></p>
      </section>
    </div>
  );
}
