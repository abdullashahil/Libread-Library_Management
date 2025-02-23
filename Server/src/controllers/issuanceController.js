import * as issuanceServices from "../services/issuanceServices.js";

// Handles all and filtered issuances 
export const getIssuances = async (req, res) => {
    try {
      const { status, date } = req.query;
      let issuances;
      if (status || date) {
        // If any filter is provided, use the filtered service function.
        issuances = await issuanceServices.getFilteredIssuances(status, date);
      } else {
        // Otherwise, get all issuances.
        issuances = await issuanceServices.getIssuances();
      }
      res.status(200).json(issuances);
    } catch (err) {
      console.error("Error fetching issuances:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const getIssuanceById = async (req, res) => {
    try {
        const issuanceId = req.params.id;
        const issuance = await issuanceServices.getIssuanceById(issuanceId);
        if (!issuance) {
            return res.status(404).json({ message: "Issuance not found" });
        }
        res.status(200).json(issuance);
    } catch (err) {
        console.error('Error fetching issuance by ID:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getFilteredIssuances = async (req, res) => {
    try {
      const { status, date } = req.query; // Example: /api/issuance?status=pending&date=2025-02-15
      console.log("controllererrr", status, date)

      const issuances = await issuanceServices.getFilteredIssuances(status, date);
      res.status(200).json(issuances);
    } catch (err) {
      console.error("Error filtering issuances:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const createIssuance = async (req, res) => {
    try {
        const issuanceData = req.body;
        const newIssuance = await issuanceServices.createIssuance(issuanceData);
        res.status(200).json(newIssuance);
    } catch (err) {
        console.error('Error creating new issuance:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateIssuance = async (req, res) => {
    try {
        const issuanceId = req.params.id;
        const issuanceData = req.body;
        const updatedIssuance = await issuanceServices.updateIssuance(issuanceData, issuanceId);
        if (!updatedIssuance) {
            return res.status(404).json({ message: "Issuance not found" });
        }
        res.status(200).json(updatedIssuance);
    } catch (err) {
        console.error('Error updating issuance:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteIssuance = async (req, res) => {
    try {
        const issuanceId = req.params.id;
        const deletedIssuance = await issuanceServices.deleteIssuance(issuanceId);
        if (!deletedIssuance) {
            return res.status(404).json({ message: "Issuance not found" });
        }
        res.status(200).json(deletedIssuance);
    } catch (err) {
        console.error('Error deleting issuance:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const searchIssuance = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const issuancesFound = await issuanceServices.searchIssuance(searchTerm);
        res.status(200).json(issuancesFound);
    } catch (err) {
        console.error('Error searching issuance:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
