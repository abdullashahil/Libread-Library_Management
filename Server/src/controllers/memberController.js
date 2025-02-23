import * as memberService from "../services/memberServices.js";

// handles both get all and filtered members
export const getMembers = async (req, res) => {
    try {
      const searchTerm = req.query.q;
  
      if (searchTerm) {
        // If ?q= is present, do a search
        const membersFound = await memberService.searchMember(searchTerm);
        return res.status(200).json(membersFound);
      } else {
        // Otherwise, get all members
        const members = await memberService.getMembers();
        return res.status(200).json(members);
      }
    } catch (err) {
      console.error('Error fetching members:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

export const getMemberById = async (req, res) => {
    try {
      const memberId = req.params.id;
      const member = await memberService.getMemberById(memberId);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(200).json(member);
    } catch (err) {
      console.error('Error fetching member by ID:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

export const createMember = async (req, res) => {
    try {
        const memberData = req.body;

        const newMember = await memberService.createMember(memberData);
        res.status(200).json(newMember);
    } catch (err) { 
        console.error('Error creating new member:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateMember = async (req, res) => {
    try {
        const memberId = req.params.id
        const memberData = req.body

        const updatedMember = await memberService.updateMember(memberData, memberId);
        if (!updatedMember) {
            return res.status(404).json({ message : "Member not found"})
        }
        res.status(200).json(updatedMember);
    } catch (err) { 
        console.error('Error updating member:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteMember = async (req, res) => {
    try {
        const memberId = req.params.id

        const deletedMember = await memberService.deleteMember(memberId);
        if (!deletedMember) {
            return res.status(404).json({ message : "Member not found"})
        }
        res.status(200).json(deletedMember);
    } catch (err) { 
        console.error('Error deleting member:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

