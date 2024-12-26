"use client"

import Loading from "../loading"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DataRegister {
    id: number
    email: string
    name: string
    role: string
    status: string,
    createdAt: string
    updatedAt: string
}

type SortOrder = 'asc' | 'desc';

export default function RegisterPage() {
    const session = useSession();
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [registerData, setRegisterData] = useState<DataRegister[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof DataRegister>('id');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    if (session.data?.user.backend?.role != "ADMIN") {
        const msg = "%c Hey!! You're not ADMIN!"
        const styles = [
            'font-size: 12px',
            'font-family: monospace',
            'background: white',
            'display: inline-block',
            'color: black',
            'padding: 8px 19px',
            'border: 1px dashed;'
        ].join(';')
        console.log(msg, styles);
        router.push("/")
    }

    const emailToStudent = (a: string | null | undefined) => {
        if (a == undefined || a == null) return ""
        return a.split("@")[0]
    }

    const registerCount = async () => {
        const res = await fetch(`${process.env.apiUrl}/apis/v1/admin/@register/personal`, {
            method: 'POST',
            headers: {
                'dms_token': session.data?.user.accessToken || ""
            },
        })
        const { code, personalData }:
            { data: any, message: string, code: number, personalData: DataRegister[] } = await res.json();

        if (code === 200) {
            setRegisterData(personalData)
            return;
        }
    }

    useEffect(() => {
        registerCount()
    }, [])

    const sortedData = [...registerData].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (column: keyof DataRegister) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    }

    return (
        <div className="flex w-full items-start justify-center min-h-screen h-full select-text">
            <div className="flex justify-center w-full md:w-[70%] text-xs md:text-base">
                <div className="grid w-full rounded-md gap-4">
                    <div className="flex">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full"
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        />
                    </div>
                    <div className="grid grid-cols-5 bg-violet-900 rounded-t-md font-bold text-white">
                        <h1 className="flex py-3 items-center justify-center whitespace-nowrap overflow-auto border-b cursor-pointer" onClick={() => handleSort('id')}>ID {sortColumn === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</h1>
                        <h1 className="flex py-3 items-center whitespace-nowrap overflow-auto border-b px-5 cursor-pointer" onClick={() => handleSort('name')}>Full Name {sortColumn === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}</h1>
                        <h1 className="flex py-3 items-center whitespace-nowrap overflow-auto border-b px-5 cursor-pointer" onClick={() => handleSort('email')}>Email {sortColumn === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}</h1>
                        <h1 className="flex py-3 items-center whitespace-nowrap overflow-auto border-b px-5 cursor-pointer" onClick={() => handleSort('status')}>Status {sortColumn === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}</h1>
                        <h1 className="flex py-3 items-center justify-center whitespace-nowrap overflow-hidden border-b">View</h1>
                    </div>
                    {sortedData.filter((data) => {
                        return search.toLowerCase() === '' ? data : data.name.toLowerCase().includes(search) || data.email.toLowerCase().includes(search)
                    }).map((data, index) => {
                        return (
                            <div key={index} className="border border-b-2 border-r-2">
                                <div className="grid grid-cols-5">
                                    <div className="flex py-2 items-center justify-center whitespace-nowrap overflow-auto border-b">{data.id}</div>
                                    <div className="flex py-2 items-center whitespace-nowrap overflow-auto border-b px-5">{data.name}</div>
                                    <div className="flex py-2 items-center whitespace-nowrap overflow-auto border-b px-5">{data.email}</div>
                                    <div className="flex py-2 items-center whitespace-nowrap overflow-auto border-b px-5">{data.status}</div>
                                    <div className="flex py-2 items-center justify-center whitespace-nowrap overflow-hidden border-b">
                                        <Link href={`register/${emailToStudent(data.email)}`}>
                                            <Button className="bg-transparent border hover:bg-slate-300 dark:hover:bg-violet-900 text-black dark:text-white">Open</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
