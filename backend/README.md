# Backend Start Instructions

To run the FastAPI backend, use the following command from the `backend` directory:

```
uvicorn main:app --reload
```

- `--reload` is for development (auto-reloads on code changes). Omit for production.
- Make sure you have all dependencies installed:

```
pip install -r requirements.txt
```

If you want a one-liner for production:

```
uvicorn main:app --host 0.0.0.0 --port 8000
``` 