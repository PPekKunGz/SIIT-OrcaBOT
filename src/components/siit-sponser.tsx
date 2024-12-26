import sponserData from "../config/sponserConfig.json"
import Link from "next/link";

interface dataSponser {
    name: string,
    link: string,
    logo: string,
}

export default function SponserSIIT() {
    const data = sponserData;
    return (
        <div className="py-18 dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-4">
                    <h2 className="text-muted-foreground dark:text-muted-foreground text-lg">Sponsors and partners</h2>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    {data.map((data, index) => (
                        <div key={index}>
                            <Link href={data.link}>
                                <img src={data.logo} alt="Sponser Logo" className="h-12" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}