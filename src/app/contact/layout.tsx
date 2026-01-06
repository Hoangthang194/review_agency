import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - TradeXY",
    description: "Get in touch with TRADEXY. Contact us for inquiries, support, or any questions about our forex trading services.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

