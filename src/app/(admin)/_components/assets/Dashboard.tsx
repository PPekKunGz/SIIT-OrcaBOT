'use client'
import * as React from "react"
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import TitlePage from '../../_components/titlepage'
import { SessionContextValue, useSession } from "next-auth/react";

interface SessionProps {
    session: SessionContextValue<boolean>
}

interface dashboardCount {
    totalAccount: number,
    userRegister: number,
    bachelorCount: number,
    masterCount: number,
    phdCount: number,
    firstyear: number,
    secondyear: number,
    thirdyear: number,
    forthyear: number,
    aboveforthyear: number,
    cheCount: number,
    ceCount: number,
    ieCount: number,
    meCount: number,
    eeCount: number,
    cpeCount: number,
    deCount: number,
    baCount: number,
    lowlevelCount: number,
    hoghlevelCount: number,
    mechanicCount: number,
    electronicCount: number,
    otherCount: number,
    onlineCount: number,
    onsiteCount: number,
    rangsitCount: number,
    bangkadiCount: number,
}

const DashboardPanel: React.FC<SessionProps> = () => {
    const session = useSession();
    const [data, setData] = useState<dashboardCount>()

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
    }

    const registerCount = async () => {
        const res = await fetch(`${process.env.apiUrl}/apis/v1/admin/@register/dashboard`, {
            method: 'POST',
            headers: {
                'dms_token': session.data?.user.accessToken || ""
            },
        })
        const { code, data }: { data: dashboardCount, message: string, code: number, } = await res.json();

        if (code === 200) {
            setData(data)
            return;
        }

    }

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
    }

    useEffect(() => {
        registerCount()
    }, [])

    return (
        <>
            <TitlePage title="Dashboard" description="Showing total stats from you're Website." datatitle="Toggle Edit Data" session={session} />
            <div className="space-y-4 mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Account
                            </CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{data?.totalAccount}</div>
                            <p className="text-xs text-muted-foreground">
                                จำนวนแอคเค้าท์ทั้งหมด
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Register
                            </CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{data?.userRegister}</div>
                            <p className="text-xs text-muted-foreground">
                                จำนวนผู้ที่มาเข้าสมัคร
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Interview Location</CardTitle>
                            <CardDescription className="flex justify-between translate-y-3">
                                <span> </span>
                                <span>Total Register</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start">
                                    <div className="">
                                        - Online
                                    </div>
                                    <div className="">
                                        - On-Site
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="">
                                        {data?.onlineCount}
                                    </div>
                                    <div className="">
                                        {data?.onsiteCount}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Campus Interview</CardTitle>
                            <CardDescription className="flex justify-between translate-y-3">
                                <span> </span>
                                <span>Total Register</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start">
                                    <div className="">
                                        - Rangsit
                                    </div>
                                    <div className="">
                                        - Bangkadi
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="">
                                        {data?.rangsitCount}
                                    </div>
                                    <div className="">
                                        {data?.bangkadiCount}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Degree</CardTitle>
                            <CardDescription className="flex justify-between translate-y-3">
                                <span> </span>
                                <span>Total Register</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start">
                                    <div className="">
                                        - Bachelor Degree
                                    </div>
                                    <div className="">
                                        - Master Degree
                                    </div>
                                    <div className="">
                                        - Ph.D.
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="">
                                        {data?.bachelorCount}
                                    </div>
                                    <div className="">
                                        {data?.masterCount}
                                    </div>
                                    <div className="">
                                        {data?.phdCount}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Academic Year</CardTitle>
                            <CardDescription className="flex justify-between translate-y-3">
                                <span> </span>
                                <span>Total Register</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start">
                                    <div className="">
                                        - First Year
                                    </div>
                                    <div className="">
                                        - Second Year
                                    </div>
                                    <div className="">
                                        - Third Year
                                    </div>
                                    <div className="">
                                        - Forth Year
                                    </div>
                                    <div className="">
                                        - Above Forth Year
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="">
                                        {data?.firstyear}
                                    </div>
                                    <div className="">
                                        {data?.secondyear}
                                    </div>
                                    <div className="">
                                        {data?.thirdyear}
                                    </div>
                                    <div className="">
                                        {data?.forthyear}
                                    </div>
                                    <div className="">
                                        {data?.aboveforthyear}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Program</CardTitle>
                            <CardDescription className="flex justify-between translate-y-3">
                                <span> </span>
                                <span>Total Register</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start">
                                    <div className="">
                                        - ChE
                                    </div>
                                    <div className="">
                                        - CE
                                    </div>
                                    <div className="">
                                        - IE
                                    </div>
                                    <div className="">
                                        - ME
                                    </div>
                                    <div className="">
                                        - EE
                                    </div>
                                    <div className="">
                                        - CPE
                                    </div>
                                    <div className="">
                                        - DE
                                    </div>
                                    <div className="">
                                        - BA
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="">
                                        {data?.cheCount}
                                    </div>
                                    <div className="">
                                        {data?.ceCount}
                                    </div>
                                    <div className="">
                                        {data?.ieCount}
                                    </div>
                                    <div className="">
                                        {data?.meCount}
                                    </div>
                                    <div className="">
                                        {data?.eeCount}
                                    </div>
                                    <div className="">
                                        {data?.cpeCount}
                                    </div>
                                    <div className="">
                                        {data?.deCount}
                                    </div>
                                    <div className="">
                                        {data?.baCount}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Club Role</CardTitle>
                            <CardDescription className="flex justify-between translate-y-3">
                                <span> </span>
                                <span>Total Register</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start">
                                    <div className="">
                                        - Low Level
                                    </div>
                                    <div className="">
                                        - High Level
                                    </div>
                                    <div className="">
                                        - Mechanic
                                    </div>
                                    <div className="">
                                        - Electronic
                                    </div>
                                    <div className="">
                                        - Other(Only You are in list)
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="">
                                        {data?.lowlevelCount}
                                    </div>
                                    <div className="">
                                        {data?.hoghlevelCount}
                                    </div>
                                    <div className="">
                                        {data?.mechanicCount}
                                    </div>
                                    <div className="">
                                        {data?.electronicCount}
                                    </div>
                                    <div className="">
                                        {data?.otherCount}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Total Registering</CardTitle>
                            <CardDescription className="flex justify-between translate-y-3">
                                <span> </span>
                                <span>Total</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start">
                                    <div className="">
                                        - Not Register
                                    </div>
                                    <div className="">
                                        - Waiting for us to screen
                                    </div>
                                    <div className="">
                                        - Waiting for Interviewing
                                    </div>
                                    <div className="">
                                        - Reject
                                    </div>
                                    <div className="">
                                        - Pass the Interview
                                    </div>
                                    <div className="">
                                        - Not Pass the Interview
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="">
                                        {data?.notRegister}
                                    </div>
                                    <div className="">
                                        {data?.waitingCount}
                                    </div>
                                    <div className="">
                                        {data?.waitInterviewCount}
                                    </div>
                                    <div className="">
                                        {data?.rejectCount}
                                    </div>
                                    <div className="">
                                        {data?.passCount}
                                    </div>
                                    <div className="">
                                        {data?.notpassCount}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}
                </div>
            </div>
        </>
    )
}
export default DashboardPanel;