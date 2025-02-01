// 현재 시간을 받아오는 함수
function getCurrentTime() {
    const now = new Date();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    return `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, '0')}월 ${String(now.getDate()).padStart(2, '0')}일(${dayOfWeek[now.getDay()]}) ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

// Zeroth 섹션의 첫 번째 입력 필드에 자동으로 현재시간 입력
document.addEventListener("DOMContentLoaded", () => {
    const zerothSection = document.querySelector(".report-section[data-section='Zeroth']");
    if (zerothSection) {
        const firstInput = zerothSection.querySelector(".input-field");
        if (firstInput) {
            firstInput.value = getCurrentTime();
        }
    }
});

// 섹션 전체 초기화 기능 (Zeroth 섹션도 모든 입력란 초기화)
function clearSection(sectionName) {
    const section = document.querySelector(`.report-section[data-section="${sectionName}"]`);
    if (!section) return;

    const inputs = section.querySelectorAll('.input-field');
    const output = section.querySelector('.output-field');

    // 모든 입력 필드 비우기
    inputs.forEach(input => input.value = '');
    
    // 출력 필드 비우기
    output.value = '';
}

// 버튼을 눌러 현재 시간 입력 기능
function insertCurrentTime(sectionName) {
    const section = document.querySelector(`.report-section[data-section="${sectionName}"]`);
    if (!section) return;

    const firstInput = section.querySelector('.input-field');
    if (!firstInput) return;

    firstInput.value = getCurrentTime();
}

// Generate 기능 (입력값을 모아서 출력 후 클립보드 복사 & 다음 섹션으로 값 전달)
function generateAndCopy(sectionName) {
    const section = document.querySelector(`.report-section[data-section="${sectionName}"]`);
    if (!section) return;

    const inputs = Array.from(section.querySelectorAll('.input-field'));
    const fields = inputs.map(input => input.value.trim()).filter(text => text !== "");

    const result = `[${sectionName}]\n` + fields.map((text, i) => `항목 ${i + 1}: ${text}`).join("\n");

    const output = section.querySelector('.output-field');
    output.value = result;

    // 클립보드 복사 및 상태 메시지 표시
    navigator.clipboard.writeText(result)
        .then(() => {
            const statusLabel = section.querySelector('.status-label');
            if (statusLabel) {
                statusLabel.textContent = '📋 클립보드 복사 완료!';
                statusLabel.style.color = "#48bb78"; // 초록색으로 강조

                // 5초 후 메시지 사라지도록 설정
                setTimeout(() => {
                    statusLabel.textContent = '';
                }, 5000);
            }
        })
        .catch(err => console.error('클립보드 복사 실패:', err));

    // 다음 섹션으로 값 전달 (마지막 섹션 제외)
    const allSections = Array.from(document.querySelectorAll('.report-section'));
    const currentIndex = allSections.findIndex(sec => sec.dataset.section === sectionName);

    if (currentIndex !== -1 && currentIndex < allSections.length - 1) {
        const nextSection = allSections[currentIndex + 1];
        if (nextSection) {
            const nextInputs = nextSection.querySelectorAll('.input-field');
            inputs.forEach((input, i) => {
                if (nextInputs[i]) {
                    nextInputs[i].value = input.value;
                }
            });
        }
    }
}

// 디버깅 메시지
console.log('JavaScript successfully loaded and updated.');
