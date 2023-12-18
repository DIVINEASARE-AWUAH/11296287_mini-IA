const express = require("express");
const bodyParser = require("body-parser"); // Make sure to install this package: npm install body-parser
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect("mongodb://localhost/your-database-name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a Mongoose schema and model for Patient and Vitals
const patientSchema = new mongoose.Schema({
    patientId: String,
    vitals: {
        bloodPressure: String,
        temperature: String,
        pulse: String,
        spO2: String,
    },
});

const Patient = mongoose.model("Patient", patientSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Route to handle submitting patient vitals
app.post("/api/patients/vitals", async(req, res) => {
    try {
        const { patientId, vitals } = req.body;

        // Assuming you've defined a Mongoose model named 'Patient'
        const patient = new Patient({
            patientId,
            vitals,
        });

        // Save the patient record to MongoDB
        const savedPatient = await patient.save();

        res.status(201).json(savedPatient);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});