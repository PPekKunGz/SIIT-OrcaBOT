
"use client"
import { SessionContextValue, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Props = {
    session: SessionContextValue<boolean>
    title: string
    description: string
    datatitle: string
}


export default function TitlePage({ session, title, description, datatitle }: Props) {

    const [toggleData, setToggleData] = useState<boolean>(false)

    const toggleEdit = async () => {
        const res = await fetch(`${process.env.apiUrl}/public/toggleEdit.json`, {
            method: 'GET',
        })
        const dataRes: { toggleEdit: boolean } = await res.json();
        setToggleData(dataRes.toggleEdit)
    }

    const Editable = async (a: boolean) => {
        const res = await fetch(`${process.env.apiUrl}/apis/v1/admin/@register/toggleEdit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'dms_token': session.data?.user.accessToken || ""
            },
            body: JSON.stringify({
                toggle: a
            })
        })
        const { code }: { code: number } = await res.json();

        if (code === 200) {
            toggleEdit()
        }
    }

    const sendEdit = async () => {
        Editable(!toggleData)
    }

    useEffect(() => {
        toggleEdit()
    }, [])

    const isemailmatch = session.data?.user.email === '6622771309@g.siit.tu.ac.th';


    return (
        <div className="grid md:grid-cols-2 md:grid-rows-1">
            <div>
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
            </div>
            <div className="flex justify-end">
                {isemailmatch && (
                    <label className="inline-flex items-center cursor-pointer flex-col gap-2 md:px-20 px-0">
                        <span className="ms-3 md:text-sm text-xs font-medium text-gray-900 dark:text-gray-300">
                            {datatitle}
                        </span>
                        <input
                            type="checkbox"
                            checked={toggleData}
                            onChange={sendEdit}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    </label>
                )}
            </div>
        </div>
    );
};