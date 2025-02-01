function clearSection(sectionName) {
    const sections = document.querySelectorAll('.report-section');
    const section = Array.from(sections).find(s => s.querySelector('h2').textContent === sectionName);
    if (!section) return;
    
    const inputs = section.querySelectorAll('.input-field');
    const output = section.querySelector('.output-field');
    
    inputs.forEach(input => input.value = '');
    output.value = '';
}

async function generateAndCopy(sectionName) {
    const sections = document.querySelectorAll('.report-section');
    const section = Array.from(sections).find(s => s.querySelector('h2').textContent === sectionName);
    if (!section) return;
    
    const inputs = Array.from(section.querySelectorAll('.input-field'));
    const fields = inputs.map(input => input.value.trim());
    
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                section_name: sectionName,
                fields: fields
            })
        });
        
        const data = await response.json();
        const output = section.querySelector('.output-field');
        output.value = data.result;
        
        try {
            await navigator.clipboard.writeText(data.result);
            
            const statusLabel = section.querySelector('.status-label');
            statusLabel.textContent = '클립보드 복사 완료';
            setTimeout(() => {
                statusLabel.textContent = '';
            }, 5000);
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
        }
        
        const nextSection = section.nextElementSibling;
        if (nextSection) {
            const nextInputs = nextSection.querySelectorAll('.input-field');
            inputs.forEach((input, i) => {
                if (nextInputs[i]) {
                    nextInputs[i].value = input.value;
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
        alert('오류가 발생했습니다: ' + error.message);
    }
}

function insertCurrentTime(sectionName) {
    const sections = document.querySelectorAll('.report-section');
    const section = Array.from(sections).find(s => s.querySelector('h2').textContent === sectionName);
    if (!section) return;
    
    const firstInput = section.querySelector('.input-field');
    if (!firstInput) return;
    
    const now = new Date();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const timeStr = `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, '0')}월 ${String(now.getDate()).padStart(2, '0')}일(${dayOfWeek[now.getDay()]}) ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    firstInput.value = timeStr;
}

// Undo/Redo 기능
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'z') {
            document.execCommand('undo', false, null);
        } else if (e.ctrlKey && e.key === 'y') {
            document.execCommand('redo', false, null);
        }
    });
});

// 디버깅을 위한 콘솔 로그
console.log('JavaScript loaded successfully');