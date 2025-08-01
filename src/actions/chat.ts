"use server";

import { streamText } from "ai";
import { gemini } from "@/lib/gemini";
import { openai } from "@/lib/openai";
import { Message } from "@/components/chat-box";

export const chat = async (history: Message[]) => {
    const { textStream } = await streamText({
        model: gemini("gemini-2.0-flash"),
        messages: history,
    });

    let fullText = "";
    for await (const text of textStream) {
        fullText += text;
    }

    return {
        messages: history,
        newMessage: fullText,
    };
}; 