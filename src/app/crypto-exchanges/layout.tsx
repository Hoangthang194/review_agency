import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crypto Exchange Reviews - TradeXY",
    description: "Compare and review the best cryptocurrency exchanges. Find secure, reliable crypto trading platforms with expert reviews.",
};

export default function CryptoExchangesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

