from django.contrib.auth.hashers import make_password

def hashfy(x):
    return make_password(x)