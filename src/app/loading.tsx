"use client";

import { useState } from "react";

export default function Loading({ children }: { children: React.ReactNode }
) {
    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => {
        setIsLoading(false);
    }, 2500);
    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen h-full pt-44 md:pt-32">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-primary rounded-full animate-spin" />
                            <div className="w-4 h-4 border-2 border-primary rounded-full animate-spin delay-100" />
                            <div className="w-4 h-4 border-2 border-primary rounded-full animate-spin delay-200" />
                        </div>
                        <p className="text-muted-foreground md:text-3xl text-xl">Loading data...</p>
                    </div>
                </div>
            ) : (
                <>
                    {children}
                </>
            )}
        </>
    )
}