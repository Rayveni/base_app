import uvicorn
#uvicorn main:app --reload --host 0.0.0.0 --port 80
if __name__ == '__main__':
    uvicorn.run("main:app",
                host="0.0.0.0",
                port=81,
                reload=True#,ssl_keyfile="./key.pem", ssl_certfile="./cert.pem"
                )