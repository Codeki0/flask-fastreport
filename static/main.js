function clearSection(sectionName) {
    const section = document.querySelector(`.report-section[data-section="${sectionName}"]`);
    if (!section) return;

    const inputs = section.querySelectorAll('.input-field');
    const output = section.querySelector('.output-field');

    inputs.forEach(input => input.value = '');
    output.value = '';
}

function generateAndCopy(sectionName) {
    const section = document.querySelector(`.report-section[data-section="${sectionName}"]`);
    if (!section) return;

    const inputs = Array.from(section.querySelectorAll('.input-field'));
    const fields = inputs.map(input => input.value.trim()).filter(text => text !== "");

    const result = `[${sectionName}]\n` + fields.map((text, i) => `항목 ${i + 1}: ${text}`).join("\n");

    const output = section.querySelector('.output-field');
    output.value = result;

    navigator.clipboard.writeText(result)
        .then(() => {
            const statusLabel = section.querySelector('.status-label');
            statusLabel.textContent = '클립보드 복사 완료';
            setTimeout(() => {
                statusLabel.textContent = '';
            }, 5000);
        })
        .catch(err => console.error('클립보드 복사 실패:', err));
}

function insertCurrentTime(sectionName) {
    const section = document.querySelector(`.report-section[data-section="${sectionName}"]`);
    if (!section) return;

    const firstInput = section.querySelector('.input-field');
    if (!firstInput) return;

    const now = new Date();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const timeStr = `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, '0')}월 ${String(now.getDate()).padStart(2, '0')}일(${dayOfWeek[now.getDay()]}) ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    firstInput.value = timeStr;
}

// 디버깅 메시지
console.log('Static JavaScript loaded successfully');
