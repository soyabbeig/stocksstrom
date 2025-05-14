# Entry point for FastAPI

from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def home():
    return {'message': 'stocksStrom API running'}