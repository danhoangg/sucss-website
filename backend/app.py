from flask import Flask, request, send_from_directory, abort, jsonify 
from flask_cors import CORS
import json
import os, datetime

EVENTS_FOLDER = 'html/events'
DOCS_FOLDER = 'html/docs'
JSON_FILE = 'events.json'

app = Flask(__name__, static_folder='../frontend/sucss/build', static_url_path='/')

def date_to_academic_year(date):
    date_object = datetime.strptime(date, "%Y-%m-%d")
    year = date_object.year

    if date_object.month < 9: 
        return f"{(year-1) % 100:02d}-{year % 100:02d}"
    else:  
        return f"{year % 100:02d}-{(year+1) % 100:02d}"

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
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
    #app.run(debug=True)