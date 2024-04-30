"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const SecretLayout = ({ children, params }) => {
    const [loading, setLoading] = React.useState(true);

    const router = useRouter();

    React.useEffect(() => {
        const handler = async () => {
            const token = localStorage.getItem('token') ?? null;
            if (token === params.token) {
                router.push('/')
            } else {
                setLoading(false);
            }
        }
        handler();
    }, [])

    return loading ? <div>Loding...</div> : children;
}

export default SecretLayout