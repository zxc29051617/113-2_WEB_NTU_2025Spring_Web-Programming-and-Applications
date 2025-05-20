"use client";

import { useChat, type UseChatOptions } from "@ai-sdk/react";
import { Chat } from "@/components/ui/chat";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export function ChatBot(props: ChatDemoProps) {
  const {
    messages: uiMessages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    isLoading,
    setMessages,
  } = useChat({
    ...props,
    api: "/api/chat",
  });

  const messages = uiMessages.map((uiMessage) => ({
    id: uiMessage.id,
    role: uiMessage.role,
    content: uiMessage.content,
  }));

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="bg-black hover:bg-gray-800 cursor-pointer"
          >
            💬
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" -translate-x-10">
          <div className={cn("flex", "flex-col", "h-[500px]", "w-full")}>
            <Chat
              className="grow"
              messages={messages}
              handleSubmit={handleSubmit}
              input={input}
              handleInputChange={handleInputChange}
              isGenerating={isLoading}
              stop={stop}
              setMessages={setMessages}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
