FROM python:3.11-slim
WORKDIR /app
COPY ./backend /app
# Install Requierments.txt
RUN pip install -r requirements.txt
# PORT
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]