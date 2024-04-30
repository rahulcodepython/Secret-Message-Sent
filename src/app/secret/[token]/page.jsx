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

const Secret = ({ params }) => {
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState({
        name: '',
        message: ''
    })

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
        }).catch(error => {
            toast({
                title: "There is some issue",
                description: error.message,
            })
        }).finally(() => setLoading(false))
    }

    return (
        <section className='flex flex-col justify-center items-center h-screen'>
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
                <CardFooter>
                    <Button className="w-full" disabled={loading} onClick={() => createMessage()}>Send</Button>
                </CardFooter>
            </Card>
        </section>
    )
}

export default Secret