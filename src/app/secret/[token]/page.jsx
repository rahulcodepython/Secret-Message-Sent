"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Decrypt, Encrypt } from '@/utils'
import Loading from '@/components/loading'
import Link from 'next/link'

const Secret = ({ params }) => {
    const [pageLoading, setPageLoading] = React.useState(true)
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState({
        name: '',
        message: ''
    })
    const [messageSent, setMessageSent] = React.useState(true)

    React.useEffect(() => {
        const alreadyMessageSent = Decrypt(localStorage.getItem('alreadyMessageSent'), process.env.ENCRYPTION_KEY) ?? null;

        if (!alreadyMessageSent) {
            setMessageSent(false)
        } else {
            const messageSentObj = JSON.parse(alreadyMessageSent)
            if (messageSentObj[params.token]) {
                setMessageSent(true)
                toast({
                    title: "You have already sent a message to him."
                })
            } else {
                setMessageSent(false)
            }
        }
        setPageLoading(false)
    }, [])

    const createMessage = async () => {
        if (message.name.length < 3 || message.message.length < 3) {
            toast({
                title: "Please enter your name and message properly. Minimum 3 characters required"
            })
            return;
        }
        setLoading(true)
        await axios.post(`/api/createMessage/${params.token}`, message).then(() => {
            toast({
                title: "Message sent successfully."
            })
            setMessage({
                name: '',
                message: ''
            })
            setMessageSent(true)
            const alreadyMessageSent = Decrypt(localStorage.getItem('alreadyMessageSent'), process.env.ENCRYPTION_KEY) ?? null;
            if (!alreadyMessageSent) {
                localStorage.setItem('alreadyMessageSent', Encrypt(JSON.stringify({ [params.token]: true }), process.env.ENCRYPTION_KEY))
            } else {
                const messageSentObj = JSON.parse(alreadyMessageSent)
                messageSentObj[params.token] = true
                localStorage.setItem('alreadyMessageSent', Encrypt(JSON.stringify(messageSentObj), process.env.ENCRYPTION_KEY))
            }
        }).catch(error => {
            toast({
                title: "There is some issue",
                description: error.message,
            })
        }).finally(() => setLoading(false))
    }

    return pageLoading ? <Loading /> : <section className='flex flex-col justify-center items-center h-screen'>
        <Card className="max-w-2xl w-full">
            <CardHeader>
                <CardTitle className="text-center">Message Board</CardTitle>
                <CardDescription className="w-full flex justify-center pt-4">
                    <ul className='list-disc'>
                        <li>Messages are end-to-end encrypted</li>
                        <li>Enter your crispy name.</li>
                    </ul>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Input type="text" value={message.name} onChange={e => setMessage({ ...message, name: e.target.value })} placeholder="Enter you name" />
                <Textarea value={message.message} onChange={e => setMessage({ ...message, message: e.target.value })} placeholder="Enter your message" />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" disabled={loading ? true : messageSent} onClick={() => createMessage()}>Send</Button>
                <Link href="/" className='w-full'>
                    <Button className="w-full">
                        Create Our Own Profile
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    </section>
}

export default Secret