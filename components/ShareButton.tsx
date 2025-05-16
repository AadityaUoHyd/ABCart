'use client';

import { Button } from "@/components/ui/button";
import { Share } from 'lucide-react';
import { useCallback } from 'react';

interface ShareButtonProps {
    title: string;
    text: string;
    url: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
    const handleShare = useCallback(async () => {
        try {
            await navigator.share({
                title,
                text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
                url,
            });
        } catch (err) {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
            console.error(err);
        }
    }, [title, text, url]);

    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={handleShare}
            className="text-pink-500 hover:text-red-600 transition-colors flex items-center gap-2 text-sm"
        >
            <Share size={16} />
            Share
        </Button>
    );
}