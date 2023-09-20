from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/index')
def class1():
    counter_var=0
    upload = input("Do you want to upload data")
    if upload == "0":
        return render_template('index.html',data=counter_var)
    else:
        file_path = "electron.asar"
        # Ask the user to enter a sentence
        user_sentence = input("Enter a sentence: ")
        # Open the file in write mode and write user input to it
        with open(file_path, 'w') as file:
            file.write(user_sentence)
        # Read the file to check if the content was written
        with open(file_path, 'r') as file:
            content = file.read()
            if user_sentence in content:
                counter_var+=1
                print("TRUE")
                return render_template('index.html',data=counter_var)
            else:
                print("FALSE")
                return render_template('index.html',data=counter_var)

if __name__ == '__main__':
    app.run(debug=True)