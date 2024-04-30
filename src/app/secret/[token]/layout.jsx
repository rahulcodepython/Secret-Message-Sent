"use client"
import Loading from '@/components/loading';
import { Decrypt } from '@/utils';
import { useRouter } from 'next/navigation';
import React from 'react'

const SecretLayout = ({ children, params }) => {
    const [loading, setLoading] = React.useState(true);

    const router = useRouter();

    React.useEffect(() => {
        const handler = async () => {
            const token = Decrypt(localStorage.getItem('token'), process.env.ENCRYPTION_KEY) ?? null;
            if (token === params.token) {
                router.push('/')
            } else {
                setLoading(false);
            }
        }
        handler();
    }, [])

    return loading ? <Loading /> : children;
}

export default SecretLayout