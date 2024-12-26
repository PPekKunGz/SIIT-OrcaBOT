

import { Metadata } from "next";
import NavbarComponent from "../_components/navbar";
import { SidebarMenu } from "../_components/sidebar";
import Loading from "./loading";

export const metadata: Metadata = {
    title: "SIIT Academy Club - OrcaBOT | Dashboard",
    description: "Academy Club of Sirindhorn International Institute of Technology",

    metadataBase: new URL('https://orcabot.in.th'),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en-US',
            'th-TH': '/th-TH',
        },
    },
    openGraph: {
        url: 'https://orcabot.in.th',
        type: 'website', // or website
        locale: 'th_TH',
        title: "SIIT Academy Club - OrcaBOT | Dashboard",
        description: "Academy Club of Sirindhorn International Institute of Technology",
        images: [
            {
                url: 'https://i.imgur.com/ikXg6UW.png',
                width: 200,
                height: 200,
                alt: 'OrcaBOT',
            },
        ],
    },
    twitter: {
        title: "SIIT Academy Club - OrcaBOT | Dashboard",
        description: "Academy Club of Sirindhorn International Institute of Technology",
        card: 'summary_large_image',
        site: 'SIIT Academy Club - OrcaBOT',
        creator: 'SIIT Academy Club - OrcaBOT',
        images: [
            'https://i.imgur.com/ikXg6UW.png',
        ],
    },

}

function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Loading>
                <NavbarComponent session />
                <div className="flex">
                    <div className="hidden sm:block">
                        <SidebarMenu />
                    </div>
                    <main className="w-full p-4">{children}</main>
                </div>
            </Loading>
        </div>
    );
}


export default RootLayout;