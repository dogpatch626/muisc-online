"use client"

import { useState, ComponentProps } from 'react'

type ActiveChannelProps = ComponentProps<'div'> & {
    channel: { id: number, content: React.ReactElement }
}


export default function ActiveChannel({ channel }: ActiveChannelProps) {
    return (
        <div className='w-12/12 h-12/12'>{channel.content}</div>
    )
}
