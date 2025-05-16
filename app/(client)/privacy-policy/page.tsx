import Container from "@/components/Container";
import Link from "next/link";

export default async function PrivacyPolicyPage() {
    return (
        <div className="bg-pink-50 min-h-screen">
            <Container className="py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Privacy Policy
                </h1>
                <div className="bg-white border border-pink-500/20 rounded-md p-6 shadow-md">
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            1. Introduction
                        </h2>
                        <p className="text-sm text-gray-600">
                            At ABCart, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            2. Information We Collect
                        </h2>
                        <p className="text-sm text-gray-600">
                            We may collect the following types of information:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li><strong>Personal Information:</strong> Name, email address, billing and shipping addresses, and payment information when you place an order.</li>
                            <li><strong>Non-Personal Information:</strong> Browser type, IP address, and browsing behavior on our site.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            3. How We Use Your Information
                        </h2>
                        <p className="text-sm text-gray-600">
                            We use your information to:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li>Process and fulfill your orders.</li>
                            <li>Send order confirmations and updates.</li>
                            <li>Improve our website and customer experience.</li>
                            <li>Send promotional emails (with your consent).</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            4. Data Sharing
                        </h2>
                        <p className="text-sm text-gray-600">
                            We do not sell or rent your personal information. We may share your data with:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li>Third-party service providers (e.g., payment processors, shipping companies) to fulfill orders.</li>
                            <li>Legal authorities if required by law.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            5. Data Security
                        </h2>
                        <p className="text-sm text-gray-600">
                            We use industry-standard encryption and security measures to protect your data. However, no online platform is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            6. Your Rights
                        </h2>
                        <p className="text-sm text-gray-600">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li>Access or correct your personal information.</li>
                            <li>Request deletion of your data.</li>
                            <li>Opt out of marketing communications.</li>
                        </ul>
                        <p className="text-sm text-gray-600">
                            To exercise these rights, contact us at <Link href="/contact" className="text-pink-500 hover:text-red-600">support@abcart.com</Link>.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            7. Cookies
                        </h2>
                        <p className="text-sm text-gray-600">
                            We use cookies to enhance your browsing experience and analyze site traffic. You can manage cookie preferences through your browser settings.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            8. Changes to This Policy
                        </h2>
                        <p className="text-sm text-gray-600">
                            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            9. Contact Us
                        </h2>
                        <p className="text-sm text-gray-600">
                            For questions about this Privacy Policy, please contact us at <Link href="/contact" className="text-pink-500 hover:text-red-600">support@abcart.com</Link>.
                        </p>
                    </section>
                </div>
            </Container>
        </div>
    );
}