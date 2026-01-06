import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Prop Firm Reviews - TradeXY",
    description: "Compare and review the best proprietary trading firms. Find trusted prop firms with expert reviews and detailed comparisons.",
};

export default function PropFirmsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

