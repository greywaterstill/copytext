(() => {
    try {
        // Function to locate the target element, handling iframes if necessary
        const findElement = () => {
            let container = document.querySelector(".question-container");

            // Check inside an iframe if not found
            if (!container) {
                let iframe = document.querySelector("iframe");
                let iframeDoc = iframe ? iframe.contentDocument || iframe.contentWindow.document : null;
                container = iframeDoc?.querySelector(".question-container");
            }

            return container;
        };

        // Function to extract all text within the target element
        const extractText = (element) => {
            return element ? element.innerText.trim() : "";
        };

        // Function to copy extracted text to the clipboard
        const copyToClipboard = (text) => {
            let tempTextArea = document.createElement("textarea");
            tempTextArea.value = text;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextArea);
            console.log("Copied to clipboard:", text);
        };

        // Observer to detect dynamic content loading
        let observer = new MutationObserver(() => {
            let container = findElement();
            if (container) {
                observer.disconnect(); // Stop observing once found
                let textContent = extractText(container);
                if (textContent) {
                    copyToClipboard(textContent);
                } else {
                    console.warn("Element found but contains no text.");
                }
            }
        });

        // Start observing the body for changes
        observer.observe(document.body, { childList: true, subtree: true });

        // Fallback: Check after 3 seconds if still not found
        setTimeout(() => {
            let container = findElement();
            if (container) {
                observer.disconnect();
                let textContent = extractText(container);
                if (textContent) {
                    copyToClipboard(textContent);
                } else {
                    console.warn("Element found but contains no text.");
                }
            } else {
                console.error("Element not found after timeout.");
            }
        }, 3000);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
