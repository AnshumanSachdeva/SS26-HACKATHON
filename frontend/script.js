const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");

uploadBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", async () => {

    if (fileInput.files.length === 0) return;

    const file = fileInput.files[0];

    // Disable button
    uploadBtn.disabled = true;

    // Show loading
    uploadBtn.innerHTML = `
        <span class="spinner"></span>
        Uploading...
    `;

    try {

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://127.0.0.1:8000/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Upload Failed");
        }

        const data = await response.json();

        console.log(data);

        // Save response for result page
        localStorage.setItem("analysisResult", JSON.stringify(data));

        uploadBtn.innerHTML = `
            <span class="spinner"></span>
            Analyzing...
        `;

        // Go to result page
        window.location.href = "result.html";

    }
    catch (error) {

        console.error(error);

        alert("Failed to connect to backend.");

        uploadBtn.disabled = false;

        uploadBtn.innerHTML = "Upload Building Plan";

    }

});