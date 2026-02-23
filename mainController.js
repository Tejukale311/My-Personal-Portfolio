angular.module('portfolioApp')
.controller('MainController', function($scope, $http) {
    // Personal Information
    $scope.name = "Tejasvi Kailas Kale";
    $scope.intro = "Frontend & Backend Developer";
    $scope.linkedin = "https://www.linkedin.com/in/tejasvi-kale-1st-404b49289";
    
    // Personal Details
    $scope.personalDetails = {
        gender: "Female",
        dateOfBirth: "26 Oct, 2003",
        maritalStatus: "Single",
        address: "Alandi, Pune",
        languages: ["English", "Hindi", "Marathi"],
        phoneNumbers: ["9067953985"], 
        email: "tejukale706@gmail.com",
        collegeEmail: "5153468@mitacsc.edu.in"
    };

    // Skills with proficiency levels
    $scope.machineLearningSkills = [
        { name: "Scikit-learn", level: 80 },
        { name: "OpenCV", level: 75 },
        { name: "Sklearn", level: 80 }
    ];

    $scope.dataAnalysisSkills = [
        { name: "Pandas", level: 85 },
        { name: "NumPy", level: 80 }
    ];

    $scope.programmingSkills = [
        { name: "SQL", level: 85 },
        { name: "Python", level: 90 },
        { name: "C", level: 75 },
        { name: "Java", level: 70 }
    ];

    $scope.visualizationSkills = [
        { name: "Matplotlib", level: 80 },
        { name: "Seaborn", level: 75 }
    ];

    $scope.webSkills = [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "PHP", level: 70 },
        { name: "React.js", level: 85 },
        { name: "Angular", level: 75 },
        { name: "Node.js", level: 80 }
    ];

    $scope.databaseSkills = [
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "Supabase", level: 85 }
    ];

    $scope.toolsSkills = [
        { name: "Git", level: 85 },
        { name: "Linux", level: 75 }
    ];

    $scope.softSkills = [
        { name: "Communication", level: 90 },
        { name: "Adaptability", level: 85 },
        { name: "Teamwork", level: 90 },
        { name: "Decision Making", level: 85 },
        { name: "Presentation", level: 80 }
    ];

    // Enhanced Projects
    $scope.projects = [
        {
            name: "Foodies Restaurant Website",
            description: "A fully responsive restaurant website built with Bootstrap 5, featuring modern design, menu showcase, online ordering system, and customer testimonials. Includes interactive elements and smooth animations for enhanced user experience.",
            mentor: "Rasmi Mam",
            teamSize: 1,
            link: "https://drive.google.com/drive/folders/1Zz9HtGRMP10yKkM88qhC4KMZmEHNlmGk?usp=drive_link",
            github: "https://github.com/tejukale706/foodies-website",
            image: "img/foodies_logo.jpg", // Updated to use the provided Foodies logo
            technologies: ["HTML5", "CSS", "JavaScript", "Bootstrap"]
        },
        {
            name: "Attendance Management System",
            description: "A modern attendance management tool built with React, Tailwind CSS, Supabase, and HTML. This real-world application enables teams to track attendance, manage users, and generate reports efficiently. Features include real-time updates, authentication, and a responsive UI. Currently in active development.",
            mentor: "SAAD Shaikh sir",
            teamSize: 1,
            link: "https://drive.google.com/drive/folders/1Y143Lm_nr5tbPcP4WIUcW6UIeoNIdTNz?usp=drive_link",
            github: "https://github.com/yourusername/attendance-management-system", // Replace with actual repo if available
            image: "https://via.placeholder.com/400x250/22D3EE/ffffff?text=React+Tailwind+Supabase",
            technologies: ["React", "Tailwind CSS", "Supabase", "JavaScript", "HTML"]
        }
    ];

    // Internships
    $scope.internships = [
        {
            company: "Evergreen Education Foundation",
            role: "Full Stack Web Developer",
            period: "March 3, 2025 - April 20, 2025",
            location: "Onsite",
            type: "Full-time",
            description: "During my internship at Evergreen Education Foundation, I developed a responsive Attendance Management System using React, Tailwind CSS, TypeScript, Supabase, and HTML. The system provides role-specific dashboards for teachers and students to mark, track, and view attendance efficiently.",
            technologies: ["React", "Supabase", "TypeScript", "HTML", "Tailwind CSS"],
            achievements: [
                "Designed role-specific dashboards for teachers and students to mark, track, and view attendance efficiently",
                "Integrated real-time analytics and charts to visualize monthly and daily attendance patterns",
                "Enabled authentication, report export, and attendance summaries using Supabase as the backend"
            ]
        },
        {
            company: "Indolike SMM Agency (NIT)",
            role: "Machine Learning Intern",
            period: "September 5, 2025 - October 5, 2025",
            location: "Allahabad",
            type: "Full-time",
            description: "Implemented a linear regression model to predict house prices based on square footage, bedrooms, and bathrooms. Achieved accurate price estimation using multivariate feature inputs from the house prediction dataset.",
            technologies: ["Linear Regression", "Python", "Machine Learning", "Data Analysis", "House Prediction Dataset"],
            achievements: [
                "Implemented a linear regression model to predict house prices based on square footage, bedrooms, and bathrooms",
                "Achieved accurate price estimation using multivariate feature inputs",
                "Worked with house prediction dataset to train and validate the model"
            ]
        }
        // Add more internships as needed
    ];

    // Enhanced Education
    $scope.education = [
        {
            degree: "M.Sc. Computer Science",
            institution: "MIT ACSC Alandi, Pune",
            period: "2024 - 2026",
            details: "Currently pursuing Master's degree with focus on advanced web technologies and software development"
        },
        {
            degree: "B.Sc. Computer Science",
            institution: "New Arts College Parner",
            period: "2021 - 2024",
            details: "Graduated with CGPA: 8.36. Specialized in web development and programming fundamentals"
        },
        {
            degree: "Higher Secondary (12th)",
            institution: "MSBSHSE",
            period: "2019",
            details: "Completed with 77.40% marks"
        },
        {
            degree: "Secondary (10th)",
            institution: "MSBSHSE",
            period: "2017",
            details: "Completed with 84.40% marks"
        }
    ];

    // Contact Form
    $scope.contact = {};
    
    $scope.sendMessage = function() {
        if ($scope.contact.name && $scope.contact.email && $scope.contact.subject && $scope.contact.message) {
            $http.post('http://localhost:3000/api/contact', $scope.contact)
                .then(function(response) {
                    showNotification('Message sent successfully!', 'success');
                    $scope.contact = {};
                }, function(error) {
                    showNotification('Failed to send message. Please try again.', 'error');
                });
        } else {
            showNotification('Please fill in all fields.', 'warning');
        }
    };

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.background = '#28a745';
        } else if (type === 'error') {
            notification.style.background = '#dc3545';
        } else {
            notification.style.background = '#ffc107';
            notification.style.color = '#333';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Mobile Navigation Toggle
    $scope.toggleMobileMenu = function() {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    };

    // Smooth scrolling for navigation links
    $scope.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Initialize scroll to top functionality
    $scope.initScrollToTop = function() {
        const scrollBtn = document.getElementById('scrollToTop');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // Initialize mobile menu functionality
    $scope.initMobileMenu = function() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelectorAll('.nav-link');
        
        hamburger.addEventListener('click', $scope.toggleMobileMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    };

    // Initialize when controller loads
    $scope.$on('$viewContentLoaded', function() {
        $scope.initScrollToTop();
        $scope.initMobileMenu();
    });

    $scope.certifications = [
        {
            name: "Sample Certificate",
            issuer: "Certification Authority",
            year: "2024",
            link: "#"
        }
    ];

    // Resume upload logic
    $scope.resumeName = null;
    $scope.resumeUrl = 'resume.pdf';

    $scope.triggerResumeUpload = function() {
        document.getElementById('resumeInput').click();
    };

    $scope.uploadResume = function(files) {
        if (files && files.length > 0) {
            var file = files[0];
            $scope.resumeName = file.name;
            // No need to update resumeUrl, always use static file
        }
    };

    $scope.viewResume = function() {
        window.open($scope.resumeUrl, '_blank');
    };

    // Profile picture upload logic with localStorage persistence
    $scope.profileImageUrl = localStorage.getItem('profileImageUrl') || null;
    $scope.triggerProfilePicUpload = function() {
        document.getElementById('profilePicInput').click();
    };
    $scope.uploadProfilePic = function(files) {
        if (files && files.length > 0) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $scope.$apply(function() {
                    $scope.profileImageUrl = e.target.result;
                    localStorage.setItem('profileImageUrl', e.target.result);
                });
            };
            reader.readAsDataURL(files[0]);
        }
    };
});
