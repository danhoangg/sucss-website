from flask import Flask, request, send_from_directory, abort, jsonify 
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import json
import os, datetime
from dotenv import load_dotenv

load_dotenv()

EVENTS_FOLDER = 'html/events'
DOCS_FOLDER = 'html/docs'
JSON_FILE = 'events.json'
PORT = 8080

app = Flask(__name__, static_folder='../frontend/sucss/build', static_url_path='/')

app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=30)

jwt = JWTManager(app)

def date_to_academic_year(date_str):
    date = datetime.datetime.strptime(date_str, "%Y-%m-%d")
    start_year = date.year
    if date.month < 9:
        start_year -= 1 

    return f"{start_year % 100:02d}-{(start_year + 1) % 100:02d}"

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    if path.startswith('api/'):
        return jsonify({'error': 'API route not found'}), 404
    else:
        if os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')
        
@app.errorhandler(404)   
def not_found(e):   
  return send_from_directory(app.static_folder, 'index.html')


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    if username == os.getenv('LOGIN_USERNAME') and password == os.getenv('LOGIN_PASSWORD'):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    return jsonify({'error': 'Bad username or password'}), 401

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/api/delete-event', methods=['POST'])
@jwt_required()
def delete_event():
    data = request.get_json()
    id = int(data.get('id'))
    
    try:
        with open(JSON_FILE, 'r') as file:
            events = json.load(file)
        
        event = next((e for e in events if e['id'] == id), None)
        
        if event is None:
            return jsonify({"error": "Event not found"}), 404
        
        if event['isLink']:
            html_path = os.path.join(EVENTS_FOLDER, event['html'])
            if os.path.exists(html_path):
                os.remove(html_path)
        
        events = [e for e in events if e['id'] != id]
        
        with open(JSON_FILE, 'w') as file:
            json.dump(events, file, indent=4)
        
        return jsonify({'success': 'Event deleted successfully'}), 200
        
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/api/add-event', methods=['POST'])
@jwt_required()
def add_event():
    data = request.get_json()
    
    name = data.get('name')
    date = data.get('date')
    path = data.get('path')
    is_link = data.get('isLink')
    code = data.get('code')
    
    if not name or not date or is_link is None:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if is_link and (not code or not path):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        date = datetime.datetime.strptime(date, '%Y-%m-%d').strftime('%Y-%m-%d')
        year = date_to_academic_year(date)
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400
    
    try:
        with open(JSON_FILE, 'r') as file:
            events = json.load(file)
        
        # Check if event's year+path is unique
        if is_link and any(e for e in events if e['year'] == year and e.get('path') == path):
            return jsonify({'error': 'Event with the same year and path already exists'}), 409
        
        id = max([event['id'] for event in events], default=0) + 1
        
        if is_link:
            html = f"{year}-{path}.html"
            html_path = os.path.join(EVENTS_FOLDER, html)
            
            with open(html_path, 'w') as file:
                file.write(code)

            events.append({
                'id': len(events),
                'name': name,
                'isLink': is_link,
                'date': date,
                'year': year,
                'path': path,
                'html': html
            })
        else:
            events.append({
                'id': len(events),
                'name': name,
                'isLink': is_link,
                'date': date,
                'year': year
            })
        
        with open(JSON_FILE, 'w') as file:
            json.dump(events, file, indent=4)   
            
        return jsonify({'success': 'Event added successfully'}), 201
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/api/edit-event', methods=['POST'])
@jwt_required()
def edit_event():
    data = request.get_json()

    id = int(data.get('id'))
    name = data.get('name')
    date = data.get('date')
    path = data.get('path')
    is_link = data.get('isLink')
    code = data.get('code')
    
    if id is None or not name or not date or is_link is None:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if is_link and (not code or not path):
            return jsonify({'error': 'Missing required fields'}), 400

    try:
        date = datetime.datetime.strptime(date, '%Y-%m-%d').strftime('%Y-%m-%d')
        year = date_to_academic_year(date)
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400
    
    try:
        with open(JSON_FILE, 'r') as file:
            events = json.load(file)
        
        event = next((e for e in events if e['id'] == id), None)
        
        if event is None:
            return jsonify({"error": "Event not found"}), 404

        # Check if event's year+path is unique
        if is_link and any(e for e in events if e['year'] == year and e.get('path') == path and e['id'] != id):
            return jsonify({'error': 'Event with the same year and path already exists'}), 409
        
        # if the old event was a link, delete the old html file
        if event['isLink']:
            os.remove(os.path.join(EVENTS_FOLDER, event['html']))
        
        # if edit is a link then write a new html file
        if is_link:
            html = f"{year}-{path}.html"
            html_path = os.path.join(EVENTS_FOLDER, html)
            
            with open(html_path, 'w') as file:
                file.write(code)  

            event.update({
                'name': name,
                'isLink': is_link,
                'date': date,
                'year': year,
                'path': path,
                'html': html
            })
        else:
            event.update({
                'name': name,
                'isLink': is_link,
                'date': date,
                'year': year
            })
        
        with open(JSON_FILE, 'w') as file:
            json.dump(events, file, indent=4)   
            
        return jsonify({'success': 'Event updated successfully'}), 200
        
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route('/api/events', methods=['POST'])
def get_events():
    try:
        with open(JSON_FILE, 'r') as f:
            events = json.load(f)
        return jsonify(events)
    except FileNotFoundError:
        return jsonify({"error": "Events file not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Events file is not valid JSON"}), 500

@app.route('/api/get-event/<int:event_id>', methods=['POST'])
def get_event(event_id):
    try:
        with open(JSON_FILE, 'r') as file:
            events = json.load(file)

        event = next((event for event in events if event['id'] == event_id), None)
        
        if event is None:
            return jsonify({"error": "Event not found"}), 404
        
        event_data = {
            "name": event["name"],
            "date": event["date"],
            "path": event.get("path", ""),
            "isLink": event["isLink"],
            "code": ""
        }

        if event["isLink"]:
            html_path = os.path.join(EVENTS_FOLDER, event["html"])
            if os.path.exists(html_path):
                with open(html_path, 'r', encoding='utf-8') as file:
                    event_data["code"] = file.read()
            else:
                return jsonify({"error": "HTML file not found"}), 404

        return jsonify(event_data)
    
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding JSON"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/api/get-event/<year>/<path:path>', methods=['POST'])
def get_html(year, path):
    try:
        if not os.path.exists(JSON_FILE):
            return jsonify({'error': 'Events data file not found'}), 404
        
        with open(JSON_FILE, 'r') as file:
            events = json.load(file)
        
        event = next((e for e in events if e['year'] == year and e.get('path') == path), None)
        if not event:
            return jsonify({'error': 'Event not found'}), 404

        if 'html' not in event:
            return jsonify({'error': 'No HTML content available for this event'}), 404

        html_file_path = os.path.join(EVENTS_FOLDER, event['html'])
        
        if not os.path.exists(html_file_path):
            return jsonify({'error': 'HTML file not found'}), 404
        
        return send_from_directory(EVENTS_FOLDER, event['html'])
    
    except json.JSONDecodeError:
        return jsonify({'error': 'Error decoding JSON'}), 500
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/get-docs/<docs>', methods=['POST'])
def get_docs(docs):
    docs = f"{docs}.html"
    try:
        doc_file_path = os.path.join(DOCS_FOLDER, docs)
        
        if not os.path.exists(doc_file_path):
            return jsonify({'error': 'Document not found'}), 404
        
        return send_from_directory(DOCS_FOLDER, docs)
    
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    #app.run(debug=True)
    from waitress import serve
    print(f'Starting server on port {PORT}')
    serve(app, host="0.0.0.0", port=PORT)