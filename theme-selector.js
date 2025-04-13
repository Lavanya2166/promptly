document.addEventListener('DOMContentLoaded', () => {
    const themeOptions = document.querySelectorAll('.theme-option');
    const storedTheme = localStorage.getItem('selectedTheme');

    // Remove any existing selected class
    const clearSelectedClass = () => {
        themeOptions.forEach(option => option.classList.remove('selected'));
    };

    // Add click handlers to theme options
    themeOptions.forEach(option => {
        const theme = option.dataset.theme;
        
        // Mark the stored theme as selected
        if (storedTheme === theme) {
            clearSelectedClass();
            option.classList.add('selected');
        }

        option.addEventListener('click', () => {
            clearSelectedClass();
            option.classList.add('selected');
            
            // Store the selected theme
            localStorage.setItem('selectedTheme', theme);
            
            // Redirect to index with the selected theme
            window.location.href = `index.html?theme=${theme}`;
        });
    });

    // Add hover effects
    themeOptions.forEach(option => {
        option.addEventListener('mouseenter', () => {
            if (!option.classList.contains('selected')) {
                option.style.transform = 'translateY(-5px)';
            }
        });

        option.addEventListener('mouseleave', () => {
            if (!option.classList.contains('selected')) {
                option.style.transform = 'translateY(0)';
            }
        });
    });
}); 