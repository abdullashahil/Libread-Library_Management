import * as issuanceServices from "../services/issuanceServices.js";
import { logMessage } from "../logger.js"; // 

export const getIssuances = async (req, res) => {
    try {
        const { status, date } = req.query;
        let issuances;

        if (status || date) {
            logMessage("info", "Issuance", `Fetching issuances with filters: status=${status}, date=${date}`);
            issuances = await issuanceServices.getFilteredIssuances(status, date);
        } else {
            logMessage("info", "Issuance", "Fetching all issuances");
            issuances = await issuanceServices.getIssuances();
        }

        res.status(200).json(issuances);
    } catch (err) {
        logMessage("error", "Issuance", `Error fetching issuances: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getIssuanceById = async (req, res) => {
    try {
        const issuanceId = req.params.id;
        logMessage("info", "Issuance", `Fetching issuance with ID: ${issuanceId}`);

        const issuance = await issuanceServices.getIssuanceById(issuanceId);
        if (!issuance) {
            logMessage("warn", "Issuance", `Issuance not found: ID ${issuanceId}`);
            return res.status(404).json({ message: "Issuance not found" });
        }

        res.status(200).json(issuance);
    } catch (err) {
        logMessage("error", "Issuance", `Error fetching issuance by ID: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createIssuance = async (req, res) => {
    try {
        const issuanceData = req.body;
        logMessage("info", "Issuance", "Creating new issuance", issuanceData);

        const newIssuance = await issuanceServices.createIssuance(issuanceData);
        res.status(200).json(newIssuance);
    } catch (err) {
        logMessage("error", "Issuance", `Error creating issuance: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateIssuance = async (req, res) => {
    try {
        const issuanceId = req.params.id;
        const issuanceData = req.body;
        logMessage("info", "Issuance", `Updating issuance ID: ${issuanceId}`, issuanceData);

        const updatedIssuance = await issuanceServices.updateIssuance(issuanceData, issuanceId);
        if (!updatedIssuance) {
            logMessage("warn", "Issuance", `Issuance not found for update: ID ${issuanceId}`);
            return res.status(404).json({ message: "Issuance not found" });
        }

        res.status(200).json(updatedIssuance);
    } catch (err) {
        logMessage("error", "Issuance", `Error updating issuance: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteIssuance = async (req, res) => {
    try {
        const issuanceId = req.params.id;
        logMessage("info", "Issuance", `Deleting issuance ID: ${issuanceId}`);

        const deletedIssuance = await issuanceServices.deleteIssuance(issuanceId);
        if (!deletedIssuance) {
            logMessage("warn", "Issuance", `Issuance not found for deletion: ID ${issuanceId}`);
            return res.status(404).json({ message: "Issuance not found" });
        }

        res.status(200).json(deletedIssuance);
    } catch (err) {
        logMessage("error", "Issuance", `Error deleting issuance: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const searchIssuance = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        logMessage("info", "Issuance", `Searching issuance with query: ${searchTerm}`);

        const issuancesFound = await issuanceServices.searchIssuance(searchTerm);
        res.status(200).json(issuancesFound);
    } catch (err) {
        logMessage("error", "Issuance", `Error searching issuance: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
