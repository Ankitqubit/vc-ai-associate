"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useMemo } from "@/lib/contexts/memo-context";
import { MemoCanvas } from "@/components/memo/memo-canvas";
import { getMemoByDealId } from "@/lib/data/mock-db";

export function DealPageContent({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const dealId = params.id as string;
    const { isCanvasOpen, closeCanvas, memo, setMemo } = useMemo();

    // Load existing memo on mount
    useEffect(() => {
        const existingMemo = getMemoByDealId(dealId);
        if (existingMemo && (!memo || memo.id !== existingMemo.id)) {
            setMemo(existingMemo);
        }
    }, [dealId, memo, setMemo]);

    return (
        <>
            {children}
            <MemoCanvas isOpen={isCanvasOpen} onClose={closeCanvas} />
        </>
    );
}
