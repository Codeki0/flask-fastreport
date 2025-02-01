from flask import Flask, render_template, jsonify, request
from datetime import datetime
import pyperclip

app = Flask(__name__)

def get_current_time():
    now = datetime.now()
    day_of_week = ["월", "화", "수", "목", "금", "토", "일"]
    return now.strftime(f"%Y년 %m월 %d일({day_of_week[now.weekday()]}) %H:%M")

@app.route('/')
def index():
    return render_template('index.html', 
                         current_time=get_current_time(),
                         readonly=False)

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    section_name = data.get('section_name')
    fields = data.get('fields', [])
    
    result = f"[{section_name}]\n"
    result += "\n".join(f"항목 {i+1}: {field}" for i, field in enumerate(fields) if field)
    
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)