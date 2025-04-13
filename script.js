// Text Processing
function processText() {
    const textInput = document.getElementById('text-input').value.trim();
    if (!textInput) {
        showResult('Please enter some text to process.');
        return;
    }
    // TODO: Add your API call here
    showResult(`Processing text: ${textInput}`);
}

// Image Processing
function setupImageUpload() {
    const uploadArea = document.getElementById('image-upload-area');
    const imageInput = document.getElementById('image-input');
    const preview = document.getElementById('image-preview');

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const files = e.dataTransfer.files;
        handleImageFiles(files);
    });

    imageInput.addEventListener('change', (e) => {
        handleImageFiles(e.target.files);
    });

    function handleImageFiles(files) {
        preview.innerHTML = '';
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.classList.add('preview-item');
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function processImages() {
    const preview = document.getElementById('image-preview');
    if (!preview.hasChildNodes()) {
        showResult('Please upload at least one image to process.');
        return;
    }
    // TODO: Add your API call here
    showResult('Processing uploaded images...');
}

// PDF Processing
function setupPDFUpload() {
    const uploadArea = document.getElementById('pdf-upload-area');
    const pdfInput = document.getElementById('pdf-input');
    const preview = document.getElementById('pdf-preview');

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const files = e.dataTransfer.files;
        handlePDFFile(files[0]);
    });

    pdfInput.addEventListener('change', (e) => {
        handlePDFFile(e.target.files[0]);
    });

    function handlePDFFile(file) {
        if (file && file.type === 'application/pdf') {
            preview.innerHTML = `
                <div style="padding: 1rem; background: #f1f5f9; border-radius: 8px;">
                    <i class="fas fa-file-pdf"></i> ${file.name}
                </div>
            `;
        }
    }
}

function processPDF() {
    const preview = document.getElementById('pdf-preview');
    if (!preview.hasChildNodes()) {
        showResult('Please upload a PDF file to process.');
        return;
    }
    // TODO: Add your API call here
    showResult('Processing PDF...');
}

// Voice Commands
function setupVoiceCommands() {
    const startButton = document.getElementById('start-recording');
    const stopButton = document.getElementById('stop-recording');
    const status = document.getElementById('voice-status');
    let mediaRecorder;
    let audioChunks = [];

    startButton.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                processVoiceCommand(audioBlob);
                audioChunks = [];
            };

            mediaRecorder.start();
            status.textContent = 'Recording...';
            startButton.disabled = true;
            stopButton.disabled = false;
        } catch (error) {
            status.textContent = 'Error accessing microphone. Please check permissions.';
            console.error('Error:', error);
        }
    });

    stopButton.addEventListener('click', () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            status.textContent = 'Processing voice command...';
            startButton.disabled = false;
            stopButton.disabled = true;
        }
    });
}

function processVoiceCommand(audioBlob) {
    // TODO: Add your API call here
    showResult('Processing voice command...');
}

// Utility Functions
function showResult(message) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = `<p>${message}</p>`;
}

// Theme Management
function initializeTheme() {
    // Get theme from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    const themeToggle = document.getElementById('theme-toggle');

    // Clear any existing theme classes
    document.body.className = '';

    // Check for dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme) {
        // Apply specific theme
        if (theme === 'general') {
            // For general theme, only apply dark mode if needed
            if (prefersDark) {
                document.body.classList.add('dark-mode');
            }
        } else {
            document.body.className = `theme-${theme}`;
        }
        localStorage.setItem('selectedTheme', theme);
    } else {
        // Check for saved theme
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            if (savedTheme === 'general') {
                // For general theme, only apply dark mode if needed
                if (prefersDark) {
                    document.body.classList.add('dark-mode');
                }
            } else {
                document.body.className = `theme-${savedTheme}`;
            }
        } else {
            // Default to general theme
            if (prefersDark) {
                document.body.classList.add('dark-mode');
            }
        }
    }

    // Show/hide theme toggle based on theme
    if (themeToggle) {
        const currentTheme = theme || localStorage.getItem('selectedTheme') || 'general';
        themeToggle.style.display = currentTheme === 'general' ? 'block' : 'none';
        
        // Set initial icon
        if (currentTheme === 'general') {
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }

    // Set up theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = theme || localStorage.getItem('selectedTheme') || 'general';
            if (currentTheme === 'general') {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            }
        });
    }
}

// Load theme styles
function loadThemeStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'theme-styles.css';
    document.head.appendChild(link);

    // Load Google Fonts for different themes
    const fonts = [
        'Quicksand:400,500,600',
        'Space+Mono:400,700',
        'Playfair+Display:400,500,600',
        'Lato:300,400,700',
        'Inter:400,500,600',
        'Poppins:400,500,600'
    ];
    
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = `https://fonts.googleapis.com/css2?family=${fonts.join('&family=')}&display=swap`;
    document.head.appendChild(fontLink);
}

// Sidebar Management
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// Chat History Management
function initializeChatHistory() {
    const chatHistory = document.querySelector('.chat-history');
    const newChatBtn = document.querySelector('.new-chat-btn');
    let chatCounter = 4; // Start after the sample chats

    // Sample chat history data
    const sampleChats = [
        { id: 1, title: 'Image Generation Project', timestamp: '2 hours ago' },
        { id: 2, title: 'Code Review Assistant', timestamp: '1 day ago' },
        { id: 3, title: 'Caption Generation', timestamp: '3 days ago' }
    ];

    // Render chat history
    function renderChatHistory() {
        chatHistory.innerHTML = sampleChats.map(chat => `
            <div class="chat-item" data-id="${chat.id}">
                <div class="chat-info">
                    <span class="chat-title">${chat.title}</span>
                    <span class="chat-timestamp">${chat.timestamp}</span>
                </div>
                <button class="delete-chat" onclick="deleteChat(${chat.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    // Delete chat function
    window.deleteChat = function(chatId) {
        const index = sampleChats.findIndex(chat => chat.id === chatId);
        if (index !== -1) {
            sampleChats.splice(index, 1);
            renderChatHistory();
        }
    };

    // New chat button functionality
    newChatBtn.addEventListener('click', () => {
        const newChat = {
            id: chatCounter++,
            title: `New Chat ${chatCounter}`,
            timestamp: 'Just now'
        };
        sampleChats.unshift(newChat);
        renderChatHistory();

        // Reset all tool panels
        const toolPanels = document.querySelectorAll('.tool-panel');
        toolPanels.forEach(panel => {
            panel.style.display = 'none';
        });

        // Show the first tool panel
        const firstPanel = document.querySelector('.tool-panel');
        if (firstPanel) {
            firstPanel.style.display = 'block';
        }

        // Reset active tab
        const toolTabs = document.querySelectorAll('.tool-tab');
        toolTabs.forEach(tab => tab.classList.remove('active'));
        toolTabs[0]?.classList.add('active');
    });

    // Initial render
    renderChatHistory();
}

// Tool Panel Management
function initializeToolPanels() {
    const toolTabs = document.querySelectorAll('.tool-tab');
    const toolPanels = document.querySelectorAll('.tool-panel');

    // Hide all panels initially except the first one
    toolPanels.forEach((panel, index) => {
        if (index === 0) {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    });

    // Set first tab as active
    if (toolTabs.length > 0) {
        toolTabs[0].classList.add('active');
    }

    toolTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            toolTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all panels
            toolPanels.forEach(panel => {
                panel.style.display = 'none';
            });

            // Show the corresponding panel
            const targetPanelId = `${tab.dataset.tool}-tool`;
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.style.display = 'block';
                targetPanel.style.animation = 'fadeIn 0.3s ease';
            }
        });
    });
}

// Text Tool
function initializeTextTool() {
    const textPanel = document.getElementById('text-tool');
    const submitBtn = textPanel.querySelector('.submit-btn');
    const textarea = textPanel.querySelector('textarea');
    const outputContent = textPanel.querySelector('.output-content');

    const bakeryAnswer = `Essential Tools for Your Home Bakery:

1. Stand Mixer: A high-quality stand mixer is crucial for efficient mixing, kneading, and whipping
2. Measuring Tools: 
   • Digital kitchen scale for precise measurements
   • Measuring cups and spoons for dry ingredients
   • Liquid measuring cups for accurate liquid portions

3. Baking Essentials:
   • Professional oven with accurate temperature control
   • Multiple baking sheets and cake pans
   • Cooling racks for proper cooling
   • Silicone baking mats or parchment paper

4. Preparation Tools:
   • Rolling pin for dough
   • Pastry brush for glazing
   • Offset spatula for frosting
   • Piping bags and tips for decorating

5. Storage and Organization:
   • Airtight containers for ingredients
   • Mixing bowls in various sizes
   • Dough scraper and bench knife
   • Recipe organizer or digital system

Pro Tip: Invest in quality tools from the start - they'll last longer and give better results!`;

    submitBtn.addEventListener('click', async () => {
        const text = textarea.value.trim();
        if (!text) {
            outputContent.innerHTML = 'Please enter your question.';
            return;
        }

        if (text === "What are the most important tools needed for a home bakery?") {
            outputContent.innerHTML = bakeryAnswer.replace(/\n/g, '<br>');
            outputContent.style.opacity = '0';
            outputContent.style.display = 'block';
            
            // Fade in animation
            setTimeout(() => {
                outputContent.style.transition = 'opacity 0.5s ease-in';
                outputContent.style.opacity = '1';
            }, 10);
        } else {
            outputContent.innerHTML = 'Please ask: "What are the most important tools needed for a home bakery?"';
        }
    });
}

// Image Tool
function initializeImageTool() {
    const imagePanel = document.getElementById('image-tool');
    const uploadArea = imagePanel.querySelector('.upload-area');
    const imageInput = imagePanel.querySelector('input[type="file"]');
    const preview = imagePanel.querySelector('#image-preview');
    const submitBtn = imagePanel.querySelector('.submit-btn');
    const outputContent = imagePanel.querySelector('.output-content');

    // Ensure the upload area is clickable
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        handleImageFiles(e.dataTransfer.files);
    });

    imageInput.addEventListener('change', (e) => {
        handleImageFiles(e.target.files);
    });

    function handleImageFiles(files) {
        preview.innerHTML = '';
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'preview-item';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = 'Preview';
                    
                    imgContainer.appendChild(img);
                    preview.appendChild(imgContainer);
                };
                reader.readAsDataURL(file);
            }
        });
        submitBtn.disabled = false;
    }

    submitBtn.addEventListener('click', async () => {
        if (!preview.hasChildNodes()) {
            showNotification('Please upload at least one image.');
            return;
        }

        try {
            outputContent.innerHTML = '<div class="loading">Processing images...</div>';
            
            // TODO: Add your API call here
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            outputContent.innerHTML = `
                <div class="image-grid">
                    <div class="generated-image">
                        <img src="https://via.placeholder.com/300" alt="Generated">
                    </div>
                    <div class="generated-image">
                        <img src="https://via.placeholder.com/300" alt="Generated">
                    </div>
                </div>
            `;
        } catch (error) {
            outputContent.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    });
}

// Code Tool
function initializeCodeTool() {
    const codePanel = document.getElementById('code-tool');
    const submitBtn = codePanel.querySelector('.submit-btn');
    const codeInput = codePanel.querySelector('.code-input');
    const languageSelect = codePanel.querySelector('.language-select');
    const outputContent = codePanel.querySelector('.output-content');

    submitBtn.addEventListener('click', async () => {
        const code = codeInput.value.trim();
        const language = languageSelect.value;

        if (!code) {
            showNotification('Please enter some code to process.');
            return;
        }

        try {
            outputContent.innerHTML = '<div class="loading">Processing code...</div>';
            
            // TODO: Add your API call here
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            outputContent.innerHTML = `
                <pre><code class="language-${language}">
                    // Generated code will appear here
                    function example() {
                        console.log("Hello, World!");
                    }
                </code></pre>
            `;
        } catch (error) {
            outputContent.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    });
}

// Captions Tool
function initializeCaptionsTool() {
    const captionsPanel = document.getElementById('captions-tool');
    const fileInput = captionsPanel.querySelector('input[type="file"]');
    const submitBtn = captionsPanel.querySelector('.submit-btn');
    const mediaPreview = document.getElementById('media-preview');
    const captionsText = captionsPanel.querySelector('.captions-text');
    const previewImage = captionsPanel.querySelector('.preview-image');
    const textarea = captionsPanel.querySelector('textarea');
    const copyBtn = captionsPanel.querySelector('[title="Copy"]');
    const includeHashtags = captionsPanel.querySelector('input[type="checkbox"]');
    const generateVariations = captionsPanel.querySelectorAll('input[type="checkbox"]')[1];
    const uploadArea = captionsPanel.querySelector('.upload-area');
    const addDescriptionBtn = document.createElement('button');
    
    // Create and add the "Add Description" button
    addDescriptionBtn.className = 'add-description-btn';
    addDescriptionBtn.innerHTML = 'Add Description';
    addDescriptionBtn.onclick = () => {
        textarea.focus();
    };
    captionsPanel.querySelector('.options-area').insertBefore(addDescriptionBtn, textarea);

    // Make upload area clickable
    uploadArea.addEventListener('click', () => {
        if (!mediaPreview.children.length) {
            fileInput.click();
        }
    });

    // Handle file upload
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/jpeg')) {
            showNotification('Please upload a JPG image.');
            fileInput.value = '';
            return;
        }

        // Clear previous previews
        mediaPreview.innerHTML = '';
        uploadArea.querySelector('p').style.display = 'none';
        uploadArea.querySelector('.supported-formats').style.display = 'none';
        
        // Create preview in upload area
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = 'Preview';
        img.className = 'upload-preview';

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent upload area click
            uploadArea.querySelector('p').style.display = 'block';
            uploadArea.querySelector('.supported-formats').style.display = 'block';
            img.remove();
            removeBtn.remove();
            fileInput.value = '';
            updateSubmitButton();
        };

        uploadArea.appendChild(img);
        uploadArea.appendChild(removeBtn);
        updateSubmitButton();
    });

    // Handle submit button state
    function updateSubmitButton() {
        const hasImage = uploadArea.querySelector('.upload-preview') !== null;
        const hasText = textarea.value.trim().length >= 10;
        submitBtn.disabled = !(hasImage && hasText);

        // Update button text if disabled
        if (submitBtn.disabled) {
            if (!hasImage && !hasText) {
                submitBtn.innerHTML = 'Upload Image & Add Description';
            } else if (!hasImage) {
                submitBtn.innerHTML = 'Upload Image';
            } else if (!hasText) {
                submitBtn.innerHTML = 'Add Description';
            }
        } else {
            submitBtn.innerHTML = 'Generate Instagram Caption';
        }

        // Update Add Description button state
        if (hasImage && !hasText) {
            addDescriptionBtn.classList.add('highlight');
        } else {
            addDescriptionBtn.classList.remove('highlight');
        }
    }

    // Add input validation listener
    textarea.addEventListener('input', updateSubmitButton);

    // Handle caption generation
    submitBtn.addEventListener('click', async () => {
        const uploadedImage = uploadArea.querySelector('.upload-preview');
        if (!uploadedImage) {
            showNotification('Please upload an image first.');
            return;
        }

        if (textarea.value.trim().length < 10) {
            showNotification('Please provide a longer description for your image (at least 10 characters).');
            return;
        }

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            captionsText.innerHTML = '<div class="loading">Generating captions...</div>';

            // Simulate caption generation (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            const text = textarea.value.trim();
            const withHashtags = includeHashtags.checked;
            const variations = generateVariations.checked;

            const captions = generateSampleCaptions(text, withHashtags, variations);

            // Display captions
            captionsText.innerHTML = captions.map((caption, index) => `
                <div class="caption-entry">
                    <div class="caption-header">
                        <span class="caption-variant">Variation ${index + 1}</span>
                        <button class="action-btn copy-btn" onclick="navigator.clipboard.writeText('${caption}')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <div class="caption-content">${caption}</div>
                </div>
            `).join('');
        } catch (error) {
            captionsText.innerHTML = `<p class="error">Error generating captions: ${error.message}</p>`;
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Generate Instagram Caption';
        }
    });

    // Handle copy all captions
    copyBtn.addEventListener('click', () => {
        const allCaptions = Array.from(captionsText.querySelectorAll('.caption-content'))
            .map(div => div.textContent)
            .join('\n\n');
        navigator.clipboard.writeText(allCaptions).then(() => {
            showNotification('All captions copied to clipboard!');
        });
    });

    // Initial button state
    updateSubmitButton();
}

// Helper function to generate sample Instagram captions
function generateSampleCaptions(text, withHashtags, variations) {
    const cakeHashtags = ['#cakestagram', '#bakinglife', '#homemade', '#instacake', '#cakeart', '#dessertlover', '#bakerylife', '#cakedesign', '#foodphotography'];

    const baseCaptions = [
        `🎂 Freshly baked perfection! ${text} Made with love and the finest ingredients. Every slice is a moment of pure joy!`,
        
        `✨ Indulge in sweetness! This ${text} is more than just a cake - it's a celebration of flavors and artistry. Perfect for making any moment special!`,
        
        `🧁 Baking magic happens here! Proud to present this ${text} - where traditional recipes meet modern creativity. Who's ready for a slice of happiness?`
    ];

    const numVariations = variations ? 3 : 1;
    const captions = [];

    for (let i = 0; i < numVariations; i++) {
        let caption = baseCaptions[i % baseCaptions.length];

        if (withHashtags) {
            // Select 5 random hashtags from the cake hashtags
            const selectedHashtags = cakeHashtags
                .sort(() => 0.5 - Math.random())
                .slice(0, 5)
                .join(' ');
            caption = `${caption}\n\n${selectedHashtags}`;
        }

        captions.push(caption);
    }

    return captions;
}

// Utility Functions
function showNotification(message, type = 'info') {
    // You can implement a toast notification system here
    console.log(`${type.toUpperCase()}: ${message}`);
}

// Content Generator Tool
function initializeContentTool() {
    const contentPanel = document.getElementById('content-tool');
    const contentSelect = contentPanel.querySelector('.content-select');
    const toneSelect = contentPanel.querySelector('.tone-select');
    const wordCount = contentPanel.querySelector('.word-count');
    const textarea = contentPanel.querySelector('textarea');
    const submitBtn = contentPanel.querySelector('.submit-btn');
    const outputContent = contentPanel.querySelector('.output-content');

    submitBtn.addEventListener('click', async () => {
        const keywords = textarea.value.trim();
        if (!keywords) {
            showNotification('Please enter keywords for your blog post.');
            return;
        }

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            outputContent.innerHTML = '<div class="loading">Creating your bakery blog post...</div>';
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const contentType = contentSelect.value;
            const tone = toneSelect.value;
            
            // Get the base content
            let content = generateSampleContent(contentType);
            
            // Customize content with keywords if provided
            if (keywords) {
                const keywordArray = keywords.split(',').map(k => k.trim());
                keywordArray.forEach(keyword => {
                    content = content.replace(/pastry|baking|recipe/gi, keyword);
                });
            }
            
            outputContent.innerHTML = `
                <div class="generated-content">
                    <div class="content-meta">
                        <span class="content-type"><i class="fas fa-file-alt"></i> Blog Post</span>
                        <span class="content-tone"><i class="fas fa-feather"></i> ${tone} Tone</span>
                    </div>
                    <div class="content-text">
                        ${content.replace(/\n/g, '<br>')}
                    </div>
                    <div class="content-actions">
                        <button onclick="navigator.clipboard.writeText(document.querySelector('.content-text').innerText)">
                            <i class="fas fa-copy"></i> Copy Text
                        </button>
                        <button onclick="window.print()">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            `;
        } catch (error) {
            outputContent.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Generate Content';
        }
    });

    // Update placeholder based on selected content type
    contentSelect.addEventListener('change', () => {
        const type = contentSelect.value;
        if (type === 'blog') {
            textarea.placeholder = 'Enter keywords for your bakery blog (e.g., cupcakes, chocolate, wedding cakes)...';
        }
    });

    // Initial placeholder setup
    if (contentSelect.value === 'blog') {
        textarea.placeholder = 'Enter keywords for your bakery blog (e.g., cupcakes, chocolate, wedding cakes)...';
    }
}

// Social Media Tool
function initializeSocialTool() {
    const socialPanel = document.getElementById('social-tool');
    const platformSelect = socialPanel.querySelector('.platform-select');
    const textarea = socialPanel.querySelector('textarea');
    const submitBtn = socialPanel.querySelector('.submit-btn');
    const hashtagCloud = socialPanel.querySelector('.hashtag-cloud');
    const captionVariants = socialPanel.querySelector('.caption-variants');

    submitBtn.addEventListener('click', async () => {
        const text = textarea.value.trim();
        if (!text) {
            showNotification('Please enter your post content.');
            return;
        }

        try {
            hashtagCloud.innerHTML = '<div class="loading">Finding trending hashtags...</div>';
            captionVariants.innerHTML = '<div class="loading">Generating captions...</div>';
            
            // TODO: Add your API call here
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const platform = platformSelect.value;
            
            // Sample hashtags
            const hashtags = ['#AI', '#Tech', '#Innovation', '#Digital', '#Future', '#Technology'];
            hashtagCloud.innerHTML = hashtags.map(tag => `
                <span class="hashtag">${tag}</span>
            `).join('');
            
            // Sample captions
            captionVariants.innerHTML = Array(3).fill(0).map((_, i) => `
                <div class="caption-variant">
                    <button class="action-btn copy-btn" title="Copy">
                        <i class="fas fa-copy"></i>
                    </button>
                    <p>Sample caption variation ${i + 1} for ${platform}</p>
                </div>
            `).join('');
        } catch (error) {
            hashtagCloud.innerHTML = `<p class="error">Error: ${error.message}</p>`;
            captionVariants.innerHTML = '';
        }
    });
}

// Brand Kit Tool
function initializeBrandTool() {
    const brandPanel = document.getElementById('brand-tool');
    const brandInput = brandPanel.querySelector('.brand-input');
    const brandTextarea = brandPanel.querySelector('.brand-textarea');
    const industrySelect = brandPanel.querySelector('.industry-select');
    const audienceSelect = brandPanel.querySelector('.audience-select');
    const submitBtn = brandPanel.querySelector('.submit-btn');
    const bioVariants = brandPanel.querySelector('.bio-variants');
    const toneGuidelines = brandPanel.querySelector('.tone-guidelines');
    const keywordsCloud = brandPanel.querySelector('.keywords-cloud');

    submitBtn.addEventListener('click', async () => {
        const brandName = brandInput.value.trim();
        if (!brandName) {
            showNotification('Please enter your brand name.');
            return;
        }

        try {
            bioVariants.innerHTML = '<div class="loading">Generating brand kit...</div>';
            
            // TODO: Add your API call here
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Sample bio variants
            bioVariants.innerHTML = Array(3).fill(0).map((_, i) => `
                <div class="bio-variant">
                    <h5>Version ${i + 1}</h5>
                    <p>Sample professional bio for ${brandName}...</p>
                </div>
            `).join('');
            
            // Sample tone guidelines
            toneGuidelines.innerHTML = [
                'Professional & Authoritative',
                'Friendly & Approachable',
                'Innovative & Forward-thinking',
                'Trustworthy & Reliable'
            ].map(tone => `
                <div class="tone-card">
                    <h5>${tone}</h5>
                    <p>Guidelines for maintaining this tone...</p>
                </div>
            `).join('');
            
            // Sample keywords
            const keywords = ['Innovation', 'Technology', 'Leadership', 'Excellence', 'Quality', 'Trust'];
            keywordsCloud.innerHTML = keywords.map(word => `
                <span class="keyword">${word}</span>
            `).join('');
        } catch (error) {
            bioVariants.innerHTML = `<p class="error">Error: ${error.message}</p>`;
            toneGuidelines.innerHTML = '';
            keywordsCloud.innerHTML = '';
        }
    });
}

// Helper function for sample content
function generateSampleContent(type) {
    const samples = {
        blog: `Freshly Baked Happiness: Welcome to Our Bakery

There's something magical about the smell of freshly baked bread and warm pastries filling the air. At VanilleBakers, we believe that every bite should bring a little more happiness into your day.

Our journey began with a simple idea: to create a cozy space where people could enjoy handcrafted baked goods made with love and the finest ingredients. From our buttery croissants to our decadent chocolate cakes, everything is prepared fresh daily by our passionate team of bakers.

We take pride in offering a variety of options for everyone. Craving something sweet? Try our signature cupcakes or rich brownies. Looking for a savory bite? Our artisan breads and cheese-stuffed buns are perfect for breakfast, lunch, or a comforting snack. We also offer gluten-free and vegan treats, because we believe everyone deserves a delicious moment, no matter their lifestyle.

At [Your Bakery Name], we aren't just about food — we're about creating memories. Whether you're celebrating a birthday, a wedding, or simply the beauty of a regular day, our custom cakes and themed desserts make every occasion special.

Visit us and experience the warmth of a true neighborhood bakery. Take a seat, sip a cup of freshly brewed coffee, and indulge in something sweet. Life is better when it's a little bit sweeter, and we're here to make sure you never miss a moment of joy.

Stay connected with us on Instagram and Facebook to see our latest creations and special offers. We can't wait to welcome you!`,
        product: '',
        bio: '',
        caption: ''
    };
    return samples[type] || '';
}

// Bakery answer functionality
document.addEventListener('DOMContentLoaded', function() {
    const bakeryAnswerBtn = document.getElementById('bakery-answer-btn');
    const bakeryOutput = document.getElementById('bakery-output');
    const textarea = document.querySelector('#text-tool textarea');

    const bakeryQuestions = {
        "What are the most important tools needed for a home bakery?": `Essential Tools for Your Home Bakery:

1. Stand Mixer: A high-quality stand mixer is crucial for efficient mixing, kneading, and whipping
2. Measuring Tools: 
   • Digital kitchen scale for precise measurements
   • Measuring cups and spoons for dry ingredients
   • Liquid measuring cups for accurate liquid portions

3. Baking Essentials:
   • Professional oven with accurate temperature control
   • Multiple baking sheets and cake pans
   • Cooling racks for proper cooling
   • Silicone baking mats or parchment paper

4. Preparation Tools:
   • Rolling pin for dough
   • Pastry brush for glazing
   • Offset spatula for frosting
   • Piping bags and tips for decorating

5. Storage and Organization:
   • Airtight containers for ingredients
   • Mixing bowls in various sizes
   • Dough scraper and bench knife
   • Recipe organizer or digital system

Pro Tip: Invest in quality tools from the start - they'll last longer and give better results!`
    };

    bakeryAnswerBtn.addEventListener('click', function() {
        const question = textarea.value.trim();
        
        if (!question) {
            bakeryOutput.innerHTML = 'Please type your bakery-related question first!';
            return;
        }

        // Check if the question exists in our questions object
        const answer = bakeryQuestions[question] || 'Please ask: "What are the most important tools needed for a home bakery?"';

        bakeryOutput.innerHTML = answer.replace(/\n/g, '<br>');
        bakeryOutput.style.opacity = '0';
        bakeryOutput.style.display = 'block';
        
        // Fade in animation
        setTimeout(() => {
            bakeryOutput.style.transition = 'opacity 0.5s ease-in';
            bakeryOutput.style.opacity = '1';
        }, 10);
    });
});

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    loadThemeStyles();
    initializeTheme();
    initializeSidebar();
    initializeChatHistory();
    initializeToolPanels();
    initializeTextTool();
    initializeImageTool();
    initializeCodeTool();
    initializeCaptionsTool();
    initializeContentTool();
    initializeSocialTool();
    initializeBrandTool();
    setupVoiceCommands();
}); 