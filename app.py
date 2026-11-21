from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)
DB_NAME = 'tour.db'

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    # conn.execute('''
    #     DROP TABLE IF EXISTS tours
    # ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS tours (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            price INTEGER NOT NULL,
            image_url TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about_us')
def about_us():
    return render_template('about_us.html')

@app.route('/tours')
def tours():
    conn = get_db_connection()
    tours = conn.execute('SELECT * FROM tours').fetchall()
    conn.close()
    return render_template('tours.html', tours=tours)

@app.route('/add_tour', methods=['GET', 'POST'])
def add_tour():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        price = request.form['price']
        image_url = request.form['image_url']

        conn = get_db_connection()
        conn.execute('INSERT INTO tours (title, description, price, image_url) VALUES (?, ?, ?, ?)',
                     (title, description, price, image_url))
        conn.commit()
        conn.close()

        return redirect(url_for('tours'))

    return render_template('add_tour.html')

@app.route('/gallery')
def gallery():
    conn = get_db_connection()
    images = conn.execute('SELECT image_url, description FROM tours').fetchall()
    conn.close()
    return render_template('gallery.html', images=images)

@app.route('/contacts')
def contacts():
    return render_template('contacts.html')



if __name__ == '__main__':
    app.run(debug=True)