const uploadBtn = document.getElementById("uploadBtn");
const uploadBtn2 = document.getElementById("uploadBtn2");
const fileInput = document.getElementById("fileInput");

let currentButton = uploadBtn;

// ===============================
// Upload Button Events
// ===============================

uploadBtn.addEventListener("click", () => {
    currentButton = uploadBtn;
    fileInput.click();
});

uploadBtn2.addEventListener("click", () => {
    currentButton = uploadBtn2;
    fileInput.click();
});

// ===============================
// File Selected
// ===============================

fileInput.addEventListener("change", async () => {

    if (!fileInput.files.length) return;

    await uploadBlueprint(fileInput.files[0], currentButton);

});

// ===============================
// Helpers
// ===============================

function startAnimation(button, text) {

    let dots = 0;

    button.innerHTML = `
        <span class="spinner"></span>
        <span class="loading-text">${text}</span>
    `;

    const loadingText = button.querySelector(".loading-text");

    const interval = setInterval(() => {

        dots = (dots + 1) % 4;

        loadingText.textContent =
            text + ".".repeat(dots);

    }, 300);

    return interval;
}

function stopAnimation(interval) {
    clearInterval(interval);
}

// ===============================
// Upload Blueprint
// ===============================

async function uploadBlueprint(file, button) {

    button.disabled = true;

    const uploadAnimation =
        startAnimation(button, "Uploading");

    try {

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://127.0.0.1:8000/upload", {
            method: "POST",
            body: formData
        });

        stopAnimation(uploadAnimation);

        if (!response.ok) {
            throw new Error("Upload Failed");
        }

        // Upload Complete

        button.innerHTML = `
            ✅ Upload Complete
        `;

        await sleep(500);

        // Analyzing

        const analyzingAnimation =
            startAnimation(button, "Analyzing Blueprint");

        const data = await response.json();

        stopAnimation(analyzingAnimation);

        // Saving Report

        button.innerHTML = `
            <span class="spinner"></span>
            Saving Report...
        `;

        localStorage.setItem(
            "analysisResult",
            JSON.stringify(data)
        );

        await sleep(500);

        // Redirect

        button.innerHTML = `
            🚀 Redirecting...
        `;

        await sleep(500);

        window.location.href = "result.html";

    }
    catch (error) {

        console.error(error);

        alert("Failed to connect to backend.");

        button.disabled = false;

        button.innerHTML = "Upload Blueprint";

    }

}

// ===============================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}