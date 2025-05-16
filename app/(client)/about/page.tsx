import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AboutPage() {
    return (
        <div className="bg-pink-50 min-h-screen">
            <Container className="py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    About ABCart
                </h1>
                <div className="bg-white border border-pink-500/20 rounded-md p-6 shadow-md">
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Our Story
                        </h2>
                        <p className="text-sm text-gray-600">
                            Founded in 2023, ABCart is your one-stop online store for high-quality, affordable products. We started with a simple mission: to bring joy and convenience to shopping by offering a curated selection of items that blend style, functionality, and value.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Our Mission
                        </h2>
                        <p className="text-sm text-gray-600">
                            At ABCart, we strive to make shopping effortless and delightful. We’re committed to providing exceptional customer service, fast shipping, and products that meet the highest standards of quality.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Why Shop with Us?
                        </h2>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li><strong>Curated Selection:</strong> Carefully chosen products to suit your lifestyle.</li>
                            <li><strong>Customer-Centric:</strong> Hassle-free returns, secure payments, and 24/7 support.</li>
                            <li><strong>Sustainability:</strong> We partner with eco-conscious brands to reduce our environmental impact.</li>
                            <li><strong>Affordable Prices:</strong> Quality products at prices that won’t break the bank.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Our Values
                        </h2>
                        <p className="text-sm text-gray-600">
                            Integrity, innovation, and customer satisfaction are at the heart of everything we do. We believe in building trust with our customers through transparency and reliability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Get in Touch
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Have questions or want to learn more about ABCart? We’d love to hear from you!
                        </p>
                        <Button asChild className="bg-pink-500 text-white hover:bg-red-600">
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </section>
                </div>
            </Container>
        </div>
    );
}