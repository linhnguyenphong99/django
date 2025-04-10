"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";

export default function ThreadCreateContent() {
    const params = useParams();
    const isEdit = Boolean(params.id); // Check if we are in edit mode
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Clear the form
        setTitle("");
        setContent("");
    };

    return (
        <div>
            <h1>{isEdit ? "Edit Thread" : "Create a New Thread"}</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <Input
                    type="text"
                    placeholder="Thread Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Thread Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    maxLength={2000}
                    className="resize-none border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                    {isEdit ? "Update Thread" : "Create Thread"}
                </Button>
            </form>
        </div>
    );
}