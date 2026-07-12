import { MessageSquareText, FileBarChart, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const items = [
  { icon: MessageSquareText, text: "Every lead texted to your phone" },
  { icon: FileBarChart, text: "A monthly report in plain English" },
  { icon: MapPin, text: "A real human + AI team in Franklin, TN" },
];

const IncludedStrip = () => (
  <section className="py-10 px-6 bg-card border-y border-border">
    <div className="container mx-auto max-w-4xl">
      <ScrollReveal>
        <p className="text-center text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-6">
          Every plan includes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {items.map((item) => (
            <div key={item.text} className="flex flex-col items-center gap-2">
              <item.icon size={22} className="text-primary" />
              <p className="text-sm font-semibold text-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default IncludedStrip;
