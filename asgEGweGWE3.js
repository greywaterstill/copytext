(() => {
    try {
        // Create a draggable UI element
        let uiContainer = document.createElement("div");
        uiContainer.style.position = "fixed";
        uiContainer.style.top = "10px";
        uiContainer.style.right = "10px";
        uiContainer.style.padding = "10px";
        uiContainer.style.backgroundColor = "white";
        uiContainer.style.border = "1px solid black";
        uiContainer.style.cursor = "move";
        uiContainer.style.zIndex = "1000";
        uiContainer.innerHTML = '<button id="copyTextButton">Copy Text</button>';
        document.body.appendChild(uiContainer);

        // Make the UI draggable
        uiContainer.onmousedown = function(event) {
            let shiftX = event.clientX - uiContainer.getBoundingClientRect().left;
            let shiftY = event.clientY - uiContainer.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                uiContainer.style.left = pageX - shiftX + 'px';
                uiContainer.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            uiContainer.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                uiContainer.onmouseup = null;
            };
        };

        uiContainer.ondragstart = function() {
            return false;
        };

        // Wait for the DOM to fully load before selecting elements
        document.addEventListener("DOMContentLoaded", function() {
            let container = document.querySelector(".Assessment_Main_Body_Content_Question");
            
            if (!container) {
                console.error("Element not found");
                return;
            }
            
            // Function to copy text content
            function copyText() {
                let textContent = Array.from(container.children)
                    .map(child => child.innerText.trim())
                    .filter((text, index, self) => text && self.indexOf(text) === index)
                    .join("\n\n");
                
                let tempTextArea = document.createElement("textarea");
                tempTextArea.value = textContent;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand("copy");
                document.body.removeChild(tempTextArea);
                
                console.log("Copied to clipboard:", textContent);
            }
            
            document.getElementById("copyTextButton").addEventListener("click", copyText);
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
