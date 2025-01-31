(() => {
    try {
        const createButton = (text, top, left, color, onClick) => {
            const button = document.createElement("button");
            button.innerText = text;
            button.style.position = "fixed";
            button.style.top = top;
            button.style.left = left;
            button.style.zIndex = "1000";
            button.style.padding = "10px";
            button.style.background = color;
            button.style.color = "white";
            button.style.border = "none";
            button.style.cursor = "pointer";
            button.style.borderRadius = "5px";
            button.addEventListener("click", onClick);
            document.body.appendChild(button);
        };

        let copiedTexts = [];
        const table = document.createElement("ul");
        table.style.position = "fixed";
        table.style.top = "100px";
        table.style.left = "50px";
        table.style.zIndex = "1000";
        table.style.background = "white";
        table.style.padding = "10px";
        table.style.border = "1px solid black";
        document.body.appendChild(table);

        const findElement = () => {
            let container = document.querySelector(".Question_Contents");
            if (!container) {
                let iframe = document.querySelector("iframe");
                let iframeDoc = iframe ? iframe.contentDocument || iframe.contentWindow.document : null;
                container = iframeDoc?.querySelector(".Question_Contents");
            }
            return container;
        };

        const extractText = (element) => {
            if (!element) return "";

            let textContent = "";
            let questionText = element.querySelector(".Practice_Question_Body")?.innerText.trim();
            if (questionText) textContent += questionText + "\n";

            let choices = element.querySelectorAll(".answer-choice-label");
            choices.forEach((choice, index) => {
                textContent += `${String.fromCharCode(65 + index)}. ${choice.innerText.trim()}\n`;
            });

            return textContent.trim();
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

        createButton("Add Text", "50px", "50px", "blue", () => {
            let container = findElement();
            if (container) {
                let textContent = extractText(container);
                if (textContent) {
                    copiedTexts.push(textContent + "\n\n\n");
                    let listItem = document.createElement("li");
                    listItem.innerText = textContent;
                    table.appendChild(listItem);
                } else {
                    console.warn("Element found but contains no text.");
                }
            } else {
                console.error("Element not found.");
            }
        });

        createButton("Copy All", "50px", "150px", "green", () => {
            if (copiedTexts.length > 0) {
                const allText = copiedTexts.join("\n\n\n").trim();
                if (allText) {
                    copyToClipboard(allText);
                } else {
                    console.warn("No text to copy.");
                }
            } else {
                console.warn("No text to copy.");
            }
        });

        createButton("Remove Last", "50px", "250px", "red", () => {
            if (copiedTexts.length > 0) {
                copiedTexts.pop();
                if (table.lastChild) {
                    table.removeChild(table.lastChild);
                }
            } else {
                console.warn("No text to remove.");
            }
        });

        // Dynamically detect changes in the DOM to adjust to new content
        const observer = new MutationObserver(() => {
            console.log("DOM changed, rechecking elements...");
        });

        observer.observe(document.body, { childList: true, subtree: true });
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
