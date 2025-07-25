
import Link from "next/link";
import { Check, Crown, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for getting started",
        features: [
            "5 invoices per month",
            "Basic templates",
            "Email support",
            "Basic client management",
        ],
        cta: "Get Started",
        href: "/login",
        icon: <Zap className="h-6 w-6" />,
        variant: 'outline'
    },
    {
        name: "Pro",
        price: "$9",
        description: "Perfect for small businesses",
        features: [
            "Unlimited invoices",
            "Custom templates",
            "Priority support",
            "Advanced reporting",
            "Client portal",
            "Payment tracking",
        ],
        cta: "Subscribe to Pro",
        href: "/pricing",
        isPopular: true,
        icon: <Crown className="h-6 w-6" />,
        variant: 'default'
    },
    {
        name: "Business",
        price: "$19",
        description: "Perfect for growing companies",
        features: [
            "Everything in Pro",
            "Multi-user accounts",
            "API access",
            "Custom integrations",
            "Dedicated support",
            "White-label options",
        ],
        cta: "Subscribe to Business",
        href: "/pricing",
        icon: <Crown className="h-6 w-6" />,
        variant: 'outline'
    }
];

export function Pricing() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold font-headline">Simple, Transparent Pricing</h2>
                    <p className="text-muted-foreground mt-2">
                        Choose the perfect plan for your business needs. Start managing your invoices professionally.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto items-start">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={`flex flex-col ${plan.isPopular ? 'border-primary shadow-lg' : ''}`}>
                             <CardHeader className="items-center">
                                {plan.isPopular && <Badge className="mb-4">Most Popular</Badge>}
                                {plan.icon}
                                <CardTitle>{plan.name}</CardTitle>
                                <p className="text-4xl font-bold font-headline pt-2">{plan.price}<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2">
                                            <Check className="h-5 w-5 text-primary mt-1" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full" variant={plan.variant as any}>
                                    <Link href={plan.href}>{plan.cta}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <p className="text-muted-foreground">Ready to get started? <Link href="/login" className="text-primary hover:underline font-semibold">Create your account today.</Link></p>
                </div>
            </div>
        </section>
    );
}
