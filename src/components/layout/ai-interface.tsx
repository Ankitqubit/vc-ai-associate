"use client";

import { CopilotSidebar, CopilotPopup } from "@copilotkit/react-ui";

interface AIInterfaceProps {
    layout?: "floating" | "sidebar";
}

export function AIInterface({ layout = "floating" }: AIInterfaceProps) {

    if (layout === "floating") {
        // Floating popup for Dashboard
        return (
            <CopilotPopup
                labels={{
                    title: "AI Associate",
                    initial: "Hi! I'm your AI Associate. I can help you research deals, draft memos, and manage your pipeline. What would you like to work on?",
                }}
                defaultOpen={true}
            />
        );
    }

    // Sidebar for deal pages
    return (
        <CopilotSidebar
            defaultOpen={true}
            clickOutsideToClose={false}
            labels={{
                title: "AI Associate",
                initial: "Hi! I'm your AI Associate. Ask me about this deal, or request actions like updating the stage or adding notes.",
            }}
        />
    );
}
