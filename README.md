# omok
0. install requirements
    - Setup venv with Python: `python -m venv <path to venv ex. ~/.venv/omok>`
    - With the virtual environment setup: `pip install -r requirements.txt`
    - TODO: check windows specific instructions for pip
1. Activate the Python virtual environment:
    - Linux: `source <venv path>/bin/activate`
    - Windows: `<venv>\Scripts\Activate.ps1`
2. Run the Flask server:
    -`flask --app main run`
3. Server should be bound to `localhost:5000`