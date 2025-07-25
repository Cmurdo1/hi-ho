import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";

export default function PricingPage() {

    const features = [
        "Unlimited invoices",
        "Unlimited clients",
        "Unlimited items",
        "Email support",
        "Custom branding"
    ];

    const handleUpgrade = async () => {
        "use server";
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return redirect('/login');
        }
        
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.honestinvoice.com';

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{
                price: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
                quantity: 1,
            }],
            success_url: `${appUrl}/dashboard`,
            cancel_url: `${appUrl}/pricing`,
            customer_email: user.email,
        });

        if (checkoutSession.url) {
            redirect(checkoutSession.url);
        }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Pricing Plans</h1>
            <p className="text-lg text-muted-foreground mt-2">Choose the plan that's right for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <CardDescription>Perfect for getting started and exploring our features.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-4xl font-bold font-headline mb-4">$0 <span className="text-lg font-normal text-muted-foreground">/ month</span></p>
                    <ul className="space-y-2">
                        {features.slice(0, 3).map(feature => (
                            <li key={feature} className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full" disabled>Current Plan</Button>
                </CardFooter>
            </Card>
            <Card className="flex flex-col border-primary shadow-lg">
                <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>Unlock all features and get priority support.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                     <p className="text-4xl font-bold font-headline mb-4">$9 <span className="text-lg font-normal text-muted-foreground">/ month</span></p>
                    <ul className="space-y-2">
                        {features.map(feature => (
                            <li key={feature} className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                   <form action={handleUpgrade} className="w-full">
                        <Button className="w-full">Upgrade to Pro</Button>
                   </form>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
