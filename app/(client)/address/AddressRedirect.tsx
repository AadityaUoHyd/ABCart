'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AddressRedirect() {
    const { user, isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn && user && !user.publicMetadata.address && window.location.pathname !== '/address') {
            router.push('/address');
        }
    }, [user, isSignedIn, router]);

    return null;
}