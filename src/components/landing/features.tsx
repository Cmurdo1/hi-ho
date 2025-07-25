
import { FileText, Users, BarChart2, CreditCard } from "lucide-react";

const featureItems = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Professional Invoices",
    description: "Create stunning, professional invoices with customizable templates.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Client Management",
    description: "Organize and manage all your clients in one centralized location.",
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    title: "Analytics & Reports",
    description: "Track your revenue, monitor payments, and get insights into your business.",
  },
    {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Payment Tracking",
    description: "Monitor payment status and send automatic payment reminders.",
    }
];

export function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-headline">Everything you need to manage invoices</h2>
          <p className="text-muted-foreground mt-2">
            Powerful features designed to streamline your billing process and help you get paid faster.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featureItems.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold font-headline">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
