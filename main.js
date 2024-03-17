async function imageToDataURL(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    console.log(blob);
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Could not convert image to Data URL'));
        reader.readAsDataURL(blob);
    });
}

function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result; // Directly use reader.result
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}


async function fontToBase64() {
    try {
        const response = await fetch('assets/font.ttf'); // Assuming font.ttf is in the same directory as the script
        if (!response.ok) {
            throw new Error('Failed to fetch font file');
        }
        const fontData = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(fontData);
        // Wait for the FileReader to load the font data
        await new Promise((resolve, reject) => {
            reader.onloadend = resolve;
            reader.onerror = reject;
        });
        // Return the base64-encoded font data
        return reader.result.split(',')[1]; // Extract the base64 part of the data URL
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagate the error further if needed
    }
}

// Function to reverse a string (for RTL languages like Hebrew)
function reverseString(str) {
    return str.split("").reverse().join("");
}

function change_text(img_ID,content_text){
    $('#img_ID').css('content', content_text);
}