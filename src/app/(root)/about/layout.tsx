

import { Metadata } from "next";
export const metadata: Metadata = {
    title: "About | SIIT Academy Club - OrcaBOT",
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
        title: "About | SIIT Academy Club - OrcaBOT",
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
        title: "About | SIIT Academy Club - OrcaBOT",
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
            <main className="w-full p-4">{children}</main>
        </div>
    );
}


export default RootLayout;