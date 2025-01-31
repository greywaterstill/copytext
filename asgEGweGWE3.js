(() => {
    try {
        const button = document.createElement("button");
        button.innerText = "Copy Text";
        button.style.position = "fixed";
        button.style.top = "50px";
        button.style.left = "50px";
        button.style.zIndex = "1000";
        button.style.padding = "10px";
        button.style.background = "blue";
        button.style.color = "white";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.borderRadius = "5px";

        document.body.appendChild(button);

        let isDragging = false, offsetX, offsetY;

        button.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - button.offsetLeft;
            offsetY = e.clientY - button.offsetTop;
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                button.style.left = `${e.clientX - offsetX}px`;
                button.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });

        const findElement = () => {
            let container = document.querySelector(".question-container");
            if (!container) {
                let iframe = document.querySelector("iframe");
                let iframeDoc = iframe ? iframe.contentDocument || iframe.contentWindow.document : null;
                container = iframeDoc?.querySelector(".question-container");
            }
            return container;
        };

        const extractText = (element) => {
            return element ? element.innerText.trim() : "";
        };

        const copyToClipboard = (text) => {
            let tempTextArea = document.createElement("textarea");
            tempTextArea.value = text;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextArea);
            console.log("Copied to clipboard:", text);
        };

        button.addEventListener("click", () => {
            let container = findElement();
            if (container) {
                let textContent = extractText(container);
                if (textContent) {
                    copyToClipboard(textContent);
                } else {
                    console.warn("Element found but contains no text.");
                }
            } else {
                console.error("Element not found.");
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
