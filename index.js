  const reviewBox = document.getElementById('reviewBox');
        const years = document.querySelectorAll('.years');
        const indicators = document.querySelectorAll('.indicator');
        const articles = document.querySelectorAll('article');
        let currentIndex = 0;
        
        function scrollToYear(index) {
            const yearWidth = years[0].offsetWidth + 30; // 寬度 + 間距
            const scrollPosition = index * yearWidth;
            
            reviewBox.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            // 更新當前活躍的年份
            years.forEach(year => year.classList.remove('active'));
            years[index].classList.add('active');
            
            // 更新指示器
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[index].classList.add('active');
            
            currentIndex = index;
        }
        
        function scrollToNext() {
            if (currentIndex < years.length - 1) {
                scrollToYear(currentIndex + 1);
            }
        }
        
        function scrollToPrev() {
            if (currentIndex > 0) {
                scrollToYear(currentIndex - 1);
            }
        }
        
        function showYear(year) {
            // 隱藏所有文章
            articles.forEach(article => {
                article.classList.remove('active');
            });
            
            // 顯示對應年份的文章
            const article = document.getElementById(`article${year}`);
            if (article) {
                article.classList.add('active');
            }
            
            // 滾動到對應的年份
            const index = Array.from(years).findIndex(y => y.id === `year${year}`);
            if (index !== -1) {
                scrollToYear(index);
            }
        }
        
        // 點擊指示器切換年份
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                const year = indicator.getAttribute('data-year');
                showYear(year);
            });
        });
        
        // 初始化
        document.addEventListener('DOMContentLoaded', () => {
            // 設置初始滾動位置
            setTimeout(() => {
                scrollToYear(0);
            }, 100);
            
            // 添加滑動支持
            let isDragging = false;
            let startX;
            let scrollLeft;
            
            reviewBox.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.pageX - reviewBox.offsetLeft;
                scrollLeft = reviewBox.scrollLeft;
                reviewBox.style.cursor = 'grabbing';
            });
            
            reviewBox.addEventListener('mouseleave', () => {
                isDragging = false;
                reviewBox.style.cursor = 'grab';
            });
            
            reviewBox.addEventListener('mouseup', () => {
                isDragging = false;
                reviewBox.style.cursor = 'grab';
            });
            
            reviewBox.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - reviewBox.offsetLeft;
                const walk = (x - startX) * 2;
                reviewBox.scrollLeft = scrollLeft - walk;
            });
            
            // 觸控支持
            reviewBox.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - reviewBox.offsetLeft;
                scrollLeft = reviewBox.scrollLeft;
            });
            
            reviewBox.addEventListener('touchmove', (e) => {
                const x = e.touches[0].pageX - reviewBox.offsetLeft;
                const walk = (x - startX) * 2;
                reviewBox.scrollLeft = scrollLeft - walk;
            });
            
            // 滾動事件監聽，更新當前索引
            reviewBox.addEventListener('scroll', () => {
                const yearWidth = years[0].offsetWidth + 30;
                const newIndex = Math.round(reviewBox.scrollLeft / yearWidth);
                
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex < years.length) {
                    years.forEach(year => year.classList.remove('active'));
                    years[newIndex].classList.add('active');
                    
                    indicators.forEach(indicator => indicator.classList.remove('active'));
                    indicators[newIndex].classList.add('active');
                    
                    currentIndex = newIndex;
                }
            });
        });
        
        // 添加鍵盤控制
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                scrollToPrev();
            } else if (e.key === 'ArrowRight') {
                scrollToNext();
            }
        });