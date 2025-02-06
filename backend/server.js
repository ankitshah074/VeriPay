const express = require("express");
const bodyParser = require("body-parser");
const {spawn} = require("child_process");
const cors = require("cors");
const { verify_text_work } = require("./");
const { PythonShell } = require("python-shell");
const { stdout } = require("process");


const app = express();

// const { spawn } = require('child_process');

// Function to verify text-based work
function verifyTextWork(jobDescription, submittedText) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['verify_work.py']);
        
        const data = {
            job_description: jobDescription,
            submitted_text: submittedText,
        };

        pythonProcess.stdin.write(JSON.stringify(data));
        pythonProcess.stdin.end();
        
        let output = '';
        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });
        
        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const result = JSON.parse(output);
                    resolve(result.result);
                } catch (error) {
                    reject('Error parsing the Python output');
                }
            } else {
                reject(`Python process exited with code ${code}`);
            }
        });
    });
}

// Function to verify image-based work (using a placeholder)
function verifyImageWork(jobDescription, imagePath) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['verify_work.py']);
        
        const data = {
            job_description: jobDescription,
            image_path: imagePath,
        };

        pythonProcess.stdin.write(JSON.stringify(data));
        pythonProcess.stdin.end();

        let output = '';
        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const result = JSON.parse(output);
                    resolve(result.result);
                } catch (error) {
                    reject('Error parsing the Python output');
                }
            } else {
                reject(`Python process exited with code ${code}`);
            }
        });
    });
}

// Example usage:
const jobDescription = "This is a job description for a software engineering role.";
const submittedText = "This is a submitted text matching the job description for the software engineering role.";

verifyTextWork(jobDescription, submittedText)
    .then(result => console.log('Text verification result:', result))
    .catch(error => console.error('Error verifying text work:', error));

// If you have an image to verify:
const imagePath = "path/to/image.jpg";
verifyImageWork(jobDescription, imagePath)
    .then(result => console.log('Image verification result:', result))
    .catch(error => console.error('Error verifying image work:', error));

app.use(bodyParser.json());
app.use(cors());

app.use(cors({
    origin: "http://localhost:3000", // Allow requests from your frontend URL
    methods: ["GET", "POST"], // Allow specific HTTP methods
    credentials: true, // Allow cookies and credentials
  }));

app.post("/verify-work", (req, res) => {
    const { jobDescription, submittedText } = req.body;
    const isVerified = verify_text_work(jobDescription, submittedText);
    res.json({ verified: isVerified });
});
app.options("/verify-work", cors()); // Handle preflight requests

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));