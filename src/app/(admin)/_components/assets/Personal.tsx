"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface SessionProps {
    data: DataRegister,
}

interface DataRegister {
    id: number
    email: string
    name: string
    role: string
    status: string
    meetLink: string
    createdAt: string
    updatedAt: string
    datePicker: Date
    userData: {
        lineID: string;
        program: string;
        academicYear: string;
        degree: string;
        campus: string;
        clubRole: string;
        whyJoinClub: string;
        afterBetterClub: string;
        portfolio: string;
        interviewLocation: string;
        phoneNumber: string;
    }
}

const RegisterPanel: React.FC<SessionProps> = ({ data }) => {

    const emailToStudent = (a: string | null | undefined) => {
        if (a == undefined || a == null) return ""
        return a.split("@")[0]
    }

    return (
        <div className="flex w-full items-start justify-center min-h-screen h-full select-text md:-translate-x-10 -translate-x-0">
            <div className="flex border-2 border-r-4 border-b-4 h-fit p-4 items-center justify-center w-fit rounded-md">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl">Applicant Data ID: {emailToStudent(data.email)}</h1>
                    <div className="flex flex-col gap-2">

                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <Label htmlFor="text">Full Name</Label>
                                <Input type="text" value={data.name} readOnly className="dark:placeholder:text-white placeholder:text-black" />
                            </div>
                            <div>
                                <Label htmlFor="text">Student ID</Label>
                                <Input type="text" value={emailToStudent(data.email)} placeholder={emailToStudent(data.email)} readOnly className="dark:placeholder:text-white placeholder:text-black" />
                            </div>
                            <div>
                                <Label htmlFor="text">Line ID</Label>
                                <Input type="text" placeholder={data.userData.lineID} value={data.userData.lineID} readOnly name="lineID" className="" maxLength={18} />
                            </div>
                            <div className="flex justify-between flex-col">
                                <Label htmlFor="text" className="py-1">Program</Label>
                                <Input
                                    type="text"
                                    value={
                                        data.userData.program === 'che' ? 'ChE' :
                                            data.userData.program === 'ce' ? 'CE' :
                                                data.userData.program === 'ie' ? 'IE' :
                                                    data.userData.program === 'me' ? 'ME' :
                                                        data.userData.program === 'ee' ? 'EE' :
                                                            data.userData.program === 'cpe' ? 'CPE' :
                                                                data.userData.program === 'de' ? 'DE' :
                                                                    data.userData.program === 'ba' ? 'BA' :
                                                                        data.userData.program
                                    }
                                    placeholder={
                                        data.userData.program === 'che' ? 'ChE' :
                                            data.userData.program === 'ce' ? 'CE' :
                                                data.userData.program === 'ie' ? 'IE' :
                                                    data.userData.program === 'me' ? 'ME' :
                                                        data.userData.program === 'ee' ? 'EE' :
                                                            data.userData.program === 'cpe' ? 'CPE' :
                                                                data.userData.program === 'de' ? 'DE' :
                                                                    data.userData.program === 'ba' ? 'BA' :
                                                                        data.userData.program
                                    }
                                    readOnly
                                />
                            </div>
                            {/* <div className="flex justify-between flex-col ">
                                <Label htmlFor="program" className="py-1">Program</Label>
                                <Input type="text" value={data.userData.program} readOnly placeholder={data.userData.program} />
                            </div> */}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="flex justify-between flex-col">
                                <Label htmlFor="text" className="py-1">Academic Year</Label>
                                <Input
                                    type="text"
                                    value={
                                        data.userData.academicYear === 'firstyear' ? 'First Year' :
                                            data.userData.academicYear === 'secondyear' ? 'Second Year' :
                                                data.userData.academicYear === 'thirdyear' ? 'Third Year' :
                                                    data.userData.academicYear === 'forthyear' ? 'Forth Year' :
                                                        data.userData.academicYear === 'aboveforthyear' ? 'Above Forth Year' :
                                                            data.userData.academicYear
                                    }
                                    placeholder={
                                        data.userData.academicYear === 'firstyear' ? 'First Year' :
                                            data.userData.academicYear === 'secondyear' ? 'Second Year' :
                                                data.userData.academicYear === 'thirdyear' ? 'Third Year' :
                                                    data.userData.academicYear === 'forthyear' ? 'Forth Year' :
                                                        data.userData.academicYear === 'aboveforthyear' ? 'Above Forth Year' :
                                                            data.userData.academicYear
                                    }
                                    readOnly
                                />
                            </div>
                            {/* <div className="flex justify-between flex-col ">
                                <Label htmlFor="text" className="py-1">Academic Year</Label>
                                <Input type="text" value={data.userData.academicYear} readOnly placeholder={data.userData.academicYear} />
                            </div> */}
                            <div className="flex justify-between flex-col">
                                <Label htmlFor="text" className="py-1">Degree</Label>
                                <Input
                                    type="text"
                                    value={
                                        data.userData.degree === 'bachelor' ? 'Bachelor Degree' :
                                            data.userData.degree === 'master' ? 'Master Degree' :
                                                data.userData.degree === 'ph.d.' ? 'Ph.D.' :
                                                    data.userData.degree
                                    }
                                    placeholder={
                                        data.userData.degree === 'bachelor' ? 'Bachelor Degree' :
                                            data.userData.degree === 'master' ? 'Master Degree' :
                                                data.userData.degree === 'ph.d.' ? 'Ph.D.' :
                                                    data.userData.degree
                                    }
                                    readOnly
                                />
                            </div>
                            {/* <div className="flex justify-between flex-col">
                                <Label htmlFor="text" className="py-1">Degree</Label>
                                <Input type="text" value={data.userData.degree} readOnly placeholder={data.userData.degree} />
                            </div> */}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="flex justify-between flex-col">
                                <Label htmlFor="text" className="py-1">Campus</Label>
                                <Input
                                    type="text"
                                    value={
                                        data.userData.campus === 'bangkadi' ? 'Bangkadi' :
                                            data.userData.campus === 'rangsit' ? 'Rangsit' :
                                                data.userData.campus
                                    }
                                    placeholder={
                                        data.userData.campus === 'bangkadi' ? 'Bangkadi' :
                                            data.userData.campus === 'rangsit' ? 'Rangsit' :
                                                data.userData.campus
                                    }
                                    readOnly
                                />
                            </div>
                            {/* <div className="flex justify-between flex-col">
                                <Label htmlFor="text" className="py-1">Campus</Label>
                                <Input type="text" value={data.userData.campus} readOnly placeholder={data.userData.campus} />
                            </div> */}
                            <div className="flex justify-between flex-col">
                                <Label htmlFor="text" className="py-1">Club Role</Label>
                                <Input
                                    type="text"
                                    value={
                                        data.userData.clubRole === 'lowlevel' ? 'Low-Level' :
                                            data.userData.clubRole === 'hoghlevel' ? 'High-Level' :
                                                data.userData.clubRole === 'mechanic' ? 'Mechanic' :
                                                    data.userData.clubRole === 'electronic' ? 'Electronic' :
                                                        data.userData.clubRole === 'other' ? 'Other' :
                                                            data.userData.clubRole
                                    }
                                    placeholder={
                                        data.userData.clubRole === 'lowlevel' ? 'Low-Level' :
                                            data.userData.clubRole === 'hoghlevel' ? 'High-Level' :
                                                data.userData.clubRole === 'mechanic' ? 'Mechanic' :
                                                    data.userData.clubRole === 'electronic' ? 'Electronic' :
                                                        data.userData.clubRole === 'other' ? 'Other' :
                                                            data.userData.clubRole
                                    }
                                    readOnly
                                />
                            </div>
                            {/* <div className="flex justify-between flex-col">
                                <Label htmlFor="text" className="py-1">Club Role</Label>
                                <Input type="text" value={data.userData.clubRole} readOnly placeholder={data.userData.clubRole} />
                            </div> */}
                        </div>
                        <div>
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input name="phoneNumber" type="number" placeholder={data.userData.phoneNumber} value={data.userData.phoneNumber} readOnly className="" />
                            {data.userData.phoneNumber && (
                                <Button
                                    onClick={() => window.location.href = `tel:${data.userData.phoneNumber}`}
                                    className="w-full bg-black/60 dark:bg-white hover:scale-105 duration-300 transition-all"
                                >
                                    Call
                                </Button>
                            )}

                            {/* {data.userData.phoneNumber ? (
                                <a
                                    href={`tel:${data.userData.phoneNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-2 w-auto border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 min-h-[30px]"
                                >
                                    {data.userData.phoneNumber}
                                </a>
                            ) : (
                                <div
                                    className="block w-auto p-2 border border-gray-200 rounded-md shadow-sm text-gray-200 min-h-[30px]"
                                >

                                </div>
                            )} */}
                            {/* <a 
        href={`tel:${data.userData.phoneNumber}`} 
        className="block w-full p-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200"
        style={{ display: 'flex'}}
    >
        {data.userData.phoneNumber}
    </a> */}
                        </div>
                        <div>
                            <Label htmlFor="text">Why do you want to join this club?</Label>
                            <Textarea name="whyJoinClub" placeholder={data.userData.whyJoinClub} value={data.userData.whyJoinClub} readOnly id="message" />
                        </div>
                        <div>
                            <Label htmlFor="text">What do you do after you joining or make it much better for the club?</Label>
                            <Textarea name="afterBetterClub" placeholder={data.userData.afterBetterClub} value={data.userData.afterBetterClub} readOnly id="message" />
                        </div>

                        <div>
                            <Label htmlFor="portfolio">Portfolio (Link)</Label>
                            <Input name="portfolio" type="url" placeholder={data.userData.portfolio} value={data.userData.portfolio} readOnly className="" />
                            {data.userData.portfolio && (
                                <Button
                                    onClick={() => window.location.href = `${data.userData.portfolio}`}
                                    className="w-full bg-black/60 dark:bg-white hover:scale-105 duration-300 transition-all"
                                >
                                    Open Link
                                </Button>
                            )}
                            {/* {data.userData.portfolio ? (
                                <a
                                    href={data.userData.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-2 w-auto border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 min-h-[30px]"
                                >
                                    {data.userData.portfolio}
                                </a>
                            ) : (
                                <div
                                    className="block p-2 w-auto border border-gray-200 rounded-md shadow-sm text-gray-200 min-h-[30px]"
                                >

                                </div>
                            )} */}
                        </div>
                        <div className="flex justify-between flex-col">
                            <Label htmlFor="interviewLocation" className="py-1">Interview Location</Label>
                            <Input
                                type="text"
                                value={
                                    data.userData.interviewLocation === 'onsite' ? 'On-Site' :
                                        data.userData.interviewLocation === 'online' ? 'Online' :
                                            data.userData.interviewLocation
                                }
                                placeholder={
                                    data.userData.interviewLocation === 'onsite' ? 'On-Site' :
                                        data.userData.interviewLocation === 'online' ? 'Online' :
                                            data.userData.interviewLocation
                                }
                                readOnly
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPanel;