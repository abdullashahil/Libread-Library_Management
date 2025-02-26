import * as memberService from "../services/memberServices.js";
import { logMessage } from "../logger.js";

export const getMembers = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        if (searchTerm) {
            logMessage("info", "Member", `Searching members with query: ${searchTerm}`);
            const membersFound = await memberService.searchMember(searchTerm);
            return res.status(200).json(membersFound);
        } else {
            logMessage("info", "Member", "Fetching all members");
            const members = await memberService.getMembers();
            return res.status(200).json(members);
        }
    } catch (err) {
        logMessage("error", "Member", `Error fetching members: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMemberById = async (req, res) => {
    try {
        const memberId = req.params.id;
        logMessage("info", "Member", `Fetching member with ID: ${memberId}`);
        
        const member = await memberService.getMemberById(memberId);
        if (!member) {
            logMessage("warn", "Member", `Member not found: ID ${memberId}`);
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json(member);
    } catch (err) {
        logMessage("error", "Member", `Error fetching member by ID: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createMember = async (req, res) => {
    try {
        const memberData = req.body;
        logMessage("info", "Member", "Creating new member", memberData);
        
        const newMember = await memberService.createMember(memberData);
        res.status(200).json(newMember);
    } catch (err) { 
        logMessage("error", "Member", `Error creating new member: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateMember = async (req, res) => {
    try {
        const memberId = req.params.id;
        const memberData = req.body;
        logMessage("info", "Member", `Updating member ID: ${memberId}`, memberData);
        
        const updatedMember = await memberService.updateMember(memberData, memberId);
        if (!updatedMember) {
            logMessage("warn", "Member", `Member not found for update: ID ${memberId}`);
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json(updatedMember);
    } catch (err) { 
        logMessage("error", "Member", `Error updating member: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteMember = async (req, res) => {
    try {
        const memberId = req.params.id;
        logMessage("info", "Member", `Deleting member ID: ${memberId}`);
        
        const deletedMember = await memberService.deleteMember(memberId);
        if (!deletedMember) {
            logMessage("warn", "Member", `Member not found for deletion: ID ${memberId}`);
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json(deletedMember);
    } catch (err) { 
        logMessage("error", "Member", `Error deleting member: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
