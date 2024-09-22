window.addEventListener('scroll', function() {
    const headerWrapper = document.querySelector('.header-wrapper');
    const dropdownLinks = document.querySelectorAll('.dropdown a');

    if (window.scrollY > 50) {
        headerWrapper.classList.add('scrolled');
        // 不再禁止下拉链接的点击
        dropdownLinks.forEach(link => link.classList.add('scrolled'));
    } else {
        headerWrapper.classList.remove('scrolled');
        dropdownLinks.forEach(link => link.classList.remove('scrolled'));
    }
});


document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const slideTexts = document.querySelectorAll('.slide-text');
    const originalTexts = Array.from(slideTexts).map(text => text.textContent); // 保存原始文本内容
    const nameContainer = document.querySelector('.image-names');
    const names = ['home', 'Everest', 'Pacific', 'Siberia', 'Sirius', 'Beijing', 'Cosmos'];
    let typingTimeout;  // 用于保存定时器，防止打字动画持续运行

    function showSlide(index) {
        // 清除前一次的打字动画
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // 隐藏所有幻灯片
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });

        // 打字动画只在第一张幻灯片中
        if (index === 0) {
            let charIndex = 0;
            const textContent = originalTexts[index];
            const typingSpeed = 100;
            const cursor = document.createElement('span');
            cursor.classList.add('cursor');
            cursor.style.display = 'inline-block';
            slideTexts[index].appendChild(cursor);

            function type() {
                if (charIndex < textContent.length) {
                    slideTexts[index].textContent = textContent.slice(0, charIndex);
                    slideTexts[index].appendChild(cursor);
                    charIndex++;
                    typingTimeout = setTimeout(type, typingSpeed);
                } else {
                    cursor.style.display = 'inline-block';
                }
            }

            type(); // 开始打字动画
        }

        // 更新轮盘内容
        const prev2Name = names[(index - 2 + names.length) % names.length];
        const prev1Name = names[(index - 1 + names.length) % names.length];
        const currentName = names[index];
        const next1Name = names[(index + 1) % names.length];
        const next2Name = names[(index + 2) % names.length];

        nameContainer.innerHTML = `
            <span class="neighbor neighbor-last">${prev2Name}</span>
            <span class="neighbor">${prev1Name}</span>
            <span class="current">${currentName}</span>
            <span class="neighbor">${next1Name}</span>
            <span class="neighbor neighbor-next">${next2Name}</span>
        `;

        // 为每个名字添加点击事件以切换幻灯片
        const nameElements = nameContainer.querySelectorAll('span');
        nameElements.forEach((el, i) => {
            el.addEventListener('click', () => {
                slideIndex = (index - 2 + i) % names.length; // 根据点击的位置调整slideIndex
                showSlide(slideIndex);
            });
        });
    }

    // 下一张和上一张幻灯片功能
    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    }

    document.querySelector('.right-arrow').addEventListener('click', nextSlide);
    document.querySelector('.left-arrow').addEventListener('click', prevSlide);

    // 初始化显示第一个幻灯片
    showSlide(slideIndex);
});

const identities = ["Researcher", "Interdisciplinary Explorer", "Entrepreneurial Practitioner", "Lifelong Learner"];
let index = 0;
let currentText = '';
let typingSpeed = 100; // 固定打字速度
let deletingSpeed = 100; // 固定退位速度
let isDeleting = false;

function typeidentity() {
    const identityElement = document.getElementById('identity');
    const cursorElement = document.getElementById('cursor1');

    if (isDeleting) {
        currentText = currentText.slice(0, -1); // 删除字符
    } else {
        currentText += identities[index].charAt(currentText.length); // 添加字符
    }

    identityElement.textContent = `And I'm a ${currentText}`;
    identityElement.appendChild(cursorElement); // 将光标附加到文本后

    if (!isDeleting && currentText.length === identities[index].length) {
        setTimeout(() => {
            isDeleting = true; // 切换到删除状态
            typeidentity(); // 开始删除
        }, 2000); // 停留2秒
    } else if (isDeleting && currentText.length === 0) {
        isDeleting = false; // 切换状态
        index = (index + 1) % identities.length; // 切换到下一个身份
        setTimeout(typeidentity, typingSpeed); // 开始打字
    } else {
        // 根据当前状态设置打字或删除的速度
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeidentity, speed);
    }
}

typeidentity(); // 启动打字效果



const skillsData = {
    computer: {
        labels: ['Neural Network', 'Python', 'Front-end Technology', 'C Language', 'Matlab', 'Algorithms'],
        data: [90, 80, 95, 60, 85, 90]
    },
    statistics: {
        labels: ['Mathematical Modeling', 'SPSS', 'Stata', 'Time Series Analysis', 'Econometrics', 'Big Data Analysis'],
        data: [95, 80, 90, 85, 80, 95]
    },
    engineering: {
        labels: ['Robotics Kinematics', 'STM32', 'Circuit Design', 'Mechanical Modeling', 'SolidWorks', 'Dynamics'],
        data: [80, 75, 70, 80, 75, 70]
    },
    management: {
        labels: ['Management Theory', 'Economics', 'Team Collaboration', 'Operations Management', 'Academic Writing', 'Innovation'],
        data: [80, 75, 85, 90, 80, 85]
    }
};

function createRadarChart(ctx, skillCategory) {
    const data = skillsData[skillCategory];
    const maxLabelWidth = 80; // 设置最大标签宽度

    // 自定义标签绘制
    const originalDraw = Chart.defaults.plugins.tooltip.callbacks.label;
    Chart.defaults.plugins.tooltip.callbacks.label = function(tooltipItem) {
        const index = tooltipItem.dataIndex;
        return `${data.labels[index]}: ${data.data[index]}`;
    };

    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 4,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        display: false
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    pointLabels: {
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: 'Arial',
                            color: 'rgba(255,255,255,1)!important'
                        },
                        callback: function(value) {
                            // 切分标签为多行
                            const words = value.split(' ');
                            let lines = [];
                            let currentLine = '';

                            words.forEach(word => {
                                const testLine = currentLine + word + ' ';
                                const metrics = ctx.measureText(testLine);
                                const width = metrics.width;

                                if (width > maxLabelWidth && currentLine) {
                                    lines.push(currentLine);
                                    currentLine = word + ' ';
                                } else {
                                    currentLine = testLine;
                                }
                            });
                            lines.push(currentLine);
                            return lines; // 返回多个行
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: skillCategory.charAt(0).toUpperCase() + skillCategory.slice(1),
                    font: {
                        size: 28,
                        weight: 'bold',
                        family: 'Arial',
                        color: 'rgba(0,0,0,1)'
                    },
                    padding: {
                        top: 0,
                        bottom: 0
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const index = tooltipItem.dataIndex;
                            return `${data.labels[index]}: ${data.data[index]}`;
                        }
                    }
                }
            }
        }
    });
}

// 调用雷达图创建函数
document.addEventListener("DOMContentLoaded", function() {
    createRadarChart(document.getElementById('computerChart').getContext('2d'), 'computer');
    createRadarChart(document.getElementById('statisticsChart').getContext('2d'), 'statistics');
    createRadarChart(document.getElementById('engineeringChart').getContext('2d'), 'engineering');
    createRadarChart(document.getElementById('managementChart').getContext('2d'), 'management');
});
