from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from functions import *

REMOTECOMPUTER = 'localhost'

app = Flask(__name__)
CORS(app)

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('query')
    print(f"\nSearch query received: {query} \n {type(query)}\n")
    return jsonify({"message": "Search query received", "query": query})

@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    print(f"Form data received: {data}")
    result = AddPrinter(data.get('name'), data.get('driver'), data.get('ip'))
    return jsonify({"message": "Form data received", "data": data, "success": result})

@app.route('/delete-printer', methods=['POST'])
def delete_printer():
    data = request.json
    printer_name = data.get('name')
    print(f"Delete printer request received for: {printer_name}")
    result = DeletePrinter(printer_name)
    return jsonify({"message": "Delete printer request processed", "name": printer_name, "success": result})

@app.route('/get-drivers', methods=['GET'])
def get_drivers():
    result = RunRemoteScript('''
        Get-PrinterDriver | Select-Object -ExpandProperty Name | ConvertTo-Json
    ''')
    try:
        drivers = json.loads(result)
        if isinstance(drivers, str):
            drivers = [drivers]
        return jsonify({"drivers": drivers})
    except Exception as e:
        print("Driver parsing error:", e, result)
        return jsonify({"drivers": []})

@app.route('/printers', methods=['GET'])
def get_printers():
    result = RunRemoteScript('''
        Get-Printer | Select-Object Name, DriverName, PortName | ForEach-Object {
            @{
                name = $_.Name
                driver = $_.DriverName
                ip = $_.PortName
            }
        } | ConvertTo-Json
    ''')
    try:
        printers = json.loads(result)
        if isinstance(printers, dict):
            printers = [printers]
        return jsonify(printers)
    except Exception as e:
        print("Printer parsing error:", e, result)
        return jsonify([])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)