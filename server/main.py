from flask import Flask
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/<name>")
def hello_world(name):
    requestUrl = f"https://www.nexon.com/api/maplestory/no-auth/ranking/v2/na?type=overall&id=weekly&character_name={name}"
    r = requests.get(requestUrl)
    print(r.content)
    return r.content, r.status_code, r.headers.items()
