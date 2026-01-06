import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BrokerDetailPage } from "@/components/BrokerDetailPage";
import { getBrokerData } from "@/data/mockData";
import { notFound } from "next/navigation";

export default async function PropFirmDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = getBrokerData("prop", slug);
    
    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
                <BrokerDetailPage
                    data={data}
                    type="prop"
                    backgroundImage="/market.jpg"
                />
            </main>
            <Footer />
        </div>
    );
}

