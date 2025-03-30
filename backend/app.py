import os
from flask import Flask, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

# Моковые данные для дисциплин
disciplines = [
    {
        "id": 1,
        "name": "Математика",
        "description": "Изучение чисел, алгебры, геометрии и других математических концепций",
        "difficulty": "Высокая",
        "popular_topics": ["Алгебра", "Геометрия", "Математический анализ"]
    },
    {
        "id": 2,
        "name": "Физика",
        "description": "Изучение материи, энергии и их взаимодействия",
        "difficulty": "Высокая",
        "popular_topics": ["Квантовая механика", "Электромагнетизм", "Термодинамика"]
    },
    {
        "id": 3,
        "name": "Химия",
        "description": "Изучение веществ, их состава, строения и свойств",
        "difficulty": "Средняя",
        "popular_topics": ["Органическая химия", "Неорганическая химия", "Аналитическая химия"]
    },
    {
        "id": 4,
        "name": "Биология",
        "description": "Наука о жизни и живых организмах",
        "difficulty": "Средняя",
        "popular_topics": ["Генетика", "Эволюция", "Микробиология"]
    },
    {
        "id": 5,
        "name": "История",
        "description": "Изучение прошлого человечества, событий и культур",
        "difficulty": "Низкая",
        "popular_topics": ["Средневековье", "Великие войны", "Античность"]
    },
    {
        "id": 6,
        "name": "География",
        "description": "Наука о Земле, её строении, климате и народах",
        "difficulty": "Средняя",
        "popular_topics": ["Физическая география", "Экономическая география", "Климатология"]
    },
    {
        "id": 7,
        "name": "Информатика",
        "description": "Изучение компьютерных технологий, программирования и алгоритмов",
        "difficulty": "Высокая",
        "popular_topics": ["Алгоритмы", "Базы данных", "Программирование"]
    },
    {
        "id": 8,
        "name": "Литература",
        "description": "Изучение художественных произведений и их анализа",
        "difficulty": "Низкая",
        "popular_topics": ["Русская литература", "Поэзия", "Мировая литература"]
    }
]

@app.route('/')
def index():
    response = make_response(jsonify({"message": "Welcome to the Educational Disciplines API"}))
    return add_cors_headers(response)

@app.route('/api/disciplines', methods=['GET'])
def get_disciplines():
    response = make_response(jsonify(disciplines))
    return add_cors_headers(response)

@app.route('/api/disciplines/<int:discipline_id>', methods=['GET'])
def get_discipline(discipline_id):
    discipline = next((d for d in disciplines if d['id'] == discipline_id), None)
    if discipline is None:
        response = make_response(jsonify({"error": "Discipline not found"}), 404)
    else:
        response = make_response(jsonify(discipline))
    return add_cors_headers(response)

@app.after_request
def after_request(response):
    return add_cors_headers(response)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)