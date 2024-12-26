// components/TeamSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, SlidersVertical } from 'lucide-react';
import { TfiFlagAlt } from "react-icons/tfi";
import React from 'react';

export default function TeamSection() {
    return (
        <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="mb-10 text-5xl font-bold underline">Our Team</h1>
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="text-center">
                    <CardHeader>
                        <Eye className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                        <CardTitle className="text-xl font-bold">Computer Vision</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>Chayud Srisumarnk</p>
                        <p>Sivakorn Seinglek</p>
                        <p>Natsongwat Yorsaengrat</p>
                    </CardContent>
                </Card>
                <Card className="bg-purple-600 text-white text-center">
                    <CardHeader>
                        <TfiFlagAlt className="w-10 h-10 mx-auto mb-4 text-white" />
                        <CardTitle className="text-xl font-bold">Leaders</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>Chayud Srisumarnk (President)</p>
                        <p>Tongthai Thongsupan (Vice President)</p>
                        <p>Tanabun Khumsapy (Vice President)</p>
                    </CardContent>
                </Card>
                <Card className="text-center">
                    <CardHeader>
                        <SlidersVertical className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                        <CardTitle className="text-xl font-bold">Robotics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>Nutchanon Siripool</p>
                        <p>Nattapol Chiewnawintawat</p>
                        <p>Tanabun Khumsapy</p>
                        <p>Thapanee Pandang</p>
                        <p>Yanisa Wunvisut</p>
                        <p>Tongthai Thongsupan</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};