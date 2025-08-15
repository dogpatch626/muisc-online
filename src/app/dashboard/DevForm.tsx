import React from 'react'
type objType = {
    idk: number;
    meow: string;
}
const obj: objType = {}

export default function DevhtmlForm() {
    // create action

    async function createPost(formData: FormData) {
        'use server'
        const rawEvent = {
            artist: formData.get('artist'),
            songName: formData.get('song')?.toString().toLowerCase(),
            alias: formData.get('alias')?.toString().toLowerCase(),
            excerpt: formData.get('about')?.toString().toLowerCase(),
        };

        console.log(rawEvent);
    }


    return (
        <form action={createPost} style={{ display: 'flex', flexDirection: 'column', justifyItems: 'baseline' }}>

            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-white">Profile</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="artist" className="block text-white">Artist Name/ band</label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                    <input id="artist" type="text" name="artist" className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="link" className="block text-white">Link to video</label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                    <input id="link" type="text" name="link" className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="song" className="block text-white">Song Name</label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                    <input id="song" type="text" name="song" className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-white">About</label>
                            <div className="mt-2">
                                <textarea id="about" name="about" rows={15} cols={50} className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-white/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="alias" className="block text-sm/6 font-medium text-white">Alias</label>
                            <div className="mt-2">
                                <input id="alias" type="text" name="alias" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div >
                <button type='submit'>Submit</button>
            </div>
        </form >
    )
}
