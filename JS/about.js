const identities = ["Researcher", "Leader", "Doctor", "Innovator", "Educator", "Creator"];
let index = 0;
let currentText = '';
let typingSpeed = 150; // 固定打字速度
let deletingSpeed = 150; // 固定退位速度
let isDeleting = false;
let typingInterval;

function type() {
    const identityElement = document.getElementById('identity');

    if (isDeleting) {
        currentText = currentText.slice(0, -1);
    } else {
        currentText += identities[index].charAt(currentText.length);
    }

    identityElement.textContent = `And I'm a ${currentText}`;

    if (!isDeleting && currentText.length === identities[index].length) {
        isDeleting = true;
        setTimeout(type, 1000); // 停留一秒
    } else if (isDeleting && currentText.length === 0) {
        isDeleting = false;
        index = (index + 1) % identities.length; // 切换到下一个身份
        clearTimeout(typingInterval); // 清除之前的计时器
        typingInterval = setTimeout(type, typingSpeed); // 开始打字
        return; // 直接返回，避免重复调用
    }

    typingInterval = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

type(); // 启动打字效果


const skillsData = {
    computer: {
        labels: ['Python', 'C', 'HTML/CSS/JavaScript', 'Matlab', 'Neural Network', 'Algorithms'],
        data: [90, 80, 85, 75, 85, 80]
    },
    statistics: {
        labels: ['Stata', 'SPSS', 'Mathematical Modeling', 'Econometrics', 'Time Series Analysis', 'Big Data Analysis'],
        data: [85, 80, 90, 75, 80, 85]
    },
    engineering: {
        labels: ['SolidWorks', 'STM32', 'Circuit Design', 'Robotics Kinematics', 'Mechanical Modeling', 'Dynamics'],
        data: [80, 75, 70, 80, 75, 70]
    },
    management: {
        labels: ['Management Theory', 'Economics', 'Team Collaboration', 'Innovation', 'Academic Writing', 'Operations Management'],
        data: [80, 75, 85, 90, 80, 85]
    }
};

function createRadarChart(ctx, skillCategory) {
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: skillsData[skillCategory].labels,
            datasets: [{
                label: skillCategory.charAt(0).toUpperCase() + skillCategory.slice(1),
                data: skillsData[skillCategory].data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

createRadarChart(document.getElementById('computerChart').getContext('2d'), 'computer');
createRadarChart(document.getElementById('statisticsChart').getContext('2d'), 'statistics');
createRadarChart(document.getElementById('engineeringChart').getContext('2d'), 'engineering');
createRadarChart(document.getElementById('managementChart').getContext('2d'), 'management');