import { createContext } from "react";
export const UserContext = createContext<{
    id: number,
    name: string,
    lastname: string,
    phoneNumber: string,
    role: "admin" | "user",
    lastMessage: string,
    lastMessageID: number,
    messages: number[],
    connectedCourses: number[],
    connectedChats: number[]
}>({
    id: 0,
    name: "",
    lastname: "",
    phoneNumber: "",
    role: "admin",
    lastMessage: "",
    lastMessageID: 0,
    messages: [],
    connectedCourses: [],
    connectedChats: []
})