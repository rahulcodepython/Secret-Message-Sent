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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { Decrypt, Encrypt } from '@/utils'
import Loading from '@/components/loading'

const Home = () => {
    const [pageLoading, setPageLoading] = React.useState(true)
    const [link, setLink] = React.useState('')
    const [name, setName] = React.useState('')
    const [messages, setMessages] = React.useState([])
    const [newUser, setNewUser] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        const handler = async () => {
            const token = Decrypt(localStorage.getItem('token'), process.env.ENCRYPTION_KEY) ?? null;

            if (token) {
                await axios.get(`/api/secretLink/${token}`).then(async res => {
                    setNewUser(false)
                    setLink(res.data.link)
                    setName(res.data.name)
                    await axios.get(`/api/fetchMessage/${token}`).then(res => {
                        setMessages(res.data.message)
                    })
                }).catch(err => {
                    localStorage.removeItem('token')
                    setNewUser(true)
                    toast({
                        title: "There is some issue",
                        description: err.message,
                    })
                })
            } else {
                setNewUser(true)
            }
            setPageLoading(false)
        }
        handler();
    }, [])

    const generateLink = async () => {
        if (name.length > 3) {
            setLoading(true)
            await axios.post('/api/generateLink', { name }).then(res => {
                setNewUser(false)
                setLink(res.data.link)
                localStorage.setItem('token', Encrypt(res.data.token, process.env.ENCRYPTION_KEY))
                toast({
                    title: "Your link is generated."
                })
            }).catch(err => {
                setName('')
                toast({
                    title: "There is some issue",
                    description: err.message,
                })
            }).finally(() => setLoading(false))
        } else {
            toast({
                title: "Name should be more than 3 characters."
            })
        }
    }

    return pageLoading ? <Loading /> : <section className='flex flex-col items-center justify-center h-full space-y-8 my-24'>
        <Card className="max-w-2xl w-full">
            <CardHeader>
                <CardTitle className="text-center">Secret Message{`${newUser}`}</CardTitle>
                <CardDescription className="text-center">
                    Hi, Your link has been generated SuccessfullyNow share your link with your friends:
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2 mb-4'>
                    <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter you name" readOnly={!newUser} />
                    <Button className="w-full" onClick={() => generateLink()} disabled={loading ? true : !newUser}>Generate Link</Button>
                </div>
                <Input type="text" value={link} readOnly={true} />
            </CardContent>
            <CardFooter>
                <Button className="w-full">Copy Link</Button>
            </CardFooter>
        </Card>
        {
            !newUser && <Card className="max-w-4xl w-full">
                <CardHeader>
                    <CardTitle className="text-center">Message</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {
                        messages.length === 0 ? <div>No Message</div> : messages.map((item, index) => {
                            return <div className='flex flex-col justify-start w-full items-start gap-2' key={index}>
                                <Input type="text" value={item.msg} readOnly={true} />
                                <span className='text-xs text-right w-full'>
                                    Name: {item.name}
                                </span>
                            </div>
                        })
                    }
                </CardContent>
            </Card>
        }
    </section>
}

export default Home