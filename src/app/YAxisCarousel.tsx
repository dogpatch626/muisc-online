"use client"

import { useState } from 'react'
const embeds = [
    <iframe className="embed" key={'mike'} src="https://www.youtube.com/embed/0cDe2pK4SoU?si=Wj_zYXZ5qdB7rX-B" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
];
export default function YAxisCarousel() {
    const [channels, updateChannels] = useState(embeds)
    return (
        <div className='w-12/12 h-12/12'>{embeds[0]}</div>
    )
}
