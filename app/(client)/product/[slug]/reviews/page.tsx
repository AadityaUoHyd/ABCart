import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/sanity/helpers";
import { LuStar } from "react-icons/lu";
import { notFound } from "next/navigation";

export default async function ReviewsPage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) {
        return notFound();
    }

    // Hardcoded reviews for static display
    const reviews = [
        {
            id: "1",
            userName: "Priya Reddy",
            rating: 5,
            comment: "Absolutely love this product! The quality is amazing and it arrived quickly.",
            createdAt: "2025-05-01",
        },
        {
            id: "2",
            userName: "Amit Kumar",
            rating: 4,
            comment: "Really nice item, but the packaging could be improved.",
            createdAt: "2025-04-28",
        },
        {
            id: "3",
            userName: "Chetan Gupta",
            rating: 5,
            comment: "Great product, I love the quality and the packaging is so nice!",
            createdAt: "2025-05-16",
        },
    ];

    return (
        <div className="bg-pink-50 min-h-screen">
            <Container className="py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Reviews for <span className="text-pink-500">{product.name}</span>
                </h1>

                {/* Mock Review Form (Non-functional) */}
                <div className="bg-white border border-pink-500/20 rounded-md p-6 mb-8 shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Write a Review
                    </h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rating
                            </label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <LuStar
                                        key={star}
                                        size={24}
                                        fill={star <= 5 ? "#fca99b" : "transparent"}
                                        className="text-pink-500"
                                        aria-label={`Rate ${star} stars`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Comment
                            </label>
                            <textarea
                                rows={4}
                                className="w-full border border-pink-500/20 rounded-md p-2 text-sm text-gray-800 focus:outline-none focus:border-pink-500"
                                placeholder="Share your thoughts about the product..."
                                disabled
                            />
                        </div>
                        <Button
                            disabled
                            className="bg-pink-500 text-white hover:bg-red-600 w-32 opacity-50 cursor-not-allowed"
                        >
                            Submit Review
                        </Button>
                    </div>
                </div>

                {/* Reviews List */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Customer Reviews ({reviews.length})
                    </h2>
                    <div className="flex flex-col gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white border border-pink-500/20 rounded-md p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <LuStar
                                                key={star}
                                                size={16}
                                                fill={star <= review.rating ? "#fca99b" : "transparent"}
                                                className={star <= review.rating ? "text-pink-500" : "text-gray-400"}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm font-medium text-gray-800">
                                        {review.userName}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}